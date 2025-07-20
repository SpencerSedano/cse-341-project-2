const express = require("express");
const router = express.Router();

const quotesController = require("../controllers/quotes");

// #swagger.tags = ['Quotes']
// #swagger.summary = 'Get all quotes'
// #swagger.description = 'Retrieve a list of all quotes in the database'
// #swagger.responses[200] = { description: 'Successfully retrieved quotes', schema: { type: 'array', items: { $ref: '#/definitions/Quote' } } }
// #swagger.responses[500] = { description: 'Internal server error', schema: { $ref: '#/definitions/Error' } }
router.get("/", quotesController.getAllQuotes);

// #swagger.tags = ['Quotes']
// #swagger.summary = 'Get a single quote by ID'
// #swagger.description = 'Retrieve a specific quote using its unique identifier'
// #swagger.parameters['id'] = { in: 'path', description: 'Quote ID', required: true, type: 'string' }
// #swagger.responses[200] = { description: 'Successfully retrieved quote', schema: { $ref: '#/definitions/Quote' } }
// #swagger.responses[404] = { description: 'Quote not found', schema: { $ref: '#/definitions/Error' } }
// #swagger.responses[500] = { description: 'Internal server error', schema: { $ref: '#/definitions/Error' } }
router.get("/:id", quotesController.getSingleQuote);

// #swagger.tags = ['Quotes']
// #swagger.summary = 'Create a new quote'
// #swagger.description = 'Add a new quote to the database'
// #swagger.parameters['body'] = { in: 'body', description: 'Quote data', required: true, schema: { $ref: '#/definitions/QuoteInput' } }
// #swagger.responses[201] = { description: 'Quote created successfully', schema: { $ref: '#/definitions/Quote' } }
// #swagger.responses[400] = { description: 'Invalid input data', schema: { $ref: '#/definitions/Error' } }
// #swagger.responses[500] = { description: 'Internal server error', schema: { $ref: '#/definitions/Error' } }
router.post("/", quotesController.createQuote);

// #swagger.tags = ['Quotes']
// #swagger.summary = 'Update an existing quote'
// #swagger.description = 'Update a quote using its unique identifier'
// #swagger.parameters['id'] = { in: 'path', description: 'Quote ID', required: true, type: 'string' }
// #swagger.parameters['body'] = { in: 'body', description: 'Updated quote data', required: true, schema: { $ref: '#/definitions/QuoteInput' } }
// #swagger.responses[200] = { description: 'Quote updated successfully', schema: { $ref: '#/definitions/Quote' } }
// #swagger.responses[400] = { description: 'Invalid input data', schema: { $ref: '#/definitions/Error' } }
// #swagger.responses[404] = { description: 'Quote not found', schema: { $ref: '#/definitions/Error' } }
// #swagger.responses[500] = { description: 'Internal server error', schema: { $ref: '#/definitions/Error' } }
router.put("/:id", quotesController.updateQuote);

// #swagger.tags = ['Quotes']
// #swagger.summary = 'Delete a quote'
// #swagger.description = 'Remove a quote from the database using its unique identifier'
// #swagger.parameters['id'] = { in: 'path', description: 'Quote ID', required: true, type: 'string' }
// #swagger.responses[200] = { description: 'Quote deleted successfully' }
// #swagger.responses[404] = { description: 'Quote not found', schema: { $ref: '#/definitions/Error' } }
// #swagger.responses[500] = { description: 'Internal server error', schema: { $ref: '#/definitions/Error' } }
router.delete("/:id", quotesController.deleteQuote);

module.exports = router;
