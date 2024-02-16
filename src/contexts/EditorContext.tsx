import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ThemeContextType {
  isReadFileLoading: boolean;
  setIsReadFileLoading: Dispatch<SetStateAction<boolean>>;
}

export const EditorContext = createContext<ThemeContextType>({
  isReadFileLoading: false,
  setIsReadFileLoading: () => {},
});

export const EditorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isReadFileLoading, setIsReadFileLoading] = useState(false);

  return (
    <EditorContext.Provider value={{ isReadFileLoading, setIsReadFileLoading }}>
      {children}
    </EditorContext.Provider>
  );
};
