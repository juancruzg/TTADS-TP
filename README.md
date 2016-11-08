# TTADS: TP Users & Tasks
===================
Corriendo el comando <strong>node server.js</strong> sobre la raiz del directorio se sirve de forma local la WEB, y el API:
# Endpoints
<ul>
<li><strong>GET - /</strong> => Sobre la raiz está hosteada la web que permite mediante su interfaz agregar, modificar y eliminar usuarios</li>
<li><strong>GET - /api/users</strong> 		=> Devuelve los datos de todos los usuarios</li>
<li><strong>GET - /api/users/:id</strong> => Devuelve los datos de un usuario específico</li>
<li><strong>GET - /api/users/search/</strong> => Busca usuarios usando querystring*</li>
<li><strong>GET - /api/users/:id/tasks</strong> => Devuelve un array de tareas para un usuario específico</li>
<li><strong>GET - /api/users/:id/tasks/count</strong> => Devuelve la cantidad de tareas que tiene el usuario</li>

<li><strong>GET - /api/tasks</strong> => Devuelve los datos de todos los tasks</li>
<li><strong>GET - /api/tasks/:id</strong> => Devuelve los datos de un task específico</li>
<hr>
<li><strong>POST - /api/users</strong> => Permite editar un usuario</li>
<li><strong>POST - /api/tasks</strong> => Permite editar un task</li>
<hr>
<li><strong>PUT - /api/users</strong> => Guarda un nuevo usuario</li>
<li><strong>PUT - /api/tasks</strong> => Guarda un nuevo task</li>
<hr>
<li><strong>DELETE - /api/users/:id</strong> => Elimina un usuario</li>
<li><strong>DELETE - /api/tasks/:id</strong> => Elimina un task</li>
</ul>
<hr>
# Requests
Post users:
```json
{"id": number, "nombre": text}
```
Put users:
```json
{"nombre": text}
```
Post tasks:
```json
{"id": number, "userId": number, "title": text}
```
Put tasks:
```json
{"userId": number, "title": text}
```
