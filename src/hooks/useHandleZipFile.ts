import JSZip from 'jszip';
import { FilesSystem } from "@/types/files"
import * as FileSaver from "file-saver"

export const useHandleZipFile = () => {

  const getZipFiles = async (zipData: JSZip): Promise<FilesSystem[]> => {
    let filesSystem: FilesSystem[] = [];
    try {
      const fileDataPromise = Object.keys(zipData.files).map(async (fileName) => {
        const file = zipData.files[fileName];
        const arrayBufferFile = await file.async('arraybuffer');
        return file.async('string').then((value) => ({
          fileName: file.name,
          rawData: JSON.stringify(file),
          dataText: value,
          arrayBufferFile
        }));
      });
      filesSystem = await Promise.all(fileDataPromise);
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
    filesSystem.forEach(async ({ fileName, arrayBufferFile }) => {
      zip.file(fileName, arrayBufferFile);
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
