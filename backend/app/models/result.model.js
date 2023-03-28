const mongoose = require('mongoose');

const questionTest = new mongoose.Schema({
    title: { type: String, required: true },
    answer: [{ type: String }],
});
module.exports = (mongoose) => {
    var schema = mongoose.Schema(
        {
            slug: { type: String, required: true },
            email: { type: String, required: true },
            question: [{ type: questionTest }],
            choice: [{ type: String }],
            timeBegin: { type: Date },
            score: { type: Number, default: 0 },
            timeComplete: { type: Number, default: -1 },
        },
        { timestamps: true },
    );

    schema.method('toJSON', function () {
        const { _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Result = mongoose.model('result', schema);
    return Result;
};
