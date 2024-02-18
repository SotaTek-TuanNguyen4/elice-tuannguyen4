import { useAppSelector } from "@/store/hooks/useStoreHooks";
import type { FilesSystem } from "@/types";
import { filesSystemSelectors } from "@/store/filesSystem/filesSystemSelector";
import { useEffect, useState } from "react";
import { findCommonSubstring, checkPathNameIsRootFolder } from "@/utils";

export const useHasRootFolder = () => {
  const [hasRootFolder, setHasRootFolder] = useState<boolean>(true);
  const [rootFolderName, setRootFolderName] = useState<string>("");
  const filesTree: FilesSystem[] = useAppSelector(
    filesSystemSelectors.selectFilesSystem
  );

  useEffect(() => {
    if (filesTree) {
      const arrPathName = filesTree.map((item: FilesSystem) => item.pathName);
      const commonPathName = findCommonSubstring(arrPathName);
      if (!commonPathName) {
        setHasRootFolder(false);
      } else {
        const isRootFolderPath = checkPathNameIsRootFolder(
          filesTree,
          commonPathName
        );
        setHasRootFolder(isRootFolderPath);
        if (isRootFolderPath) {
          setRootFolderName(commonPathName);
        }
      }
    }
  }, [filesTree]);

  return { hasRootFolder, rootFolderName };
};
