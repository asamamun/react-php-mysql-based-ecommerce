# React E-Commerce Application with PHP Backend

A full-stack e-commerce application built with React frontend and PHP backend, featuring user authentication, product management, shopping cart, and order processing.

## Architecture Overview

This application follows a client-server architecture:
- **Frontend**: React.js with Vite for fast development and building
- **Backend**: PHP REST API with MySQL database
- **Communication**: HTTP requests using Axios for API calls
- **State Management**: React Context API for authentication and cart management

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **SweetAlert2** - Beautiful alerts and notifications
- **Vite** - Build tool and development server
- **ESLint** - Code linting

### Backend
- **PHP** - Server-side scripting
- **MySQL** - Database management
- **CORS Headers** - Cross-origin resource sharing

## Project Structure

```
├── src/                          # React frontend source
│   ├── components/               # React components
│   │   ├── Home.jsx             # Homepage component
│   │   ├── Login.jsx            # User login
│   │   ├── Registration.jsx     # User registration
│   │   ├── Products.jsx         # Product listing
│   │   ├── ProductDetails.jsx   # Individual product view
│   │   ├── ProductAdd.jsx       # Add new product (admin)
│   │   ├── Cart.jsx             # Shopping cart
│   │   ├── Orders.jsx           # Order history
│   │   ├── OrderDetails.jsx     # Individual order view
│   │   ├── PlaceOrder.jsx       # Checkout process
│   │   └── Navbar.jsx           # Navigation component
│   ├── AuthContext.jsx          # Authentication state management
│   ├── CartContext.jsx          # Shopping cart state management
│   ├── config.jsx               # API configuration
│   └── App.jsx                  # Main application component
├── API/                         # PHP backend
│   ├── database.php             # Database connection & CORS headers
│   ├── login.php                # User authentication endpoint
│   ├── registration.php         # User registration endpoint
│   ├── products.php             # Product listing endpoint
│   ├── getproductdetails.php    # Single product details
│   ├── addproduct.php           # Add new product
│   ├── deleteproduct.php        # Delete product
│   ├── orders.php               # Order creation endpoint
│   ├── getorders.php            # User orders retrieval
│   ├── getorderdetails.php      # Order details retrieval
│   ├── getCategories.php        # Product categories
│   ├── getSubcategories.php     # Product subcategories
│   └── productimages/           # Product image storage
└── public/                      # Static assets
```

## How It Works

### 1. Frontend-Backend Communication

The React frontend communicates with the PHP backend through RESTful API calls:

```javascript
// API configuration (src/config.jsx)
const API_URL = 'http://localhost/ROUND64/react/react-php-mysql-based-ecommerce/API/';
```

### 2. Authentication Flow

**Login Process:**
1. User enters credentials in React login form
2. Frontend sends POST request to `API/login.php`
3. PHP validates credentials against MySQL database
4. On success, PHP returns user data and status
5. React stores auth data in localStorage and Context
6. User is redirected to homepage

```javascript
// AuthContext.jsx - Login function
const login = async (email, password) => {
  const response = await fetch(`${API_URL}login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  // Store in state and localStorage
};
```

### 3. Product Management

**Product Listing:**
1. React component requests products from `API/products.php`
2. PHP queries database with JOIN operations for categories
3. Returns JSON array of products with full details
4. React renders products in grid layout

**Product Details:**
- Individual product pages fetch detailed information
- Images are served from `API/productimages/` directory
- Product URLs include image paths from backend

### 4. Shopping Cart System

**Cart Management:**
- Cart state managed by React Context (`CartContext.jsx`)
- Cart data persisted in localStorage
- Add/remove operations update both state and storage
- Quantity management for duplicate items

```javascript
// CartContext.jsx - Add to cart logic
const addToCart = (item) => {
  const existingItem = cart.find(itemInCart => itemInCart.id == item.id);
  if (existingItem) {
    // Update quantity
  } else {
    // Add new item
  }
};
```

### 5. Order Processing

**Checkout Flow:**
1. User reviews cart and enters shipping/payment details
2. Frontend sends complete order data to `API/orders.php`
3. PHP processes order in two steps:
   - Insert order record in `orders` table
   - Insert each cart item in `orderdetails` table
4. Database transaction ensures data consistency
5. Cart is cleared on successful order placement

### 6. Database Schema

The application uses several MySQL tables:
- **users**: User accounts with roles (customer/admin)
- **categories**: Product categories
- **subcategories**: Product subcategories
- **products**: Product information with foreign keys
- **orders**: Order headers with user and payment info
- **orderdetails**: Individual order items

### 7. CORS Configuration

PHP backend includes CORS headers for cross-origin requests:

```php
// database.php - CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
```

## Setup Instructions

### Prerequisites
- Node.js and npm
- PHP 7.4+ with MySQL support
- MySQL/MariaDB server
- Web server (Apache/Nginx) or PHP built-in server

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
1. Configure database connection in `API/database.php`
2. Create MySQL database named `web1ecomm`
3. Set up required tables (users, products, categories, etc.)
4. Update API URL in `src/config.jsx` to match your server
5. Ensure `API/productimages/` directory has write permissions

### Database Configuration
```php
// API/database.php
$conn = new mysqli("localhost", "root", "", "web1ecomm");
```

## Key Features

- **User Authentication**: Login/registration with password hashing
- **Product Catalog**: Browse products by categories and subcategories
- **Shopping Cart**: Add/remove items with quantity management
- **Order Management**: Place orders and view order history
- **Admin Features**: Add/delete products (role-based access)
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Context-based state management
- **Secure API**: CORS-enabled PHP endpoints with input validation

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/login.php` | POST | User authentication |
| `/registration.php` | POST | User registration |
| `/products.php` | GET | Get all products |
| `/getproductdetails.php` | GET | Get single product |
| `/addproduct.php` | POST | Add new product |
| `/deleteproduct.php` | DELETE | Delete product |
| `/orders.php` | POST | Create new order |
| `/getorders.php` | GET | Get user orders |
| `/getorderdetails.php` | GET | Get order details |
| `/getCategories.php` | GET | Get product categories |
| `/getSubcategories.php` | GET | Get subcategories |

## Development

The application uses Vite for fast development with hot module replacement. The React frontend runs on port 3000 (default) while the PHP backend serves from your web server (typically port 80/443).

For development, ensure both frontend and backend servers are running, and the API URL in `config.jsx` points to your PHP server location.
