import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useUserService from "../../data/user";

const UpdateUser = ({ open, onClose, user, onUpdateSuccess }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { UpdateUser } = useUserService();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        image_update: user.image ? [{ url: user.image }] : [],
      });
    }
  }, [user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone_number', values.phone_number);
      if (values.image_update && values.image_update.length > 0) {
        formData.append('image_update', values.image_update[0].originFileObj);
      }
      formData.append('id', user.id);

      await UpdateUser(formData);

      message.success('User updated successfully');
      onClose();
      onUpdateSuccess();  // Call the onUpdateSuccess function to fetch the updated data
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Failed to update user. Please try again later.');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title="Edit User"
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the user name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input the user email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[{ required: true, message: 'Please input the user phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image_update"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="image_update" listType="picture" maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUser;
