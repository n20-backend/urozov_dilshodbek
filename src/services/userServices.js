import Client from "../db/index.js";
import bcrypt from "bcrypt"
export const getAllUsers = async () => {
    try {
        const result = await Client.query('SELECT * FROM users')
        return result.rows;
    } catch (error) {
        console.log('Error fetcing users;', error);
        throw error;
    }
};

export const getOneById = async (id) => {
    try {
        const result = await Client.query('SELECT * FROM users where id = $1', [id]);
        return result.rows;
    } catch (error) {
        console.log('Error fetcing users;', error);
        throw error;
    }
}

export const createUser = async (body) => {
    try {
        const newUser = { ...body}
        if(!newUser.email || !newUser.username || !newUser.password || !newUser.role || !newUser.status ){
            throw new Error("Foydalanuvchi yaratishda maydonlar to'liq emas!")
        }

        
        const hashedPassword = await bcrypt.hash(newUser.password, 10);

        const result = await Client.query(
            `INSERT INTO users (email, username, password, role, status) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
            [newUser.email, newUser.username, hashedPassword, newUser.role, newUser.status]
        );

        return result.rows

    }catch(error){
        console.log(error);
    }
};

export const updateUser = async (id, body) => {
    try {
        const oldUserQuery = 'SELECT * FROM users WHERE id = $1';
        const oldUserResult = await Client.query(oldUserQuery, [id]);
        const oldUser = oldUserResult.rows[0];

        if (!oldUser) {
            throw new Error("User not found");
        }

        
        const updatedUser = {
            email: body.email || oldUser.email,
            username: body.username || oldUser.username,
            password: body.password ? await bcrypt.hash(body.password, 10) : oldUser.password,
            role: body.role || oldUser.role,
            status: body.status || oldUser.status,
            created_at: oldUser.created_at,  
            updated_at: new Date().toISOString() 
        };

        const query = `UPDATE users SET 
            email = $1, 
            username = $2, 
            password = $3, 
            role = $4, 
            status = $5,
            updatedAt = $6
            WHERE id = $7 
            RETURNING *`;

        const values = [
            updatedUser.email, 
            updatedUser.username, 
            updatedUser.password, 
            updatedUser.role, 
            updatedUser.status, 
            updatedUser.updated_at, 
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



