import React, { useState } from 'react';
import { Modal, message } from 'antd';
import useUserService from '../../data/user';

const DeleteUser = ({ open, onClose, user, onUpdateSuccess }) => {
  const { DeleteUser } = useUserService();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await DeleteUser(user.id);
      message.success('User deleted successfully');
      setConfirmLoading(false);
      onClose();
      onUpdateSuccess(); // Refresh user list
    } catch (error) {
      message.error('Failed to delete user');
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={`Delete User ${user?.name}`}
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p>Are you sure you want to delete user "{user?.name}"?</p>
    </Modal>
  );
};

export default DeleteUser;
