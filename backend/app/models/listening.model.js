const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: { type: String, required: true },
      action: { type: String, required: true },
      content: { type: Object, required: true },
      question: { type: Array},
      topic: { type: String},
      url: { type: String, required: true },
      slug: { type: String, slug: 'title', unique: true },
      author: { type: String},
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const {_id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Listening = mongoose.model("listening", schema);
  return Listening;
};
