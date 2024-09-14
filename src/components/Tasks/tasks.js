import React, { useState, useEffect } from "react";
import '../../views/dashboard.css';
import { PlusOutlined } from "@ant-design/icons";
import CustomButton from "../Button/button";
import TaskList from "./tasklist";
import { Modal, Input, Form } from "antd";
import { useAuth } from "../auth/AuthContext";

function Tasks() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      const storedTasks = localStorage.getItem(`tasks_${user.email}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, [user]);

  const handleAddTask = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    form.resetFields();
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (isEditing) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.key === editingTask.key ? { ...editingTask, ...values } : task
          )
        );
      } else {
        const newTask = { ...values, key: Date.now(), tags: ["Todo"] };
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }

      if (user) {
        const updatedTasks = isEditing
          ? tasks.map((task) => (task.key === editingTask.key ? { ...editingTask, ...values } : task))
          : [...tasks, { ...values, key: Date.now(), tags: ["Todo"] }];

        localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTasks));
      }

      setIsModalOpen(false);
      setEditingTask(null);
    });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setIsModalOpen(true);
    setEditingTask(task);
    form.setFieldsValue(task);
  };

  const handleDeleteTask = (task) => {
    const updatedTasks = tasks.filter((t) => t.key !== task.key);
    setTasks(updatedTasks);

    if (user) {
      localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTasks));
    }
  };

  const handleRowSelectionChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
    const updatedTasks = tasks.map((task) => ({
      ...task,
      tags: selectedRowKeys.includes(task.key) ? ["Done"] : ["Todo"],
    }));
    setTasks(updatedTasks);

    if (user) {
      localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTasks));
    }
  };

  const handleTasksUpdate = (updatedTasks) => {
    setTasks(updatedTasks);

    if (user) {
      localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTasks));
    }
  };

  return (
    <div>
      <div>
        <CustomButton
          text={<PlusOutlined />}
          className="custom-btn custom-btn-primary"
          onClick={handleAddTask}
        >
          <PlusOutlined />
        </CustomButton>
      </div>

      <div className="table-container">
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onTasksUpdate={handleTasksUpdate}
          onRowSelectionChange={handleRowSelectionChange}
        />
      </div>

      <Modal
        title={isEditing ? "Edit Task" : "Add New Task"}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="task"
            label="Task Name"
            rules={[{ required: true, message: "Please input the task name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input the task description!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Tasks;
