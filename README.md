![version](https://img.shields.io/badge/version-1.0.0-blue.svg) 

## Presentacion del producto
**Agregar imagen presentacion Front**

## Descripcion

<p>Proyecto UADE Integracion de aplicaciones | 2 Cuatrimestre 2021 </p>
 
## Tabla de contenidos

* [Integrantes](#Integrantes)
* [Tecnologia](#Tecnologia)
* [Instalacion](#Instalacion)
* [Base de datos](#Base-de-datos)
* [Recursos](#Recursos)

## Integrantes Grupo 1

* Diaz, Maria Paula                   <b>Legajo : 1035616</b>
* Kavcic, Luciano Ezequiel            <b>Legajo : 1086926</b>
* Girardi, Facundo Martin             <b>Legajo : 1084454</b>

## Tecnologia

<img src="https://i.ibb.co/bsJMq4X/aps-504x498-small-transparent-pad-600x600-f8f8f8-u1.jpg" width="64" height="64" />

## Instalacion

## FrontEnd

* Descargar la aplicacion del repositorio https://github.com/facundogirardi/IA-Grupo1-Frontend
* En la carpeta del proyecto ejecutar <b>npm install</b>
* <b>cd</b> .\IA-Grupo1-Frontend\
* Ejecutar <b>npm start</b>
* Se levantará en local http://localhost:3000/

Para apuntar al Backend de Heroku (proximamente) :
* Ingresar a ./src/controller/webServices.js
* comentar la linea <b>const urlApi = "http://localhost:4000/";</b>

## BackEnd

* El backend de la aplicacion se encuesta en ek siguiente repositorio https://github.com/facundogirardi/IA-Grupo1-Backend
* En la carpeta del proyecto ejecutar <b>npm install</b>
* <b>cd</b> .\IA-Grupo1-Backend\
* Ejecutar <b>npm start</b> o <b>nodemon --exec npm start</b> (Requiere tener instalado el nodemon*)
* Se levantará en local http://localhost:4000/
* Proximamente se encontrara hosteado en Heroku <b>https://URL.herokuapp.com/<b>

## Base de Datos

<p>Para la base de datos utilizamos MongoDB</p>
<p>Poseemos el siguiente Cluster configurado <b>cluster0.pfxg4.mongodb.net</b></p>
<p>En la ruta /IA-Grupo1-Backend/models, se encuentran los modelos de datos para los documentos</p>



## Recursos

- GIT: <https://github.com/facundogirardi/IA-Grupo1-Frontend>
- GIT: <https://github.com/facundogirardi/IA-Grupo1-Backend>