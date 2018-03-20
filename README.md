# Tundide

Proyecto para la administracion y gestion de turnos.

## Getting Started

Para comenzar a utilizar el proyecto debe realizar la instalacion basica del proyecto

### Prerequisites

Node 8.1.3
MongoDB 3.4.2

### Installing

Pasos para la instalacion y utilizacion del proyecto

Instalar las siguientes librerias desde npm

```
npm i -g --production windows-build-tools
npm i -g typescript
npm i -g gulp
npm i -g eslint
npm i -g tslint
npm i -g apidoc
npm i -g jsdoc
npm i -g docco
npm i -g @compodoc/compodoc
npm i -g npm-check-updates
npm i -g karma-cli
npm i -g protractor
npm i -g jasmine-node
```

# Development
## Development Server

Para comenzar a utilizar el proyecto se debera correr el siguiente comando.

```
npm run build
```

## Running the tests

para realizar la ejecucion de pruebas unitarias/e2e debe ejecutar el comando 

```
npm run test
```

## Deployment

Al hacer un push en el branch *Testing* del repositorio de GitHub, se realizara el deploy en el entorno *Testing* de Heroku de manera automatica.

La subida a produccion se realiza Provisionando el entorno de *Produccion* desde *Staging*

## Built With

* [Angular](https://angular.io/) - The web framework used
* [Handlebars.js](http://handlebarsjs.com/) - Semantic templates
* [Node.js](https://nodejs.org/) - JavaScript runtime
* [MongoDB](https://www.mongodb.com/) - NoSQL Database

## Authors

* **Tundide Team** - [Tundide](http://www.tundide.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details