import { z } from "zod";
import { GenerateImagesFromPack, GenerateImage, TrainModel } from "./types";

export type TrainModelInput = z.infer<typeof TrainModel>;
export type GenerateModelInput = z.infer<typeof GenerateImage>;
export type GenerateImagesFromPackInput = z.infer<typeof GenerateImagesFromPack>;