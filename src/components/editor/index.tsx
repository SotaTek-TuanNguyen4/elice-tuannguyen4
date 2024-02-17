import { useEffect, useRef, useMemo, useContext } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks/useStoreHooks";
import { PreDefineLanguages } from "@/constants";
import { filesSystemSelectors } from "@/store/filesSystem/filesSystemSelector";
import type { FilesSystem } from "@/types";
import { updateFile } from "@/store/filesSystem/filesSystemSlice";
import { EditorContext } from "@/contexts/EditorContext";

type LanguageExtention = keyof typeof PreDefineLanguages;

export const MonacoEditor: React.FC = () => {
  const { editor, setEditor } = useContext(EditorContext);
  const monacoEl = useRef(null);
  const dispatch = useAppDispatch();
  const tabsOpened: FilesSystem[] = useAppSelector(
    filesSystemSelectors.selectTabsOpen
  );
  const filePathActive: string | null = useAppSelector(
    filesSystemSelectors.selectFilePathActive
  );
  const fileOpened: FilesSystem | undefined = useMemo(() => {
    return tabsOpened.find(
      (file: FilesSystem) => file.pathName === filePathActive
    );
  }, [tabsOpened, filePathActive]);

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;
        const editerInstance = monaco.editor.create(monacoEl.current!, {
          theme: "vs-dark",
          tabSize: 2,
        });

        editerInstance.addCommand(
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
          () => {
            const fileContent = editerInstance.getValue();
            dispatch(updateFile(fileContent));
          }
        );

        return editerInstance;
      });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  useEffect(() => {
    if (fileOpened && editor) {
      editor.setValue(fileOpened.contentText);
      const fileExtension = fileOpened.fileName.split(".").pop();
      const initLanguage =
        PreDefineLanguages[fileExtension as LanguageExtention] ??
        PreDefineLanguages["js"];
      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, initLanguage);
      }
    }

    if (!fileOpened && editor) {
      editor.setValue("");
    }
  }, [fileOpened]);

  return <EditorContainer ref={monacoEl}></EditorContainer>;
};

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
`;
