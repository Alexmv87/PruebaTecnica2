const express = require('express')
const app = express()
const cors = require('cors')
const modelos = require('./Models/movies.js')
const movie = modelos.movie
const router = express.Router()

router.get("/",async (req,res)=>{
    res.send(await movie.find().sort({Titulo:'ascending'}).exec())
})

router.get("/:id",async (req,res)=>{
    const encontrada = await movie.findById({_id:req.params.id}).exec()    
    res.send(encontrada)
})

router.post("/", async (req,res)=>{
    const unica = await movie.find({Titulo: req.body.Titulo}).exec()
    if (unica.length == 0){
        const nueva = movie(req.body)
        await nueva.save()
        res.send(nueva)
    }
    else{
    res.send({"message": "el titulo ya se encuentra registrado"})
    }
})

router.put("/:id", async (req, res)=>{
    const actualizado = await movie.updateOne({_id:req.params.id},req.body)
    res.send(await movie.findById(req.params.id))
})

router.delete("/:id", async (req,res)=>{
    const borrado = await movie.deleteOne({_id:req.params.id})
    res.send(borrado)
})
app.use(cors())
app.use(express.json({
    limit:'10mb'
}))
app.use('/movies',router)

app.listen(8080,()=>{
    console.log("server listening")
})