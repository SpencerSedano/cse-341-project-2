const mongodb = require("../config/db");
const { ObjectId } = require("mongodb");

const getAllQuotes = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const quotes = await db.collection("quotes").find().toArray();
    res.status(200).json(quotes);
  } catch (error) {
    console.error("Error getting all quotes:", error);
    res.status(500).json({
      message: "Error retrieving quotes",
      error: error.message,
    });
  }
};

const getSingleQuote = async (req, res) => {
  try {
    const quoteId = req.params.id;

    // Validate ObjectId
    if (!ObjectId.isValid(quoteId)) {
      return res.status(400).json({
        message: "Invalid quote ID format",
      });
    }

    const db = mongodb.getDatabase();
    const quote = await db
      .collection("quotes")
      .findOne({ _id: new ObjectId(quoteId) });

    if (!quote) {
      return res.status(404).json({
        message: "Quote not found",
      });
    }

    res.status(200).json(quote);
  } catch (error) {
    console.error("Error getting quote:", error);
    res.status(500).json({
      message: "Error retrieving quote",
      error: error.message,
    });
  }
};

const createQuote = async (req, res) => {
  try {
    const { text, author, category } = req.body;

    // Validation
    if (!text || !author) {
      return res.status(400).json({
        message: "Text and author are required fields",
      });
    }

    const newQuote = {
      text: text.trim(),
      author: author.trim(),
    };

    const db = mongodb.getDatabase();
    const result = await db.collection("quotes").insertOne(newQuote);

    if (result.acknowledged) {
      const createdQuote = await db
        .collection("quotes")
        .findOne({ _id: result.insertedId });
      res.status(201).json(createdQuote);
    } else {
      res.status(500).json({
        message: "Failed to create quote",
      });
    }
  } catch (error) {
    console.error("Error creating quote:", error);
    res.status(500).json({
      message: "Error creating quote",
      error: error.message,
    });
  }
};

const updateQuote = async (req, res) => {
  try {
    const quoteId = req.params.id;
    const { text, author, category } = req.body;

    // Validate ObjectId
    if (!ObjectId.isValid(quoteId)) {
      return res.status(400).json({
        message: "Invalid quote ID format",
      });
    }

    // Validation
    if (!text || !author) {
      return res.status(400).json({
        message: "Text and author are required fields",
      });
    }

    const updateData = {
      text: text.trim(),
      author: author.trim(),
    };

    const db = mongodb.getDatabase();
    const result = await db
      .collection("quotes")
      .updateOne({ _id: new ObjectId(quoteId) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Quote not found",
      });
    }

    if (result.modifiedCount === 1) {
      const updatedQuote = await db
        .collection("quotes")
        .findOne({ _id: new ObjectId(quoteId) });
      res.status(200).json(updatedQuote);
    } else {
      res.status(500).json({
        message: "Failed to update quote",
      });
    }
  } catch (error) {
    console.error("Error updating quote:", error);
    res.status(500).json({
      message: "Error updating quote",
      error: error.message,
    });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const quoteId = req.params.id;

    // Validate ObjectId
    if (!ObjectId.isValid(quoteId)) {
      return res.status(400).json({
        message: "Invalid quote ID format",
      });
    }

    const db = mongodb.getDatabase();
    const result = await db
      .collection("quotes")
      .deleteOne({ _id: new ObjectId(quoteId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Quote not found",
      });
    }

    res.status(200).json({
      message: "Quote deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting quote:", error);
    res.status(500).json({
      message: "Error deleting quote",
      error: error.message,
    });
  }
};

module.exports = {
  getAllQuotes,
  getSingleQuote,
  createQuote,
  updateQuote,
  deleteQuote,
};
