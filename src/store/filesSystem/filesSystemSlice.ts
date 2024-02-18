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
    openFile: (state, action: PayloadAction<FilesSystem>) => {
      const filePath = action.payload.pathName;
      const fileOpened = state.fileTabs.find(
        (file) => file.pathName === filePath
      );

      if (fileOpened) {
        state.filePathActive = filePath;
        return;
      }
      state.fileTabs.push(cloneFileSystem(action.payload));
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
} = filesSystemSlice.actions;

export default filesSystemSlice.reducer;
