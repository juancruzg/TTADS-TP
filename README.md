# TTADS: TP Users & Tasks
Corriendo el comando <strong>node server.js</strong> sobre la raiz del directorio se sirve de forma local la WEB, y el API:
## Endpoints
> **GET**
<ul>
<li><strong>/ =></strong> Sobre la raiz está hosteada la web que permite mediante su interfaz agregar, modificar y eliminar usuarios</li>
<li><strong>/api/users</strong> => Devuelve los datos de todos los usuarios</li>
<li><strong>/api/users/:id</strong> => Devuelve los datos de un usuario específico</li>
<li><strong>/api/users/search/</strong> => Busca usuarios usando querystring*</li>
<li><strong>/api/users/:id/tasks</strong> => Devuelve un array de tareas para un usuario específico</li>
<li><strong>/api/users/:id/tasks/count</strong> => Devuelve la cantidad de tareas que tiene el usuario</li>
<li><strong>/api/tasks</strong> => Devuelve los datos de todos los tasks</li>
<li><strong>/api/tasks/:id</strong> => Devuelve los datos de un task específico</li>
</ul>

> **POST**
<ul>
<li><strong>/api/users</strong> => Permite editar un usuario</li>
<li><strong>/api/tasks</strong> => Permite editar un task</li>
</ul>
> **PUT**
<ul>
<li><strong>/api/users</strong> => Guarda un nuevo usuario</li>
<li><strong>/api/tasks</strong> => Guarda un nuevo task</li>
</ul>
> **DELETE**
<ul>
<li><strong>/api/users/:id</strong> => Elimina un usuario</li>
<li><strong>/api/tasks/:id</strong> => Elimina un task</li>
</ul>
>**_QueryString para el search de users_:** _?id=number&nombre=string_, ambos campos son opcionales

## Requests

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
