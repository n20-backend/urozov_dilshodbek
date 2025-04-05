import * as userServices from "../services/userServices.js"

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
}