import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { FilesSystem } from "@/types"

type fileSystemState = {
  files: FilesSystem[];
  rootFolderName: string;
};

const initialState: fileSystemState = {
  files: [],
  rootFolderName: '',
};

export const filesSystemSlice = createSlice({
  name: 'filesSystem',
  initialState,
  reducers: {
    saveFiles: (state, action : PayloadAction<fileSystemState>) => {
      state.files = action.payload.files
      state.rootFolderName = action.payload.rootFolderName
    },
    updateFile: (state, { payload }: PayloadAction<{ fileName: string; data: string }>) => {

    },
    downloadFiles : (state, { payload }: PayloadAction<{ fileName: string; data: string }>) => {

    }
  }
})

export const { saveFiles, updateFile, downloadFiles } = filesSystemSlice.actions

export default filesSystemSlice.reducer
