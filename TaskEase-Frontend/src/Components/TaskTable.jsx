import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const TaskTable = ({ tasks = [], onEdit, onDelete }) => {

    const taskList = Array.isArray(tasks) ? tasks : [];

    const renderTypeChip = (type) => {
        const typeColors = {
            High: { label: "High", color: "primary" },
            Medium: { label: "Medium", color: "warning" }, 
            Low: { label: "Low", color: "error" },
        };

        const { label = type, color = "default" } = typeColors[type] || {}
        return <Chip label={label} color={color} variant="outlined" />;
    };

    const renderStatusChip = (status) => {
        const statusColors = {
            done: { label: "Completed", color: "success" },
            inprogress: { label: "Pending", color: "warning" },
        };

        const { label = status, color = "default" } = statusColors[status] || {};
        return <Chip label={label} color={color} variant="filled" />;
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 1, borderRadius: 2, boxShadow: 2 }}>
            <Table>
                <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {taskList.length > 0 ? (
                        taskList.map((task, index) => (
                            <TableRow key={task.id} sx={{ "&:hover": { backgroundColor: "#fdfdfd" } }}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{task.taskName}</TableCell>
                                <TableCell>{task.description || "N/A"}</TableCell>
                                <TableCell >{renderTypeChip(task.type)}</TableCell>
                                <TableCell>{renderStatusChip(task.status)}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => onEdit(task)} sx={{ marginRight: 0 }}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => onDelete(task.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                <Typography variant="body1" color="textSecondary">
                                    No tasks found.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TaskTable;