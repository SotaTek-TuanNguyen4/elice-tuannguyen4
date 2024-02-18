import styled from "styled-components";
import { FiPlus } from "react-icons/fi";
import { useHasRootFolder } from "@/hooks/useHasRootFolder";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks/useStoreHooks";
import { InputFileNameModal } from "@/components/modal/InputFileNameModal";
import { addFile } from "@/store/filesSystem/filesSystemSlice";

export const AddFileButton: React.FC = () => {
  const [fileName, setFileName] = useState<string>("");
  const [isOpenInputFileNameModal, setIsOpenInputFileNameModal] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { hasRootFolder, rootFolderName } = useHasRootFolder();

  const handleAddFile = () => {
    setIsOpenInputFileNameModal(true);
  };

  const handleSaveFileName = () => {
    dispatch(addFile({ hasRootFolder, rootFolderName, fileName }));
    setIsOpenInputFileNameModal(false);
  };

  const handleCloseAddFileNameModal = () => {
    setIsOpenInputFileNameModal(false);
    setFileName("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let timeoutId = null;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setFileName(event.target.value);
    }, 500);
  };

  return (
    <>
      <AddFileButtonContainer title="New File" onClick={handleAddFile}>
        <FiPlus size="1rem" color="#d4d4d4" />
      </AddFileButtonContainer>
      <InputFileNameModal
        isOpen={isOpenInputFileNameModal}
        onClose={handleCloseAddFileNameModal}
        onClickYes={handleSaveFileName}
        onInputChange={handleInputChange}
        modalTitle="Input File Name"
      />
    </>
  );
};

const AddFileButtonContainer = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 3px;
  border: 1px solid #d4d4d4;
  cursor: pointer;
`;
