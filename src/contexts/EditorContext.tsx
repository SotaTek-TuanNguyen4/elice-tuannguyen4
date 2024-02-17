import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

type MonacoEditor = monaco.editor.IStandaloneCodeEditor | null;

interface ThemeContextType {
  isReadFileLoading: boolean;
  setIsReadFileLoading: Dispatch<SetStateAction<boolean>>;
  editor: MonacoEditor;
  setEditor: Dispatch<SetStateAction<MonacoEditor>>;
}

export const EditorContext = createContext<ThemeContextType>({
  isReadFileLoading: false,
  setIsReadFileLoading: () => {},
  editor: null,
  setEditor: () => {},
});

export const EditorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isReadFileLoading, setIsReadFileLoading] = useState(false);
  const [editor, setEditor] = useState<MonacoEditor>(null);

  return (
    <EditorContext.Provider
      value={{ isReadFileLoading, setIsReadFileLoading, editor, setEditor }}
    >
      {children}
    </EditorContext.Provider>
  );
};
