import express from 'express';
import User from '../entities/Users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginRouter = express.Router();

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'secret_key', (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Token is not valid!' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ error: 'Unauthorized - Incorrect credentials.' });
    }
};

loginRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized - Incorrect credentials.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Incorrect credentials.' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, 'secret_key');
    await user.update({ logged_in: true });
    res.status(200).json({ token, user });
});

loginRouter.post('/logout', verify, async (req, res) => {
    const user = await User.findByPk(req.user.userId);
    await user.update({ logged_in: false });
    res.json({ message: 'Logout successful.' });
});

loginRouter.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashedPassword,
        name
    });

    res.status(200).json({ message: 'User registered successfully', user });
});


export default loginRouter;


