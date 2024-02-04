import styled from 'styled-components';
import { LuArrowUpFromLine } from "react-icons/lu";

export const UploadFileButton: React.FC = () => {

  const handleUploadZipFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const zipFile = event.target.files?.[0];
    if (!zipFile) return;
  };

  const clickUploadFileButton = () => {
    const fileUploadElement = document.getElementById('fileUpload')
    if (fileUploadElement) {
      fileUploadElement.click();
    }
  }

  return (
    <>
      <UploadFileButtonContainer title="Upload Zip File" onClick={clickUploadFileButton}>
        <LuArrowUpFromLine size='1rem' color="#d4d4d4" />
      </UploadFileButtonContainer>
      <input
        type="file"
        onChange={(e) => handleUploadZipFile(e)}
        accept=".zip"
        id="fileUpload"
        style={{ display: 'none' }}
      />
    </>
  )
}

const UploadFileButtonContainer = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 3px;
  border: 1px solid #d4d4d4;
  cursor: pointer;
`;
