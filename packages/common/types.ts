import {z} from "zod";

export const TrainModel = z.object({
    name: z.string(),
    type: z.enum(["Man", "Woman", "Others"]),
    age: z.number(),
    ethinicity: z.enum(["White", "Black", "Asian_American", "East_Asian", "South_East_Asian", "Middle_Eastern", "Hispanic", "Pacific", "South_Asian"]),  
    eyeColor: z.enum(["Brown", "Blue", "Hazel", "Gray"]),  
    bald: z.boolean(),
    zipUrl: z.string()
})

export const GenerateImage = z.object({
    modelId: z.string(),
    prompt: z.string(),
    num: z.number()
})

export const GenerateImagesFromPack = z.object({
    modelId: z.string(),
    packId: z.string(),
})