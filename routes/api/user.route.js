var express = require("express");
var router = express.Router();
var UserController = require("../../controllers/users.controller");
var EmpresaController = require("../../controllers/empresas.controller");
var MovimientoController = require("../../controllers/movements.controller");
var SueldoController = require("../../controllers/sueldos.controller");
var MantenimientoController = require("../../controllers/mantenimientos.controller");
var Authorization = require("../../auth/authorization");

// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("Llegaste a la ruta de api/user.routes");
});
router.post("/registration", UserController.createUser);
router.post("/login/", UserController.loginUser);
router.get("/getusers", UserController.getUsers);
router.put("/updateusers", UserController.updateUser);
router.put("/updateusercbu", UserController.updateUserCBU);
router.put("/updateUserCUIT", UserController.updateUserCUIT);
router.put("/updateusercbuCC", UserController.updateUserCBU);
router.put("/updateUserP", UserController.updateUserP);
router.post("/getusersCBU", UserController.getUsuarioCBU);
router.post("/getusersCBUCC", UserController.getUsuarioCBUCC);
router.post("/getusersUsuario", UserController.getUsuarioUsuario);
router.post("/getUsuarioCuit", UserController.getUsuarioCuit);

router.post("/altaempresa", EmpresaController.createEmpresa);
router.post("/altaempresaM", EmpresaController.createEmpresaM);
router.get("/getempresas", EmpresaController.getEmpresas);
router.put("/updateEmpresa", EmpresaController.updateEmpresa);
router.post("/getEmpresaESTADO", EmpresaController.getEmpresaESTADO);
router.post("/getEmpresaPAGO", EmpresaController.getEmpresaPAGO);
router.post("/getEmpresaCUITEmpresa", EmpresaController.getEmpresaCUITEmpresa);
router.post("/getEmpresasID", EmpresaController.getEmpresasID);

router.post("/altasueldoM", SueldoController.createSueldo);

router.post("/registromovimiento", MovimientoController.createMovimiento);
router.get("/getmovimientos", MovimientoController.getMovimientos);
router.post("/getMovimientoUsuario", MovimientoController.getMovimientoUsuario);

router.get("/getMantenimientos", MantenimientoController.getMantenimientos);
router.put("/updateMantenimiento", MantenimientoController.updateMantenimiento);
router.post(
  "/getMantenimientoClave",
  MantenimientoController.getMantenimientoClave
);



const fs = require('fs');
const multer = require('multer');


let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://admin:admin@cluster0.pfxg4.mongodb.net/";

const csv=require('csvtojson')

const path = require('path');
let reqPath = path.join(__dirname, '../../'); 
global.__basedir = reqPath;

console.log(reqPath) 
  
// -> Multer Upload Storage
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
    cb(null, __basedir + '/uploads/')
 },
 filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
 }
});
 
const upload = multer({storage: storage});
 
// -> Express Upload RestAPIs
router.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{
    importCsv(__basedir + '/uploads/' + req.file.filename);
    res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
    });
});
 
// -> Import CSV File to MongoDB database
function importCsv(filePath){
    csv()
        .fromFile(filePath)
        .then((jsonObj)=>{
            // Insert Json-Object to MongoDB
            MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
                if (err) throw err;
                let dbo = db.db("Banco");
                dbo.collection("empresas").insertMany(jsonObj, (err, res) => {
                   if (err) throw err;
                   console.log("Number of documents inserted: " + res.insertedCount);
                   /**
                       Number of documents inserted: 5
                   */
                   db.close();
                });
            });
			
            fs.unlinkSync(filePath);
        })
}
 
 

// Export the Router
module.exports = router;

//api/users
//api/users/registration
//api/users/login
