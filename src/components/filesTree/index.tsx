import { filesSystemSelectors } from "@/store/filesSystem/filesSystemSelector";
import { useAppSelector } from "@/store/hooks/useStoreHooks";
import styled from "styled-components";
import { FilesSystem } from "@/types";
import { FolderNode } from "@/components/filesTree/FolderNode";
import { FileNode } from "@/components/filesTree/FileNode";
import { useState, useEffect } from "react";
import { cloneFilesTree } from "@/utils";

export const FilesTree: React.FC = () => {
  const filesTree: FilesSystem[] = useAppSelector(
    filesSystemSelectors.selectFilesSystem
  );
  const [filesTreeDisplay, setFilesTreeDisplay] = useState<FilesSystem[]>([]);

  useEffect(() => {
    setFilesTreeDisplay(filesTree);
  }, [filesTree]);

  const handleCollapseFolderNode = (folderPath: string) => {
    const folderNode = checkFolderNodeExist(folderPath)
    if (!folderNode) return;
    const cloneFilesTreeDisplay = cloneFilesTree(filesTreeDisplay);

    const filesTreeCollapse: FilesSystem[] = cloneFilesTreeDisplay.map(
      (item: FilesSystem) => {
        if (item.pathName.startsWith(folderPath)) {
          item.isExpand = false;
        }
        return item;
      }
    );
    setFilesTreeDisplay(filesTreeCollapse);
  };

  const handleExpandFolderNode = (folderPath: string) => {
    const folderNode = checkFolderNodeExist(folderPath)
    if (!folderNode) return;
    const cloneFilesTreeDisplay = cloneFilesTree(filesTreeDisplay);

    const filesTreeExpand: FilesSystem[] = cloneFilesTreeDisplay.map(
      (item: FilesSystem) => {
        if (item.pathName.startsWith(folderPath)) {
          item.isExpand = true;
        }
        return item;
      }
    );
    setFilesTreeDisplay(filesTreeExpand);
  };

  const handleToggleExpandFilesTree = (filePath: string, isExpand: boolean) => {
    if (!isExpand) {
      handleCollapseFolderNode(filePath);
    } else {
      handleExpandFolderNode(filePath);
    }
  };

  const checkFolderNodeExist = (folderPath: string) => {
    const folderNode = filesTreeDisplay.find(
      (item) => item.pathName === folderPath
    );
    return folderNode
  }

  return (
    <FilesTreeContainer>
      {filesTreeDisplay.map((item: FilesSystem) => {
        if (item.isFolder) {
          return (
            <FolderNode
              fileSystem={item}
              key={item.pathName}
              handleToggleExpand={handleToggleExpandFilesTree}
            />
          );
        } else if (item.isExpand) {
          return <FileNode fileSystem={item} key={item.pathName} />;
        }
        return;
      })}
    </FilesTreeContainer>
  );
};

const FilesTreeContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  padding: 10px;
`;
