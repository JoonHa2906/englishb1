const db = require('../models');
const Result = db.result;
const Testing = db.testing;

exports.findAll = (req, res) => {
    Result.find({ slug: req.params.slug }, null, {
        sort: {
            score: -1,
            timeComplete: 1,
            createAt: 1,
        },
    })
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    email: response.email,
                    score: response.score,
                    timeComplete: response.timeComplete,
                });
            });
            res.send(responses);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving results.',
            });
        });
};
exports.getCount = (req, res) => {
    Result.find({ slug: req.params.slug })
        .then((data) => {
            res.send({ count: data.length });
        })
        .catch((err) => {
            res.status(500).send({
                count: 0,
                message: err.message || 'Some error occurred while retrieving results.',
            });
        });
};
exports.top3 = (req, res) => {
    Result.find({ slug: req.params.slug }, null, {
        limit: 3,
        sort: {
            score: -1,
            timeComplete: 1,
            createAt: 1,
        },
    })
        .then((data) => {
            const responses = [];
            data.map((response) => {
                responses.push({
                    email: response.email,
                    score: response.score,
                    timeComplete: response.timeComplete,
                });
            });
            res.send(responses);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving results.',
            });
        });
};
exports.findEmail = (req, res) => {
    Result.findOne({ slug: req.params.slug, email: req.params.email })
        .then((data) => {
            if (!data) res.send({ success: false, message: 'Not found' });
            else
                res.send({
                    success: true,
                    timeComplete: data.timeComplete,
                    message: 'Registered',
                });
        })
        .catch((err) => {
            res.status(500).send({ success: false, message: 'Error' });
        });
};
const shuffledArr = (array) =>
    array
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
exports.create = (req, res) => {
    Promise.resolve().then(() => {
        Result.findOne({ email: req.body.email, slug: req.body.slug })
            .then((data) => {
                if (!data) {
                    const result = new Result({
                        email: req.body.email,
                        slug: req.body.slug,
                        choice: [
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                        ],
                    });
                    result
                        .save(result)
                        .then(() => {
                            res.send({
                                success: true,
                                message: `Đăng ký dự thi thành công. Hãy tham gia thi đúng giờ để không bỏ lỡ cuộc thi bạn nhé. <br/>Click để đến Bài thi thử`,
                            });
                        })
                        .then(() => {
                            Testing.findOne({ slug: req.body.slug })
                                .then((dataTesting) => {
                                    const questions = [];
                                    dataTesting.question.map((item) => {
                                        questions.push({
                                            title: item.title,
                                            answer: shuffledArr(item.answer),
                                        });
                                    });

                                    Result.findOneAndUpdate(
                                        { email: req.body.email, slug: req.body.slug },
                                        { question: questions },
                                        null,
                                    )
                                        .then((data) => {})
                                        .catch((err) => {});
                                })
                                .catch((err) => {});
                        })
                        .catch((err) => {
                            res.status(500).send({
                                success: false,
                                message: err.message || 'ERROR',
                            });
                        });
                } else
                    res.send({
                        success: false,
                        message: `Đăng ký dự thi không thành công. Tài khoản của bạn đã đăng kí dự thi rồi! Hãy tham gia thi đúng giờ để không bỏ lỡ cuộc thi bạn nhé`,
                    });
            })
            .catch((err) => {
                res.status(500).send({
                    success: false,
                    message: 'Error',
                });
            });
    });
};

exports.getExam = (req, res) => {
    var exam = {};
    Promise.resolve()
        .then(() => {
            Result.findOne({ email: req.body.email, slug: req.body.slug })
                .then((data) => {
                    exam = {
                        ...exam,
                        question: data.question,
                        timeBegin: data.timeBegin,
                        timeComplete: data.timeComplete,
                    };
                })
                .catch((err) => {});
        })
        .then(() => {
            Testing.findOne({ slug: req.body.slug })
                .then((dataTesting) => {
                    exam = {
                        ...exam,
                        paragraph: dataTesting.paragraph,
                        timeStart: dataTesting.timeStart,
                        timeEnd: dataTesting.timeEnd,
                        timeLimit: dataTesting.timeLimit,
                    };
                    res.send({
                        success: true,
                        ...exam,
                    });
                })
                .catch((err) => {});
        });
};
exports.updateTimeBegin = (req, res) => {
    Result.findOneAndUpdate(
        { email: req.body.email, slug: req.body.slug, timeBegin: null },
        { timeBegin: req.body.timeBegin },
        null,
    )
        .then((data) => {
            if (!data) {
                res.send({ success: false, message: 'Not found ' });
            } else {
                res.send({
                    success: true,
                    message: `Update timeBegin Success`,
                });
            }
        })
        .catch((err) => {
            res.send({ success: false, message: 'ERROR' });
        });
};

exports.getChoice = (req, res) => {
    Result.findOne({ email: req.body.email, slug: req.body.slug })
        .then((data) => {
            res.send({ choice: data.choice });
        })
        .catch((err) => {});
};
exports.updateChoice = (req, res) => {
    Result.findOneAndUpdate(
        { email: req.body.email, slug: req.body.slug },
        { choice: req.body.choice },
        null,
    )
        .then((data) => {
            if (!data) {
                res.send({ success: false, message: 'Not found ' });
            } else {
                res.send({
                    success: true,
                    message: `Update choice Success`,
                });
            }
        })
        .catch((err) => {
            res.send({ success: false, message: 'ERROR' });
        });
};
exports.submit = (req, res) => {
    Promise.resolve().then(() => {
        Testing.findOne({ slug: req.body.slug })
            .then((dataTesting) => {
                var score = 0;
                dataTesting.correct.map((item, index) => {
                    if (item === req.body.choice[index]) ++score;
                });
                Result.findOneAndUpdate(
                    { email: req.body.email, slug: req.body.slug, timeComplete: -1 },
                    {
                        timeComplete: req.body.timeComplete,
                        score: score * 0.25,
                    },
                    null,
                )
                    .then((data) => {
                        if (!data) {
                            res.send({
                                success: false,
                                message: `Submit Fail`,
                            });
                        } else {
                            res.send({
                                success: true,
                                message: `Submit Success`,
                            });
                        }
                    })
                    .catch((err) => {
                        res.send({
                            success: false,
                            message: `ERROR`,
                        });
                    });
            })
            .catch((err) => {
                res.send({
                    success: false,
                    message: `ERROR`,
                });
            });
    });
};
