import { useState, useEffect, useRef } from "react";
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import styled from 'styled-components';

export const MonacoEditor: React.FC = () => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
	const monacoEl = useRef(null);

  useEffect(() => {
		if (monacoEl) {
			setEditor((editor) => {
				if (editor) return editor;

				return monaco.editor.create(monacoEl.current!, {
					value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
					language: 'typescript',
          theme: 'vs-dark',
          tabSize: 2
				});
			});
		}

		return () => editor?.dispose();
	}, [monacoEl.current]);

  return (
    <EditorContainer ref={monacoEl}></EditorContainer>
  )
}

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
`
