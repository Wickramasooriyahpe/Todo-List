import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [], 
  selectedTask: {
    id: null,
    name: '',
    description: '',
    status: 'pending', 
  },
  isEdit: false,
  isTaskModalOpen: false, 
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: action.payload.id, 
        name: action.payload.name,
        description: action.payload.description,
        status: action.payload.status || 'pending', 
      });
    },
    editTask: (state, action) => {
      const { id, name, description, status } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex >= 0) {
        state.tasks[taskIndex] = { id, name, description, status };
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    setEditMode: (state, action) => {
      state.isEdit = action.payload.isEdit;
      state.selectedTask = action.payload.task || initialState.selectedTask;
    },
    openTaskModal: (state) => {
      state.isTaskModalOpen = true;
    },
    closeTaskModal: (state) => {
      state.isTaskModalOpen = false;
      state.selectedTask = initialState.selectedTask; 
    },
    updateTaskDetails: (state, action) => {
      state.selectedTask = { ...state.selectedTask, ...action.payload };
    },
    resetSelectedTask: (state) => {
      state.selectedTask = initialState.selectedTask;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  setEditMode,
  openTaskModal,
  closeTaskModal,
  updateTaskDetails,
  resetSelectedTask,
} = taskListSlice.actions;

export default taskListSlice.reducer;