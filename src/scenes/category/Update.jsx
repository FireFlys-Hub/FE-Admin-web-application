import React, { useState, useEffect } from "react";
import { Modal, Input, Form, message } from 'antd';
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
        const formData = {
          'kind': values.kind,
          'id':category.id
        }
        await UpdateCategory(formData);
        message.success('Category updated successfully');
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
      title="Edit Category"
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="kind"
          label="Kind of category"
          rules={[{ required: true, message: 'Please input the kind of category!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCategoryModal;
