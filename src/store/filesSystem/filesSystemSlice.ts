import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilesSystem } from "@/types";
import { cloneFileSystem, cloneDeepObject } from "@/utils";

type fileSystemState = {
  files: FilesSystem[];
  rootFolderName: string;
  fileTabs: FilesSystem[];
  filePathActive: string | null;
};

const initialState: fileSystemState = {
  files: [],
  rootFolderName: "",
  fileTabs: [],
  filePathActive: null,
};

const handleUpdateFilesTree = (
  state: fileSystemState,
  newFolderFile: FilesSystem
) => {
  state.files.push(newFolderFile);
  state.files.sort((file1: FilesSystem, file2: FilesSystem) =>
    file1.pathName.localeCompare(file2.pathName)
  );
  state.fileTabs.push(newFolderFile);
  state.filePathActive = newFolderFile.pathName;
};

const handleAddFolderFile = (
  state: fileSystemState,
  action: PayloadAction<{
    hasRootFolder: boolean;
    rootFolderName: string;
    fileName: string;
  }>,
  isAddFolder: boolean
) => {
  const currentFileFocusIndex = state.files.findIndex(
    (file) => file.isFocus === true
  );
  if (currentFileFocusIndex === -1) {
    if (action.payload.hasRootFolder) {
      const newFolderFile = {
        fileName: action.payload.fileName,
        pathName: isAddFolder
          ? `${action.payload.rootFolderName}${action.payload.fileName}/`
          : `${action.payload.rootFolderName}${action.payload.fileName}`,
        rawData: "",
        contentText: "",
        arrayBufferFile: new ArrayBuffer(0),
        isExpand: true,
        isFolder: isAddFolder ? true : false,
        isBinary: false,
        isFocus: true,
      };
      handleUpdateFilesTree(state, newFolderFile);
    } else {
      const newFolderFile = {
        fileName: action.payload.fileName,
        pathName: isAddFolder
          ? `${action.payload.fileName}/`
          : action.payload.fileName,
        rawData: "",
        contentText: "",
        arrayBufferFile: new ArrayBuffer(0),
        isExpand: true,
        isFolder: isAddFolder ? true : false,
        isBinary: false,
        isFocus: true,
      };
      handleUpdateFilesTree(state, newFolderFile);
    }
  } else {
    state.files[currentFileFocusIndex].isFocus = false;
    if (state.files[currentFileFocusIndex].isFolder) {
      const newFolderFile = {
        fileName: action.payload.fileName,
        pathName: isAddFolder
          ? `${state.files[currentFileFocusIndex].pathName}${action.payload.fileName}/`
          : `${state.files[currentFileFocusIndex].pathName}${action.payload.fileName}`,
        rawData: "",
        contentText: "",
        arrayBufferFile: new ArrayBuffer(0),
        isExpand: true,
        isFolder: isAddFolder ? true : false,
        isBinary: false,
        isFocus: true,
      };
      handleUpdateFilesTree(state, newFolderFile);
    } else {
      const currentFile = state.files[currentFileFocusIndex];
      const indexOfFileName = currentFile.pathName.indexOf(
        currentFile.fileName
      );
      const parentFolderPathName = currentFile.pathName.substring(
        0,
        indexOfFileName
      );
      const newFolderFile = {
        fileName: action.payload.fileName,
        pathName: isAddFolder
          ? `${parentFolderPathName}${action.payload.fileName}/`
          : `${parentFolderPathName}${action.payload.fileName}`,
        rawData: "",
        contentText: "",
        arrayBufferFile: new ArrayBuffer(0),
        isExpand: true,
        isFolder: isAddFolder ? true : false,
        isBinary: false,
        isFocus: true,
      };
      handleUpdateFilesTree(state, newFolderFile);
    }
  }
};

export const filesSystemSlice = createSlice({
  name: "filesSystem",
  initialState,
  reducers: {
    saveFiles: (
      state,
      action: PayloadAction<{ files: FilesSystem[]; rootFolderName: string }>
    ) => {
      state.files = action.payload.files;
      state.rootFolderName = action.payload.rootFolderName;
      state.filePathActive = null;
      state.fileTabs = [];
    },
    updateFile: (state, action: PayloadAction<string>) => {
      const currentActiveTabIndex = state.fileTabs.findIndex(
        (tab) => tab.pathName === state.filePathActive
      );
      if (currentActiveTabIndex === -1) return;
      state.fileTabs[currentActiveTabIndex].contentText = action.payload;

      const currentFileActiveIndex = state.files.findIndex(
        (tab) => tab.pathName === state.filePathActive
      );
      if (currentFileActiveIndex !== -1) {
        state.files[currentFileActiveIndex].contentText = action.payload;
      }
    },
    openFile: (state, action: PayloadAction<string>) => {
      const filePath = action.payload;
      const fileOpened = state.fileTabs.find(
        (file) => file.pathName === filePath
      );

      if (fileOpened) {
        state.filePathActive = filePath;
        return;
      }

      const fileSystem = state.files.find((file) => file.pathName === filePath);
      if (!fileSystem) {
        return;
      }

      state.fileTabs.push(cloneFileSystem(fileSystem));
      if (state.filePathActive !== action.payload) {
        state.filePathActive = action.payload;
      }
    },
    closeFile: (state, action: PayloadAction<string>) => {
      if (state.filePathActive === action.payload) {
        const currentActiveTabIndex = state.fileTabs.findIndex(
          (tab) => tab.pathName === action.payload
        );
        if (currentActiveTabIndex === -1) {
          return;
        } else if (state.fileTabs.length === 1) {
          state.filePathActive = null;
        } else if (currentActiveTabIndex === 0) {
          state.filePathActive = state.fileTabs[1].pathName;
        } else if (currentActiveTabIndex > 0) {
          state.filePathActive =
            state.fileTabs[currentActiveTabIndex - 1].pathName;
        }
      }
      const filesOpened = state.fileTabs.filter(
        (file) => file.pathName !== action.payload
      );
      state.fileTabs = filesOpened;
    },
    changeFileActive: (state, action: PayloadAction<string>) => {
      if (state.filePathActive === action.payload) return;
      state.filePathActive = action.payload;
    },
    updateFileFocus: (state, action: PayloadAction<string>) => {
      const prevFileFocusIndex = state.files.findIndex(
        (file) => file.isFocus === true
      );
      if (prevFileFocusIndex !== -1) {
        state.files[prevFileFocusIndex].isFocus = false;
      }
      const currentFileFocusIndex = state.files.findIndex(
        (file) => file.pathName === action.payload
      );
      if (currentFileFocusIndex !== -1) {
        state.files[currentFileFocusIndex].isFocus = true;
      }
    },
    deleteFileOrFolder: (state) => {
      const currentFileFocusIndex = state.files.findIndex(
        (file) => file.isFocus === true
      );
      if (currentFileFocusIndex === -1) return;
      const currentFileFocus: FilesSystem = state.files[currentFileFocusIndex];

      if (currentFileFocus.isFolder) {
        const folderAndSubFiles = state.files.filter((file: FilesSystem) =>
          file.pathName.startsWith(currentFileFocus.pathName)
        );
        state.files.splice(currentFileFocusIndex, folderAndSubFiles.length);

        const cloneFolderAndSubFiles = cloneDeepObject(folderAndSubFiles);
        cloneFolderAndSubFiles.shift();
        cloneFolderAndSubFiles.forEach((file: FilesSystem) => {
          const fileTabOpenedIndex = state.fileTabs.findIndex(
            (item: FilesSystem) => item.pathName === file.pathName
          );
          if (fileTabOpenedIndex !== -1) {
            state.fileTabs.splice(fileTabOpenedIndex, 1);
          }
        });
      } else {
        state.files.splice(currentFileFocusIndex, 1);

        const fileTabOpenedIndex = state.fileTabs.findIndex(
          (file) => file.pathName === currentFileFocus.pathName
        );
        if (fileTabOpenedIndex !== -1) {
          state.fileTabs.splice(fileTabOpenedIndex, 1);
        }
      }
    },
    addFolder: (
      state,
      action: PayloadAction<{
        hasRootFolder: boolean;
        rootFolderName: string;
        fileName: string;
      }>
    ) => {
      const isAddFolder = true;
      handleAddFolderFile(state, action, isAddFolder);
    },
    addFile: (
      state,
      action: PayloadAction<{
        hasRootFolder: boolean;
        rootFolderName: string;
        fileName: string;
      }>
    ) => {
      const isAddFolder = false;
      handleAddFolderFile(state, action, isAddFolder);
    },
  },
});

export const {
  saveFiles,
  updateFile,
  openFile,
  closeFile,
  changeFileActive,
  updateFileFocus,
  deleteFileOrFolder,
  addFolder,
  addFile,
} = filesSystemSlice.actions;

export default filesSystemSlice.reducer;
