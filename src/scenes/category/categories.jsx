import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { CRUDCategories } from "../../data/category";
import Box from "@mui/material/Box";
import {  IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import CreateCategoryModal from "./Create";
import UpdateCategoryModal from "./Update";
import DeleteCategory from "./Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

const Categories = () => {
  const { GetCategories } = CRUDCategories();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const categoryData = await GetCategories();
    if (categoryData) {
      setCategories(categoryData);
    }
  };

  const showModalEditCategory = (row) => {
    console.log("Selected category for edit:", row); 
    setCategory(row);
    setIsModalOpen(true);
  };

  const handleModalCloseModalEdit = () => {
    setIsModalOpen(false);
    setCategory(null);
  };

  const showModalConfirmDeleteCategory = (row) => {
    setCategory(row);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateSuccess = () => {
    fetchData();
  };
  const handleModalCloseModalDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const showModalCreateCategory = () => {
    setIsCreateModalOpen(true);
  };
  const handleModalCloseModalCreate = () => {
    setIsCreateModalOpen(false);
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1,},
    {
      field: "kind",
      headerName: "Kind",
      flex:1,
      editable: true,
    },
    {
      field: "created_at",
      headerName: "Created_at",
      flex:1,
      editable: true,
    },
    {
      field: "updated_at",
      headerName: "Updated_at",
      flex:1,
      editable: true,
    },
    {
      headerName: "Action",
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center">
          <IconButton
            color={colors.grey[500]}
            onClick={() => showModalEditCategory(row)}
          >
            <EditNoteOutlinedIcon />
          </IconButton>
          <IconButton
            color={colors.redAccent[500]}
            onClick={() => {
              showModalConfirmDeleteCategory(row);
            }}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Categories" subtitle="Managing the Categories" />
      <IconButton
            color={colors.redAccent[500]}
            onClick={() =>{showModalCreateCategory()}}
          >
            <CreateNewFolderIcon />
          </IconButton>
      {categories.length > 0 && (
        <DataGrid
          rows={categories}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      )}
      <CreateCategoryModal
        open={isCreateModalOpen}
        onClose={handleModalCloseModalCreate}
        category={category}
        onUpdateSuccess={handleUpdateSuccess}
      />
      <UpdateCategoryModal
        open={isEditModalOpen}
        onClose={handleModalCloseModalEdit}
        category={category}
        onUpdateSuccess={handleUpdateSuccess}
      />
      <DeleteCategory
        open={isDeleteModalOpen}
        onClose={handleModalCloseModalDelete}
        category={category}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </Box>
  );
};

export default Categories;
