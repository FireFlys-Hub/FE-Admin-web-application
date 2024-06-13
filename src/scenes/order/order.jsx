import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { ManageOrders } from "../../data/order";
import Box from "@mui/material/Box";
import { IconButton, useTheme, Select, MenuItem, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DetailOrderModal from "./orderDetail";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { message } from "antd";

const Order = () => {
  const { getAllOrders, getAllOrdersById, updateOrderStatus } = ManageOrders();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);
  const [isOpenDetailModal, setOpenDetailModal] = useState(false);
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
    getOrderDetail(row.id);
    setOpenDetailModal(true);
  };

  const closeModalDetail = () => {
    setOpenDetailModal(false);
    setListOrderDetailItem([]);
  };

  const handleStatusChange = (orderId, newStatus) => {
    try {
      const updatedOrders = orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        } else {
          return order;
        }
      });
      setOrders(updatedOrders);
      updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error("Error handling status change:", error);
    }
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
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
          params.value === "Canceled" ? 
          (
          <Button 
              sx={{ 
                width: '110px', 
                color: 'white', 
                backgroundColor:'red',
                padding: '8px 10px' 
              }}
              onClick={()=>{message.error("Canceled orders cannot be edited")}}
            >
              {params.value}
            </Button> 
          )
          : (
         <Select
          value={params.value}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          autoWidth
          sx={{
            "& .MuiSelect-select": {
              padding: "8px 16px",
              color: "white",
              backgroundColor:
                params.value === "Canceled"
                  ? "red"
                  : params.value === "Delivering"
                  ? "orange"
                  : params.value === "Transacted"
                  ? "blue"
                  : "green",
            },
          }}
        >
          <MenuItem
            value="Pending"
            sx={{ backgroundColor: "green", color: "black" }}
          >
            Pending
          </MenuItem>
          <MenuItem
            value="Delivering"
            sx={{ backgroundColor: "orange", color: "black" }}
          >
            Delivering
          </MenuItem>
          <MenuItem
            value="Canceled"
            sx={{ backgroundColor: "red", color: "black" }}
          >
            Canceled
          </MenuItem>
          <MenuItem
            value="Transacted"
            sx={{ backgroundColor: "blue", color: "black" }}
          >
            Transacted
          </MenuItem>
        </Select>
        
      )
    ),
    
    },

    { field: "order_date", headerName: "Order date", flex: 1, editable: true },
    // { field: "destroy", headerName: "Destroy", flex: 1, editable: true },
    {
      headerName: "Order Detail",
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
