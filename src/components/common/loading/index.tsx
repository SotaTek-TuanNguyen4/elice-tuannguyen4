import styled from "styled-components";

export const LoadingComponent = () => {
    return (
      <LoadingScreen className="loading-screen">
        <LoadingSpinner className="loading-spinner"></LoadingSpinner>
      </LoadingScreen>
    );
};

const LoadingScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #323131;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingSpinner = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #f7ae65;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
