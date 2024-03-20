import Users from "../entities/Users.js";

async function createUser(user){
    try{
        const userCreated = await Users.create(user);
        return{
            success : true,
            user: userCreated
        };

    }catch(error){
        console.error('Error: ', error);
        return { success : false }
    }
}

export {
    createUser,
}