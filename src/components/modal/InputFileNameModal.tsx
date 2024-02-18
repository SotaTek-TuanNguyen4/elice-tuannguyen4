import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { BaseModal } from "@/components/modal/BaseModal";

interface InputFileNameModallProp {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  onClickYes: () => void;
  hasButtonNo?: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  modalTitle: string;
}

export const InputFileNameModal = ({
  isOpen,
  onClose,
  onClickYes,
  hasButtonNo = false,
  onInputChange,
  modalTitle
}: InputFileNameModallProp) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onClickYes={onClickYes}
      hasButtonNo={hasButtonNo}
    >
      <ModalContentContainer>
        <h4>{modalTitle}</h4>
        <InputFileName
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange(event)
          }
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === " " || event.key === "Spacebar") {
              event.preventDefault();
          }
          }}
        />
      </ModalContentContainer>
    </BaseModal>
  );
};

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  aligns-item: top;
  h4 {
    color: #000;
    margin-bottom: 5px;
  }
`;

const InputFileName = styled.input`
  width: 100%;
  margin-bottom: 20px;
  line-height: 30px;
  font-size: 18px;
`;
