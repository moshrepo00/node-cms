const Question = require('../models/question');
const Survey = require('../models/survey');
const crypto = require("crypto");



exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json({
            response: 'Success',
            data: questions
        })
    } catch (e) {
        res.status(e.statusCode || 500).json({response: e.data});
    }
};
exports.createQuestion = async (req, res) => {
    const surveyId = req.body.surveyId;
    try {
        const question = new Question();
        await question.save();
        const survey = await Survey.findById(surveyId);
        survey.questions.push(question);
        await survey.save();
        res.status(201).json({
            response: 'Success',
            data: question
        })
    } catch (e) {
        res.status(e.statusCode || 500).json({response: e.data});
    }

};


exports.updateQuestion = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const title = req.body.name;
        const content = req.body.content;
        const author = req.body.author;
        const category = req.body.category;
        const scale = req.body.scale;
        const options = req.body.options;
        const timestamp = Math.floor(Date.now() / 1000);
        const question = await Question.findById(questionId);
        if (!question) {
            const error = new Error('No question found');
            error.statusCode = 404;
            throw error;
        }
        if (title) {
            question.title = title;
        }


        if (category) {
            question.category = category;
        }

        if (scale) {
            question.scale = scale;
        }

        if (content) {
            question.content = content;
        }

        if (options) {
            question.options = options;
        }

        if (author) {
            question.author = author;
        }
        question.lastUpdated = timestamp;
        const updatedQuestion = await question.save();
        res.status(200).json({response: 'Success', data: updatedQuestion})

    } catch (e) {
        res.status(e.statusCode || 500).json({response: e});
    }

};


exports.getQuestionById = async (req, res) => {
    const questionId = req.params.questionId;
    console.log('debugging question id: ', questionId);

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            const error = new Error('No survey found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({response: 'Success', data: question})

    } catch (e) {
        res.status(e.statusCode || 500).json({response: e});
    }

};


exports.deleteQuestion = async (req, res) => {
    const questionId = req.params.questionId;

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            const error = new Error('No question found');
            error.statusCode = 404;
            throw error;
        }
        const deletedQuestion = await Question.findByIdAndDelete(questionId);
        res.status(200).json({response: 'Success', data: deletedQuestion})

    } catch (e) {
        res.status(e.statusCode || 500).json({response: e.data});
    }

};


exports.createSurvey = async (req, res) => {
    const title = req.body.title;
    const token = crypto.randomBytes(10).toString("hex");
    const author = req.body.author;
    const created = Math.floor(Date.now() / 1000);
    // const questionId = req.body.questionId;
    try {
        // const question = await Question.findById(questionId);
        const survey = new Survey({title, token, author, created});
        // survey.questions.push(question);
        await survey.save();
        res.status(201).json({
            response: 'Success',
            data: survey
        })
    } catch (e) {
        res.status(e.statusCode || 500).json({response: e.data});
    }
};

exports.deleteSurvey = async (req, res) => {
    const surveyId = req.params.surveyId;
    try {
        const survey = await Survey.findById(surveyId);
        if (!survey) {
            const error = new Error('No survey found');
            error.statusCode = 404;
            throw error;
        }
        const deletedSurvey = await Survey.findByIdAndDelete(surveyId);
        res.status(200).json({ response: 'Success', data: surveyId })

    } catch (e) {
        res.status(e.statusCode || 500).json({ response: e.data });
    }

};


exports.updateSurvey = async (req, res) => {
    const surveyId = req.params.surveyId;
    const title = req.body.title;
    const questionId = req.body.questionId;
    const action = req.body.action;
    const question = await Question.findById(questionId);
    const survey = await Survey.findById(surveyId);
    try {
        if (!question) {
            const error = new Error('No question found');
            error.statusCode = 404;
            throw error;
        }

        if (!survey) {
            const error = new Error('No survey found');
            error.statusCode = 404;
            throw error;
        }
        if (title) {
            survey.title = title;
        }

        if (question) {
            if (action === 'add-question') {
                survey.questions.push(question);
            } else if (action === 'delete-question') {
                survey.questions.forEach((question, index, arr) => {
                    if (question._id === questionId) {
                        survey.question.splice(index, 1);
                    }
                })
            }
        }
        const updatedSurvey = await survey.save();
        res.status(200).json({response: 'Success', data: updatedSurvey})

    } catch (e) {
        res.status(e.statusCode || 500).json({response: e});
    }
}



exports.getSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find();
        res.status(200).json({
            response: 'Success',
            data: surveys
        })
    } catch (e) {
        res.status(e.statusCode || 500).json({ response: e.data });
    }
};


exports.getSurveyById = async (req, res) => {
    const surveyId = req.params.surveyId;
    const result = {};
    try {
        const survey = await Survey.findById(surveyId);
        if (!survey) {
            const error = new Error('No survey found');
            error.statusCode = 404;
            throw error;
        }

        result['questions'] = [];
        const arr = [];

        for (questionId of survey.questions) {
            const question = await Question.findById(questionId);
            if (question) {
                result['questions'].push(question);
            }
        }
      
        result['survey'] = survey;
        console.log('debugging result: ', result);
        res.status(200).json({ response: 'Success', data: result })
    } catch (e) {
        res.status(e.statusCode || 500).json({ response: e });
    }

};