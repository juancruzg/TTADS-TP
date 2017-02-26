var db = require("../../sequelize-mysql/models");

exports.getUsers = function(req, res) {
  var id = req.params.id;
  var promise;

  if (id)
    promise = db.User.findAll({ where: { id: id } });
  else
    promise = db.User.findAll();

  // Obtener usuarios de la DB
  promise.then(function (user) {
    // Creo un array para devolver los resultados
    var retorno = { usuarios: [] };

    // Recorro el resultado obtenido de la DB y voy agregando al array de retorno
    user.forEach(function (each) {
      retorno.usuarios.push(each);
    });

    // Si no hay ningún usuario devuelvo 404
    if (retorno.usuarios.length === 0) {
      res.status(404);
      res.json({ "Message": "User(s) not found" });
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

exports.saveUser = function (req, res) {
  var id = req.body.id;
  var username = req.body.nombre;
  var method = req.method;

  if (method === "POST"){
    // Busca por id
    db.User.findOne({ where: { id: id } }).then(function (user) {
      // Si no lo encuentra, devuelve 404 y un mensaje
      if(!user) {
        res.status(404);
        res.json({ "Message": "User not found" });
        return;
      }

      // Si lo encuentra, actualiza los datos necesarios...
      user.username = username;

      // ...y guarda
      user.save().then(function (user) {
        res.json({ "Message": "Updated", "User": user });
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
    db.User.create({ username: username }).then(function (user) {
      res.json({ "Message": "Created", "User": user });
    })
    .catch(function(error) {
      if(error) {
        res.status(500);
        res.json({ "Message": "El usuario no existe" });
        return;
      }
    });
  }
}

exports.deleteUser = function(req, res) {
  var id = req.params.id;

  db.User.destroy({ where: { id: id } }).then(function(destroyedRows) {
    if (destroyedRows > 0)
      res.json({ "Message": "Deleted", "Rows affected": destroyedRows });
    else {
      res.status(404);
      res.json({ "Message": "User not found" });
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

exports.searchUsers = function(req, res) {
  var id = req.query.id;
  var username = req.query.nombre;

  var query = {};

  // Validaciones
  if (id != null)
    query.id = id;

  if (username != null)
    query.username = { $like: "%" + username + "%" };

  // Busco los usuarios en la DB
  db.User.findAll({ where: query}).then(function (user) {
    // Creo un array para devolver los resultados
    var retorno = { usuarios: [] };

    // Recorro el resultado obtenido de la DB y voy agregando al array de retorno
    user.forEach(function (each) {
      retorno.usuarios.push(each);
    });

    // Si no hay ningún usuario devuelvo 404
    if (retorno.usuarios.length === 0) {
      res.status(404);
      res.json({ "Message": "User(s) not found" });
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

exports.getTasks = function(req, res) {
  var id = req.params.id;

  db.Task.findAll({ include: db.User, where: { UserId: id } }).then(function(tasks) {
    // Creo un array para devolver los resultados
    var retorno = { tasks: [] };

    // Recorro el resultado obtenido de la DB y voy agregando al array de retorno
    tasks.forEach(function (each) {
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

exports.countTasks = function(req, res) {
  var id = req.params.id;

  db.Task.count({ where: { UserId: id } }).then(function(number) {
    res.json({ "Count": number })
  })
  .catch(function(error) {
    if(error) {
      res.status(500);
      res.json({ "Message": "El usuario no existe" });
      return;
    }
  });
}
