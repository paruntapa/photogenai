import {z} from "zod";

export const TrainModel = z.object({
    name: z.string(),
    type: z.enum(["Man", "Woman", "Other"]),
    age: z.number(),
    ethnicity: z.enum(["White", "Black", "Asian American", "East Asian", "South East Asian", "Middle Eastern", "Hispanic", "Pacific", "South Asian"]),
    eyeColor: z.enum(["Brown", "Blue", "Hazel", "Gray"]),  
    bald: z.boolean(),
    images: z.array(z.string())
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