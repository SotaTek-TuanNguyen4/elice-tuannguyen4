import { useState, useEffect, useRef, useMemo } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks/useStoreHooks";
import { PreDefineLanguages } from "@/constants";
import { filesSystemSelectors } from "@/store/filesSystem/filesSystemSelector";
import type { FilesSystem } from "@/types";
import { updateFile } from "@/store/filesSystem/filesSystemSlice";

type LanguageExtention = keyof typeof PreDefineLanguages;

export const MonacoEditor: React.FC = () => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
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
          async () => {
            const fileContent = editerInstance.getValue();
            await dispatch(updateFile(fileContent));
            alert("File Saved");
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
  }, [fileOpened]);

  return <EditorContainer ref={monacoEl}></EditorContainer>;
};

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
`;
