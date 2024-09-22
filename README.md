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

3. Start the project with npm or docker commands:
  - With npm;
    ```bash
    npm start
    ```
  - With docker (**projectName** can named as you wish)
    ```bash
    docker build -t <projectName> .
    docker run -p 3000:3000 <projectName>
     ```

4. You can use Postman or likewise tools to test the project. When you are testing with these kind of tools, don't forget to add Authorization and token to headers. The token value should contains Bearer.
    ```bash
    Authorization:Bearer <TOKEN>

    ```  

## Other Commands

You can use this command to run unit tests.

  ```bash
  npm test
  ```