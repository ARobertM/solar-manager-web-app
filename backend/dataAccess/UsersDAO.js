import Users from "../entities/Users.js"; // Presupunem că acesta este importul corect pentru modelul Sequelize
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = 'secret_key'; // În producție, ar trebui să fie o valoare complexă și stocată în siguranță

// Crearea unui utilizator nou
async function createUser({ UserName, UserEmail, UserPassword }) {
    try {
        const hashedPassword = await bcrypt.hash(UserPassword, 10);
        const user = await Users.create({
            UserName,
            UserEmail,
            UserPassword: hashedPassword
        });
        return { success: true, user };
    } catch (error) {
        console.error('Error creating user: ', error);
        return { success: false, error: 'Failed to create user' };
    }
}

async function findUserByEmail(UserEmail) {
    try {
        const user = await Users.findOne({ where: { UserEmail } });
        if (!user) {
            return { success: false, error: 'User not found' };
        }
        return { success: true, user };
    } catch (error) {
        console.error('Error finding user: ', error);
        return { success: false, error: 'Failed to find user' };
    }
}

async function authenticateUser(UserEmail, UserPassword) {
    const { success, user, error } = await findUserByEmail(UserEmail);
    if (!success) return { success: false, error };

    const validPassword = await bcrypt.compare(UserPassword, user.UserPassword);
    if (!validPassword) return { success: false, error: 'Invalid credentials' };

    const token = jwt.sign({ UserId: user.UserId, UserEmail }, secretKey, { expiresIn: '24h' }); 
    return { success: true, token };
}

export {
    createUser,
    findUserByEmail,
    authenticateUser
};