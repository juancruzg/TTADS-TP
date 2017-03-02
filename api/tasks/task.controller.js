var db = require("../../sequelize-mysql/models");

exports.getTasks = function(req, res) {
  var id = req.params.id;
  var promise;

  if (id)
    promise = db.Task.findAll({ include: [ db.User ], where: { id: id } });
  else
    promise = db.Task.findAll({ include: [db.User] });

  // Obtener usuarios de la DB
  promise.then(function (task) {
    // Creo un array para devolver los resultados
    var retorno = { tasks: [] };

    // Recorro el resultado obtenido de la DB y voy agregando al array de retorno
    task.forEach(function (each) {
      retorno.tasks.push(each);
    });

    // Si no hay ningún usuario devuelvo 404
    if (retorno.tasks.length === 0) {
      res.status(404);
      res.json({ "Message": "Task(s) not found" });
      return;
    }

    res.json(retorno);
  })
  .catch(function(error) {
    if(error) {
      res.status(500);
      res.json({ "Message": "El usuario no existe" });
      return;
    }
  });
}

exports.saveTask = function (req, res) {
  var id = req.body.id;
  var title = req.body.title;
  var done = req.body.done;
  var method = req.method;
  var userId = req.body.userId;

  console.log(req.body);

  if (method === "POST"){
    // Busca por id
    db.Task.findOne({ where: { id: id } }).then(function (task) {
      // Si no lo encuentra, devuelve 404 y un mensaje
      if(!task) {
        res.status(404);
        res.json({ "Message": "Task not found" });
        return;
      }

      // Si lo encuentra, actualiza los datos necesarios...
      task.title = title;

      if (done != undefined)
        task.done = done;

      // ...y guarda
      task.save().then(function (task) {
        res.json({ "Message": "Updated", "Task": task });
      })
      .catch(function(error) {
        if(error) {
          res.status(500);
          res.json({ "Message": "El usuario no existe" });
          return;
        }
      });
    })
    .catch(function(error) {
      if(error) {
        res.status(500);
        res.json({ "Message": "El usuario no existe" });
        return;
      }
    });
  }
  else if (method === "PUT") {
    // Intenta agregar un nuevo usuario
    db.Task.create({ title: title, UserId: userId, done: done }).then(function (task) {
      res.json({ "Message": "Created", "Task": task });
    })
    .catch(function(error) {
        if(error instanceof db.Sequelize.ForeignKeyConstraintError) {
          res.status(500);
          res.json({ "Message": "Error interno" });
          return;
        }
    });
  }
}

exports.deleteTask = function(req, res) {
  var id = req.params.id;

  db.Task.destroy({ where: { id: id } }).then(function(destroyedRows) {
    if (destroyedRows > 0)
      res.json({ "Message": "Deleted", "Rows affected": destroyedRows });
    else {
      res.status(404);
      res.json({ "Message": "Task not found" });
      return;
    }
  })
  .catch(function(error) {
    if(error) {
      res.status(500);
      res.json({ "Message": "El usuario no existe" });
      return;
    }
  });
}

exports.searchTasks = function(req, res) {
  var id = req.query.id;
  var title = req.query.titulo;

  var query = {};

  // Validaciones
  if (id != null)
    query.id = id;

  if (title != null && title != "")
    query.title = { $like: "%" + title + "%" };

  // Busco los usuarios en la DB
  db.Task.findAll( { include: [db.User], where: query} ).then(function (task) {
    // Creo un array para devolver los resultados
    var retorno = { tasks: [] };

    // Recorro el resultado obtenido de la DB y voy agregando al array de retorno
    task.forEach(function (each) {
      retorno.tasks.push(each);
    });

    // Si no hay ningún usuario devuelvo 404
    if (retorno.tasks.length === 0) {
      res.status(404);
      res.json({ "Message": "Task(s) not found" });
      return;
    }

    res.json(retorno);
  })
  .catch(function(error) {
    if(error) {
      res.status(500);
      res.json({ "Message": "El usuario no existe" });
      return;
    }
  });
}
