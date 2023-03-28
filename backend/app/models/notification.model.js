module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      email: { type: String, required: true },
      content: { type: String, required: true },
      type: { type: String, required: true },
      link: { type: String},
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const {_id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Notification = mongoose.model("notification", schema);
  return Notification;
};
