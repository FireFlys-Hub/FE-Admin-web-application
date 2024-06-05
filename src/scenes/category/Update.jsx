import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Form, Upload, message } from 'antd';
import {CRUDCategories} from "../../data/category";
const UpdateCategoryModal = (props) => {
  const { open, onClose, category, onUpdateSuccess } = props;
  const {UpdateCategory} = CRUDCategories();
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        kind: category.kind,
      });
    }
  }, [category, form]);

  const handleOk = async ()  => {
    try {
        const values = await form.validateFields();
        setConfirmLoading(true);
        const formData = new FormData();
        formData.append('kind', values.kind);
        formData.append('id', category.id);
        await UpdateCategory(formData);
        message.success('User updated successfully');
        onClose();
        onUpdateSuccess(); 
      } catch (error) {
        console.error('Error updating category:', error);
        message.error('Failed to update category. Please try again later.');
      } finally {
        setConfirmLoading(false);
      }
    };


  return (
    <Modal
      title="Update Category"
      visible={open}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="kind"
          label="Kind"
          rules={[{ required: true, message: "Please input the category kind!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCategoryModal;
