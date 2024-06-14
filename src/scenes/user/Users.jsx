import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useUserService from "../../data/user";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import UpdateUser from './update'; // Import the modal
import DeleteUser from "./Delete";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

const User = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { AllUsers } = useUserService();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const fetchData = async () => {
        const userData = await AllUsers();
        if (userData) {
            setData(userData);
        }
    };

    const renderAccessLabel = (role) => {
        return role === 1 ? "Admin" : "User";
    };

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "phone_number", headerName: "Phone Number", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            renderCell: ({ row: { role } }) => (
                <Box
                    width="40%"
                    p="5px"
                    display="flex"
                    justifyContent="flex-start"
                    marginTop="10px"
                    backgroundColor={
                        role === 1
                            ? colors.greenAccent[600]
                            : role === "manager"
                                ? colors.blue[600]
                                : colors.greenAccent[700]
                    }
                    borderRadius="4px"
                >
                    {role === 1 ? <AdminPanelSettingsOutlinedIcon /> : <LockOpenOutlinedIcon />}
                    <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                        {renderAccessLabel(role)}
                    </Typography>
                </Box>
            ),
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
        setSelectedUser(row);
        setOpenUpdate(true);
    };

    const handleDelete = (row) => {
        setSelectedUser(row);
        setOpenDelete(true);
    };

    const handleUpdateSuccess = () => {
        fetchData(); // Fetch data again after successful update
    };

    return (
        <Box m="20px">
            <Header title="User" subtitle="Managing the Users" />
            {data.length > 0 && (
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
                        rows={data}
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
            <UpdateUser open={openUpdate} onClose={() => setOpenUpdate(false)} user={selectedUser} onUpdateSuccess={handleUpdateSuccess} />
            <DeleteUser open={openDelete} onClose={() => setOpenDelete(false)} user={selectedUser} onUpdateSuccess={handleUpdateSuccess} />
        </Box>
    );
};

export default User;
