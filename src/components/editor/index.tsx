import { useEffect, useRef, useMemo, useContext } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks/useStoreHooks";
import { BinaryFileExtension, PreDefineLanguages } from "@/constants";
import { filesSystemSelectors } from "@/store/filesSystem/filesSystemSelector";
import type { FilesSystem } from "@/types";
import { updateFile } from "@/store/filesSystem/filesSystemSlice";
import { EditorContext } from "@/contexts/EditorContext";
import { getFileExtension } from "@/utils";
import { ImageView } from "@/components/editor/ImageView";

type LanguageExtention = keyof typeof PreDefineLanguages;
enum FileType {
  IMAGE = "image",
  PLAIN_TEXT = "plainText",
  NOT_READ = "notRead",
}

export const MonacoEditor: React.FC = () => {
  const { editor, setEditor } = useContext(EditorContext);
  const monacoEl = useRef(null);
  const editorContainerEl = useRef<HTMLDivElement>(null);
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

  const getFileType: FileType = useMemo(() => {
    if (!fileOpened?.fileName) return FileType.PLAIN_TEXT;
    const fileExtension = getFileExtension(fileOpened?.fileName);
    if (!fileExtension) return FileType.NOT_READ;
    if (BinaryFileExtension.includes(fileExtension)) {
      return FileType.IMAGE;
    }
    return FileType.PLAIN_TEXT;
  }, [fileOpened]);

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
    if (fileOpened && editor && getFileType === FileType.PLAIN_TEXT) {
      editor.setValue(fileOpened.contentText);
      const fileExtension = getFileExtension(fileOpened.fileName);
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
  }, [getFileType, fileOpened]);

  return (
    <Container ref={editorContainerEl}>
      <EditorContainer
        ref={monacoEl}
        className={getFileType === FileType.PLAIN_TEXT ? "" : "hidden"}
      ></EditorContainer>
      ;
      {getFileType === FileType.IMAGE && fileOpened && (
        <ImageView
          fileSystem={fileOpened}
          width={editorContainerEl.current?.clientWidth}
          height={editorContainerEl.current?.clientHeight}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #1e1e1e;
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
`;

const EditorContainer = styled.div`
  height: calc(100% - 5px);
  &.hidden {
    opacity: 0;
    pointer-events: none;
    display: none;
  }
`;
