import type { TreeFolder } from "@/types";
import { FileBoxContainer } from "@/components/filesTree/FileNode";
import { FiFolder } from "react-icons/fi";
import { ChevronButton } from "@/components/common/chevronButton";
import { useAppDispatch } from "@/store/hooks/useStoreHooks";
import { updateFileFocus } from "@/store/filesSystem/filesSystemSlice";

interface FolderNodeProps {
  fileSystem: TreeFolder;
  handleToggleExpand: (filePath: string, isExpand: boolean) => void;
}

export const FolderNode: React.FC<FolderNodeProps> = ({
  fileSystem,
  handleToggleExpand,
}: FolderNodeProps) => {
  const dispatch = useAppDispatch();
  const splitFileName = fileSystem.pathName.split("/");
  const space = splitFileName.length - 2;

  const handleClickChevronButton = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleToggleExpand(fileSystem.pathName, !fileSystem.isExpand);
  };

  const handleFolderFocus = () => {
    dispatch(updateFileFocus(fileSystem.pathName));
  };

  return (
    <FileBoxContainer
      className={fileSystem.isFocus ? "focus" : ""}
      style={{ paddingLeft: `${space * 20}px` }}
      onClick={handleFolderFocus}
    >
      <ChevronButton
        isExpand={fileSystem.isExpand}
        onclick={handleClickChevronButton}
      />
      <FiFolder size="1rem" color="#FFF"></FiFolder>
      <span className="file-name">{fileSystem.fileName}</span>
    </FileBoxContainer>
  );
};
