import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import Register from '../Register/Register';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose, onLogin }) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isLogin, setIsLogin] = useState(true);

	const initialValues = { email: '', password: '' };
	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email format').required('Required field'),
		password: Yup.string().required('Required field'),
	});

	const handleToggleForm = () => {
		setIsLogin(!isLogin);
	};

	const handleSubmit = async (values) => {
		setIsLoading(true);

		setTimeout(async () => {
			try {
				const response = await axios.post("http://localhost:5000/api/auth/login", values);
				if (response.status === 200) {
					console.log('Login response:', response.data);
					const userData = {
						id: response.data.id,
						email: response.data.email,
						firstName: response.data.firstName,
						lastName: response.data.lastName,
						phone: response.data.phone,
						role: response.data.role,
						memberSince: response.data.memberSince,
						purchaseCount: response.data.purchaseCount,
						deliveryAddress: response.data.deliveryAddress,
						bankDetails: response.data.bankDetails,
						orderHistory: response.data.orderHistory
					};
					onLogin(userData);
					onClose();
					navigate('/catalog');
				}
			} catch (error) {
				if (error.response && error.response.status === 401) {
					alert("Invalid login data. Please try to register.");
				} else {
					console.error("Login error", error);
				}
			} finally {
				setIsLoading(false);
			}
		}, 3000); 
	};

	return (
		<div className="login-container">
			<div style={{ alignSelf: 'flex-end' }}>
				<IconButton className="close-button" onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</div>
			{isLogin ? (
				<div className="log-in-form">
					<h2>Log In</h2>
					<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
						<Form>
							<div className="form-group">
								<Field name="email" type="email" placeholder="Email" />
								<ErrorMessage name="email" component="div" className="error-message-login" />
							</div>
							<div className="form-group">
								<Field name="password" type="password" placeholder="Password" />
								<ErrorMessage name="password" component="div" className="error-message-login" />
							</div>
							<button type="submit" className="submit-button" disabled={isLoading}>
								{isLoading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
							</button>
						</Form>
					</Formik>
				</div>
			) : (
				<Register onClose={onClose} handleToggleForm={handleToggleForm} onRegister={onLogin} />
			)}
			<div className="sign-up-prompt">
				<div onClick={handleToggleForm} className="sign-up-link">
					{isLogin ? (
						<>
							Don&apos;t have an account? <strong>Sign Up</strong>
						</>
					) : (
						<>
							Already have an account? <strong>Log In</strong>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
