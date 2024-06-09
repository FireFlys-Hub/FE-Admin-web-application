import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { ManageOrders } from "../../data/order";
import Box from "@mui/material/Box";
import { IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DetailOrderModal from "./orderDetail";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

const Order = () => {
  const { getAllOrders, getAllOrdersById } = ManageOrders();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);
  const [isOpenDetailModal, setOpenDetailModal] = useState(false);
  const [orderItemId, setOrderItemId] = useState(null);
  const [listOrderDetailItem, setListOrderDetailItem] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const response = await getAllOrders();
    if (response) {
      setOrders(response);
    }
  };

  const getOrderDetail = async (orderId) => {
    const res = await getAllOrdersById(orderId);
    setListOrderDetailItem(res.orderItems);
  };

  const showModalDetail = async (row) => {
    setOrderItemId(row.id); // lấy ra id của từng cái order trong bảng
    await getOrderDetail(row.id);
    setOpenDetailModal(true);
  };

  const closeModalDetail = () => {
    setOpenDetailModal(false);
    setOrderItemId(null);
    setListOrderDetailItem([]);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "User Name", flex: 1, editable: true },
    {
      field: "phone_number",
      headerName: "Phone number",
      flex: 1,
      editable: true,
    },
    { field: "address", headerName: "Address", flex: 1, editable: true },
    {
      field: "payment_method",
      headerName: "Payment method",
      flex: 1,
      editable: true,
    },
    {
      field: "total_price",
      headerName: "Total price",
      flex: 1,
      editable: true,
    },
    { field: "status", headerName: "Status", flex: 1, editable: true },
    { field: "order_date", headerName: "Order date", flex: 1, editable: true },
    { field: "destroy", headerName: "Destroy", flex: 1, editable: true },
    {
      headerName: "Action",
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center">
          <IconButton
            color={colors.grey[500]}
            onClick={() => showModalDetail(row)}
          >
            <EditNoteOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Orders" subtitle="Managing the Orders" />
      {orders.length > 0 && (
        <DataGrid
          rows={orders}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={(row) => row.id}
        />
      )}
      <DetailOrderModal
        open={isOpenDetailModal}
        onClose={closeModalDetail}
        orderItem={listOrderDetailItem}
      />
    </Box>
  );
};

export default Order;
