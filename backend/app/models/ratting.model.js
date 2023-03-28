const mongoose = require('mongoose');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      slug: { type: String, required: true },
      type: { type: String, required: true },
      score: { type: Number, required: true },
      email: { type: String, required: true },
      comment: { type: String}
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const {_id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Ratting = mongoose.model("ratting", schema);
  return Ratting;
};
