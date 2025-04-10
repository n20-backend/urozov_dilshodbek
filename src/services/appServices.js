import Client from "../db/index.js";

export const getAllApps = async () => {
    try {
        const result = await Client.query('SELECT * FROM application ')
        return result.rows;
    } catch (error) {
        console.log('Error fetcing apps;', error);
        throw error;
    }
};

export const getOneById = async (id) => {
    try {
        const result = await Client.query('SELECT * FROM application where id = $1', [id]);
        return result.rows;
    } catch (error) {
        console.log('Error fetcing apps;', error);
        throw error;
    }
};

export const createApp = async (body) => {
    try {
        console.log("Kelayotgan ma'lumot", body);

        const { jobid, userid, resumeurl, coverletter, status } = body;

        if (!jobid || !userid || !resumeurl || !coverletter || !status) {
            throw new Error("Foydalanuvchi yaratishda maydonlar to'liq emas!");
        }

        const result = await Client.query(
            `INSERT INTO application (jobid, userid, resumeurl, coverletter, status, createdat, updatedat) 
             VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
             RETURNING *`, 
            [jobid, userid, resumeurl, coverletter, status]
        );

        return result.rows[0];

    } catch (error) {
        console.error("Error in createApp:", error.message);
        throw error;
    }
};

export const updateApp = async (id, body) => {
    try {
        const oldAppResult = await Client.query('SELECT * FROM application WHERE id = $1', [id]);
        const oldApp = oldAppResult.rows[0];

        if (!oldApp) {
            throw new Error("Ariza topilmadi");
        }

        // Eski yoki yangi qiymatlar
        const jobid = body.jobid || oldApp.jobid;
        const userid = body.userid || oldApp.userid;
        const resumeurl = body.resumeurl || oldApp.resumeurl;
        const coverletter = body.coverletter || oldApp.coverletter;
        const status = body.status || oldApp.status;

        const query = `
            UPDATE application SET 
                jobid = $1,
                userid = $2,
                resumeurl = $3,
                coverletter = $4,
                status = $5,
                updatedat = NOW()
            WHERE id = $6
            RETURNING *;
        `;

        const values = [jobid, userid, resumeurl, coverletter, status, id];
        const result = await Client.query(query, values);

        return result.rows[0];

    } catch (error) {
        console.error("Error in updateApp:", error.message);
        throw error;
    }
};

export const deleteApp = async (id) => {
    try {
        const result = await Client.query(
            'DELETE FROM application WHERE id = $1 RETURNING *;',
            [id]
        );

        if (result.rows.length === 0) {
            return null; // Topilmadi
        }

        return result.rows[0]; // O‘chirilgan ariza
    } catch (error) {
        console.error("Error in deleteApp:", error.message);
        throw error;
    }
};
