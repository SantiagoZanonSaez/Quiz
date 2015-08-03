var models = require ('../models/models.js');

exports.load=function(req, res, next,quizId){
	models.Quiz.findById(quizId).then(function(quiz){
		if(quiz)
		{
			req.quiz =quiz;
			next();
		}
		else{
			console.log("LLEGO RENDER ERROR");
			res.render('quizes/error.ejs', {error: 'No existe quizId='+quizId, errors:[]});
		}
	}).catch(function(error){
			next(error);
			})
};

exports.index=function(req, res){
	
	if(req.query.search!=="" && req.query.search!==undefined){
		
		models.Quiz.findAll({where: {pregunta: {$like: '%' + req.query.search + '%'}}}).then(function(quizes){

			console.log("LLEGO INDEX RENDER ");
			res.render('quizes/index.ejs', {quizes: quizes, errors:[]});
		}).catch(function(error){
			
			console.log("LLEGO INDEX RENDER CATCH");			
			res.render('quizes/error.ejs', {error: 'No existen quizes error='+error, errors:[] });
			})	
	}	
	else{
		models.Quiz.findAll().then(function(quizes){
			console.log("LLEGO INDEX FINDALL RENDER ");
			res.render('quizes/index.ejs', {quizes: quizes, errors:[]});
		}).catch(function(error){
			next(error);
			})	
	}
};

exports.show=function(req, res){
	console.log("LLEGO SHOW");
	res.render('quizes/show', {quiz: req.quiz, errors:[] });
};

exports.answer=function(req, res){
	var respuesta='Incorrecto'
	if(req.query.respuesta===req.quiz.respuesta){
		respuesta= 'Correcta';
	}	
	res.render('quizes/answer', {quiz: req.quiz, respuesta: respuesta, errors:[] });
};

exports.new=function(req, res){
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
	);
	res.render('quizes/new', {quiz: quiz, title: 'Crear Pregunta', errors:[] });
};

exports.create=function(req, res){
	console.log("LLEGO CREATE REDIRECCION req.body.quiz="+req.body.quiz);
	var quiz = models.Quiz.build(req.body.quiz);
	
	quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new', {quiz: quiz, errors: err.errors, errors:[]});
		}
		else{
			quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
				console.log("LLEGO CREATE REDIRECCION");
				res.redirect('/quizes');
			});
		}
	});
};

exports.edit=function(req, res){
	console.log("LLEGO EDIT req.quiz="+req.quiz);
	var quiz =req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors:[] });
};

exports.update=function(req, res){
	/*console.log("LLEGO UPDATE req.body.quiz="+req.body.quiz.pregunta);
	console.log("LLEGO UPDATE  req.body.quiz="+req.body.quiz.respuesta);
	console.log("LLEGO UPDATE req.quiz.id="+req.quiz.id);*/
	req.quiz.respuesta=req.body.quiz.respuesta;
	req.quiz.pregunta=req.body.quiz.pregunta;
	req.quiz.tema=req.body.quiz.tema;

	req.quiz.validate().then(function(err){
		if(err){
			res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
		}
		else{
			req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
				console.log("LLEGO UPDATE REDIRECCION");
				res.redirect('/quizes');
			});
		}
	});
};

exports.destroy=function(req, res){
	console.log("LLEGO DESTROY req.quiz="+req.quiz);
	req.quiz.destroy().then(function(){;
		res.redirect('/quizes'); 
	}).catch(function(error){
			console.log("LLEGO DESTROY CATCH");
			next(error);
			});
};