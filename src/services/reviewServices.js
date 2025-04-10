import Client from "../db/index.js";

export const getAllReviews = async () => {
    try {
        const result = await Client.query('SELECT * FROM review');
        return result.rows;
    } catch (error) {
        console.log('Error fetching reviews;', error);
        throw error;
    }
};

export const getOneById = async (id) => {
    try {
        const result = await Client.query('SELECT * FROM review WHERE id = $1', [id]);
        return result.rows;
    } catch (error) {
        console.log('Error fetching review;', error);
        throw error;
    }
};

export const createReview = async (body) => {
    try {
        console.log("Kelayotgan ma'lumot", body);

        const { companyid, userid, rating, comment, status } = body;

        if (!companyid || !userid || !rating || !status) {
            throw new Error("Sharh yaratishda maydonlar to'liq emas!");
        }

        const result = await Client.query(
            `INSERT INTO review (companyid, userid, rating, comment, status, createdat, updatedat) 
             VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
             RETURNING *`, 
            [companyid, userid, rating, comment || null, status]
        );

        return result.rows[0];
    } catch (error) {
        console.error("Error in createReview:", error.message);
        throw error;
    }
};

export const updateReview = async (id, body) => {
    try {
        const oldReviewResult = await Client.query('SELECT * FROM review WHERE id = $1', [id]);
        const oldReview = oldReviewResult.rows[0];

        if (!oldReview) {
            throw new Error("Sharh topilmadi");
        }

        // Eski yoki yangi qiymatlar
        const companyId = body.companyId || oldReview.companyid;
        const userId = body.userId || oldReview.userid;
        const rating = body.rating || oldReview.rating;
        const comment = body.comment || oldReview.comment;
        const status = body.status || oldReview.status;

        if (rating < 1 || rating > 5) {
            throw new Error("Rating 1 va 5 orasida bo'lishi kerak!");
        }

        const query = `
            UPDATE review SET 
                companyid = $1,
                userid = $2,
                rating = $3,
                comment = $4,
                status = $5,
                updatedat = NOW()
            WHERE id = $6
            RETURNING *;
        `;

        const values = [companyId, userId, rating, comment, status, id];
        const result = await Client.query(query, values);

        return result.rows[0];

    } catch (error) {
        console.error("Error in updateReview:", error.message);
        throw error;
    }
};

export const deleteReview = async (id) => {
    try {
        const result = await Client.query(
            'DELETE FROM review WHERE id = $1 RETURNING *;',
            [id]
        );

        if (result.rows.length === 0) {
            return null; // if not found return 0
        }

        return result.rows[0]; // Deleted review
    } catch (error) {
        console.error("Error in deleteReview:", error.message);
        throw error;
    }
};
