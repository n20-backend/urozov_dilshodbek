import * as appServices from "../services/appServices.js"

export const getAllApps = async (req, res) => {
    try {
        const apps = await appServices.getAllApps();
        res.json(apps)
    } catch (error) {
        console.error('Error fetching users;', error);
        res.status(500).json({error: 'An error occurred on the server.'})
    }
};

export const getOneById = async (req, res) => {
    const { id } = req.params;
    try {
        const app = await appServices.getOneById(id);
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
};

export const createApp = async (req, res) => {
    const body = req.body;
    try {
        const company = await appServices.createApp(body);
        if(company){
            res.status(201).send(company);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Error creating user")
    }
};

export const updatedApp = async (req, res) => {
    const body = req.body;
    const { id } = req.params;
    
    // UUID tekshirish
    if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(id)) {
        return res.status(400).json({ error: 'ID in invalid UUID format' });
    }

    try {
        const company = await appServices.updateApp(id, body);
        if (company) {
            res.status(200).json(company); 
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.log("Error updating user:", error);
        res.status(400).json({ error: 'Invalid user updated' });
    }
};

export const deleteApp = async (req, res) => {
    const { id } = req.params;

    try {
        const company = await appServices.deleteApp(id);
        if (company) {
            res.status(200).json(company);             
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.log("Error updating user:", error);
        res.status(400).json({ error: 'Invalid user updated' });
    }
}
