import { FilesSystem } from "@/types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { LoadingComponent } from "@/components/common/loading";
LoadingComponent;

interface ImageViewProps {
  fileSystem: FilesSystem;
  width: number | undefined;
  height: number | undefined;
}
export const ImageView = ({
  fileSystem,
  height = 100,
  width = 100,
}: ImageViewProps) => {
  const [base64Image, setBase64Image] = useState("");

  const setImageView = async (arrayBufferFile: ArrayBuffer) => {
    const base64Data = await toBase64(arrayBufferFile);
    setBase64Image(base64Data);
  };

  const toBase64 = async (arrayBufferFile: ArrayBuffer) => {
    try {
      const blob = new Blob([arrayBufferFile]);
      const base64Data = await fileToBase64(blob);
      return `data:image/png;base64,${base64Data}`;
    } catch (error) {
      return "";
    }
  };

  const fileToBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          resolve(reader.result.split(",")[1]);
        } else {
          reject(new Error("Invalid file format"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    setImageView(fileSystem.arrayBufferFile);
  }, [fileSystem]);

  return base64Image ? (
    <Image src={base64Image} width={width - 10} height={height - 10} />
  ) : (
    <LoadingComponent></LoadingComponent>
  );
};

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  object-fit: contain;
`;
