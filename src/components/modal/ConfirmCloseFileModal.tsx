import { FiAlertTriangle } from "react-icons/fi";
import styled from "styled-components";
import { FiXSquare } from "react-icons/fi";
import { Dispatch, SetStateAction } from "react";

interface ConfirmCloseFileModalProp {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  onClickYes: () => void;
  onClickNo: () => void;
}

export const ConfirmCloseFileModal = ({
  isOpen,
  onClose,
  onClickYes,
  onClickNo,
}: ConfirmCloseFileModalProp) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTopContainer>
          <FiXSquare size="1.5rem" color="#787878" onClick={() => onClose(false)} />
        </ModalTopContainer>
        <ModalContentContainer>
          <FiAlertTriangle size="3rem" color="#E9D502" />
          <ModalContent>
            <h2>Do you want to save the changes?</h2>
            <h4>Your changes will be lost if you don't save them.</h4>
          </ModalContent>
        </ModalContentContainer>
        <ModalBottomContainer>
          <ModalActionButton onClick={onClickYes}>Save</ModalActionButton>
          <ModalActionButton onClick={onClickNo}>Don't Save</ModalActionButton>
          <ModalActionButton onClick={() => onClose(false)}>Cancel</ModalActionButton>
        </ModalBottomContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

const ModalContainer = styled.div`
  background: #f5f5f5;
  z-index: 100;
  width: 450px;
  border-radius: 2px;
  padding: 10px;
`;

const ModalTopContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalContentContainer = styled.div`
  display: flex;
  aligns-item: top;
`;

const ModalContent = styled.div`
  width: calc(100% - 48px);
  text-align: left;
  padding-left: 15px;
  & h2 {
    margin-top: 5px;
  }
`;

const ModalBottomContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalActionButton = styled.button`
  width: 80px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: lightblue;
    border: 1px solid;
    border-radius: 2px;
  }
`;
