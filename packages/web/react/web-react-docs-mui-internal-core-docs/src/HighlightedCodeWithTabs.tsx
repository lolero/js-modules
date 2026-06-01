import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import type React from 'react';
import { HighlightedCode } from './HighlightedCode';

// Shim for the unpublished `@mui/internal-core-docs/HighlightedCodeWithTabs`
// consumed by the verbatim MUI docs examples in web-react-docs-mui.
export type HighlightedCodeWithTabsProps = {
  tabs: { code: string; language?: string; tab: string }[];
  storageKey?: string;
};

export default function HighlightedCodeWithTabs({
  tabs,
}: HighlightedCodeWithTabsProps): React.ReactNode {
  const [activeTab, setActiveTab] = useState(0);
  const active = tabs[activeTab] ?? tabs[0];

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={(_event, newValue: number) => setActiveTab(newValue)}
        variant="scrollable"
      >
        {tabs.map((tab, index) => (
          <Tab key={tab.tab} label={tab.tab} value={index} />
        ))}
      </Tabs>
      {active && (
        <HighlightedCode code={active.code} language={active.language} />
      )}
    </Box>
  );
}
