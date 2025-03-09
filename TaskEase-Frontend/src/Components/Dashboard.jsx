/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import NavBar from './Navbar'
import { Typography, Button, Box, Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterPanel from "./FilterPanel";
import TaskTable from "./TaskTable";
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../Helper/AxiosInstance';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [searchName, setSearchName] = useState("");
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [task, setTask] = useState({
        taskName: "",
        type: "",
        status: "",
        description: "",
    });

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editTaskData, setEditTaskData] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        try {
            const response = await axiosInstance.get("/api/tasks/fetchAll", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            if (response.status === 200) {
                setTasks(response.data || []);
            } else {
                console.error("Failed to fetch tasks:", response);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterTypeChange = (type) => setFilterType(type);
    const handleFilterStatusChange = (status) => setFilterStatus(status);
    const handleSearchNameChange = (name) => setSearchName(name);
    const handleClearFilters = () => {
        setFilterType("");
        setFilterStatus("");
        setSearchName("");
    };

    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        setTask({ taskName: "", type: "", status: "", description: "" });
    };

    const handleAddTaskChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleAddTask = async () => {
        try {
            const token = sessionStorage.getItem("token");

            const response = await axiosInstance.post("/api/tasks/add",
                {
                    taskName: task.taskName,
                    type: task.type,
                    status: task.status,
                    description: task.description,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                toast.success("Task Added Successfully!");
                console.log("added");
                handleCloseAddDialog();
                fetchTasks();
            } else {
                toast.error(response.data.message || "Failed to add task");
            }
        } catch (error) {
            console.error("Error adding task:", error);
            toast.error(error.response?.data?.message || "Error Adding Task");
        }
    };

    const handleOpenEditDialog = (task) => {
        setEditTaskData(task);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditTaskData(null);
    };

    const handleEditTaskChange = (e) => {
        const { name, value } = e.target;
        setEditTaskData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveEditedTask = async () => {
        const token = sessionStorage.getItem("token");

        if (!editTaskData) return;

        try {
            const response = await axiosInstance.put(`/api/tasks/${editTaskData.id}`, editTaskData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.success("Task Updated Successfully!");
                await fetchTasks();
                handleCloseEditDialog();
            } else {
                toast.error("Failed to update task");
            }
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error(error.response?.data?.message || "Error updating task");
        }
    };

    const handleDeleteTask = async (taskId) => {
        const token = sessionStorage.getItem("token");

        try {
            await axiosInstance.delete(`/api/tasks/${taskId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Task Deleted Successfully!");
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error(error.response?.data?.message || "Error deleting task");
        }
    };

    const filteredTasks = Array.isArray(tasks) ? tasks.filter((t) => {
        if (filterType && t.type !== filterType) return false;
        if (filterStatus && t.status !== filterStatus) return false;
        if (searchName && !t.taskName.toLowerCase().includes(searchName.toLowerCase())) return false;
        return true;
    }) : [];

    const isFormValid = task.type && task.status && task.taskName && task.description;

    return (
        <>
            <NavBar />
            <Box sx={{ mt: 3, mx: "auto", width: "90%", maxWidth: "1200px", flexGrow: 1 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        mb: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#666" }}>
                        Filter
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<AddIcon />}
                        onClick={handleOpenAddDialog}
                        sx={{ borderRadius: "16px", minWidth: "120px", px: 1, fontWeight: 'bold' }}
                    >
                        Add Task
                    </Button>
                </Paper>

                <FilterPanel
                    filterType={filterType}
                    filterStatus={filterStatus}
                    searchName={searchName}
                    onFilterTypeChange={handleFilterTypeChange}
                    onFilterStatusChange={handleFilterStatusChange}
                    onSearchNameChange={handleSearchNameChange}
                    onClearFilters={handleClearFilters}
                />
                <Typography
                    variant="body2"
                    sx={{ mt: 1, color: "#666", fontStyle: "italic" }}
                >
                    List of Tasks
                </Typography>
                <TaskTable tasks={filteredTasks} onEdit={handleOpenEditDialog} onDelete={handleDeleteTask} />
            </Box>
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
                <DialogTitle sx={{ fontSize: '8', fontWeight: 'bold', textAlign: 'center' }}>Add Task</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            name="type"
                            value={task.type}
                            label="Type"
                            onChange={handleAddTaskChange}
                        >
                            <MenuItem value="" sx={{ fontWeight: "bold", color: "gray", fontSize: 14 }}>Select Type</MenuItem>
                            <MenuItem value="High" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>High </MenuItem>
                            <MenuItem value="Medium" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>Medium</MenuItem>
                            <MenuItem value="Low" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>Low</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={task.status}
                            label="Status"
                            onChange={handleAddTaskChange}
                        >
                            <MenuItem value="" sx={{ fontWeight: "bold", color: "gray", fontSize: 14 }}>Select Status</MenuItem>
                            <MenuItem value="inprogress" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>Pending</MenuItem>
                            <MenuItem value="done" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>Completed</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        margin="dense"
                        label="Name"
                        name="taskName"
                        fullWidth
                        value={task.taskName}
                        onChange={handleAddTaskChange}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        name="description"
                        fullWidth
                        multiline
                        rows={3}
                        value={task.description}
                        onChange={handleAddTaskChange}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddTask} color="primary" variant="contained" sx={{ borderRadius: '16px' }} disabled={!isFormValid}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Task Dialog */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    {editTaskData && (
                        <>
                            <FormControl fullWidth sx={{ mt: 1 }}>
                                <InputLabel>Type</InputLabel>
                                <Select name="type" value={editTaskData.type || ""} label="Type" onChange={handleEditTaskChange}>
                                    <MenuItem value="High" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>High </MenuItem>
                                    <MenuItem value="Medium" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>Medium</MenuItem>
                                    <MenuItem value="Low" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>Low</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Status</InputLabel>
                                <Select name="status" value={editTaskData.status || ""} label="Status" onChange={handleEditTaskChange}>
                                    <MenuItem value="inprogress" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>Pending</MenuItem>
                                    <MenuItem value="done" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField margin="dense" label="Name" name="taskName" fullWidth value={editTaskData.taskName || ""} onChange={handleEditTaskChange} sx={{ mt: 2 }} />
                            <TextField margin="dense" label="Description" name="description" fullWidth multiline rows={3} value={editTaskData.description || ""} onChange={handleEditTaskChange} sx={{ mt: 2 }} />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEditedTask} color="primary" variant="contained" sx={{ borderRadius: '16px' }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </>
    )
}

export default Dashboard