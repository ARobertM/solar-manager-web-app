import express from 'express';
import { createUser, authenticateUser, authenticateToken } from '../dataAccess/UsersDAO.js';

let userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    const { success, user, error } = await createUser(req.body);
    if (!success) return res.status(500).json({ error });
    return res.status(201).json({ message: 'User created successfully', user });
});

userRouter.post('/login', async (req, res) => {
    const { UserEmail, UserPassword } = req.body;  
    const { success, token, error } = await authenticateUser(UserEmail, UserPassword);
    if (!success) return res.status(401).json({ error });
    return res.status(200).json({ token });
});

userRouter.get('/user', authenticateToken, async (req,res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ UserName: user.name, UserEmail: user.email });
      } catch (error) {
        res.status(500).json({ message: "Error fetching user information" });
      }
})


export default userRouter;
