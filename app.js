var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bluebird = require("bluebird");
var fs = require("fs");

//incorporo cors
var cors = require("cors");

//importo router
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiRouter = require("./routes/api"); //Custom
var utilRouter = require("./routes/utils");

//instancio el servidor
var app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Swagger para API Banco",
      description: "Enpoints para API Banco, realizada por el grupo 1, Integracion de aplicaciones | Segundo Cuatrimestre 2021",
      version: "v1.0.0",
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/endpoints", swaggerUI.serve, swaggerUI.setup(swaggerDocs));



/**
 * @swagger
 * /api/users/registration:
 *   post:
 *     summary: Generacion de usuarios nuevos
 *     tags: [Endpoints Usuarios]
 *     parameters:
 *       - name: nombre
 *         in: formData
 *         description: Nombre de usuario
 *         required: true
 *         schema:
 *           type: string
 *           format: string 
 *       - name: apellido
 *         in: formData
 *         description: Apellido de usuario
 *         required: true
 *         schema:
 *           type: string
 *           format: string 
 *       - name: email
 *         in: formData
 *         description: Email de usuario
 *         required: true
 *         schema:
 *           type: string
 *           format: string 
 *       - name: usuario
 *         in: formData
 *         description: Nombre de usuario
 *         required: true
 *         schema:
 *           type: string
 *           format: string 
 *       - name: password
 *         in: formData
 *         description: Contraseña de usuario
 *         required: true
 *         schema:
 *           type: string
 *           format: string 
 *       - name: usuariotipo
 *         in: formData
 *         description: Tipo de usuario
 *         required: true
 *         schema:
 *           type: string
 *           format: string 
 * 
 *     responses:
 *       201:
 *         description: Usuario generado correctamente
 *       400:
 *         description: Error al querer generar el usuario
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login de usuarios
 *     tags: [Endpoints Usuarios]
 *     parameters:
 *       - name: usuario
 *         in: formData
 *         description: Nombre de usuario
 *         required: true
 *         schema:
 *           type: string
 *           format: string 
 *       - name: password
 *         in: formData
 *         description: Contraseña de usuario
 *         required: true
 *         schema:
 *           type: string
 *           format: string 
 * 
 *     responses:
 *       201:
 *         description: Usuario loggeado correctamente
 *       400:
 *         description: Error al querer loggear el usuario
 */

/**
 * @swagger
 * /api/users/delete/{_id}:
 *   delete:
 *     summary: Elimina usuario
 *     tags: [Endpoints Usuarios]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: id del usuario a eliminar
 * 
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Error al querer eliminar el usuario
 */

/**
 * @swagger
 * /api/users/userid/{_id}:
 *   get:
 *     summary: Obtengo usuario especifico
 *     tags: [Endpoints Usuarios]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: id del usuario a obtener
 * 
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *       201:
 *         description: Error al querer obtener el usuario
 */

/**
 * @swagger
 * /api/users/getusers/:
 *   put:
 *     summary: Obtencion de usuarios
 *     tags: [Endpoints Usuarios]
 * 
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente
 *       400:
 *         description: Error al querer obtener los usuarios
 */

/**
 * @swagger
 * /api/users/updateusers/:
 *   put:
 *     summary: Actualizacion de usuarios
 *     tags: [Endpoints Usuarios]
 *     parameters:
 *      - name: nombre
 *        in: formData
 *        description: Nombre de usuario
 *        required: false
 *        schema:
 *          type: string
 *          format: string 
 *      - name: apellido
 *        in: formData
 *        description: Apellido de usuario
 *        required: false
 *        schema:
 *          type: string
 *          format: string 
 *      - name: email
 *        in: formData
 *        description: Email de usuario
 *        required: false
 *        schema:
 *          type: string
 *          format: string 
 *      - name: usuario
 *        in: formData
 *        description: Nombre de usuario
 *        required: true
 *        schema:
 *          type: string
 *          format: string 
 *      - name: password
 *        in: formData
 *        description: Contraseña de usuario
 *        required: false
 *        schema:
 *          type: string
 *          format: string 
 *      - name: usuariotipo
 *        in: formData
 *        description: Tipo de usuario
 *        required: false
 *        schema:
 *          type: string
 *          format: string 
 * 
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Error al querer actualizar el usuario
 */

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//aplico cors
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Indico las rutas de los endpoint
app.use("/api", apiRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/utils/", utilRouter);

//onsole.log("processENV",process.env);
if (process.env.NODE_ENV === "Development") {
  require("./config").config();
}

//Database connection --
var mongoose = require("mongoose");
mongoose.Promise = bluebird;
let url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`;
console.log("BD", url);
let opts = {
  useNewUrlParser: true,
  connectTimeoutMS: 20000,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, opts)
  .then(() => {
    console.log(`Succesfully Connected to theMongodb Database..`);
  })
  .catch((e) => {
    console.log(`Error Connecting to the Mongodb Database...`), console.log(e);
  });
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "Development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Setup server port
var port = process.env.PORT || 4000;
// Escuchar en el puerto
app.listen(port, () => {
  console.log("Servidor Backend del Banco en el puerto ", port);
});

module.exports = app;
