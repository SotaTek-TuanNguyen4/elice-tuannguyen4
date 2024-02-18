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

const findCommonSubstring = (stringArray: string[]) => {
  if (stringArray.length === 0) return "";

  let commonSubstring = stringArray[0];

  for (let i = 1; i < stringArray.length; i++) {
    const currentString = stringArray[i];
    let j = 0;
    while (
      j < commonSubstring.length &&
      j < currentString.length &&
      commonSubstring[j] === currentString[j]
    ) {
      j++;
    }
    commonSubstring = commonSubstring.substring(0, j);
  }

  return commonSubstring;
};

const checkPathNameIsRootFolder = (
  filesTree: FilesSystem[],
  pathName: string
) => {
  return filesTree.every((file: FilesSystem) =>
    file.pathName.startsWith(pathName)
  );
};

export {
  getFileName,
  cloneFilesTree,
  cloneFileSystem,
  cloneDeepObject,
  findCommonSubstring,
  checkPathNameIsRootFolder,
};
