import { PageLayout } from "@/components/common/layout/PageLayout"
import { MonacoEditor } from "@/components/editor"
import { FilesTree } from "@/components/filesTree"
import { FilesTreeOperation } from "@/components/filesTreeOperation"
import { OpeningTabs } from "@/components/openingTabs"
import styled from "styled-components"


function BuildEditor () {
  return (
    <PageLayout>
      <FilesTreeArea>
        <FilesTreeOperation />
        <FilesTree />
      </FilesTreeArea>
      <EditorArea>
        <OpeningTabs />
        <MonacoEditor />
      </EditorArea>
    </PageLayout>
  )
}

export default BuildEditor

const FilesTreeArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  background-color: #1e1e1e;
  border-right: 1px solid #333;
  color: #d4d4d4;
  min-width: 200px;
`;

const EditorArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
`;