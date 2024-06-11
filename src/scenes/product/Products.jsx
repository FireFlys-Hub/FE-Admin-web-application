import React, { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { DataGrid } from "@mui/x-data-grid";
import useProductService from "../../data/product";
import { Button } from "antd";
import CreateProduct from "./Create";
import UpdateProduct from "./Update";
import DeleteProduct from "./Delete";
import RestoreProduct from "./Restore";

const Product = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [product, setProduct] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openRestore, setOpenRestore] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { getAllProduct, deleteProduct } = useProductService();

    const [size, setSize] = useState('large');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const productData = await getAllProduct();
        if (productData) {
            setProduct(productData);
            console.log("Fetched product data:", productData);
        }
    };

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "describe_product", headerName: "Describe Product", flex: 1 },
        {
            field: "discount", headerName: "Discount", flex: 1, valueFormatter: (value) => {
                if (value == null) {
                    return '';
                }
                return `${value.toLocaleString()} (%)`;
            },
        },
        { field: "quantity_product", headerName: "Quantity", flex: 1 },
        {
            field: "sell_price",
            headerName: "Sell price",
            flex: 1,
            valueFormatter: (value) => {
                if (value == null) {
                    return '';
                }
                return `${value.toLocaleString()} ($)`;
            },
        },
        {
            headerName: "Action",
            renderCell: ({ row }) => (
                <Box display="flex" justifyContent="center">
                    <IconButton color={colors.grey[500]} onClick={() => handleEdit(row)}>
                        <EditNoteOutlinedIcon />
                    </IconButton>
                    <IconButton color={colors.redAccent[500]} onClick={() => handleDelete(row)}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Box>
            ),
        }
    ];

    const handleEdit = (row) => {
        setSelectedProduct(row);
        setOpenUpdate(true);
    };

    const handleDelete = (row) => {
        setSelectedProduct(row);
        setOpenDelete(true);
    };

    const handleUpdateSuccess = () => {
        fetchData();
    };

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(selectedProduct.id);
            setOpenDelete(false);
            handleUpdateSuccess();
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    return (
        <Box m="20px">
            <Header title="Product" subtitle="Managing the Products" />
            <Button size={size} type="default" onClick={() => setOpenCreate(true)}>Create</Button>
            <Button size={size} type="default" onClick={() => setOpenRestore(true)}>RestoreProduct</Button>
            {product.length > 0 && (
                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                            justifyContent: "space-between",
                            alignItems: "center"
                        }
                    }}
                >
                    <DataGrid
                        rows={product}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </Box>
            )}
            <CreateProduct open={openCreate} onClose={() => setOpenCreate(false)} onUpdateSuccess={handleUpdateSuccess} />
            <UpdateProduct open={openUpdate} onClose={() => setOpenUpdate(false)} productData={selectedProduct} onUpdateSuccess={handleUpdateSuccess} />
            <DeleteProduct open={openDelete} onClose={() => setOpenDelete(false)} productData={selectedProduct} onDelete={handleDeleteProduct} />
            <RestoreProduct open={openRestore} onClose={() => setOpenRestore(false)} onUpdateSuccess={handleUpdateSuccess} />
        </Box>
    );
};

export default Product;
