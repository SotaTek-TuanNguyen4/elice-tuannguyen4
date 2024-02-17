import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilesSystem } from "@/types";
import { cloneFileSystem } from "@/utils";

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
      if (currentActiveTabIndex !== -1) {
        state.fileTabs[currentActiveTabIndex].contentText = action.payload;
      }
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
  },
});

export const {
  saveFiles,
  updateFile,
  openFile,
  closeFile,
  changeFileActive,
  updateFileFocus,
} = filesSystemSlice.actions;

export default filesSystemSlice.reducer;
