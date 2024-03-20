import express from 'express';
import { createUser } from '../dataAccess/UsersDAO.js';

let userRouter = express.Router();

userRouter.route('/user').post(async (req, res) => {
    return res.status(201).json(await createUser(req.body));
});


export default userRouter;
