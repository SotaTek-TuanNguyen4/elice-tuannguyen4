import { filesSystemSelectors } from "@/store/filesSystem/filesSystemSelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks/useStoreHooks";
import styled from "styled-components";
import type { FilesSystem, TreeFolder } from "@/types";
import { FolderNode } from "@/components/filesTree/FolderNode";
import { FileNode } from "@/components/filesTree/FileNode";
import { useState, useEffect, useContext } from "react";
import { cloneDeepObject } from "@/utils";
import { useHandleZipFile } from "@/hooks/useHandleZipFile";
import { saveFiles } from "@/store/filesSystem/filesSystemSlice";
import { LoadingComponent } from "@/components/common/loading";
import { EditorContext } from "@/contexts/EditorContext";

export const FilesTree: React.FC = () => {
  const filesTree: FilesSystem[] = useAppSelector(
    filesSystemSelectors.selectFilesSystem
  );
  const [filesTreeDisplay, setFilesTreeDisplay] = useState<TreeFolder[]>([]);
  const { extractFilesFromZip } = useHandleZipFile();
  const dispatch = useAppDispatch();
  const [isDropFileOver, setIsDropFileOver] = useState(false);
  const { isReadFileLoading, setIsReadFileLoading } = useContext(EditorContext);

  useEffect(() => {
    const newFilesTree: TreeFolder[] = filesTree.map((item) => ({
      fileName: item.fileName,
      pathName: item.pathName,
      isFolder: item.isFolder,
      isExpand: item.isExpand,
      isBinary: item.isBinary,
      isFocus: item.isFocus
    }));
    setFilesTreeDisplay(newFilesTree);
    if (filesTree.length > 0) {
      setIsDropFileOver(true);
    }
  }, [filesTree]);

  const handleCollapseFolderNode = (folderPath: string) => {
    const folderNode = checkFolderNodeExist(folderPath);
    if (!folderNode) return;
    const cloneFilesTreeDisplay = cloneDeepObject(filesTreeDisplay);

    const filesTreeCollapse: TreeFolder[] = cloneFilesTreeDisplay.map(
      (item: TreeFolder) => {
        if (item.pathName.startsWith(folderPath)) {
          item.isExpand = false;
        }
        return item;
      }
    );
    setFilesTreeDisplay(filesTreeCollapse);
  };

  const handleExpandFolderNode = (folderPath: string) => {
    const folderNode = checkFolderNodeExist(folderPath);
    if (!folderNode) return;
    const cloneFilesTreeDisplay = cloneDeepObject(filesTreeDisplay);

    const filesTreeExpand: TreeFolder[] = cloneFilesTreeDisplay.map(
      (item: TreeFolder) => {
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
    return folderNode;
  };

  const handleDragDropFile = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const zipFile = event.dataTransfer.files[0];
    if (!zipFile) return;
    setIsDropFileOver(true);
    setIsReadFileLoading(true);
    extractFilesFromZip(zipFile)
      .then((data: FilesSystem[] | null) => {
        if (data) {
          dispatch(saveFiles({ files: data, rootFolderName: zipFile.name }));
        }
      })
      .finally(() => setIsReadFileLoading(false));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Container>
      {isReadFileLoading ? (
        <LoadingComponent />
      ) : (
        <>
          {!isDropFileOver ? (
            <DragDropFileCointer
              onDrop={handleDragDropFile}
              onDragOver={handleDragOver}
            >
              Drag and drop file here
            </DragDropFileCointer>
          ) : (
            <FilesTreeContainer>
              {filesTreeDisplay.map((item: TreeFolder) => {
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
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
`;

const FilesTreeContainer = styled(Container)`
  padding: 10px;
`;

const DragDropFileCointer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 2rem;
  border: 2px dashed #ccc;
`;
