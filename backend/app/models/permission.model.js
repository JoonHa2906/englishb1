module.exports = (mongoose) => {
   var schema = mongoose.Schema(
      {
         email: { type: String, required: true },
         comment: { type: String, required: true },
         accept: { type: Boolean, default: false, required: true },
      },
      { timestamps: true },
   );

   schema.method('toJSON', function () {
      const { _id, ...object } = this.toObject();
      object.id = _id;
      return object;
   });

   const Permission = mongoose.model('permission', schema);
   return Permission;
};
