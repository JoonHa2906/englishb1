const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const questionTest = new mongoose.Schema({
    title: { type: String, required: true },
    answer: [{ type: String }],
});
module.exports = (mongoose) => {
    var schema = mongoose.Schema(
        {
            title: { type: String, required: true },
            action: { type: String, required: true },
            paragraph: [{ type: String }],
            question: [{ type: questionTest, required: true }],
            topic: { type: String },
            url: { type: String, required: true },
            slug: { type: String, slug: 'title', unique: true },
            author: { type: String },
            timeStart: { type: Date, required: true },
            timeEnd: { type: Date, required: true },
            correct: [{ type: String }],
            type: String,
            timeLimit: { type: Number },
        },
        { timestamps: true },
    );

    schema.method('toJSON', function () {
        const { _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Testing = mongoose.model('testing', schema);
    return Testing;
};
