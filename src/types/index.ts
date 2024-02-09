type FilesSystem = {
  fileName: string;
  rawData: string;
  contentText: string;
  arrayBufferFile: ArrayBuffer;
};

type TreeNode = {
  label: string;
  path: string;
  isFolder: boolean;
  children?: TreeNode[];
};

export type { FilesSystem, TreeNode };
