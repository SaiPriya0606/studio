"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Camera } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImageSelected: (dataUri: string) => void;
  label?: string;
}

export function ImageUploader({ onImageSelected, label = "Upload Image" }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageSelected(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onImageSelected("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative group rounded-lg overflow-hidden border aspect-video bg-muted max-w-md">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="destructive" size="icon" onClick={clearImage}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-12 text-center hover:border-secondary transition-colors cursor-pointer bg-muted/30 group max-w-md"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform">
              <Upload className="h-6 w-6 text-secondary" />
            </div>
            <p className="font-medium text-sm mt-2">{label}</p>
            <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
          </div>
        </div>
      )}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
}