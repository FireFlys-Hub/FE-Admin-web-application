import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import Header from "../../components/Header";
import useUserService from "../../data/user";
import UpdateUser from './update'; // Import the modal

const User = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const {AllUsers} = useUserService();

    useEffect(() => {
        const fetchDataAndSetData = async () => {
            try {
                const result = await AllUsers();
                setData(result);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchDataAndSetData();
    }, []);

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
                        role === "1"
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
        setOpen(true);
    };

    const handleDelete = (row) => {
        // Implement delete logic here
        console.log("Delete action clicked for row:", row);
    };

    return (
        <Box m="20px">
            <Header title="User" subtitle="Managing the Users" />
            {data && (
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
                    <DataGrid rows={data} columns={columns} getRowId={(row) => row.id}  />
                </Box>
            )}
            <UpdateUser open={open} onClose={() => setOpen(false)} user={selectedUser} />
        </Box>
    );
};

export default User;
