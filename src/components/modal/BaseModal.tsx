import styled from "styled-components";
import { FiXSquare } from "react-icons/fi";
import { Dispatch, SetStateAction, ReactNode } from "react";

interface BaseModalProp {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  onClickYes: () => void;
  onClickNo?: () => void;
  hasButtonNo: boolean;
  children: ReactNode;
}

export const BaseModal = ({
  isOpen,
  onClose,
  onClickYes,
  onClickNo,
  hasButtonNo,
  children,
}: BaseModalProp) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTopContainer>
          <FiXSquare
            size="1.5rem"
            color="#787878"
            onClick={() => onClose(false)}
          />
        </ModalTopContainer>
        {children}
        
        <ModalBottomContainer>
          <ModalActionButton onClick={onClickYes}>Save</ModalActionButton>
          {hasButtonNo && (
            <ModalActionButton onClick={onClickNo}>
              Don't Save
            </ModalActionButton>
          )}
          <ModalActionButton onClick={() => onClose(false)}>
            Cancel
          </ModalActionButton>
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
