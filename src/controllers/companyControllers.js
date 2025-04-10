import * as companyServices from "../services/companyServices.js"

export const getAllCompanys = async (req, res) => {
    try {
        const companys = await companyServices.getAllCompanys();
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

export const createCompany = async (req, res) => {
    const body = req.body;
    try {
        const company = await companyServices.createCompany(body);
        if(company){
            res.status(201).send(company);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Error creating user")
    }
};

export const updatedCompany = async (req, res) => {
    const body = req.body;
    const { id } = req.params;
    
    // UUID tekshirish
    if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(id)) {
        return res.status(400).json({ error: 'ID in invalid UUID format' });
    }

    try {
        const company = await companyServices.updatedCompany(id, body);
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

export const deleteCompany = async (req, res) => {
    const { id } = req.params;

    try {
        const company = await companyServices.deleteCompany(id);
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
