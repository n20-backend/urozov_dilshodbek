import Client from "../db/index.js";

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