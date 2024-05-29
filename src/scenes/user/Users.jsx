import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import Header from "../../components/Header";
import { useState, useEffect } from "react";
// mock data data.js
import { users, fetchData } from "../../data/data";

const User = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState(null);
    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchData();
                setData(users);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        }
        loadData();
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
                    <IconButton color={colors.grey[500]} onClick={() => handleUpdate(row)}>
                        <EditNoteOutlinedIcon />
                    </IconButton>
                    <IconButton color={colors.redAccent[500]} onClick={() => handleDelete(row)}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Box>
            ),
        }
    ];
    const handleUpdate = (row) => {
        // Implement update logic here
        console.log("Update action clicked for row:", row);
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
                            justifyContent: "space-between", // Align items evenly
                            align: "center"
                        }
                    }}
                >
                    <DataGrid rows={data} columns={columns} />
                </Box>
            )}
        </Box>

    );
};

export default User;