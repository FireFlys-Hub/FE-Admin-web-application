import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { CRUDCategories } from "../../data/category";
const DeleteCategory = ({ open, onClose, category, onUpdateSuccess }) => {
    const {DeleteCategoryById} = CRUDCategories();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await DeleteCategoryById(category.id);
      message.success('Category deleted successfully');
      setConfirmLoading(false);
      onClose();
      onUpdateSuccess();
    } catch (error) {
    console.log("lỗi",error);
      message.error('Failed to delete Category');
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={`Delete Category ${category?.name}`}
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p>Are you sure you want to delete Category "{category?.kind}"?</p>
    </Modal>
  );
};

export default DeleteCategory;
