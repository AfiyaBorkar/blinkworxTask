const express = require('express');
const router = express.Router();
const pool = require("../db/pool");

// Get all orders
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM PRODUCTS');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;