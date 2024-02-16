import styled from "styled-components";
import { LuArrowUpFromLine } from "react-icons/lu";
import { useHandleZipFile } from "@/hooks/useHandleZipFile";
import { useAppDispatch } from "@/store/hooks/useStoreHooks";
import { FilesSystem } from "@/types";
import { saveFiles } from "@/store/filesSystem/filesSystemSlice";
import { EditorContext } from "@/contexts/EditorContext";
import { useContext } from "react";

export const UploadFileButton: React.FC = () => {
  const { extractFilesFromZip } = useHandleZipFile();
  const dispatch = useAppDispatch();
  const { setIsReadFileLoading } = useContext(EditorContext);

  const handleUploadZipFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const zipFile = event.target.files?.[0];
    if (!zipFile) return;
    setIsReadFileLoading(true);
    extractFilesFromZip(zipFile)
      .then((data: FilesSystem[] | null) => {
        if (data) {
          dispatch(saveFiles({ files: data, rootFolderName: zipFile.name }));
        }
      })
      .finally(() => setIsReadFileLoading(false));
  };

  const clickUploadFileButton = () => {
    const fileUploadElement = document.getElementById("fileUpload");
    if (fileUploadElement) {
      fileUploadElement.click();
    }
  };

  return (
    <>
      <UploadFileButtonContainer
        title="Upload Zip File"
        onClick={clickUploadFileButton}
      >
        <LuArrowUpFromLine size="1rem" color="#d4d4d4" />
      </UploadFileButtonContainer>
      <input
        type="file"
        onChange={handleUploadZipFile}
        accept=".zip"
        id="fileUpload"
        style={{ display: "none" }}
      />
    </>
  );
};

const UploadFileButtonContainer = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 3px;
  border: 1px solid #d4d4d4;
  cursor: pointer;
`;
