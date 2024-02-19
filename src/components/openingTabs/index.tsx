import styled from "styled-components";
import type { FilesSystem } from "@/types";
import { useAppSelector } from "@/store/hooks/useStoreHooks";
import { filesSystemSelectors } from "@/store/filesSystem/filesSystemSelector";
import { OpenTab } from "@/components/common/openTab";

export const OpeningTabs: React.FC = () => {
  const tabsOpened: FilesSystem[] = useAppSelector(
    filesSystemSelectors.selectTabsOpen
  );

  return (
    <OpeningTabsContainer>
      {tabsOpened.map((tab: FilesSystem, index) => (
        <OpenTab key={index} file={tab} />
      ))}
    </OpeningTabsContainer>
  );
};

const OpeningTabsContainer = styled.div`
  display: block;
  width: 100%;
  height: 50px;
  min-height: 50px;
  background-color: #181818;
  overflow: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 6px; 
  }
  
  &::-webkit-scrollbar-track {
    border-radius: 0;
    background: #333;
  }
  
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #787878;
  }
`;
