import { Select, Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSourceCode } from '@tabler/icons-react';
import { Prism } from '@mantine/prism';
import ViewSettings from './ViewSettings';
import { RecognizerResultWithSubstring } from '../../pages/api/neranalysis';

interface ResultDetailPanelProps {
  analysisRequestResults: RecognizerResultWithSubstring[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}
function RawResultPanel({
  analysisRequestResults,
  isLoading,
  isError,
  error,
}: ResultDetailPanelProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }
  if (analysisRequestResults === undefined) {
    return <div>analysisRequestResults is undefined</div>;
  }
  return (
    <Prism language="json" withLineNumbers>
      {JSON.stringify(analysisRequestResults, null, 2)}
    </Prism>
  );
}

export default function ResultDetailPanel({
  analysisRequestResults,
  isLoading,
  isError,
  error,
}: ResultDetailPanelProps) {
  return (
    <Tabs defaultValue="view">
      <Tabs.List>
        <Tabs.Tab value="view" icon={<IconPhoto size="0.8rem" />}>
          Entities
        </Tabs.Tab>
        <Tabs.Tab value="how" icon={<IconMessageCircle size="0.8rem" />}>
          Mappings
        </Tabs.Tab>
        <Tabs.Tab value="what" icon={<IconSourceCode size="0.8rem" />}>
          Raw
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="view" pt="xs">
        <Select
          label="Load example text"
          data={['en', 'de', 'fr', 'es', 'it', 'nl', 'pt', 'ru']}
          defaultValue="en"
        />
        <ViewSettings />
      </Tabs.Panel>
      <Tabs.Panel value="how" pt="xs">
        {/* <ModelSelector /> */}
        {/* <AcceptanceThresholdSlider /> */}
      </Tabs.Panel>
      <Tabs.Panel value="what" pt="xs">
        <RawResultPanel {...{ analysisRequestResults, isLoading, isError, error }} />
      </Tabs.Panel>
    </Tabs>
  );
}
