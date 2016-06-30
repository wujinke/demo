//Importamos el paquete mysql
var mysql = require('mysql');

//Creamos la conexión a nuestra base de datos con los datos de acceso de cada uno
/* 
 ************************************************
    conexión con la base de datos MYSQL
 ************************************************
*/
conexionMySql = mysql.createConnection({
	host: '42.96.154.226',
	user: 'root',
	password: '123456',
	port: '3306',
	database:'example'
});

//creamos un objeto para ir almacenando todo lo que necesitemos
var personaModel = {};

//obtenemos todos los usuarios
personaModel.obtenerListaPersonas = function(user,callback){
    if (conexionMySql){
        conexionMySql.query("select * from user where user_name='"+user.username+"' and user_pwd ='"+user.password+"'",function(error, rows) {
            if(error){
            	console.log('Error Selecting: %s' , error);
                throw error;
            }
            else{
                console.log('Error ' , rows);
                callback(null, rows);
            }
        });
    }
}

//obtenemos una persona por su id
personaModel.selectId = function(pId,callback){
    if (conexionMySql) {
        var sql = 'SELECT * FROM user_sub WHERE user_id = ' + conexionMySql.escape(pId);
        conexionMySql.query(sql, function(error, row){
            if(error){
                throw error;
            }
            else{
                console.log('Error ' , row);
                callback(null, row);
            }
        });
    }
}
personaModel.selectCont = function(pId,callback){
    if (conexionMySql) {
        var sql = 'SELECT * FROM article WHERE title_id = ' + conexionMySql.escape(pId);
        conexionMySql.query(sql, function(error, row){
            if(error){
                throw error;
            }
            else{
                console.log('Error ' , row);
                callback(null,row);
            }
        });
    }
}

//añadir una nueva persona
personaModel.add = function(Data, callback){
    if (conexionMySql){
        conexionMySql.query('INSERT INTO user_sub set ? ',{user_id:Data.user_id,title:Data.title},function(error, result) {
            if(error){
                console.log("Error inserting : %s ",error);
                throw error;
            }
            else{
                //devolvemos la última id insertada
                callback(null,{"insertId":result.insertId});
            }
        });
    }
}
personaModel.reg = function(Data, callback){
    if (conexionMySql){
        conexionMySql.query('INSERT INTO user set ? ',{user_name:Data.username,user_pwd:Data.password,user_sex:Data.usersex,user_phone:Data.userPhone,user_email:Data.userEmail,options:Data.option},function(error, result) {
            if(error){
                console.log("Error inserting : %s ",error);
                throw error;
            }
            else{
                //devolvemos la última id insertada
                callback(null,{"insertId":result.insertId});
            }
        });
    }
}
personaModel.addarticle = function(Data, callback){
   // Data.setEncoding('utf8');
    Data=JSON.parse(Data);
    if (conexionMySql){

        conexionMySql.query('INSERT INTO article SET ?',{title_id:Data.title_id,content:Data.html},function(error, result) {
            if(error){
                console.log("Error inserting : %s ",error);
                throw error;
            }
            else{
                //devolvemos la última id insertada
                callback(null,{"insertId":result.insertId});
            }
        });
    }
}
//Actualizar datos persona
personaModel.actualizar = function(pPersonaData, callback){
    //console.log(userData); return;
    if(conexionMySql) {
        var vSql = 'UPDATE persona SET ' + 
        ' nombres = ' + conexionMySql.escape(pPersonaData.nombres) + ',' +  
        ' primer_apellido = ' + conexionMySql.escape(pPersonaData.primer_apellido)  + ',' +  
        ' segunbdo_apellido = ' + conexionMySql.escape(pPersonaData.segundo_apellido)  + ',' +  
        ' email = ' + conexionMySql.escape(pPersonaData.email)  + ',' +  
        ' telefono = ' + conexionMySql.escape(pPersonaData.telefono)  + ',' +  
        ' direccion = ' + conexionMySql.escape(pPersonaData.direccion)  + ',' +  
        ' WHERE id = ' + userData.id;
 
        conexionMySql.query(vSql, function(error, result) {
            if(error){
                throw error;
            }
            else{
                callback(null,{"msg":"success"});
            }
        });
    }
}
 
//Eliminar una persona
personaModel.eliminar = function(id, callback){
    if(conexionMySql){
        var sqlExists = 'SELECT * FROM persona WHERE id = ' + conexionMySql.escape(id);
        conexionMySql.query(sqlExists, function(err, row){
            //si existe la id del usuario a eliminar
            if(row){
                var sql = 'DELETE FROM persona WHERE id = ' + conexionMySql.escape(id);
                conexionMySql.query(sql, function(error, result){
                    if(error){
                        throw error;
                    }
                    else{
                        callback(null,{"msg":"deleted"});
                    }
                });
            }
            else {
                callback(null,{"msg":"notExist"});
            }
        });
    }
}

//Exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = personaModel;