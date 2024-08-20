/* eslint-disable import/no-cycle */
import { MultiSelect, Text, Box } from '@mantine/core';
import React from 'react';
import { useAnalysisRequestSettings } from './Playground';

const nerEntities = [
  { value: 'PHONE_NUMBER', label: 'Phone Number' },
  { value: 'US_DRIVER_LICENSE', label: 'US Driver License' },
  { value: 'US_PASSPORT', label: 'US Passport' },
  { value: 'LOCATION', label: 'Location' },
  { value: 'CREDIT_CARD', label: 'Credit Card' },
  { value: 'CRYPTO', label: 'Cryptocurrency' },
  { value: 'UK_NHS', label: 'UK National Health Service (NHS)' },
  { value: 'US_SSN', label: 'US Social Security Number (SSN)' },
  { value: 'US_BANK_NUMBER', label: 'US Bank Number' },
  { value: 'EMAIL_ADDRESS', label: 'Email Address' },
  { value: 'DATE_TIME', label: 'Date Time' },
  { value: 'IP_ADDRESS', label: 'IP Address' },
  { value: 'PERSON', label: 'Person' },
  { value: 'IBAN_CODE', label: 'International Bank Account Number (IBAN) Code' },
  { value: 'NRP', label: 'NRP' },
  { value: 'US_ITIN', label: 'US Individual Taxpayer Identification Number (ITIN)' },
  { value: 'MEDICAL_LICENSE', label: 'Medical License' },
  { value: 'URL', label: 'URL' },
];

export default function NEREntitySelector() {
  const { setAnalysisRequestSettings } = useAnalysisRequestSettings();
  //   const [nerEntitiesEnabled, setNerEntitiesEnabled] = useState<string[]>([]);
  function handleOnChange(value: string | string[]) {
    if (typeof value === 'string') {
      const result = [value];
      setAnalysisRequestSettings((prevSettings) => ({
        ...prevSettings,
        entities: result,
      }));
    } else if (typeof value === undefined) {
      setAnalysisRequestSettings((prevSettings) => ({
        ...prevSettings,
        entities: [],
      }));
    } else {
      setAnalysisRequestSettings((prevSettings) => ({
        ...prevSettings,
        entities: value,
      }));
      //   setNerEntitiesEnabled(value);
    }
  }
  //   function setAll() {
  //     let result = nerEntities.map((entity) => entity.value);
  //     setNerEntitiesEnabled(nerEntities.map((entity) => entity.value));
  //     handleOnChange(result);
  //   }
  //   function clearAll() {
  //     setNerEntitiesEnabled([]);
  //     handleOnChange([]);
  //   }
  return (
    <Box style={{ maxHeight: '200px' }}>
      <Text size="lg" mt="sm" fw={500}>
        NER Entities
      </Text>
      <MultiSelect
        searchable
        data={nerEntities}
        onChange={handleOnChange}
        clearable
        placeholder="Default (all)"
        dropdownPosition="top"
        style={{ maxHeight: '200px', overflow: 'auto' }}
      />
    </Box>
  );
}
