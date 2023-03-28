const db = require('../models');
const User = db.user;
const Reading = db.reading;
const Listening = db.listening;
const Matchimgvoca = db.matchimgvoca;
const Testing = db.testing;

exports.findUser = (req, res) => {
    User.find(
        {
            $or: [
                { email: { $regex: req.params.key, $options: 'i' } },
                { name: { $regex: req.params.key, $options: 'i' } },
            ],
        },
        null,
        {
            limit: 5,
            sort: {
                name: -1,
            },
        },
    )
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    title: response.name,
                    slug: response.email,
                    picture: response.picture,
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
exports.findRead = (req, res) => {
    Reading.find(
        {
            $or: [
                { title: { $regex: req.params.key, $options: 'i' } },
                { action: { $regex: req.params.key, $options: 'i' } },
                { topic: { $regex: req.params.key, $options: 'i' } },
                { author: { $regex: req.params.key, $options: 'i' } },
            ],
        },
        null,
        {
            limit: 5,
            sort: {
                title: -1,
            },
        },
    )
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    title: response.title,
                    slug: response.slug,
                    picture: response.url,
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

exports.findListen = (req, res) => {
    Listening.find(
        {
            $or: [
                { title: { $regex: req.params.key, $options: 'i' } },
                { action: { $regex: req.params.key, $options: 'i' } },
                { topic: { $regex: req.params.key, $options: 'i' } },
                { author: { $regex: req.params.key, $options: 'i' } },
            ],
        },
        null,
        {
            limit: 5,
            sort: {
                title: -1,
            },
        },
    )
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    title: response.title,
                    slug: response.slug,
                    picture: response.url,
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

exports.findGame = (req, res) => {
    Matchimgvoca.find(
        {
            $or: [
                { title: { $regex: req.params.key, $options: 'i' } },
                { action: { $regex: req.params.key, $options: 'i' } },
                { topic: { $regex: req.params.key, $options: 'i' } },
                { author: { $regex: req.params.key, $options: 'i' } },
            ],
        },
        null,
        {
            limit: 5,
            sort: {
                title: -1,
            },
        },
    )
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    title: response.title,
                    slug: response.slug,
                    picture: response.url,
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

exports.findTest = (req, res) => {
    Testing.find(
        {
            $or: [
                { title: { $regex: req.params.key, $options: 'i' } },
                { action: { $regex: req.params.key, $options: 'i' } },
                { topic: { $regex: req.params.key, $options: 'i' } },
                { author: { $regex: req.params.key, $options: 'i' } },
            ],
        },
        null,
        {
            limit: 5,
            sort: {
                title: -1,
            },
        },
    )
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    title: response.title,
                    slug: response.slug,
                    picture: response.url,
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
exports.findUserAll = (req, res) => {
    User.find(
        {
            $or: [
                { email: { $regex: req.params.key, $options: 'i' } },
                { name: { $regex: req.params.key, $options: 'i' } },
            ],
        },
        null,
        {
            sort: {
                name: -1,
            },
        },
    )
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    title: response.name,
                    slug: response.email,
                    picture: response.picture,
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
exports.findReadAll = (req, res) => {
    Reading.find(
        {
            $or: [
                { title: { $regex: req.params.key, $options: 'i' } },
                { action: { $regex: req.params.key, $options: 'i' } },
                { topic: { $regex: req.params.key, $options: 'i' } },
                { author: { $regex: req.params.key, $options: 'i' } },
            ],
        },
        null,
        {
            sort: {
                title: -1,
            },
        },
    )
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    title: response.title,
                    slug: response.slug,
                    picture: response.url,
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

exports.findListenAll = (req, res) => {
    Listening.find(
        {
            $or: [
                { title: { $regex: req.params.key, $options: 'i' } },
                { action: { $regex: req.params.key, $options: 'i' } },
                { topic: { $regex: req.params.key, $options: 'i' } },
                { author: { $regex: req.params.key, $options: 'i' } },
            ],
        },
        null,
        {
            sort: {
                title: -1,
            },
        },
    )
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    title: response.title,
                    slug: response.slug,
                    picture: response.url,
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

exports.findGameAll = (req, res) => {
    Matchimgvoca.find(
        {
            $or: [
                { title: { $regex: req.params.key, $options: 'i' } },
                { action: { $regex: req.params.key, $options: 'i' } },
                { topic: { $regex: req.params.key, $options: 'i' } },
                { author: { $regex: req.params.key, $options: 'i' } },
            ],
        },
        null,
        {
            sort: {
                title: -1,
            },
        },
    )
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    title: response.title,
                    slug: response.slug,
                    picture: response.url,
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

exports.findTestAll = (req, res) => {
    Testing.find(
        {
            $or: [
                { title: { $regex: req.params.key, $options: 'i' } },
                { action: { $regex: req.params.key, $options: 'i' } },
                { topic: { $regex: req.params.key, $options: 'i' } },
                { author: { $regex: req.params.key, $options: 'i' } },
            ],
        },
        null,
        {
            sort: {
                title: -1,
            },
        },
    )
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    title: response.title,
                    slug: response.slug,
                    picture: response.url,
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
