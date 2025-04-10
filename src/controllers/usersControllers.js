import * as userServices from "../services/userServices.js"
import * as userValidator from "../validator/user.validation.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await userServices.getAllUsers();
        res.json(users)
    } catch (error) {
        console.error('Error fetching users;', error);
        res.status(500).json({error: 'An error occurred on the server.'})
    }
};

export const getOneById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userServices.getOneById(id);
        if(user) {
            res.json(user);
        }
        else{
            res.status(404).json({error:'Users not found'})
        }
    } catch (error) {
        console.error('Error fetching user;', error);
        res.status(500).json({error: 'An error occurred on the server.'})
    }
};

export const createUser = async (req, res) => {
    const body = req.body
    const { error, value } = userValidator(body);
    if(error){
        const errors = error.details.map((err) => err.message);
        return res.status(400).send(errors);
    }
    try {
        const user = await userServices.createUser(body);
        if(user){
            res.status(201).send(user);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Error creating user")
    }
};

export const updatedUser = async (req, res) => {
    const body = req.body;
    const { id } = req.params;
    const { error, value } = userValidator
    
    // UUID tekshirish
    if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(id)) {
        return res.status(400).json({ error: 'ID in invalid UUID format' });
    }

    try {
        const user = await userServices.updateUser(id, body);
        if (user) {
            res.status(200).json(user); 
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.log("Error updating user:", error);
        res.status(400).json({ error: 'Invalid user updated' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userServices.deleteUser(id);
        if (user) {
            res.status(200).json(user);             
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.log("Error updating user:", error);
        res.status(400).json({ error: 'Invalid user deleted' });
    }
}
