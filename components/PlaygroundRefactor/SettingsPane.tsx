/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
import { Select, Stack, Tabs, Text } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings, IconSourceCode } from '@tabler/icons-react';
import { Prism } from '@mantine/prism';
import NEREntitySelector from './NEREntitySelector';
import CodeSecretsSelector from './CodeSecretSelector';
import ModelSelector from './ModelSelector';
import AcceptanceThresholdSlider from './AcceptanceThresholdSlider';
import ViewSettings from './ViewSettings';
import { useAnalysisRequestSettings } from './Playground';

const exampleTexts = [
  {
    value:
      'Hello team,\n\nI wanted to remind everyone about the upcoming meeting on May 25th at 2:00 PM in the conference room. Please make sure to bring your ID cards for security purposes. Also, kindly note that the meeting will be followed by a team lunch at Cafe ABC, where you can pay using your corporate credit card ending in 1234 5678 9012 3456. Looking forward to seeing you all!\n\nBest regards,\nJohn Smith\nHR Manager',
    label: 'Meeting Reminder Email',
  },
  {
    value:
      "Dear Jane,\n\nCongratulations on your new position at ABC Corporation! We are thrilled to have you on board. Please provide a copy of your driver's license (DL# AB123456) and social security number (SSN# 123-45-6789) for our records. You can email the documents to hr@abccorp.com. We also require your bank account details for salary processing. Please provide your bank name, account number, and routing number.\n\nBest regards,\nHR Department",
    label: 'Job Offer Email',
  },
  {
    value:
      'Subject: Important Account Update\n\nDear Customer,\n\nWe have recently detected some suspicious activity on your credit card ending in 1234 5678 9012 3456. To protect your account, please verify your information by clicking on the following link: https://www.examplebank.com/verify?id=123456789. In case of any concerns, please contact our customer support at 1-800-555-1234. Thank you for your cooperation.\n\nBest regards,\nExample Bank',
    label: 'Credit Card Security Alert',
  },
  {
    value:
      'CONFIDENTIAL\n\nEmployee Performance Review\n\nEmployee Name: John Smith\nEmployee ID: 123456\n\nOverall Performance: Exceeds Expectations\n\nStrengths: John demonstrates excellent leadership skills and consistently achieves his targets.\n\nAreas for Improvement: John could benefit from improving his time management skills and enhancing his collaboration with team members.\n\nPlease note that this review should be kept confidential and shared only with the employee.\n\nBest regards,\nHR Department',
    label: 'Performance Review Document',
  },
  {
    value:
      'Dear Customer,\n\nWe are pleased to inform you that your passport application has been processed successfully. Your passport number is AB123456. You can collect your passport from our office located at 123 Main Street, Anytown, USA. Please bring a valid photo ID (DL# AB123456) for verification. If you have any questions, feel free to contact our office at (555) 123-4567. Best regards,\nPassport Office',
    label: 'Passport Application Confirmation',
  },
  {
    value:
      'Dear Valued Customer,\n\nYour recent purchase with ABC Electronics has been confirmed. The order will be shipped to the following address:\n\n1234 Elm Street\nAnytown, USA\nPostal Code: 12345\n\nFor payment, we will charge your credit card (Cardholder: John Smith) ending in 1234 5678 9012 3456. If you need any assistance, please contact our customer support at support@abcelectronics.com. Thank you for choosing ABC Electronics!\n\nBest regards,\nABC Electronics',
    label: 'Order Confirmation Email',
  },
];

export default function SettingsPane({
  setEditorContent,
}: {
  setEditorContent: (content: string) => void;
}) {
  const { analysisRequestSettings, setAnalysisRequestSettings } = useAnalysisRequestSettings();
  return (
    <Tabs defaultValue="view">
      <Tabs.List>
        <Tabs.Tab value="view" icon={<IconPhoto size="0.8rem" />}>
          View
        </Tabs.Tab>
        <Tabs.Tab value="how" icon={<IconMessageCircle size="0.8rem" />}>
          How
        </Tabs.Tab>
        <Tabs.Tab value="what" icon={<IconSettings size="0.8rem" />}>
          What
        </Tabs.Tab>
        <Tabs.Tab value="preview" icon={<IconSourceCode size="0.8rem" />}>
          Raw
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="view" pt="xs">
        <Select
          label="Load example text"
          data={exampleTexts}
          placeholder="Select an example"
          onChange={(text) => {
            setEditorContent(text ?? '');
          }}
        />
        <ViewSettings />
      </Tabs.Panel>
      <Tabs.Panel value="how" pt="xs">
        <Stack spacing="xs">
          <AcceptanceThresholdSlider />
          <ModelSelector />
        </Stack>
      </Tabs.Panel>
      <Tabs.Panel value="what" pt="xs">
        <CodeSecretsSelector />
        <NEREntitySelector />
      </Tabs.Panel>
      <Tabs.Panel value="preview" pt="xs">
        <Text size="lg" weight={500} mt="sm">
          Raw JSON Request
        </Text>
        <Prism language="json" withLineNumbers>
          {JSON.stringify(analysisRequestSettings, null, 2)}
        </Prism>
      </Tabs.Panel>
    </Tabs>
  );
}
