import styled from 'styled-components';
import { AddFileButton } from '@/components/common/addFileButton';
import { AddFolderButton } from '@/components/common/addFolderButton';
import { UploadFileButton } from '@/components/common/uploadFileButton';
import { DownloadFileButton } from '@/components/common/downloadFileButton';
import { DeleteButton } from '@/components/common/deleteButton';
import { SyncFileButton } from '@/components/common/syncFileButton';

export const FilesTreeOperation: React.FC = () => {
  return (
    <FilesTreeOperationContainer>
      <AddFileButton />
      <AddFolderButton />
      <UploadFileButton />
      <DownloadFileButton />
      <DeleteButton />
      <SyncFileButton />
    </FilesTreeOperationContainer>
  )
}

const FilesTreeOperationContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #333;
  padding: 10px;
`;

