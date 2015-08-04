var path=require('path');
if(process.env && process.env.DATABASE_URL!==undefined){
	console.log("CARGANDO CONFIGURACION BD LOCAL");
	var url= process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
	var DB_name	=(url[6]||null);
	var user	=(url[2]||null);
	var pwd		=(url[3]||null);
	var protocol=(url[1]||null);
	var dialect	=(url[1]||null);
	var port	=(url[5]||null);
	var host	=(url[4]||null);
	var storage = process.env.DATABASE_STORAGE;
}
else{
	console.log("CARGANDO CONFIGURACION BD HEROKU");
	
	var url="postgres://nkqzyzjoczhmpu:isznn16pOlPUu6JV_SSlr0yRQ-@ec2-50-19-233-111.compute-1.amazonaws.com:5432/dcmp0q2bhjbi50".match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
	for (var i=0; i<url.length; i++) {
        console.log('VALOR '+i+'='+url[i]);
    }
	
	var DB_name	=(url[6]||null);
	var user	=(url[2]||null);
	var pwd		=(url[3]||null);
	var protocol=(url[1]||null);
	var dialect	=(url[1]||null);
	var port	=(url[5]||null);
	var host	=(url[4]||null);
}
//Cargar Módulo ORM
var Sequelize= require('sequelize');

//Usar BBDD SQLite o Postgres
var sequelize =new Sequelize(DB_name, user, pwd,
	{dialect: protocol, 
	protocol: protocol,
	port: port,
	host: host,
	storage: storage,	// solo SQLite (.env)
	omitNull: true,
ssl:true	//solo Postgres
	}
);

/*//Cargar Módulo ORM
var Sequelize= require('sequelize');

//Usar BBDD SQLite
var sequelize =new Sequelize(null, null, null,
					{dialect: "sqlite", storage: "quiz.sqlite"}
					);
*/					
//Importar la definición de la table Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname, 'comment'));

//Definimos la relación por 1-N (por cada Quiz N comentarios)
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//exportar definición de tabla Quiz
exports.Quiz = Quiz;
exports.Comment = Comment;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
	//then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function (count){
		if(count === 0){ 
			//la tabla se inicializa sólo si está vacía
			Quiz.create({pregunta: 'Capital de Italia',
						respuesta: 'Roma',
						tema: 'otro'
			});
			Quiz.create({pregunta: 'Capital de Portugal',
						respuesta: 'Lisboa',
						tema: 'otro'
			})
			.then(function(){console.log('Base de datos inicializada')});
		};
	});
});