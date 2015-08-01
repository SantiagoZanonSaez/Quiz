var models = require ('../models/models.js');

exports.load=function(req, res, next,quizId){
	models.Quiz.findById(quizId).then(function(quiz){
		if(quiz)
		{
			req.quiz =quiz;
			next();
		}
		else{
			res.render('quizes/error.ejs', {title: 'Error', error: 'No existe quizId='+quizId});
		}
	}).catch(function(error){
			next(error);
			})
};

exports.index=function(req, res){
	
	if(req.query.search!=="" && req.query.search!==undefined){
		
		models.Quiz.findAll({where: {pregunta: {$like: '%' + req.query.search + '%'}}}).then(function(quizes){

			
			res.render('quizes/index.ejs', {quizes: quizes, title: 'Índice de preguntas buscadas'});
		}).catch(function(error){
				
			res.render('quizes/error.ejs', {title: 'Error', error: 'No existen quizes error='+error});
			})	
	}	
	else{
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes, title: 'Índice de preguntas'});
		}).catch(function(error){
			next(error);
			})	
	}
};

exports.show=function(req, res){
	res.render('quizes/show', {quiz: req.quiz, title: 'Pregunta'});
};

exports.answer=function(req, res){
	var respuesta='Incorrecto'
	if(req.query.respuesta===req.quiz.respuesta){
		respuesta= 'Correcta';
	}	
	res.render('quizes/answer', {quiz: req.quiz, respuesta: respuesta, title: 'Respuesta'});
};

