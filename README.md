```markdown
# Full Stack Developer Assessment - Order Management System

## Project Overview
An Order Management System built using the following technologies:  

- **Backend**: Node.js  
- **Frontend**: Next.js (a React.js framework)  
- **Styling**: Tailwind CSS  
- **Icons**: React Icon Library  
- **Database**: PostgreSQL  

---

## Requirements

### Order Management
This application helps manage orders, products, and their mappings with an efficient database structure.  

### Database
- PostgreSQL is used for storing user information and tasks.

### Backend
- Built with Node.js and Express.js for server-side logic.
- RESTful APIs are implemented for CRUD operations on tasks.

### Frontend
- Developed using Next.js.
- Features components for order display, creation, editing, and deletion.

### Styling
- Styled with Tailwind CSS, focusing on responsive design.

---

## Features
- Perform **Create, Read, Update, and Delete (CRUD)** operations for orders and products.  
- Responsive and modern UI built with **Tailwind CSS**.  
- Integration with a PostgreSQL database for data management.  
- Three key database tables:
  - `orders`
  - `products`
  - `orderproductmap`  

---

## Getting Started

### Prerequisites
Ensure the following software is installed on your machine:  
- **Node.js** (v16 or higher)  
- **PostgreSQL**  

### Installation
Follow these steps to set up the project:  

1. **Clone the repository**  
   Open your terminal and run:  
   ```bash
   git clone <GITHUB_REPOSITORY_URL>
   cd order-management-system
   ```

2. **Install dependencies**  
   Use npm to install all the required packages:  
   ```bash
   npm install
   ```

3. **Set up the database**  
   - Create a PostgreSQL database.  
   - Import the provided `.sql` file into your database.  
   - Update the `.env` file with your PostgreSQL database URL.

4. **Build the application**  
   ```bash
   npm run build
   ```

5. **Start the application**  
   Use the following command to start the application:  
   ```bash
   npm start
   ```

6. **Access the application**  
   Open your browser and navigate to:  
   [http://localhost:5000](http://localhost:5000)

---

## Credits
- **Developed by**: Afiya Borkar  
- **Deployed on Render**: [Order Management System](https://blinkworxtask.onrender.com/)
```  

