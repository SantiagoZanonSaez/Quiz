var models = require ('../models/models.js');


/*exports.question=function(req, res){
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
};*/

exports.load=function(req, res, next,quizId){
	console.log('-->llego a LOAD req='+req);
	console.log('-->llego a LOAD next='+next);
	console.log('-->llego a LOAD quizId='+quizId);
	models.Quiz.findById(quizId).then(function(quiz){
		if(quiz)
		{
			console.log('-->llego a LOAD hay quiz');
			req.quiz =quiz;
			next();
		}
		else{
			console.log('-->llego a LOAD no hay quiz');
			res.render('quizes/error.ejs', {title: 'Error', error: 'No existe quizId='+quizId});
		}
	}).catch(function(error){
			console.log('-->llego a CATCH LOAD' +error);
			next(error);
			})
};

exports.index=function(req, res){
	console.log('-->llego a INDEX');
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes, title: 'Índice de preguntas'});
	}).catch(function(error){
		console.log('-->llego a CATCH INDEX' +error);
		next(error);
		})	
};

exports.show=function(req, res){
	console.log('-->llego a SHOW req.quiz='+req.quiz);
	res.render('quizes/show', {quiz: req.quiz, title: 'Pregunta'});
};

exports.answer=function(req, res){
	console.log('-->llego a ANSWER');
	var respuesta='Incorrecto'
	if(req.query.respuesta===req.quiz.respuesta){
		respuesta= 'Correcta';
	}	
	res.render('quizes/answer', {quiz: req.quiz, respuesta: respuesta, title: 'Respuesta'});
};

