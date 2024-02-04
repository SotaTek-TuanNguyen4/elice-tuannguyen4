import styled from 'styled-components';

export const OpenTab: React.FC = () => {
  return (
    <OpenTabContainer>Open Tab</OpenTabContainer>
  )
}

const OpenTabContainer = styled.div`
  display: block;
  width: 100px;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
