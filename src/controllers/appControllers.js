import * as appServices from "../services/appServices"

export const getAllUsers = async (req, res) => {
    try {
        const apps = await appServices.getAllUsers();
        res.json(apps)
    } catch (error) {
        console.error('Error fetching users;', error);
        res.status(500).json({error: 'An error occurred on the server.'})
    }
};

export const getOneById = async (req, res) => {
    const { id } = req.params;
    try {
        const app = await userServices.getOneById(id);
        if(app) {
            res.json(app);
        }
        else{
            res.status(404).json({error:'Users not found'})
        }
    } catch (error) {
        console.error('Error fetching user;', error);
        res.status(500).json({error: 'An error occurred on the server.'})
    }
}