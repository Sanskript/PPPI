const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require('uuid');

// Допоміжні функції для роботи з даними
const encryptData = (data, secretKey = "secret_key") => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (encryptedData, secretKey = "secret_key") => {
    return CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
};

// Базові користувачі системи
let users = [
    {
        id: "1",
        email: "admin@example.com",
        password: encryptData("admin123"),//пароль
        firstName: encryptData("Адміністратор"),
        lastName: encryptData("Системи"),
        phone: encryptData("+380991234567"),
        role: "admin",
        memberSince: "2024-01-01",
        purchaseCount: 15,
        deliveryAddress: {
            street: "вул. Хрещатик 1",
            city: "Київ",
            country: "Україна",
            postalCode: "01001"
        },
        bankDetails: {
            cardNumber: encryptData("4111111111111111"),
            expiryDate: encryptData("12/25")
        },
        orderHistory: [],
        adminStats: {
            totalUsers: 150,
            activeOrders: 25,
            totalProducts: 450
        }
    },
    {
        id: "2",
        email: "user@example.com",
        password: encryptData("password123"),
        firstName: encryptData("Іван"),
        lastName: encryptData("Петренко"),
        phone: encryptData("+380997654321"),
        role: "user",
        memberSince: "2024-02-01",
        purchaseCount: 5,
        deliveryAddress: {
            street: "вул. Шевченка 10",
            city: "Львів",
            country: "Україна",
            postalCode: "79000"
        },
        bankDetails: {
            cardNumber: encryptData("5555555555554444"),
            expiryDate: encryptData("11/24")
        },
        orderHistory: []
    }
];

// Функції для роботи з користувачами
const UserModel = {
    findById: (id) => {
        return users.find(user => user.id === id);
    },

    findByEmail: (email) => {
        if (!Array.isArray(users)) {
            console.error('Users is not an array:', users);
            return null;
        }
        return users.find(user => user.email === email);
    },

    update: (id, userData) => {
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return null;

        const existingUser = users[index];
        const updatedUser = {
            ...existingUser,
            firstName: encryptData(userData.firstName),
            lastName: encryptData(userData.lastName),
            phone: encryptData(userData.phone),
            deliveryAddress: userData.deliveryAddress || existingUser.deliveryAddress,
            bankDetails: userData.bankDetails ? {
                cardNumber: encryptData(userData.bankDetails.cardNumber),
                expiryDate: encryptData(userData.bankDetails.expiryDate)
            } : existingUser.bankDetails
        };

        users[index] = updatedUser;
        return updatedUser;
    },

    create: (userData) => {
        const newUser = {
            id: uuidv4(),
            email: userData.email,
            password: encryptData(userData.password),
            firstName: encryptData(userData.firstName),
            lastName: encryptData(userData.lastName),
            phone: encryptData(userData.phone),
            role: "user",
            memberSince: new Date().toISOString().split('T')[0],
            purchaseCount: 0,
            deliveryAddress: {},
            bankDetails: {},
            orderHistory: []
        };
        users.push(newUser);
        return newUser;
    },

    decryptUser: (user) => {
        if (!user) return null;
        
        return {
            id: user.id,
            email: user.email,
            firstName: decryptData(user.firstName),
            lastName: decryptData(user.lastName),
            phone: decryptData(user.phone),
            role: user.role,
            memberSince: user.memberSince,
            purchaseCount: user.purchaseCount || 0,
            deliveryAddress: user.deliveryAddress || {
                street: "",
                city: "",
                country: "",
                postalCode: ""
            },
            bankDetails: user.bankDetails ? {
                cardNumber: decryptData(user.bankDetails.cardNumber),
                expiryDate: decryptData(user.bankDetails.expiryDate)
            } : {
                cardNumber: "",
                expiryDate: ""
            },
            orderHistory: user.orderHistory || [],
            adminStats: user.role === 'admin' ? user.adminStats : undefined
        };
    }
};

module.exports = {
    ...UserModel,
    _users: users
};
