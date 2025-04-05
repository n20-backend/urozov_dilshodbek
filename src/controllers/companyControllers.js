import * as companyServices from "../services/companyServices.js"

export const getAllUsers = async (req, res) => {
    try {
        const companys = await companyServices.getAllUsers();
        res.json(companys)
    } catch (error) {
        console.error('Error fetching users;', error);
        res.status(500).json({error: 'An error occurred on the server.'})
    }
};

export const getOneById = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await companyServices.getOneById(id);
        if(company) {
            res.json(company);
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
    const body = req.body;
    try {
        const company = await companyServices.createUser(body);
        if(company){
            res.status(201).send(user);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Error creating user")
    }
}