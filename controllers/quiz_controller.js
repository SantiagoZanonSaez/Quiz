var models = require ('../models/models.js');

exports.question=function(req, res){
	//res.render('quizes/question', {pregunta: 'Capital de Italia', title: 'Pregunta'});
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question', {pregunta: quiz[0].pregunta, title: 'Pregunta'});
	})
	
};
exports.answer=function(req, res){
	models.Quiz.findAll().then(function(quiz){
		if(req.query.respuesta===quiz[0].respuesta){
			res.render('quizes/answer', {respuesta: 'Correcto', title: 'Respuesta'});
		}
		else{
			res.render('quizes/answer', {respuesta: 'Incorrecto', title: 'Respuesta'});
		}
	})
};
