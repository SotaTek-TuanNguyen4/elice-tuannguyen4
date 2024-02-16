import styled from 'styled-components';
import { FiTrash2 } from "react-icons/fi";

export const DeleteButton: React.FC = () => {
  return (
    <DeleteButtonContainer title="Delete File/Folder">
      <FiTrash2 size='1rem' color="#d4d4d4" />
    </DeleteButtonContainer>
  )
}

const DeleteButtonContainer = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 3px;
  border: 1px solid #d4d4d4;
  cursor: pointer;
`;
