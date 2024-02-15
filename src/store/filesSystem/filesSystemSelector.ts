import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

const filesSystemState = (state: RootState) => state.filesSystem;

const selectRootFolderName = createSelector(
  filesSystemState,
  (state) => state.rootFolderName
);
const selectFilesSystem = createSelector(
  filesSystemState,
  (state) => state.files
);
const selectTabsOpen = createSelector(
  filesSystemState,
  (state) => state.fileTabs
);
const selectFilePathActive = createSelector(
  filesSystemState,
  (state) => state.filePathActive
);

export const filesSystemSelectors = {
  selectRootFolderName,
  selectFilesSystem,
  selectTabsOpen,
  selectFilePathActive,
};
