import styled from 'styled-components';
import { FiPlus } from "react-icons/fi";

export const AddFileButton: React.FC = () => {
  return (
    <AddFileButtonContainer title="New File">
      <FiPlus size='1rem' color="#d4d4d4" />
    </AddFileButtonContainer>
  )
}

const AddFileButtonContainer = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 3px;
  border: 1px solid #d4d4d4;
  cursor: pointer;
`;
