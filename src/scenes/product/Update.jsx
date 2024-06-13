import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Form, Upload, message, Row, Col, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useProductService from "../../data/product";
const { Option } = Select;

const UpdateProduct = ({ open, onClose, productData, onUpdateSuccess }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const { updateProduct, getCategory } = useProductService();
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            const categoryData = await getCategory();
            setCategories(categoryData);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (productData) {
            const initialValues = {
                ...productData,
                category_id: productData.category_id,
            };

            productData.images.forEach((image, index) => {
                initialValues[`image_${index + 1}`] = [
                    {
                        uid: `-${index + 1}`,
                        name: `image_${index + 1}.png`,
                        status: 'done',
                        url: image.image,
                    },
                ];
            });

            form.setFieldsValue(initialValues);
        }
        // eslint-disable-next-line
    }, [productData]);

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

            // Append images to the form data
            for (let i = 1; i <= 3; i++) {
                const imageField = `image_${i}`;
                const imageFiles = values[imageField];
                if (imageFiles && imageFiles.length > 0) {
                    if(imageFiles[0].originFileObj){
                        formData.append(imageField, imageFiles[0].originFileObj);
                    }
                    else if (imageFiles[0].url){
                        formData.append(imageField, imageFiles[0].url);
                    }
                }
            }
            await updateProduct(productData.id, formData);

            message.success('Product updated successfully');
            onClose();
            onUpdateSuccess();
            form.resetFields();
        } catch (error) {
            console.error('Error updating product:', error);
            message.error('Failed to update product. Please try again later.');
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
            title="Update Product"
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
                                { validator: validateNumber }
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
                                { validator: validateNumber }
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
                                { validator: validateInteger }
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
                                { validator: validateNumber }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="category_id"
                            label="Category"
                            rules={[{ required: true, message: 'Please select a category!' }]}
                        >
                            <Select placeholder="Select a category">
                                {categories.map((category) => (
                                    <Option key={category.id} value={category.id}>
                                        {category.kind}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    {Array.from({ length: 3 }, (_, index) => (
                        <Col span={12} key={index}>
                            <Form.Item
                                name={`image_${index + 1}`}
                                label={`Image ${index + 1}`}
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[{ required: true, message: `Please upload the ${index + 1} image!` }]}
                            >
                                <Upload name={`image_${index + 1}`} listType="picture" maxCount={1} beforeUpload={() => false}>
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    ))}
                </Row>
            </Form>
        </Modal>
    );
};

export default UpdateProduct;
