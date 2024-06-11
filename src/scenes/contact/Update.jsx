import React, { useState, useEffect } from "react";
import { Modal, Form, message, Select } from 'antd';
import { CRUDContacts } from "../../data/contact";

const { Option } = Select;

const UpdateContactModal = (props) => {
  const { open, onClose, contact, onUpdateSuccess } = props;
  const { UpdateContact } = CRUDContacts();
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (contact) {
      form.setFieldsValue({
        status: contact.status,
      });
    }
  }, [contact, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      const formData = {
        'status': values.status,
        'id': contact.id
      };
      await UpdateContact(formData);
      message.success('Contact updated successfully');
      onClose();
      onUpdateSuccess();
    } catch (error) {
      console.error('Error updating contact:', error);
      message.error('Failed to update contact. Please try again later.');
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Contact"
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="status"
          label="Status of Contact"
          rules={[{ required: true, message: 'Please choose the status of contact!' }]}
        >
          <Select>
            <Option value="Pending">Pending</Option>
            <Option value="Processed">Processed</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateContactModal;
