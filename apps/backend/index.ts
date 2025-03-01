import express from "express";
import {GenerateImage, GenerateImagesFromPack, TrainModel} from "common/types";
import {prisma} from "db";
import { S3Client } from "bun";
import { FalAIModel } from "./models/FalAIModel";
import cors from "cors";
import { authMiddleware } from "./middleware";

const app = express();
const falAiModel = new FalAIModel();
const PORT = process.env.PORT || 8080;
app.use(cors());

app.use(express.json());

app.get('/pre-sign',  async (req, res) => {
    const key = `models/${Date.now()}_${Math.round(Math.random() * 1000)}.zip`
    const url = S3Client.presign(key, {
        method: "PUT",
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        endpoint: process.env.ENDPOINT,
        bucket: process.env.BUCKET_NAME,
        expiresIn: 60 * 5,
        type: "application/zip"
    })

    res.json({
        url,
        key
    })
})

app.post('/ai/training',authMiddleware,  async (req, res) => {
    const parsedBody = TrainModel.safeParse(req.body);
    if(!parsedBody.success) {
        res.status(411).json({
            message: "Invalid request body",
        })
        return;
    }

    const {request_id, response_url} =  await falAiModel.trainModel(parsedBody.data.zipUrl, parsedBody.data.name);

    const data = await prisma.model.create({
        data: {
            name: parsedBody.data.name,
            type: parsedBody.data.type,
            age: parsedBody.data.age,
            ethinicity: parsedBody.data.ethinicity,
            eyeColor: parsedBody.data.eyeColor,
            bald: parsedBody.data.bald,
            userId: req.userId!,
            zipUrl: parsedBody.data.zipUrl,
            falAiRequestId: request_id,
        }
    })

    res.json({
        modelId: data.id
    })

})

app.post('/ai/generate',authMiddleware, async (req, res) => {
    const parsedBody = GenerateImage.safeParse(req.body);

    if(!parsedBody.success) {
        res.status(411).json({
            message: "Invalid request body",
        })
        return;
    }

    const model = await prisma.model.findUnique({
        where: {
            id: parsedBody.data.modelId
        }
    })

    if(!model || !model.tensorPath) {
        res.status(411).json({
            message: "Model Not Found",
        })
        return;
    }

    const {request_id, response_url} = await falAiModel.generateImage(parsedBody.data.prompt, model.tensorPath); 

    const data = await prisma.outputImages.create({
        data: {
            imageUrl: "",
            modelId: parsedBody.data.modelId,
            userId: req.userId!,
            prompt: parsedBody.data.prompt,
            falAiRequestId: request_id
        }
    })

    res.json({
        imageId: data.id
    })
})

app.post('/pack/generate', authMiddleware, async (req, res) => {
    const parsedBody = GenerateImagesFromPack.safeParse(req.body);

    if(!parsedBody.success) {
        res.status(411).json({
            message: "Invalid request body",
        })
        return;
    }

    const prompts = await prisma.packPrompts.findMany({
        where: {
            packId: parsedBody.data.packId
        }
    })

    let requestIds: {request_id: string}[] = await Promise.all(prompts.map( (prompts)=> 
        falAiModel.generateImage(prompts.prompt, parsedBody.data.modelId)))

    const images = await prisma.outputImages.createManyAndReturn({
        data: prompts.map((prompt, index) => ({
            imageUrl: "",
            modelId: parsedBody.data.modelId,
            userId: req.userId!,
            prompt: prompt.prompt,
            falAiModel: requestIds[index].request_id
        }))
    })

    res.json({
        images: images.map((image) => image.id)
    })

})

app.get('/pack/bulk', async (req, res) => {
    const packs = await prisma.packs.findMany({})

    res.json({
        packs
        })

})

app.get('/image/bulk',authMiddleware,  async (req, res) => {
    const ids = req.query.ids as string[];
    const limit = req.query.limit as string ?? "10";
    const offset = req.query.offset as string ?? "0";

    const imagesData = await prisma.outputImages.findMany({
        where: {
            id: {
                in: ids
            },
            userId: req.userId!
        },
        skip: parseInt(offset),
        take: parseInt(limit)
    });
    
    res.json({
        images: imagesData
        
    })
})

app.get("/models", authMiddleware, async (req, res) => {
    const models = await prisma.model.findMany({
        where: {
            OR: [{ userId: req.userId }, { open: true }]
        }
    })
    res.json({
        models
    })
})

app.post("fal-ai/webhook/train", async (req, res) => {    

    const requestId = req.body.request_id as string;

    const {imageUrl} = await falAiModel.generateImageSync(req.body.tensor_path)

    await prisma.model.updateMany({
        where: {
            falAiRequestId: requestId
        },
        data: {
            trainingStatus: "Generated",
            tensorPath: req.body.tensor_path,
            thumbnail: imageUrl
        }
    })

    res.json({
        message: "Webhook received"
    })
})

app.post("fal-ai/webhook/image", async (req, res) => {    
    const requestId = req.body.request_id;

    await prisma.outputImages.updateMany({
        where: {
            falAiRequestId: requestId
        },
        data: {
            status: "Generated",
            imageUrl: req.body.image_url
        }
    })
    res.json({
        message: "Webhook received"
    })
})

app.listen(PORT, ()=> {
    console.log("Server started on port 8080")
})