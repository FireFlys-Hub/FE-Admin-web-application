import React, { useState } from 'react';
import { Modal, message } from 'antd';
import useProductService from '../../data/product';

const DeleteProduct = ({ open, onClose, productData, onDelete }) => { // Add productData prop
  const { name } = productData || {}; // Destructure name from productData
  const { DeleteProduct } = useProductService();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await onDelete(); // Call onDelete function passed as prop
      message.success('Product deleted successfully');
      setConfirmLoading(false);
      onClose();
    } catch (error) {
      message.error('Failed to delete product');
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={`Delete Product ${name}`}
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p>Are you sure you want to delete product "{name}"?</p>
    </Modal>
  );
};

export default DeleteProduct;
