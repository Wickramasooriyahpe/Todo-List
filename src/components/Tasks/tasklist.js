import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd'; // Import Modal for confirmation
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function TaskList({ tasks, onEdit, onDelete, onTasksUpdate, onRowSelectionChange }) {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleRowSelectionChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);

    const updatedTasks = tasks.map((task) => {
      if (newSelectedRowKeys.includes(task.key)) {
        return {
          ...task,
          tags: ["Done"], 
        };
      }
      return task; 
    });

    onTasksUpdate(updatedTasks);

    if (onRowSelectionChange) {
      onRowSelectionChange(newSelectedRowKeys);
    }
  };

  const columns = [
    {
      title: "Task Name",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <Space>
          {tags.map((tag) => (
            <Tag
              color={tag.toLowerCase() === "done" ? "#2D7B55" : "#FF4D4F"}
              key={tag}
            >
              {tag.toLowerCase() === "done" ? "Done" : "Todo"}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onEdit(record)}>
            <EditOutlined />
          </a>
          <a onClick={() => onDelete(record)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: handleRowSelectionChange,
  };

  const expandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
    expandedRowKeys: expandedRowKeys,
    onExpand: (expanded, record) => {
      if (expanded) {
        setExpandedRowKeys([...expandedRowKeys, record.key]);
      } else {
        setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.key));
      }
    },
  };

  return (
    <Table
      columns={columns}
      rowSelection={rowSelection}
      expandable={expandable}
      dataSource={tasks}
      rowKey="key"
    />
  );
}

export default TaskList;
