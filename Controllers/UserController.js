const Users = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const user = new Users({
            username,
            email,
            password: await bcrypt.hash(password, 10),
            role
        });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(404).send(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ message: 'Account information is incorrect.' });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, 'secret_key');
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send(error);
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const { username, email, password, role } = req.body;

    try {
        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            { username, email, password: await bcrypt.hash(password, 10), role },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(404).send(error);
    }
};

module.exports = {
    register,
    login,
    getUserById,
    updateUserById
};