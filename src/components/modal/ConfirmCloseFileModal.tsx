import { FiAlertTriangle } from "react-icons/fi";
import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { BaseModal } from "@/components/modal/BaseModal";

interface ConfirmCloseFileModalProp {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  onClickYes: () => void;
  onClickNo: () => void;
  hasButtonNo?: boolean;
}

export const ConfirmCloseFileModal = ({
  isOpen,
  onClose,
  onClickYes,
  onClickNo,
  hasButtonNo = true,
}: ConfirmCloseFileModalProp) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onClickYes={onClickYes}
      onClickNo={onClickNo}
      hasButtonNo={hasButtonNo}
    >
      <ModalContentContainer>
        <FiAlertTriangle size="3rem" color="#E9D502" />
        <ModalContent>
          <h2>Do you want to save the changes?</h2>
          <h4>Your changes will be lost if you don't save them.</h4>
        </ModalContent>
      </ModalContentContainer>
    </BaseModal>
  );
};

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
