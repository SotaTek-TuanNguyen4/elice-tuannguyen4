import styled from 'styled-components';

export const DownloadFileButton: React.FC = () => {
  return (
    <DownloadFileButtonContainer>Download File Button</DownloadFileButtonContainer>
  )
}

const DownloadFileButtonContainer = styled.button`
  width: 50px;
  height: 100%;
  background: white;
`;
