import styled from 'styled-components';

export const FilesTree: React.FC = () => {
  return (
    <FilesTreeContainer>Files Tree</FilesTreeContainer>
  )
}

const FilesTreeContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  padding: 10px;
`;
