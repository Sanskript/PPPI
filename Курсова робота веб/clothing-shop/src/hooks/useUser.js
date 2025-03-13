import { useState, useEffect } from 'react';
import axios from 'axios';

const useUser = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Отримання даних користувача
    const fetchUser = async () => {
        if (!userId) {
            setLoading(false);
            return;
        }

        try {
            console.log('Fetching user with ID:', userId); // Для дебагу
            const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
            console.log('Received user data:', response.data); // Для дебагу
            setUser(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching user:', err); // Для дебагу
            setError(err.response?.data?.message || 'Помилка при завантаженні даних');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Оновлення даних користувача
    const updateUser = async (userData) => {
        if (!userId) {
            return { success: false, error: 'ID користувача не знайдено' };
        }

        try {
            setLoading(true);
            console.log('Updating user with ID:', userId, 'Data:', userData); // Для дебагу
            const response = await axios.put(`http://localhost:5000/api/users/${userId}`, userData);
            console.log('Update response:', response.data); // Для дебагу
            
            const updatedUserData = response.data;
            setUser(updatedUserData);

            // Оновлюємо дані в localStorage
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const mergedUser = { ...storedUser, ...updatedUserData };
            localStorage.setItem('user', JSON.stringify(mergedUser));

            return { success: true, data: updatedUserData };
        } catch (err) {
            console.error('Error updating user:', err); // Для дебагу
            const errorMessage = err.response?.data?.message || 'Помилка при оновленні даних';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);

    return { 
        user, 
        loading, 
        error, 
        updateUser, 
        refreshUser: fetchUser 
    };
};

export default useUser; 