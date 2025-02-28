"use client"

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import UploadModal from "@/components/ui/upload";
import { TrainModelInput } from "common/inferred";
import axios from "axios";
import { BACKEND_URL } from "app/config";
import { redirect } from "next/navigation";
import { useAuth } from "@clerk/nextjs";



const Train = () => {
  const [zipUrl, setZipUrl] = React.useState("");
  const [type, setType] = React.useState("Man");
  const [age, setAge] = React.useState<string>();
  const [ethinicity, setEthinicity] = React.useState<string>("White");
  const [eyeColor, setEyeColor] = React.useState<string>("Brown");
  const [bald, setBald] = React.useState(false);
  const [name, setName] = React.useState("");
  const {getToken} = useAuth();

  
  const trainModel = async () => {
    const input= {
      type,
      age: parseInt(age ?? "0"),
      ethinicity,
      eyeColor,
      bald,
      zipUrl,
      name
    }
    const token = await getToken();

    const response = await axios.post(`${BACKEND_URL}/ai/training`, input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    redirect('/')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen m-1">
      <Card className="w-[600px] px-4">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex justify-between gap-3 ">
                    <div className="flex flex-col space-y-1.5 flex-1">
                        <Label htmlFor="name">Name</Label>
                        <Input onChange={(e)=> {
                        setName(e.target.value)
                        }} id="name" placeholder="Name of the model" />
                    </div>
                    <div className="flex flex-col space-y-1.5 flex-1">
                        <Label htmlFor="description">Age</Label>
                        <Input onChange={(e)=> {
                        setAge(e.target.value)
                        }} id="description" placeholder="Age of the model" />
                    </div>
              </div>
              <div className="flex justify-betweem gap-3">
                <div className="flex flex-col space-y-1.5 flex-1">
                    <Label htmlFor="name">Type</Label>
                    <Select onValueChange={(value)=> {
                    setType(value)
                    }}>
                    <SelectTrigger id="name">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="Man">Man</SelectItem>
                        <SelectItem value="Woman">Woman</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col space-y-1.5  flex-1 ">
                    <Label htmlFor="age">Ethinicity</Label>
                    <Select onValueChange={(value)=> {
                    setEthinicity(value)
                    }}>
                    <SelectTrigger id="age">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="White">White</SelectItem>
                        <SelectItem value="Black">Black</SelectItem>
                        <SelectItem value="Asian_American">
                        {" "}
                        Asian America
                        </SelectItem>
                        <SelectItem value="East_Asian">East Asian</SelectItem>
                        <SelectItem value="South_East_Asian">
                        South East Asian
                        </SelectItem>
                        <SelectItem value="Middle_Eastern">
                        Middle Eastern
                        </SelectItem>
                        <SelectItem value="Hispanic">Hispanic</SelectItem>
                        <SelectItem value="Pacific">Pacific</SelectItem>
                        <SelectItem value="South_Asian">South Asian</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Eye Color</Label>
                <Select onValueChange={(value)=> {
                  setEyeColor(value)
                }}>
                  <SelectTrigger id="name">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Brown">Brown</SelectItem>
                    <SelectItem value="Blue">Blue</SelectItem>
                    <SelectItem value="Hazel">Hazel</SelectItem>
                    <SelectItem value="Gray">Gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Bald</Label>
                <Switch onClick={()=> {
                  setBald(!bald)
                }} />
              </div>              
              <UploadModal onUploadDone={(zipUrl)=> {
                setZipUrl(zipUrl)
              }}/>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={()=>{
            redirect("/")
            }}>Cancel</Button>
          <Button disabled={!zipUrl || !type || !age || !ethinicity || !eyeColor } 
          onClick={trainModel}
          >Create Model</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Train;
