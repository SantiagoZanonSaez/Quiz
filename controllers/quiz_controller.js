exports.question=function(req, res){
	res.render('quizes/question', {pregunta: 'Capital de Italia', title: 'Pregunta'});
};
exports.answer=function(req, res){
	if(req.query.respuesta==='Roma'){
		res.render('quizes/answer', {respuesta: 'Correcto', title: 'Respuesta'});
	}
	else{
		res.render('quizes/answer', {respuesta: 'Incorrecto', title: 'Respuesta'});
	}
};
// GET /quizes/author
exports.author = function(req,res) {
	res.render('/author', {title: 'Autor'});
};