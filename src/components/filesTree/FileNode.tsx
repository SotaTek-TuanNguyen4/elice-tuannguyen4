import styled from "styled-components";
import { FiFileText } from "react-icons/fi";
import { useAppDispatch } from "@/store/hooks/useStoreHooks";
import type { TreeFolder } from "@/types";
import { openFile, updateFileFocus } from "@/store/filesSystem/filesSystemSlice";

interface FileNodeProps {
  fileSystem: TreeFolder;
}

export const FileNode: React.FC<FileNodeProps> = ({
  fileSystem,
}: FileNodeProps) => {
  const dispatch = useAppDispatch();
  const splitFileName = fileSystem.pathName.split("/");
  const space = splitFileName.length - 1;

  const handleOpenFile = () => {
    dispatch(updateFileFocus(fileSystem.pathName));
    dispatch(openFile(fileSystem.pathName));
  };

  return (
    <FileBoxContainer
      style={{ paddingLeft: `${space * 20}px` }}
      className={fileSystem.isFocus ? "focus" : ""}
      onClick={handleOpenFile}
    >
      <FiFileText style={{ marginLeft: "20px" }}></FiFileText>
      <span className="file-name">{fileSystem.fileName}</span>
    </FileBoxContainer>
  );
};

export const FileBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  height: 24px;
  width: 100%;
  cursor: pointer;
  &.focus {
    background: #3f3f3f;
  }

  .file-name {
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;
