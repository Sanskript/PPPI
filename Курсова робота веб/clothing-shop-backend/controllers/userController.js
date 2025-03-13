const UserModel = require('../models/user');
const CryptoJS = require("crypto-js");

exports.getUser = (req, res) => {
    try {
        const { id } = req.params;
        console.log('Getting user with ID:', id);
        
        const user = UserModel.findById(id);
        console.log('Found user:', user ? 'yes' : 'no');
        
        if (!user) {
					return res.status(404).json({ message: "User not found" });
        }

        const decryptedUser = UserModel.decryptUser(user);
        console.log('Decrypted user data:', decryptedUser);
        res.json(decryptedUser);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
					message: "Error processing user data",
            details: error.message 
        });
    }
};

exports.updateUser = (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;

        const updatedUser = UserModel.update(id, userData);
        if (!updatedUser) {
					return res.status(404).json({ message: "User not found" });
        }

        const decryptedUser = UserModel.decryptUser(updatedUser);
        res.json(decryptedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ 
					message: "Error updating user data",
            details: error.message 
        });
    }
}; 