module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: {type: String, require},
        caption: {type: String, require},
        action: {type: String, require},
        color: {type: String, require},
        backgroundImage: String,
        url: String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const {_id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Slider = mongoose.model("slider", schema);
    return Slider;
  };
  