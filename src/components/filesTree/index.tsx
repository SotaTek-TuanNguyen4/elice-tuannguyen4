import { filesSystemSelectors } from "@/store/filesSystem/filesSystemSelector";
import { useAppSelector } from "@/store/hooks/useStoreHooks";
import styled from "styled-components";
import { FilesSystem } from "@/types/files";

export const FilesTree: React.FC = () => {
  const rootFilename = useAppSelector(
    filesSystemSelectors.selectRootFolderName
  );
  const filesTree = useAppSelector(filesSystemSelectors.selectFilesSystem);

  return (
    <FilesTreeContainer>
      <h3>{rootFilename}</h3>
      {filesTree.map((item: FilesSystem, index: number) => (
        <p key={index}>{item.fileName}</p>
      ))}
    </FilesTreeContainer>
  );
};

const FilesTreeContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  padding: 10px;
`;
