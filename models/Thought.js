const { Schema, model } = require("mongoose");
// const User = require("./User");

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
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reactions: {
      type: Schema.Types.ObjectId,
      ref: "Reaction",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual to find number of reactions
thoughtSchema.virtuals("reactionCount").get(() => {
  return this.friends.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
