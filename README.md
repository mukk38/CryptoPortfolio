# CryptoPortfolio

A modern cryptocurrency portfolio management application built with React and a Spring Boot backend. Designed to help users track their coin investments, monitor real-time prices, and manage their assets efficiently.

## Features

- Real-time portfolio value tracking
- Coin selection and purchase functionality
- Interactive charts to visualize portfolio data
- User-friendly interface for easy navigation
- Backend API for user authentication, portfolio management, and transactions

## Technologies Used

### Frontend:
- **React** - For building the user interface
- **Axios** - For making API requests
- **Recharts** - For data visualization (charts)
- **Tailwind CSS** - For styling

### Backend:
- **Spring Boot** - Backend server for handling user requests and managing portfolio data
- **H2 Database** - In-memory database for storing user data and portfolio information
- **JWT Authentication** - For secure user login and registration

## Backend API Endpoints

### User Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login an existing user
- **POST** `/api/auth/logout` - Logout the current user

### Portfolio
- **GET** `/api/portfolio` - Get the current user's portfolio and balance
- **POST** `/api/portfolio/buy` - Buy a coin and add it to the portfolio
- **POST** `/api/portfolio/sell` - Sell a coin from the portfolio

## Backend Setup

### 1. Clone the repository

First, clone the repository:

```bash
git clone https://github.com/mukk38/CryptoPortfolio.git
cd CryptoPortfolio
```
### 2. Setup Backend 
The backend is developed using Spring Boot.

Make sure you have JDK 17+ installed.
Configuration
The backend uses H2 Database (an in-memory database) by default, so no external database setup is required. However, you can configure a different database if needed.

To configure H2, you don't need to modify the application, as Spring Boot automatically connects to H2 and creates the schema at runtime.

You can access the H2 database console by visiting:
``` bash
http://localhost:8080/h2-console
```
Use the following settings to log into the H2 console:
#### JDBC URL: jdbc:h2:mem:testdb
####  User: sa
#### Password: (leave empty)

#### Build the Project
To build the Spring Boot application, run the following command from the backend directory:

```bash
./mvnw clean install
```

#### Run the Backend
Start the Spring Boot application:
```
./mvnw spring-boot:run
```

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```
2. Install the frontend dependencies:
```bash
npm install
```
3. Start the React development server:
```bash
npm run dev
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.