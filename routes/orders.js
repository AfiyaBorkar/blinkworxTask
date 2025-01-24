const express = require('express');
const router = express.Router();
const pool = require("../db/pool");

// Get all orders
// Get all orders with product count
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                o.Id, 
                o.orderDescription, 
                o.createdAt, 
                COUNT(opm.productId) AS productCount
            FROM 
                Orders o
            LEFT JOIN 
                OrderProductMap opm ON o.Id = opm.orderId
            GROUP BY 
                o.Id
            ORDER BY 
                o.createdAt DESC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching orders with product count:', err.message);
        res.status(500).send('Server Error'+err);
    }
});


// Get order by ID
// Get order by ID with product count
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT 
                o.Id, 
                o.orderDescription, 
                o.createdAt, 
                array_agg(opm.productId) AS productIds,
                COUNT(opm.productId) AS productCount
            FROM 
                Orders o
            LEFT JOIN 
                OrderProductMap opm ON o.Id = opm.orderId
            WHERE 
                o.Id = $1
            GROUP BY 
                o.Id
        `;
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }   
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching order by ID with product count:', err.message);
        res.status(500).send('Server Error'+err);
    }
});



// Add a new order
router.post('/', async (req, res) => {
    try {
        const { orderDescription, productIds } = req.body;

        // Validation
        if (!orderDescription || orderDescription.trim() === '') {
            return res.status(400).json({ message: 'Order description is required.' });
        }

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ message: 'At least one product ID is required.' });
        }

        // Insert new order with createdAt timestamp
        const orderResult = await pool.query(
            'INSERT INTO Orders (orderDescription, createdAt) VALUES ($1, NOW()) RETURNING Id, createdAt',
            [orderDescription]
        );

        const { id: orderId, createdAt } = orderResult.rows[0];

        // Map the product IDs to the new order in the OrderProductMap table
        const orderProductMapQueries = productIds.map((productId) =>
            pool.query(
                'INSERT INTO OrderProductMap (orderId, productId) VALUES ($1, $2)',
                [orderId, productId]
            )
        );

        await Promise.all(orderProductMapQueries);

        // Return the newly created order information
        res.status(201).json({
            message: 'Order created successfully.',
            order: {
                id: orderId,
                description: orderDescription,
                createdAt,
                productCount: productIds.length,
            },
        });
    } catch (err) {
        console.error('Error adding new order:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// Update an order by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { orderDescription, productIds } = req.body;

        // Validation
        if (!orderDescription || orderDescription.trim() === '') {
            return res.status(400).json({ message: 'Order description is required.' });
        }

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ message: 'At least one product ID is required.' });
        }

        // Check if the order exists
        const checkOrder = await pool.query('SELECT * FROM Orders WHERE Id = $1', [id]);
        if (checkOrder.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Update the order description
        const updateOrderResult = await pool.query(
            'UPDATE Orders SET orderDescription = $1 WHERE Id = $2 RETURNING *',
            [orderDescription, id]
        );

        // Remove existing mappings for the order
        await pool.query('DELETE FROM OrderProductMap WHERE orderId = $1', [id]);

        // Insert new product mappings
        const orderProductMapQueries = productIds.map((productId) =>
            pool.query(
                'INSERT INTO OrderProductMap (orderId, productId) VALUES ($1, $2)',
                [id, productId]
            )
        );

        await Promise.all(orderProductMapQueries);

        res.status(200).json({
            message: 'Order updated successfully.',
            order: {
                orderId: id,
                orderDescription: updateOrderResult.rows[0].orderdescription,
                productIds,
            },
        });
    } catch (err) {
        console.error('Error updating order by ID:', err.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
});



// Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM ORDERS WHERE Id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully', deletedOrder: result.rows[0] });
    } catch (err) {
        console.error('Error deleting order by ID:', err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
