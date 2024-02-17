import type { FilesSystem } from "@/types";

const getFileName = (filePath: string): string => {
  if (!filePath) return "";
  if (filePath.endsWith("/")) {
    filePath = filePath.slice(0, -1);
  }
  const lastSlashIndex = filePath.lastIndexOf("/");
  return filePath.substring(lastSlashIndex + 1);
};

function cloneDeepObject<T>(object: T): T {
  return JSON.parse(JSON.stringify(object)) as T;
}

const cloneFilesTree = (filesTreeInput: FilesSystem[]) => {
  return cloneDeepObject(filesTreeInput);
};

const cloneFileSystem = (fileSystem: FilesSystem) => {
  return cloneDeepObject(fileSystem);
};

export { getFileName, cloneFilesTree, cloneFileSystem, cloneDeepObject };
