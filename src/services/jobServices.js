import Client from "../db/index.js";

export const getAllJobs = async () => {
    try {
        const result = await Client.query('SELECT * FROM job_listing');
        return result.rows;
    } catch (error) {
        console.error('Error fetching jobs:', error.message);
        throw error;
    }
};

export const getOneById = async (id) => {
    try {
        const result = await Client.query('SELECT * FROM job_listing WHERE id = $1', [id]);
        return result.rows[0];
        // return { message: "Get one by id"}
    } catch (error) {
        console.error('Error fetching job by ID:', error.message);
        throw error;
    }
}

export const createJobs = async (body) => {
    try {
        const newJobs = {
            title: body.title,
            description: body.description,
            companyId: body.companyid,
            location: body.location,
            salaryRange: JSON.stringify(body.salaryrange),
            requirements: JSON.stringify(body.requirements),
            status: body.status,
            postedBy: body.postedby
        };

        if (!newJobs.title || !newJobs.description || !newJobs.companyId || !newJobs.location || !newJobs.salaryRange || !newJobs.requirements || !newJobs.status || !newJobs.postedBy) {
            throw new Error("Foydalanuvchi yaratishda maydonlar to'liq emas!");
        }

        const result = await Client.query(
            `INSERT INTO job_listing 
            (title, description, companyId, location, salaryRange, requirements, status, postedBy) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                newJobs.title,
                newJobs.description,
                newJobs.companyId,
                newJobs.location,
                newJobs.salaryRange,
                newJobs.requirements,
                newJobs.status,
                newJobs.postedBy
            ]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error creating job:', error.message);
        throw error;
    }
};

export const updatedJob = async (id, body) => {
    try {
        const oldJobResult = await Client.query('SELECT * FROM job_listing WHERE id = $1', [id]);
        const oldJob = oldJobResult.rows[0];

        if (!oldJob) {
            throw new Error("Ish e'lon topilmadi");
        }

        const updatedJob = {
            title: body.title || oldJob.title,
            description: body.description || oldJob.description,
            companyId: body.companyid || oldJob.companyid, // lower case
            location: body.location || oldJob.location,
            salaryRange: JSON.stringify(body.salaryrange || oldJob.salaryrange),
            requirements: JSON.stringify(body.requirements || oldJob.requirements),
            status: body.status || oldJob.status,
            postedBy: body.postedby || oldJob.postedby,
            updatedAt: new Date().toISOString()
        };

        const query = `
            UPDATE job_listing SET 
                title = $1, 
                description = $2, 
                companyId = $3, 
                location = $4, 
                salaryRange = $5,
                requirements = $6,
                status = $7,
                postedBy = $8,
                updatedAt = $9
            WHERE id = $10
            RETURNING *`;

        const values = [
            updatedJob.title,
            updatedJob.description,
            updatedJob.companyId,
            updatedJob.location,
            updatedJob.salaryRange,
            updatedJob.requirements,
            updatedJob.status,
            updatedJob.postedBy,
            updatedJob.updatedAt,
            id
        ];

        const result = await Client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating job:", error.message);
        throw error;
    }
};


export const deleteJob = async (id) => {
    try {
        const result = await Client.query(
            'DELETE FROM job_listing WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return { message: "Jobs deleted successfully" }
    } catch (error) {
        console.error("Error deleting job:", error.message);
        throw error;
    }
};
