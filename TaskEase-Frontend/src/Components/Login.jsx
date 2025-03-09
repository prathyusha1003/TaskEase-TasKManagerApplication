/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Helper/AxiosInstance';
import IconButton from '@mui/joy/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);

            try {
                const response = await axiosInstance.get('/api/user/login', {
                    params: {
                        email: formData.email,
                        password: formData.password
                    },
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.status === 200) {
                    sessionStorage.setItem("token", response.data.data);
                    toast.success("Login Successful!");
                    navigate("/dashboard");
                }
            } catch (error) {
                console.error('Login failed:', error);
                toast.error(error.response?.data?.message || "Invalid email or password.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <main
                style={{
                    backgroundColor: '#f5f5f5',
                    height: '97vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                <Typography level="h3" sx={{ textAlign: 'center', mt: 2, fontWeight: 'bold', color: 'GrayText', fontStyle: "italic" }}>
                    TaskEase
                </Typography>
                <Sheet
                    sx={{
                        width: 300,
                        mx: 'auto',
                        my: 2,
                        py: 3,
                        px: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    variant="outlined"
                >
                    <div>
                        <Typography level="h4" component="h1" sx={{ textAlign: 'center', color: '#b4b4b4' }}><b>Welcome!</b></Typography>
                        <Typography level="body-sm" sx={{ textAlign: 'center' }}>Sign in to continue.</Typography>
                    </div>
                    <FormControl error={Boolean(errors.email)}>
                        <FormLabel>Email<span style={{ color: 'red' }}>*</span></FormLabel>
                        <Input
                            name="email"
                            type="email"
                            placeholder="johndoe@email.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <Typography color="danger" fontSize="sm">{errors.email}</Typography>}
                    </FormControl>
                    <FormControl error={Boolean(errors.password)}>
                        <FormLabel>Password<span style={{ color: 'red' }}>*</span></FormLabel>
                        <Input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="password"
                            value={formData.password}
                            onChange={handleChange}
                            endDecorator={
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            }
                        />
                        {errors.password && <Typography color="danger" fontSize="sm">{errors.password}</Typography>}
                    </FormControl>
                    <Button
                        onClick={handleSubmit}
                        sx={{
                            mt: 1,
                            backgroundColor: loading ? "#BDBDBD" : "#1976d2",
                            color: "white",
                            "&:hover": { backgroundColor: loading ? "#BDBDBD" : "#1565c0" },
                        }}
                        disabled={loading}
                        variant="contained"
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: "#1976d2" }} /> : "Login"}
                    </Button>
                    <Typography
                        endDecorator={<Link href="/signUp">Sign Up</Link>}
                        sx={{ fontSize: 'sm', alignSelf: 'center' }}
                    >
                        Don't have an account?
                    </Typography>
                </Sheet>
            </main>
            <ToastContainer />
        </>
    );
};

export default Login;