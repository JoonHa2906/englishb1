const db = require('../models');
const Matchimgvoca = db.matchimgvoca;

const axios = require('axios');
// Retrieve all Matchimgvocas from the database.
exports.findAll = (req, res) => {
    Matchimgvoca.find({}, ['title', 'slug', 'url', 'createdAt', 'author'], {
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

// Retrieve slug Matchimgvoca from the database.
exports.findSlug = (req, res) => {
    Matchimgvoca.findOne({ slug: req.params.slug })
        .then((data) => {
            if (!data) res.send({ success: false, message: 'Not found' });
            else res.send({ success: true, data: data });
        })
        .catch((err) => {
            res.status(500).send({ success: false, message: 'Error' });
        });
};

exports.findNew = (req, res) => {
    Matchimgvoca.find({}, ['title', 'slug', 'url', 'createdAt', 'author'], {
        skip: 0,
        limit: req.params.limit,
        sort: { _id: -1 },
    })
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

exports.findAuthor = (req, res) => {
    Matchimgvoca.find(
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
// exports.updatePicture = (req, res) => {
//     Matchimgvoca.findOne({ slug: req.params.slug })
//         .then((data) => {
//             if (!data) res.send({ success: false, message: 'Not found' });
//             else {
//                 var dataitem = [];
//                 data.data.map((item) => {
//                     dataitem.push({
//                         key: item.key,
//                         image: `https://firebasestorage.googleapis.com/v0/b/doantotnghiep-379304.appspot.com/o/game%2Fanimal%2F${item.key}.png?alt=media`,
//                     });
//                 });
//                 Matchimgvoca.findOneAndUpdate(
//                     { slug: req.params.slug },
//                     { data: dataitem },
//                     null,
//                 )
//                     .then((data) => {
//                         if (!data) {
//                             res.send({
//                                 success: false,
//                                 message: 'Not found ',
//                             });
//                         } else {
//                             res.send({
//                                 success: true,
//                                 message: `Update Avatar Success`,
//                             });
//                         }
//                     })
//                     .catch((err) => {
//                         res.send({ success: false, message: 'ERROR' });
//                     });
//             }
//         })
//         .catch((err) => {
//             res.status(500).send({ success: false, message: 'Error' });
//         });
// };
