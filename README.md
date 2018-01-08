# Prueba Font-End Almundo

Este repositorio contiene el código fuente para la prueba Font-End proporcionada por Almundo.

Construido usando:

* [ReactJS](https://reactjs.org/)
* [KoaJS](http://koajs.com)
* [SequelizeJS](https://github.com/sequelize/sequelize)

## Requerimientos

Requiere:
* Node **v7.6.0**
* Conexión a DB **Postgres**

## Instrucciones

### Antes de empezar

Para iniciar, se debe crear un archivo `config.json`, en la carpeta `config/` tomando como referencia `config.json.example`. En el mismo se debe configurar una conexión a la base de datos.

Instalar las dependencias usando **npm**: `npm install`.

### Crear base de datos y realizar migración

Para crear una base de datos nueva, asegurarse que el usuario en Postgres tenga permisos y ejecutar:

* Crear base de datos: `./node_modules/bin/sequelize db:create`
* Crear tablas y columnas: `./node_modules/bin/sequelize db:migrate`
* Introducir datos de prueba: `./node_modules/bin/sequelize db:seed:all`

### Ejecutar el aplicativo web

Para ejecutar el servidor en modo de desarrollo, usar el comando: `npm run watch`. Esto iniciará: WebPack para observar y compilar los archivos y el servidor de API.

Para compilar y minificar los archivos, usar el comando: `npm run build`.

Para ejecutar el servidor de API y vistas, usar el comando: `node app.js`. (No es necesario al ejecutar en modo de desarrollo)

## Rutas

Objeto hotel:

```json
{
	"name": "Hotel name",
	"stars": 5,
	"price": "200.00",
	"image": "http://example.com/image.jpg",
	"amenities": [
		"safety-box",
      	"nightclub"
	]
}
```


Método | Ruta | Parámetros | Descripción 
---|---|---|---|
*GET*|/|--|Vista home
*GET*|/api/hotels| Parámetros query: `query`, `stars`, `limit`, `offset`|Obtiene un listado de todos los hoteles.
*GET*|/api/hotels/`:id`| -- |Obtiene los detalles del hotel identificado con `id`.
*POST*|/api/hotels| Objeto `hotel`|Almacena un nuevo hotel en la base de datos.
*PUT*|/api/hotels/`:id`| Objeto `hotel`|Edita el hotel identificado con `id`.
*DELETE*|/api/hotels/`:id`| -- |Elimina el hotel identificado con `id`.
