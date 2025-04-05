import * as jobServices from "../services/jobServices"

export const getAllUsers = async (req, res) => {
    try {
        const jobs = await jobServices.getAllUsers();
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
}