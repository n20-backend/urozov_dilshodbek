import * as jobServices from "../services/jobServices.js"
export const getAllJob = async (req, res) => {
    try {
        const jobs = await jobServices.getAllJobs();
        res.json(jobs)
    } catch (error) {
        console.error('Error fetching users;', error);
        res.status(500).json({error: 'An error occurred on the server.'})
    }
};

export const getOneById = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await jobServices.getOneById(id);
        if(job) {
            res.json(job);
        }
        else{
            res.status(404).json({error:'Users not found'})
        }
    } catch (error) {
        console.error('Error fetching user;', error);
        res.status(500).json({error: 'An error occurred on the server.'})
    }
};

export const createJobs = async (req, res) => {
    const body = req.body;
    try {
        const job = await jobServices.createJobs(body);
        if(job){
            res.status(201).send(job);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Error creating user")
    }
};

export const updatedJob = async (req, res) => {
    const body = req.body;
    const { id } = req.params;
    
    // UUID tekshirish
    if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(id)) {
        return res.status(400).json({ error: 'ID in invalid UUID format' });
    }

    try {
        const job = await jobServices.updatedJob(id, body);
        if (job) {
            res.status(200).json(job); 
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.log("Error updating user:", error);
        res.status(400).json({ error: 'Invalid user updated' });
    }
};

export const deleteJob = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await jobServices.deleteJob(id);
        if (user) {
            res.status(200).json(user);             
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.log("Error updating user:", error);
        res.status(400).json({ error: 'Invalid user updated' });
    }
}
