import React from "react";
import { Paper, FormControl, TextField, Button, Stack, MenuItem } from "@mui/material";
import { Clear } from "@mui/icons-material";

const FilterPanel = ({ filterType, filterStatus, searchName, onFilterTypeChange, onFilterStatusChange, onSearchNameChange, onClearFilters }) => {

    return (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, backgroundColor: "#fff", mt: 2 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                <FormControl sx={{ minWidth: 140 }}>
                    <TextField
                        select
                        label="Type"
                        value={filterType}
                        onChange={(e) => onFilterTypeChange(e.target.value)}
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                    >
                        <MenuItem value="" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>All</MenuItem>
                        <MenuItem value="High" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>High</MenuItem>
                        <MenuItem value="Medium" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>Medium</MenuItem>
                        <MenuItem value="Low" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>Low</MenuItem>
                    </TextField>
                </FormControl>
                <FormControl sx={{ minWidth: 140 }}>
                    <TextField
                        select
                        label="Status"
                        value={filterStatus}
                        onChange={(e) => onFilterStatusChange(e.target.value)}
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                    >
                        <MenuItem value="" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>All</MenuItem>
                        <MenuItem value="inprogress" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>Pending</MenuItem>
                        <MenuItem value="done" sx={{ fontWeight: "bold", fontSize: 15, color: '#555555' }}>Completed</MenuItem>
                    </TextField>
                </FormControl>
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    value={searchName}
                    onChange={(e) => onSearchNameChange(e.target.value)}
                    sx={{ flexGrow: 1 }}
                />
                <Button
                    variant="outlined"
                    color="primary"
                    endIcon={<Clear />}
                    onClick={onClearFilters}
                    sx={{ borderRadius: "16px", minWidth: "115px", px: 1, fontWeight: 'bold', borderWidth: "2px" }}
                >
                    Clear
                </Button>
            </Stack>
        </Paper>
    );
}

export default FilterPanel;