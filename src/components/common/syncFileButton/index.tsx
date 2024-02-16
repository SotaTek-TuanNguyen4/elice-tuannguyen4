import styled from 'styled-components';
import { FiRefreshCw } from "react-icons/fi";

export const SyncFileButton: React.FC = () => {
  return (
    <SyncFileButtonContainer title="Sync File">
      <FiRefreshCw size='1rem' color="#d4d4d4" />
    </SyncFileButtonContainer>
  )
}

const SyncFileButtonContainer = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 3px;
  border: 1px solid #d4d4d4;
  cursor: pointer;
`;
