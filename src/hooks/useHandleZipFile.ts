import JSZip from 'jszip';
import { FilesSystem } from "@/types"
import * as FileSaver from "file-saver"
import { getFileName } from '@/utils';

export const useHandleZipFile = () => {

  const getZipFiles = async (zipData: JSZip): Promise<FilesSystem[]> => {
    let filesSystem: FilesSystem[] = [];
    try {
      const fileDataPromise = Object.keys(zipData.files).map(async (item) => {
        const file = zipData.files[item];
        const arrayBufferFile = await file.async('arraybuffer');
        return file.async('string').then((value) => ({
          fileName: getFileName(file.name),
          pathName: file.name,
          rawData: JSON.parse(JSON.stringify(file)),
          contentText: value,
          arrayBufferFile,
          isExpand: true,
          isFolder: file.dir,
          isBinary: false,
          isFocus: false
        }));
      });
      filesSystem = await Promise.all(fileDataPromise);
      filesSystem.sort((file1: FilesSystem, file2: FilesSystem) => file1.pathName.localeCompare(file2.pathName))
    } catch (error) {
      console.error('Read files error');
    }

    return filesSystem;
  }

  const extractFilesFromZip = (files: File): Promise<FilesSystem[] | null> => {
    const zip = new JSZip();
    return zip.loadAsync(files).then(
      (zipData) => getZipFiles(zipData),
      () => {
        alert('Invalid zip file');
        return null;
      }
    );
  };

  const convertFilesSystemToZip = async (filesSystem: FilesSystem[]) => {
    const zip = new JSZip();
    filesSystem.forEach(async ({ pathName, contentText }) => {
      zip.file(pathName, contentText);
    });
    const zipBlob = await zip.generateAsync({ type: 'blob' });
  
    return zipBlob;
  }; 

  const downloadZipFile = (zipBlob: Blob, fileName: string) => {
    FileSaver.saveAs(zipBlob, fileName)
  }

  return {
    extractFilesFromZip,
    convertFilesSystemToZip,
    downloadZipFile
  }
}
