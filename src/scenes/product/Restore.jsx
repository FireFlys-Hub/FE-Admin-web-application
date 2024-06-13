import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import useProductService from '../../data/product';

const RestoreProduct = ({ open, onClose, onUpdateSuccess }) => {
    const [deletedProducts, setDeletedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getProductDeleted, restoreProduct } = useProductService();

    useEffect(() => {
        if (open) {
            fetchDeletedProducts();
        }
    // eslint-disable-next-line
    }, [open]);

    const fetchDeletedProducts = async () => {
        try {
            setLoading(true);
            const deletedProductsData = await getProductDeleted();
            setDeletedProducts(deletedProductsData);
        } catch (error) {
            console.error('Error fetching deleted products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = async (productId) => {
        try {
            setLoading(true);
            await restoreProduct(productId);
            await fetchDeletedProducts();
            onUpdateSuccess();
        } catch (error) {
            console.error('Error restoring product:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button type="primary" onClick={() => handleRestore(record.id)} loading={loading}>
                    Restore
                </Button>
            ),
        },
    ];

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal
            title="Restore Product"
            visible={open}
            onCancel={handleCancel}
            footer={null}
        >
            <Table columns={columns} dataSource={deletedProducts} loading={loading} rowKey="id" />
        </Modal>
    );
};

export default RestoreProduct;
