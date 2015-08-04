var models = require ('../models/models.js');

exports.new=function(req, res){
	res.render('comments/new.ejs', {quizid: req.params.quizId, errors:[] });
};

exports.create=function(req, res){

	var comment = models.Comment.build({
		texto: req.body.comment.texto,
		QuizId: req.params.quizId
	});
	
	comment.validate().then(function(err){
		if(err){
			console.log("LLEGO COMMENT CREATE ERROR");
			res.render('comment/new', {comment: comment, errors: err.errors});
		}
		else{
			comment.save().then(function(){
				console.log("LLEGO COMMENT CREATE REDIRECCION");
				res.redirect('/quizes/'+req.params.quizId);
			});
		}
	}).catch(function(error){
			next(error);
			});
};
