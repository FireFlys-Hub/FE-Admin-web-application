import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { CRUDContacts } from "../../data/contact";
import Box from "@mui/material/Box";
import { IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import UpdateContactModal from "./Update";

const Contacts = () => {
  const { GetContacts } = CRUDContacts();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState(null);
  const [isEditModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const contactData = await GetContacts();
    console.log("Fetched contacts:", contactData);
    if (contactData) {
      setContacts(contactData);
    }
  };
  
  const showModalEditContact = (row) => {
    console.log("Selected contact for edit:", row); 
    setContact(row);
    setIsModalOpen(true);
  };
  
  const handleModalCloseModalEdit = () => {
    setIsModalOpen(false);
    setContact(null);
  };
  
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "user_name",
      headerName: "Name",
      flex: 1,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      field: "phone_number",
      headerName: "Phone_number",
      flex: 1,
      editable: true,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: true,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor:
              params.value === "Pending"
                ? theme.palette.error.main
                : theme.palette.success.main,
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      headerName: "Action",
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center">
          <IconButton
            color={colors.grey[500]}
            onClick={() => showModalEditContact(row)}
          >
            <EditNoteOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Contacts" subtitle="Managing the Contacts" />
      {contacts.length > 0 && (
        <DataGrid
          rows={contacts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      )}
      <UpdateContactModal
        open={isEditModalOpen}
        onClose={handleModalCloseModalEdit}
        contact={contact}
        onUpdateSuccess={fetchData}
      />
    </Box>
  );
};

export default Contacts;
