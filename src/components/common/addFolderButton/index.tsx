import styled from "styled-components";
import { FiFolderPlus } from "react-icons/fi";
import { useAppDispatch } from "@/store/hooks/useStoreHooks";
import { useHasRootFolder } from "@/hooks/useHasRootFolder";
import { addFolder } from "@/store/filesSystem/filesSystemSlice";
import { InputFileNameModal } from "@/components/modal/InputFileNameModal";
import { useState } from "react";

export const AddFolderButton: React.FC = () => {
  const [folderName, setFolderName] = useState<string>("");
  const [isOpenInputFileNameModal, setIsOpenInputFileNameModal] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { hasRootFolder, rootFolderName } = useHasRootFolder();

  const handleAddFolder = () => {
    setIsOpenInputFileNameModal(true);
  };

  const handleSaveFolderName = () => {
    dispatch(
      addFolder({ hasRootFolder, rootFolderName, fileName: folderName })
    );
    setIsOpenInputFileNameModal(false);
  };

  const handleCloseAddFolderNameModal = () => {
    setIsOpenInputFileNameModal(false);
    setFolderName("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let timeoutId = null;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setFolderName(event.target.value);
    }, 500);
  };

  return (
    <>
      <AddFolderButtonContainer title="New Folder" onClick={handleAddFolder}>
        <FiFolderPlus size="1rem" color="#d4d4d4" />
      </AddFolderButtonContainer>
      <InputFileNameModal
        isOpen={isOpenInputFileNameModal}
        onClose={handleCloseAddFolderNameModal}
        onClickYes={handleSaveFolderName}
        onInputChange={handleInputChange}
        modalTitle="Input Folder Name"
      />
    </>
  );
};

const AddFolderButtonContainer = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 3px;
  border: 1px solid #d4d4d4;
  cursor: pointer;
`;
