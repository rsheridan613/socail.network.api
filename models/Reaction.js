const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    // reactionId
    // reactionBody
    // username
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {}
);

module.exports = Reaction;
