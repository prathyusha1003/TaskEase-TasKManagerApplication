/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axiosInstance from '../Helper/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_`~<>;:'"{|},.+=()\[\]\/\\])[A-Za-z\d!@#$%^&*_`~<>;:'"{|},.+=()\[\]\/\\]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};
        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.username || formData.username.trim() === '') {
            newErrors.username = 'First name is required';
        } else if (!nameRegex.test(formData.username.trim())) {
            newErrors.username = 'First name should contain only alphabets';
        }

        if (!formData.email || formData.email.trim() === '') {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password || formData.password.trim() === '') {
            newErrors.password = 'Password is required';
        } else if (!isPasswordValid(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character';
        }

        if (!formData.confirmPassword || formData.confirmPassword.trim() === '') {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            let payload = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            };

            const endpoint = '/api/user/signup';
            try {
                const response = await axiosInstance.post(endpoint, payload, {
                    headers: {
                        'Accept': 'application/json',
                        'method': 'POST'
                    }
                });
                if (response.status === 200) {
                    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
                }
                toast.success("Signup Successful! Please Login");
                setTimeout(() => navigate("/"), 2000);
            } catch (error) {
                console.error('Error submitting:', error);
                toast.error("Something went wrong. Please try again.");
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
                    sx={{ width: 300, mx: 'auto', my: 2, py: 3, px: 2, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 'sm', boxShadow: 'md' }}
                    variant="outlined"
                >
                    <div>
                        <Typography level="h4" component="h1" sx={{ textAlign: 'center', color: '#b4b4b4' }}><b>Welcome!</b></Typography>
                        <Typography level="body-sm" sx={{ textAlign: 'center' }}>Sign up to continue.</Typography>
                    </div>
                    <FormControl error={Boolean(errors.username)}>
                        <FormLabel>Name<span style={{ color: 'red' }}>*</span></FormLabel>
                        <Input name="username" type="text" placeholder="John Doe" value={formData.username} onChange={handleChange} />
                        {errors.username && <Typography level="body-xs" color="danger">{errors.username}</Typography>}
                    </FormControl>
                    <FormControl error={Boolean(errors.email)}>
                        <FormLabel>Email<span style={{ color: 'red' }}>*</span></FormLabel>
                        <Input name="email" type="email" placeholder="johndoe@email.com" value={formData.email} onChange={handleChange} />
                        {errors.email && <Typography level="body-xs" color="danger">{errors.email}</Typography>}
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
                        {errors.password && <Typography level="body-xs" color="danger">{errors.password}</Typography>}
                    </FormControl>
                    <FormControl error={Boolean(errors.confirmPassword)}>
                        <FormLabel>Confirm Password<span style={{ color: 'red' }}>*</span></FormLabel>
                        <Input
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            endDecorator={
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            }
                        />
                        {errors.confirmPassword && <Typography level="body-xs" color="danger">{errors.confirmPassword}</Typography>}
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
                        {loading ? <CircularProgress size={24} sx={{ color: "#1976d2" }} /> : "Sign Up"}
                    </Button>
                    <Typography endDecorator={<Link href="/">Log in</Link>} sx={{ fontSize: 'sm', alignSelf: 'center' }}>
                        Already have an account?
                    </Typography>
                </Sheet>
            </main>
            <ToastContainer />
        </>
    );
};

export default SignUp;