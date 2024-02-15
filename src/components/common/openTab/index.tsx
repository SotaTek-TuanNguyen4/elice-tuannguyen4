import styled from "styled-components";
import type { FilesSystem } from "@/types";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/useStoreHooks";
import { filesSystemSelectors } from "@/store/filesSystem/filesSystemSelector";
import { closeFile } from "@/store/filesSystem/filesSystemSlice";
import { FiX } from "react-icons/fi";
import { changeFileActive } from "@/store/filesSystem/filesSystemSlice";

interface OpenTabProps {
  file: FilesSystem;
}

export const OpenTab: React.FC<OpenTabProps> = ({ file }: OpenTabProps) => {
  const dispatch = useAppDispatch();
  const pathActiveTab: string = useAppSelector(
    filesSystemSelectors.selectFilePathActive
  );

  const handleCloseTab = (
    filePath: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(closeFile(filePath));
    event.stopPropagation();
  };

  const handleClickTab = (filePath: string) => {
    dispatch(changeFileActive(filePath));
  };

  const isActiveTab = useMemo(() => {
    return file.pathName === pathActiveTab;
  }, [file.pathName, pathActiveTab]);

  return (
    <OpenTabContainer
      title={file.pathName}
      className={isActiveTab ? "active" : ""}
      onClick={() => handleClickTab(file.pathName)}
    >
      <FileName className={isActiveTab ? "active" : ""}>
        {file.fileName}
      </FileName>
      <CloseButton
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          handleCloseTab(file.pathName, event)
        }
      >
        <FiX size="1rem" color="#FFF" />
      </CloseButton>
    </OpenTabContainer>
  );
};

const OpenTabContainer = styled.button`
  display: inline-flex;
  align-items: center;
  width: 150px;
  height: 100%;
  background: #343434;
  padding: 0 5px;
  border: none;
  cursor: pointer;
  margin-right: 2px;
  &.active {
    background-color: #1e1e1e;
  }
`;

const FileName = styled.div`
  flex: 1;
  color: #e2c08d;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: transparent;
  &.active {
    color: #ff7f50;
  }
`;

const CloseButton = styled.span`
  cursor: pointer;
  background: none;
  padding: 3px;
  &:hover {
    background: #616161;
    border-radius: 2px;
  }
`;
