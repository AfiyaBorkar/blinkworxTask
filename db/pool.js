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
// Function to check database connection
async function checkDatabaseConnection() {
  try {
    const client = await pool.connect(); // Try to connect to the DB
    console.log('Database connected successfully!');
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('Error connecting to the database:', error,process.env.DATABASE_URL);
  }
}

// Call the function
checkDatabaseConnection();

module.exports = pool;
