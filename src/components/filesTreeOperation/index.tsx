import styled from 'styled-components';
import { AddFileButton } from '@/components/common/addFileButton';
import { AddFolderButton } from '@/components/common/addFolderButton';
import { UploadFileButton } from '@/components/common/uploadFileButton';
import { DownloadFileButton } from '@/components/common/downloadFileButton';

export const FilesTreeOperation: React.FC = () => {
  return (
    <FilesTreeOperationContainer>
      <AddFileButton />
      <AddFolderButton />
      <UploadFileButton />
      <DownloadFileButton />
    </FilesTreeOperationContainer>
  )
}

const FilesTreeOperationContainer = styled.div`
  display: block;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #333;
  padding: 10px;
`;

