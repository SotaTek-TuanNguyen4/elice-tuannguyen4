import styled from "styled-components";
import { FiRefreshCw } from "react-icons/fi";
import { EditorContext } from "@/contexts/EditorContext";
import { useContext } from "react";
import { useAppDispatch } from "@/store/hooks/useStoreHooks";
import { updateFile } from "@/store/filesSystem/filesSystemSlice";

export const SyncFileButton: React.FC = () => {
  const { editor } = useContext(EditorContext);
  const dispatch = useAppDispatch();

  const handleSyncFile = () => {
    if (!editor) return;
    const fileContent = editor.getValue();
    dispatch(updateFile(fileContent));
  };

  return (
    <SyncFileButtonContainer title="Sync File" onClick={handleSyncFile}>
      <FiRefreshCw size="1rem" color="#d4d4d4" />
    </SyncFileButtonContainer>
  );
};

const SyncFileButtonContainer = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 3px;
  border: 1px solid #d4d4d4;
  cursor: pointer;
`;
