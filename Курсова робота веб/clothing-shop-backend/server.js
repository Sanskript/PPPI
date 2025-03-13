const express = require('express');
const cors = require('cors');
const app = express();

// Налаштування CORS
app.use(cors({
	origin: 'http://localhost:5173', 
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true
}));

// Парсинг JSON
app.use(express.json());

// Логування запитів
app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
	next();
});

// Маршрути
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Обробка помилок
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Error, 500!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
