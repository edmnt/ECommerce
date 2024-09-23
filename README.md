# E Commerce Project

This project is a backend API project for e-commerce.
This project's abilities are;
  - Basic Authentication (SignIn and SignUp).
  - Purchasing Order and Viewing User's Own Orders.
  - Viewing Services that provided. 

## Requirements

- Node.js v14 or newer versions.
- npm
- Docker Desktop (If you use docker commands to start the project)

## Setup And Start the Project

1. Clone the project:

    ```bash
    git clone https://github.com/edmnt/ECommerce.git
    cd ECommerce
    ```

2. Install all the dependencies:

    ```bash
    npm install
    ```
3. Please control your 3000 port is on process before start the project. You can use the command down below to control and kill the process on your port.
   ```bash
    lsof -i :3000
    kill -9 <PID>
    ```

4. Start the project with npm or docker commands:
  - With npm;
    ```bash
    npm start
    ```
  - With docker (You can change the project name)
    ```bash
    docker build -t ecommerceProject .
    docker run -p 3000:3000 eCommerceProject
     ```

5. You can use Postman or likewise tools to test the project. When you are testing with these kind of tools, don't forget to add Authorization and token to headers. The token value should contains Bearer.
    ```bash
    Authorization:Bearer <TOKEN>
    ```  

## Other Commands

You can use this command to run tests.


  ```bash
  npm test
  ```