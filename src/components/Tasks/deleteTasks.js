import { useDispatch, useSelector } from "react-redux";
import { openDeleteUserModal, closeDeleteUserModal } from "../../store/slice/userManagementSlice";
import ActionModal from "../Modals/ActionModal/actionModal";
import { useState } from "react";

export function useDeleteModal(setTasks, tasks) {
  const dispatch = useDispatch();
  const isDeleteUserModalOpen = useSelector((state) => state.userManagement.isDeleteUserModalOpen);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenDeleteModal = (item) => {
    setSelectedItem(item);
    dispatch(openDeleteUserModal());
  };

  const handleConfirmDelete = () => {
    setTasks(tasks.filter((t) => t.key !== selectedItem.key));
    dispatch(closeDeleteUserModal());
    setSelectedItem(null); 
  };

  const handleCancelDelete = () => {
    dispatch(closeDeleteUserModal());
    setSelectedItem(null); 
  };

  const DeleteModal = () => (
    isDeleteUserModalOpen && (
      <ActionModal
        title="Delete Item"
        message={`Are you sure you want to delete ${selectedItem?.task}?`}
        button1Config={{
          className: "custom-btn custom-btn-secondary",
          text: "Cancel",
          onClick: handleCancelDelete,
        }}
        button2Config={{
          className: "custom-btn custom-btn-primary",
          text: "Yes, Delete",
          onClick: handleConfirmDelete,
        }}
      />
    )
  );

  return { handleOpenDeleteModal, DeleteModal };
}
