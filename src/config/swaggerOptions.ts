import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my application",
    },
    servers: [
      {
        url: "http://localhost:4000", // Replace with your base URL
      },
    ],
  },
  apis: ["./dist/routes/*.js"],};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerDocs, swaggerOptions };
