import type { FilesSystem } from "@/types";
import { FileBoxContainer } from "@/components/filesTree/FileNode";
import { FiFolder } from "react-icons/fi";
import { ChevronButton } from "@/components/common/chevronButton";

interface FolderNodeProps {
  fileSystem: FilesSystem;
  handleToggleExpand: (filePath: string, isExpand: boolean) => void;
}

export const FolderNode: React.FC<FolderNodeProps> = ({
  fileSystem,
  handleToggleExpand,
}: FolderNodeProps) => {
  const splitFileName = fileSystem.pathName.split("/");
  const space = splitFileName.length - 2;

  const handleClickChevronButton = () => {
    handleToggleExpand(fileSystem.pathName, !fileSystem.isExpand);
  };

  return (
    <FileBoxContainer style={{ paddingLeft: `${space * 20}px` }}>
      <ChevronButton
        isExpand={fileSystem.isExpand}
        onclick={handleClickChevronButton}
      />
      <FiFolder size="1rem" color="#FFF"></FiFolder>
      <span className="file-name">{fileSystem.fileName}</span>
    </FileBoxContainer>
  );
};
