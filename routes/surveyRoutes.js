const express = require('express');

const router = express.Router();
const surveyController = require('../controllers/surveyController');
router.get('/questions', surveyController.getQuestions);
router.get('/questions/:questionId', surveyController.getQuestionById);
router.post('/questions', surveyController.createQuestion);
router.put('/questions/:questionId', surveyController.updateQuestion);
router.delete('/questions/:questionId', surveyController.deleteQuestion);
router.post('/survey', surveyController.createSurvey);
router.put('/survey/:surveyId', surveyController.updateSurvey);
router.get('/surveys', surveyController.getSurveys);
router.get('/surveys/:surveyId', surveyController.getSurveyById);
router.delete('/surveys/:surveyId', surveyController.deleteSurvey);


module.exports = router;
