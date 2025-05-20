"use client";
import config from "@/lib/config";
import ImageKit from "imagekit";
import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const {
  env: {
    apiEndpoint,
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(
      `${config?.env.apiEndpoint}/api/auth/imagekit`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed, status${response.status}: ${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
}

const ImageUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark" ? "bg-gray-300" : "bg-gray-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-gray-100" : "text-slate-500",
    text: variant === "dark" ? "text-gray-100" : "text-gray-400",
  };
  const onError = (error: any) => {
    console.error(error);
    toast(`${type} Upload Failed`);
  };
  const onSuccess = (response: any) => {
    setFile(response);
    onFileChange(response.filePath);
    toast(`${type} added successfully!!`);
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast(`Your ${type} is too large!`);
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast(`Your ${type} is too large!`);
        return false;
      }
    }
    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const precent = Math.round((loaded / total) * 100);
          setProgress(precent);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />
      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            //@ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image src="/icons/upload.svg" alt="Upload" width={20} height={20} />
        <p>{placeholder}</p>
        {file && <p>{file.filePath}</p>}
      </button>

      {progress > 0 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default ImageUpload;
