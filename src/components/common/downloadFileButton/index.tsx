import styled from "styled-components";
import { LuArrowDownToLine } from "react-icons/lu";
import { useHandleZipFile } from "@/hooks/useHandleZipFile";
import { useAppSelector } from "@/store/hooks/useStoreHooks";
import { filesSystemSelectors } from "@/store/filesSystem/filesSystemSelector";
import { useMemo } from "react";

export const DownloadFileButton: React.FC = () => {
  const { convertFilesSystemToZip, downloadZipFile } = useHandleZipFile();
  const rootFilename = useAppSelector(
    filesSystemSelectors.selectRootFolderName
  );
  const filesTree = useAppSelector(filesSystemSelectors.selectFilesSystem);
  const isEmptyFilesSystem = useMemo(
    () => !filesTree || filesTree.length === 0,
    [filesTree]
  );

  const handleDownloadZipFile = () => {
    convertFilesSystemToZip(filesTree).then((zipBlob: Blob) => {
      if (zipBlob) {
        downloadZipFile(zipBlob, rootFilename);
      }
    });
  };

  return (
    <DownloadFileButtonContainer
      title="Download Zip File"
      disabled={isEmptyFilesSystem}
      onClick={handleDownloadZipFile}
    >
      <LuArrowDownToLine size="1rem" color="#d4d4d4" />
    </DownloadFileButtonContainer>
  );
};

const DownloadFileButtonContainer = styled.button<{ disabled: boolean }>`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 3px;
  border: 1px solid #d4d4d4;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin: 0 10px;
`;
