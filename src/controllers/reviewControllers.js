import * as reviewServices from "../services/reviewServices.js";

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewServices.getAllReviews();
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews;', error);
        res.status(500).json({ error: 'An error occurred on the server.' });
    }
};

export const getOneById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await reviewServices.getOneById(id);
        if (review) {
            res.json(review);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        console.error('Error fetching review;', error);
        res.status(500).json({ error: 'An error occurred on the server.' });
    }
};

export const createReview = async (req, res) => {
    const body = req.body;
    try {
        const review = await reviewServices.createReview(body);
        if (review) {
            res.status(201).send(review);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Error creating review");
    }
};

export const updateReview = async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    // UUID tekshirish
    if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(id)) {
        return res.status(400).json({ error: 'ID in invalid UUID format' });
    }

    try {
        const review = await reviewServices.updateReview(id, body);
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        console.log("Error updating review:", error);
        res.status(400).json({ error: 'Invalid review updated' });
    }
};

export const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await reviewServices.deleteReview(id);
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        console.log("Error deleting review:", error);
        res.status(400).json({ error: 'Invalid review deletion' });
    }
};
