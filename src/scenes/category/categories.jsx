import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { getAllCategories } from "../../data/category";
import Box from "@mui/material/Box";
import { IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
const Categories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const categoryData = await getAllCategories();
    if (categoryData) {
      setCategories(categoryData);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "kind",
      headerName: "Kind",
      width: 150,
      editable: true,
    },
    {
      field: "created_at",
      headerName: "Created_at",
      width: 150,
      editable: true,
    },
    {
      field: "updated_at",
      headerName: "Updated_at",
      width: 110,
      editable: true,
    },
    {
      headerName: "Action",
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center">
          <IconButton color={colors.grey[500]}>
            <EditNoteOutlinedIcon />
          </IconButton>
          <IconButton color={colors.redAccent[500]}>
            <DeleteOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <Box m="20px">
      <Header title="Categories" subtitle="Managing the Categories" />
      {categories.length>0 && (
        <DataGrid
        rows={categories}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      )}      
    </Box>
  );
};

export default Categories;
