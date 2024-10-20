# Hansecom Frontend Challenge

## Project Overview

This project is designed to demonstrate the capabilities of a full-stack application using Vue.js for the frontend and a Node.js backend. The frontend leverages Tailwind CSS for styling, Axios for API requests, VueX for state management, and Vue Router for routing.

## Technology Stack

- **Styling**: Tailwind CSS & Prime Icons
- **API Requests**: Axios
- **State Management**: VueX
- **Routing**: Vue Router
- **Node Version**: 21.7.3

## Getting Started

### Prerequisites

- Ensure that you have Node.js version **20.2 or above** installed to avoid any errors and please do not forget to setup the database, frontend and create the env file.

### BACKEND SETUP

1. Clone the repository.
2. Run: npm install
3. Create a .env file and populate with the following:

TZ=UTC<br/>
PORT=3333<br/>
HOST=localhost<br/>
LOG_LEVEL=info<br/>
APP_KEY=qFlFnOw4MsxVSTajLUuothM9m_oPu7jp<br/>
NODE_ENV=development

4. Create a tmp folder in the root directory
5. Run: node ace migration:run
6. Run: node ace db:seed
7. Run: npm run dev

The development server for the back end should be up and running.

### FRONTEND SETUP

1. Setup the backend as instructed above.

2. Once inside the hansecom-frontend-challenge directory, navigate to the frontend project directory:
   ```bash
   cd hansecom-frontend-app
   ```
3. Install the necessary dependencies:
   ```bash
   npm install
   ```

### Running the Application

Now we Cd back into hansecom-frontend-challenge to run the backend.

1. Start the backend server:
   ```bash
   npm run dev
   ```
2. Once running, we open a new terminal tab cd into hansecom-frontend-app and start the frontend development server:
   ```bash
   npm run dev
   ```

### Access the Application

- **Frontend Host**: [http://localhost:5173/](http://localhost:5173/)
- **Backend Host**: [http://localhost:3333/](http://localhost:3333/)

## API Endpoints

### Users

- **Get all users**

  - **Method**: GET
  - **Endpoint**: `http://localhost:3333/users`

- **Create a new user**

  - **Method**: POST
  - **Endpoint**: `http://localhost:3333/users`
  - **Expected body**:
    ```json
    {
      "fullName": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **Get user by ID**

  - **Method**: GET
  - **Endpoint**: `http://localhost:3333/user/:id`

- **Update user**

  - **Method**: PUT
  - **Endpoint**: `http://localhost:3333/user/:id/edit`
  - **Expected body**:
    ```json
    {
      "fullName": "string",
      "email": "string"
    }
    ```

- **Delete user**
  - **Method**: DELETE
  - **Endpoint**: `http://localhost:3333/users/:id`

### Orders

- **Get orders by user ID**

  - **Method**: GET
  - **Endpoint**: `http://localhost:3333/orders/:id`

- **Create order**

  - **Method**: POST
  - **Endpoint**: `http://localhost:3333/orders`
  - **Expected body**:
    ```json
    {
      "user": "string",
      "orderDate": "date",
      "product": "string"
    }
    ```

- **Get order by ID**

  - **Method**: GET
  - **Endpoint**: `http://localhost:3333/order/:id`

- **Update order**

  - **Method**: PUT
  - **Endpoint**: `http://localhost:3333/order/:id/edit`
  - **Expected body**:
    ```json
    {
      "orderDate": "date",
      "product": "string"
    }
    ```

- **Delete order**
  - **Method**: DELETE
  - **Endpoint**: `http://localhost:3333/orders/:id`

## Notes while doing the challenge

- The endpoint for getting a user by ID had a typo in the readme; I was able to acess it by using `/user/:id`.
- The "create order" API expects the key `user` instead of `userId`.
- The `env.example` file has been removed. Please follow the README instructions.
