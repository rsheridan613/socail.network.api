const { Schema, model } = require("mongoose");
// const Thought = require("./Thought");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [this],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual to find number of friends
userSchema.virtuals("friendCount").get(() => {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
