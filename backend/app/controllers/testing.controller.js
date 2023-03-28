const db = require('../models');
const Testing = db.testing;

// Retrieve all Testings from the database.
exports.findAll = (req, res) => {
    Testing.find({}, null, {
        sort: {
            _id: -1,
        },
    })
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    title: response.title,
                    createdAt: response.createdAt,
                    author: response.author,
                    slug: response.slug,
                    url: response.url,
                    timeStart: response.timeStart,
                    timeEnd: response.timeEnd,
                });
            });
            res.send(responses);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving testings.',
            });
        });
};

exports.findNew = (req, res) => {
    Testing.find({}, ['title', 'slug', 'url', 'createdAt', 'author'], {
        skip: 0,
        limit: req.params.limit,
        sort: { _id: -1 },
    })
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    title: response.title,
                    createdAt: response.createdAt,
                    author: response.author,
                    slug: response.slug,
                    url: response.url,
                });
            });
            res.send(responses);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.',
            });
        });
};

exports.findAuthor = (req, res) => {
    Testing.find(
        { author: req.params.email },
        ['title', 'slug', 'url', 'createdAt', 'author'],
        {
            sort: { _id: -1 },
        },
    )
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    title: response.title,
                    slug: response.slug,
                    createdAt: response.createdAt,
                    author: response.author,
                    url: response.url,
                });
            });
            res.send(responses);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.',
            });
        });
};

// Retrieve slug Testing from the database.
exports.findSlug = (req, res) => {
    Testing.findOne({ slug: req.params.slug })
        .then((data) => {
            if (!data) res.send({ success: false, message: 'Not found' });
            else
                res.send({
                    success: true,
                    title: data.title,
                    action: data.action,
                    picture: data.url,
                    author: data.author,
                    timeStart: data.timeStart,
                    timeEnd: data.timeEnd,
                    timeLimit: data.timeLimit,
                });
        })
        .catch((err) => {
            res.status(500).send({ success: false, message: 'Error' });
        });
};
