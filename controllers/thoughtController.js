const { User, Thought } = require("../models");

module.exports = {
  // GET all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // GET a single thought by its _id
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { runValidators: true, new: true }
        );
      })
      .catch((err) => res.status(500).json(err));
  },

  // PUT to update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // DELETE to remove a thought by its _id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // POST to create a reaction stored in a single thought's reactions array field
  createReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) => res.json(reaction))
      .then((reactionData) => {
        return Thought.findOneAndUpdate(
          { _id: req.body.thoughtId },
          { $push: { reactions: reactionData._id } },
          { runValidators: true, new: true }
        );
      })
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction(req, res) {
    Reaction.findOneAndDelete({ _id: req.params.reactionId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No reaction with that ID" })
          : Reaction.deleteMany({ _id: { $in: thought.reactions } })
      )
      .catch((err) => res.status(500).json(err));
  },
};
