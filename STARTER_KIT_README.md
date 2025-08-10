# React-PHP-MySQL Starter Kit

A clean, production-ready boilerplate for building React applications with PHP backend and MySQL database, featuring role-based authentication.

## Features

- **React 18** with Vite for fast development
- **PHP REST API** with MySQL database
- **Role-based authentication** (Admin/User)
- **Protected routes** with role checking
- **Context-based state management**
- **Responsive Bootstrap UI**
- **CORS-enabled API**
- **Password hashing** with PHP's password_hash()

## Quick Start

### Prerequisites
- Node.js 16+
- PHP 7.4+
- MySQL/MariaDB
- Web server (Apache/Nginx) or PHP built-in server

### 1. Frontend Setup
```bash
npm install
npm run dev
```

### 2. Backend Setup
1. Create MySQL database named `starter_app`
2. Import the provided SQL schema
3. Update database credentials in `API/database.php`
4. Update API URL in `src/config.jsx`

### 3. Database Schema
```sql
CREATE DATABASE starter_app;
USE starter_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('1', '3') DEFAULT '3', -- 1=Admin, 3=User
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create default admin user (password: admin123)
INSERT INTO users (username, email, password, role) VALUES 
('Admin', 'admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '1');
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── admin/          # Admin-only components
│   │   ├── user/           # User-specific components
│   │   ├── shared/         # Shared components
│   │   └── auth/           # Authentication components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   └── utils/              # Utility functions
├── API/
│   ├── auth/               # Authentication endpoints
│   ├── admin/              # Admin-only endpoints
│   ├── user/               # User endpoints
│   └── shared/             # Shared endpoints
└── public/                 # Static assets
```

## Default Credentials

- **Admin**: admin@example.com / admin123
- **User**: Register new account (defaults to user role)

## Role System

- **Role 1**: Admin - Full access to admin panel and user features
- **Role 3**: User - Access to user features only

## API Endpoints

### Authentication
- `POST /API/auth/login.php` - User login
- `POST /API/auth/register.php` - User registration
- `POST /API/auth/logout.php` - User logout

### Admin Only
- `GET /API/admin/users.php` - Get all users
- `PUT /API/admin/users.php` - Update user role
- `DELETE /API/admin/users.php` - Delete user

### User
- `GET /API/user/profile.php` - Get user profile
- `PUT /API/user/profile.php` - Update user profile

## Development

The starter kit includes:
- Hot module replacement with Vite
- ESLint configuration
- Bootstrap 5 for styling
- SweetAlert2 for notifications
- Axios for API calls
- React Router for navigation

## Customization

1. **Add new roles**: Update the role enum in database and ProtectedRoute component
2. **Add new features**: Create components in appropriate folders (admin/user/shared)
3. **Extend API**: Add new endpoints following the existing structure
4. **Styling**: Customize Bootstrap variables or add your own CSS

## Security Features

- Password hashing with PHP's password_hash()
- CORS headers configuration
- SQL injection prevention with prepared statements
- Role-based route protection
- Input validation and sanitization

## License

MIT License - feel free to use this starter kit for your projects!