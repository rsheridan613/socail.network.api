const { Schema, model } = require("mongoose");
const User = require("./User");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // username
    // reactions
  },
  {}
);

module.exports = Thought;
