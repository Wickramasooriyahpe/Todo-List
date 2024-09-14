import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  editTask,
  closeTaskModal,
} from "../../store/slice/taskListSlice"; 
import "./AddEditTask.css"; 
import { Input } from "antd";
import CustomButton from "../Button/button";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 50) {
    errors.name = "Must be 50 characters or less";
  }

  if (!values.description) {
    errors.description = "Required";
  } else if (values.description.length > 200) {
    errors.description = "Must be 200 characters or less";
  }

  if (!values.status) {
    errors.status = "Required";
  }
  return errors;
};

const AddEditTask = () => {
  const dispatch = useDispatch();
  const { isEdit, selectedTask } = useSelector((state) => state.taskList); 

  const handleCancelAddEditTask = () => {
    dispatch(closeTaskModal()); 
  };

  const formik = useFormik({
    initialValues: selectedTask,
    enableReinitialize: true,
    validate,
    onSubmit: (values) => {
      if (isEdit) {
        dispatch(editTask(values)); 
      } else {
        dispatch(addTask({ ...values, id: new Date().getTime() })); 
      }
      alert(JSON.stringify(values, null, 2)); 
      dispatch(closeTaskModal()); 
    },
  });

  return (
    <div className="modal-overlay">
      <div className="form-modal">
        <div className="form__title">
          {isEdit ? "Edit Task" : "Add New Task"}
        </div>
        <form onSubmit={formik.handleSubmit} className="add-edit-task-form">
          <div className="add-edit-task-form__field">
            <div className="add-edit-task-form__label">
              <label htmlFor="name">Task Name</label>
            </div>
            <div className="add-edit-task-form__input">
              <Input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={
                  formik.touched.name && formik.errors.name
                    ? "input-error custom-input-field custom-width"
                    : "custom-width custom-input-field"
                }
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="add-edit-task-form__field">
            <div className="add-edit-task-form__label">
              <label htmlFor="description">Description</label>
            </div>
            <div>
              <Input.TextArea
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className={
                  formik.touched.description && formik.errors.description
                    ? "input-error custom-width custom-input-field"
                    : "custom-width custom-input-field"
                }
              />
            </div>
            {formik.touched.description && formik.errors.description ? (
              <div className="error">{formik.errors.description}</div>
            ) : null}
          </div>

          <div className="add-edit-task-form__field">
            <div className="add-edit-task-form__label">
              <label htmlFor="status">Status</label>
            </div>
            <select
              id="status"
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
              className={
                formik.touched.status && formik.errors.status
                  ? "input-error custom-width custom-input-field"
                  : "custom-width custom-input-field"
              }
            >
              <option value="" label="Select status" />
              <option value="pending" label="Pending" />
              <option value="in-progress" label="In Progress" />
              <option value="completed" label="Completed" />
            </select>
            {formik.touched.status && formik.errors.status ? (
              <div className="error">{formik.errors.status}</div>
            ) : null}
          </div>

          <div className="form-buttons">
            <CustomButton
              className="custom-btn custom-btn-secondary"
              text="Cancel"
              type="button"
              onClick={handleCancelAddEditTask}
            />
            <CustomButton
              className="custom-btn custom-btn-primary"
              text={isEdit ? "Update Task" : "Add Task"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditTask;
