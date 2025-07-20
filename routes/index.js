const router = require("express").Router();

router.use("/", require("./swagger"));

// #swagger.tags = ['General']
// #swagger.summary = 'Welcome message'
// #swagger.description = 'Returns a simple welcome message'
// #swagger.responses[200] = { description: 'Welcome message', schema: { type: 'string', example: 'Hello World!' } }
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/quotes", require("./quotes"));

module.exports = router;
