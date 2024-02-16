import styled from 'styled-components';
import { FiFolderPlus } from "react-icons/fi";

export const AddFolderButton: React.FC = () => {
  return (
    <AddFolderButtonContainer title="New Folder">
      <FiFolderPlus size='1rem' color="#d4d4d4" />
    </AddFolderButtonContainer>
  )
}

const AddFolderButtonContainer = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 3px;
  border: 1px solid #d4d4d4;
  cursor: pointer;
`;
