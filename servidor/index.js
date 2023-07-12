import express from "express";
import { sequelize } from "./database/database.js";
import { Profesor } from "./modelos/Profesor.js";
import { Curso } from "./modelos/Curso.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors())

app.use(express.json())

async function verificarConexion(){
    try{
        await sequelize.authenticate()
        console.log("Conexión exitosa a base de datos")
        await sequelize.sync({force : true })
    } catch (error){
        console.error("Error en la conexión a base de datos: ", error);
    }
}

app.get("/insertar-profesor/:dni/:nombres/:apellidos/:correo", async function(req, res) {
    const dni = req.params.dni;
    const nombres = req.params.nombres;
    const apellidos = req.params.apellidos;
    const correo = req.params.correo;

    await Profesor.create({
        dni: dni,
        nombres: nombres,
        apellidos: apellidos,
        correo: correo
    });

    res.send("Profesor ha sido creado");
    
});

app.post("/insertar-curso", async function (req, res) {
    const seccion = req.body.seccion;
    const nombre = req.body.nombre;
    const vacantes = req.body.vacantes;
    const profesor = req.body.profesor;
  
    await Curso.create({
      seccion: seccion,
      nombre: nombre,
      numero_vacantes: vacantes,
      profesorId: profesor,
    });
  
    res.send("Curso ha sido creado");

});


app.get("/consultar-profesor",async function(req,res){
    const profesores = await Profesor.findAll();
    res.send(profesores)
})

app.get("/consultar-curso",async function(req,res){
    const cursos = await Curso.findAll();
    res.send(cursos)
})

app.get("/",(req,res)=>{
    res.send("El servidor se encuentra activo")
    verificarConexion()
})

app.listen(port, () => {
    console.log("Servidor funcionando en puerto "+ port);
    verificarConexion();
})