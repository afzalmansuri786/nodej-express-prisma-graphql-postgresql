# Node.js Express Prisma GraphQL PostgreSQL

This repository contains a Node.js application built with Express, Prisma, GraphQL, and PostgreSQL. It serves as a starting point for developing GraphQL APIs using these technologies.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (version v16.17.0)
- PostgreSQL (version v3.15.2)

## Getting Started

To get started with the application, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/afzalmansuri786/nodej-express-prisma-graphql-postgresql.git
   ```
2. Navigate to the folder
    ``` bash
    cd nodej-express-prisma-graphql-postgresql 
    ```
3. Install dependencies:
    ``` bash
    npm i 
    ```
4. Initiate prisma:
    ``` bash
    npm run prisma:generate
    ```
5. Sync the prisma with database server:
    ``` bash
    npm run prisma:migrate
    ```
6. Update the dist with latest changes:
    ``` bash
    npm run build
    ```
7. Start the server:
    ``` bash
    npm run nodemon (for development mode - preferred)
                    or
    npm run start
    ```
    ###### You can access the graphql playground on ```http://localhost:3000/graphql```

## Resources

Here are some resources you may find helpful:

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [GraphQL Documentation](https://graphql.org/learn/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Conclusion

Congratulations! You have successfully set up and run the Node.js Express Prisma GraphQL PostgreSQL application. This serves as a solid foundation for building GraphQL APIs with an intuitive data layer using Prisma and a robust server with Express.

Feel free to explore and customize the application to suit your specific requirements. You can add more resolvers, create new models, or extend the GraphQL schema to meet your project needs. The modular structure of the codebase makes it easy to maintain and expand as your application grows.

If you encounter any issues or have any questions, please refer to the project's documentation or reach out to the repository's contributors for assistance.

Happy coding!


## Author

This project was developed by ```Afzal Mansuri```. You can connect with me on [LinkedIn](https://www.linkedin.com/in/afzal-mansuri-a34428174/) for any inquiries or collaborations.

If you have any suggestions or feedback, please feel free to reach out. I appreciate your support and contribution to this project.

Thank you for using the Node.js Express Prisma GraphQL PostgreSQL application!



## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify, distribute, and use it as per your needs.