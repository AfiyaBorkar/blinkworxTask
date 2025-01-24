const { Pool } = require('pg');

// PostgreSQL Configuration
// const pool = new Pool({
//     user: 'postgres', // Replace with your username
//     host: 'localhost',
//     database: 'ecommerce', // Replace with your database name
//     password: 'root123', // Replace with your password
//     port: 5432, // Default PostgreSQL port
// });

// // Test the connection
// pool.connect((err, client, release) => {
//     if (err) {
//         console.error('Error connecting to PostgreSQL:', err.stack);
//     } else {
//         console.log('Connected to PostgreSQL');
//         release(); // Release the client back to the pool
//     }
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the connection string here
  ssl: { rejectUnauthorized: false }, // Necessary for connecting to Render's managed DB
});


module.exports = pool;
