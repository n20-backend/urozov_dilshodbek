import Client from "../db/index.js";

export const getAllCompanys = async () => {
    try {
        const result = await Client.query('SELECT * FROM company')
        return result.rows;
    } catch (error) {
        console.log('Error fetcing users;', error);
        throw error;
    }
};

export const getOneById = async (id) => {
    try {
        const result = await Client.query('SELECT * FROM company where id = $1', [id]);
        return result.rows;
    } catch (error) {
        console.log('Error fetcing users;', error);
        throw error;
    }
};

export const createCompany = async (body) => {
    try {
        const newCompany = { ...body}
        if(!newCompany.name || !newCompany.description || !newCompany.website || !newCompany.location || !newCompany.industry || !newCompany.size){
            throw new Error("Foydalanuvchi yaratishda maydonlar to'liq emas!")
        }

        
        const result = await Client.query(
            `INSERT INTO company (name, description, website, location, industry, size) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
            [newCompany.name, newCompany.description, newCompany.website, newCompany.location, newCompany.industry, newCompany.size]
        );

        return result.rows

    }catch(error){
        console.log(error);
    }
};

export const updatedCompany = async (id, body) => {
    try {
        const oldUserQuery = 'SELECT * FROM company WHERE id = $1';
        const oldUserResult = await Client.query(oldUserQuery, [id]);
        const oldUser = oldUserResult.rows[0];

        if (!oldUser) {
            throw new Error("Foydalanuvchi topilmadi");
        }

        
        const updatedCompany = {
            name: body.name || oldUser.name,
            description: body.description || oldUser.description,
            website: body.website || oldUser.website,
            location: body.location || oldUser.location,
            industry: body.industry || oldUser.industry,
            size: body.size || oldUser.size,
            createdAt: oldUser.createdAt,  
            updatedAt: new Date().toISOString() 
        };

        const query = `UPDATE company SET 
            name = $1, 
            description = $2, 
            website = $3, 
            location = $4, 
            industry = $5,
            size = $6
            WHERE id = $7 
            RETURNING *`;

        const values = [
            updatedCompany.name, 
            updatedCompany.description, 
            updatedCompany.website, 
            updatedCompany.location, 
            updatedCompany.industry, 
            updatedCompany.size, 
            id
        ];

        // So'rovni yuborish
        const result = await Client.query(query, values);
        const user = result.rows[0];

        return user;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteCompany = async (id) => {
    try {
        const result = await Client.query(
            'DELETE FROM company WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return null; // user topilmadi
        }

        return result.rows[0]; // o‘chirilgan user id'sini qaytarish
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};