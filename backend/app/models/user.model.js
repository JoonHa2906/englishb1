module.exports = (mongoose) => {
    var schema = mongoose.Schema(
        {
            email: String,
            pass: String,
            picture: String,
            verification: Boolean,
            verificationCode: String,
            name: String,
            courses: String,
            permission: { type: String, default: 'user' },
        },
        { timestamps: true },
    );

    schema.method('toJSON', function () {
        const { _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model('user', schema);
    return User;
};
