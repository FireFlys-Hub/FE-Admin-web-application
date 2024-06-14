import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Form, Upload, message, Row, Col, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useProductService from "../../data/product";
const { Option } = Select;
const CreateProduct = ({ open, onClose, onUpdateSuccess }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categories,setCategories] = useState([])
  const { CreateProduct, getCategory } = useProductService();
  const [form] = Form.useForm();
  useEffect(() => {
    // Gọi hàm getCategory để lấy danh sách category khi component được render
    const fetchData = async () => {
      const categoryData = await getCategory();
      setCategories(categoryData); // Lưu danh sách category vào state
    };
    fetchData();
    // eslint-disable-next-line
  }, []);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('discount', values.discount);
      formData.append('sell_price', values.sell_price);
      formData.append('quantity_product', values.quantity_product);
      formData.append('describe_product', values.describe_product);
      formData.append('price', values.price);
      formData.append('category_id', values.category_id);
      formData.append('status', values.status);
      if (values.image_1 && values.image_1.length > 0) {
        formData.append('image_1', values.image_1[0].originFileObj);
      }
      if (values.image_2 && values.image_2.length > 0) {
        formData.append('image_2', values.image_2[0].originFileObj);
      }
      if (values.image_3 && values.image_3.length > 0) {
        formData.append('image_3', values.image_3[0].originFileObj);
      }
      console.log(formData);
      await CreateProduct(formData);

      message.success('Product created successfully');
      onClose();
      onUpdateSuccess();  // Call the onUpdateSuccess function to fetch the updated data
      form.resetFields();
    } catch (error) {
      console.error('Error creating product:', error);
      message.error('Failed to create product. Please try again later.');
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
  const validateNumber = (_, value) => {
    const regex = /^\d*\.?\d*$/;
    if (!regex.test(value)) {
      return Promise.reject('Please input a valid number!');
    }
    return Promise.resolve();
  };
  const validateInteger = (_, value) => {
    if (!Number.isInteger(Number(value))) {
      return Promise.reject('Please input an integer for quantity!');
    }
    return Promise.resolve();
  };
  return (
    <Modal
      title="Create Product"
      visible={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: 'Please input the product name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="discount"
              label="Discount"
              rules={[
                { required: true, message: 'Please input the discount!' },
                { validator: validateNumber}
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                { required: true, message: 'Please input the price!' },
                { validator: validateNumber}

              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="quantity_product"
              label="Quantity"
              rules={[
                { required: true, message: 'Please input the product quantity!' },
                { validator:validateInteger}

              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="describe_product"
              label="Description"
              rules={[{ required: true, message: 'Please input the product description!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="sell_price"
              label="Sell Price"
              rules={[
                { required: true, message: 'Please input the sell price!' },
                { validator: validateNumber}

              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
          <Form.Item
              name="category_id"
              label="Category"
              rules={[{ required: true, message: 'Please select a category!' }]}
            >
              <Select placeholder="Select a category">
                {/* Đổ danh sách category vào dropdown list */}
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.kind}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="image_1"
              label="Image 1"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload the first image!' }]}
            >
              <Upload name="image_1" listType="picture" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="image_2"
              label="Image 2"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload the second image!' }]}
            >
              <Upload name="image_2" listType="picture" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="image_3"
              label="Image 3"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload the third image!' }]}
            >
              <Upload name="image_3" listType="picture" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateProduct;
