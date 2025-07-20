const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Quotes API",
    description: "API documentation for the Quotes application",
    version: "1.0.0",
  },
  host: "localhost:3000",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  definitions: {
    Quote: {
      type: "object",
      properties: {
        _id: {
          type: "string",
          description: "Unique identifier for the quote",
        },
        text: {
          type: "string",
          description: "The quote text",
        },
        author: {
          type: "string",
          description: "The author of the quote",
        },
        category: {
          type: "string",
          description: "The category of the quote",
        },
        dateCreated: {
          type: "string",
          format: "date-time",
          description: "When the quote was created",
        },
      },
      required: ["text", "author"],
    },
    QuoteInput: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "The quote text",
        },
        author: {
          type: "string",
          description: "The author of the quote",
        },
        category: {
          type: "string",
          description: "The category of the quote",
        },
      },
      required: ["text", "author"],
    },
    Error: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "Error message",
        },
        status: {
          type: "integer",
          description: "HTTP status code",
        },
      },
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
