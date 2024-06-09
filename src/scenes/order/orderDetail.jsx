import React from "react";
import { Modal } from "antd";
import { DataGrid } from "@mui/x-data-grid";

const DetailOrderModal = (props) => {
  const { open, onClose, orderItem } = props;

  const columnsOrderDetail = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "price", headerName: "Price", flex: 1, editable: true },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      editable: true,
    },
    {
      field: "total_price",
      headerName: "Total Price",
      flex: 1,
      editable: true,
    },
    {
      field: "product_id",
      headerName: "Product ID",
      flex: 1,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: true,
    },
  ];

  return (
    <Modal
      title="Order details"
      visible={open}
      onCancel={onClose}
      footer={null}
      width={1000}
    >
      <DataGrid
        rows={orderItem}
        columns={columnsOrderDetail}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Modal>
  );
};

export default DetailOrderModal;
