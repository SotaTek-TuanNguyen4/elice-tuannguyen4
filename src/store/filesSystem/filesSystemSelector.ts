import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '@/store';

const filesSystemState = (state: RootState) => state.filesSystem;

const selectRootFolderName = createSelector(filesSystemState, (state) => state.rootFolderName)
const selectFilesSystem = createSelector(filesSystemState, (state) => state.files)

export const filesSystemSelectors = {
  selectRootFolderName,
  selectFilesSystem
}
