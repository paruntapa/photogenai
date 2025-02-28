"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL, CLOUDFLARE_URL } from "app/config";
import { useState } from "react";
import { Loader2, Loader2Icon, LoaderCircleIcon } from "lucide-react";

export default function UploadModal( {onUploadDone}: 
  {onUploadDone: (zipUrl: string) => void}
) {
  const [loading, setLoading] = useState(false);
  return (
    <Card className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-6">
      {loading === true ? (< LoaderCircleIcon/>) : 
      (<> 
      <CloudUploadIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.multiple = true;
          input.click();
          input.onchange = async () => {
            setLoading(true)
            const zip = new JSZip();
            const res = await axios.get(`${BACKEND_URL}/pre-sign`); //response from the backend
            const url = res.data.url; // take the url
            const key = res.data.key

            if (input.files) {
              for (const file of input.files) {
                const content = await file.arrayBuffer();
                zip.file(file.name, content);
              }
              const content = await zip.generateAsync({ type: "blob" });
              const formData = new FormData();

              formData.append("file", content);

              const res = await axios.put(url, formData);
              onUploadDone(`${CLOUDFLARE_URL}/${key}`);
            }
            setLoading(false)

          };
        }}
      >
        Select Files
      </Button>
      </> )}
    </Card>
  );
}

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
