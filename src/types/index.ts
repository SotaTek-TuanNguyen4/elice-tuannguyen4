type FilesSystem = {
  fileName: string;
  pathName: string;
  rawData: string;
  contentText: string;
  arrayBufferFile: ArrayBuffer;
  isExpand: boolean;
  isFolder: boolean;
  isBinary: boolean;
  isFocus: boolean;
};

type TreeFolder = Omit<
  FilesSystem,
  "arrayBufferFile" | "rawData" | "contentText"
>;

export type { FilesSystem, TreeFolder };
