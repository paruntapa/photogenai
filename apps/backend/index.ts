import express from "express";
import {GenerateImage, GenerateImagesFromPack, TrainModel} from "common/types";
import {prisma} from "db";


const app = express();

const PORT = process.env.PORT || 8080;


app.post('/ai/training', (req, res) => {

})

app.post('/ai/generate', (req, res) => {
    
})

app.post('/pack/generate', (req, res) => {
    
})

app.get('/pack/bulk', (req, res) => {
    
})

app.get('/image', (req, res) => {
    
})

app.listen(PORT, ()=> {
    console.log("Server started on port 8080")
})