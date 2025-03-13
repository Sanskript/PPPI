import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ onClose, handleToggleForm, onRegister }) => {
    const navigate = useNavigate();
    const initialValues = { email: '', password: '' };
    const validationSchema = Yup.object({
        email: Yup.string().email('Невірний формат електронної пошти').required('Обов\'язкове поле'),
        password: Yup.string().required('Обов\'язкове поле'),
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", values);
            if (response.status === 201) {
                onRegister({ email: values.email, id: response.data.id }); // Передаємо ID користувача
                alert("Реєстрація успішна!"); // Повідомлення про успішну реєстрацію
                onClose();
                navigate('/catalog');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Користувач з таким email вже існує. Спробуйте увійти.");
            } else {
                console.error("Помилка при реєстрації", error);
            }
        }
    };

    return (
        <div className="log-in-form">
            <h2>Registration</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <div className="form-group">
                        <Field name="email" type="email" placeholder="Email" />
                        <ErrorMessage name="email" component="div" className="error-message" />
                    </div>
                    <div className="form-group">
                        <Field name="password" type="password" placeholder="Password" />
                        <ErrorMessage name="password" component="div" className="error-message" />
                    </div>
                    <button type="submit" className="submit-button">Register</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Register;
