/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */

import { IconDefinition, IconName } from "@fortawesome/fontawesome-svg-core";

// import all the fa icons we need
import { faCalendar, faCreditCard, faEnvelope, faGlobe, faHeart, faMapMarker, faPhone, faUniversity, faUser, faLink, faIdCard, faHospital, faQuestion, faCog } from "@fortawesome/pro-regular-svg-icons";
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';

export const defaultEntities: IEntity[] = [
    {
        type: 'CREDIT_CARD',
        label: 'Credit Card',
        description: 'A credit card number is between 12 to 19 digits.',
        fa_icon: faCreditCard,
        detectionMethod: 'Pattern match and checksum',
        color: '#FF5733',
        gradient: { from: 'indigo', to: 'cyan', deg: 45 },
        tags: ['financial'],
    },
    {
        type: 'CRYPTO',
        label: 'Crypto',
        description: 'A Crypto wallet number. Currently only Bitcoin address is supported',
        fa_icon: faBitcoin,
        detectionMethod: 'Pattern match, context, and checksum',
        color: '#F7931A',
        gradient: { from: 'purple', to: 'orange', deg: 45 },
        tags: ['financial', 'cryptocurrency'],
    },
    {
        type: 'DATE_TIME',
        label: 'Date/Time',
        description: 'Absolute or relative dates or periods or times smaller than a day.',
        fa_icon: faCalendar,
        detectionMethod: 'Pattern match and context',
        color: '#36A2EB',
        gradient: { from: 'blue', to: 'lightblue', deg: 45 },
        tags: ['time'],
    },
    {
        type: 'EMAIL_ADDRESS',
        label: 'Email Address',
        description: 'An email address identifies an email box to which email messages are delivered',
        fa_icon: faEnvelope,
        detectionMethod: 'Pattern match, context, and RFC-822 validation',
        color: '#FFC300',
        gradient: { from: 'yellow', to: 'orange', deg: 45 },
        tags: ['communication'],
    },
    {
        type: 'IBAN_CODE',
        label: 'IBAN Code',
        description:
            'The International Bank Account Number (IBAN) is an internationally agreed system of identifying bank accounts across national borders to facilitate the communication and processing of cross border transactions with a reduced risk of transcription errors.',
        fa_icon: faUniversity,
        detectionMethod: 'Pattern match, context, and checksum',
        color: '#007BFF',
        gradient: { from: 'blue', to: 'lightblue', deg: 45 },
        tags: ['financial'],
    },
    {
        type: 'IP_ADDRESS',
        label: 'IP Address',
        description: 'An Internet Protocol (IP) address (either IPv4 or IPv6).',
        fa_icon: faGlobe,
        detectionMethod: 'Pattern match, context, and checksum',
        color: '#2ECC71',
        gradient: { from: 'green', to: 'lightgreen', deg: 45 },
        tags: ['network'],
    },
    {
        type: 'NRP',
        label: 'NRP',
        description: "A person’s Nationality, religious or political group.",
        fa_icon: faGlobe,
        detectionMethod: 'Custom logic and context',
        color: '#8E44AD',
        gradient: { from: 'purple', to: 'pink', deg: 45 },
        tags: ['personal'],
    },
    {
        type: 'LOCATION',
        label: 'Location',
        description: 'Name of politically or geographically defined location (cities, provinces, countries, international regions, bodies of water, mountains)',
        fa_icon: faMapMarker,
        detectionMethod: 'Custom logic and context',
        color: '#E67E22',
        gradient: { from: 'orange', to: 'yellow', deg: 45 },
        tags: ['geography'],
    },
    {
        type: 'PERSON',
        label: 'Person',
        description: 'A full person name, which can include first names, middle names or initials, and last names.',
        fa_icon: faUser,
        detectionMethod: 'Custom logic and context',
        color: '#3498DB',
        gradient: { from: 'blue', to: 'lightblue', deg: 45 },
        tags: ['personal'],
    },
    {
        type: 'PHONE_NUMBER',
        label: 'Phone Number',
        description: 'A telephone number',
        fa_icon: faPhone,
        detectionMethod: 'Custom logic, pattern match, and context',
        color: '#95A5A6',
        gradient: { from: 'gray', to: 'lightgray', deg: 45 },
        tags: ['communication'],
    },
    {
        type: 'MEDICAL_LICENSE',
        label: 'Medical License',
        description: 'Common medical license numbers.',
        fa_icon: faHeart,
        detectionMethod: 'Pattern match, context, and checksum',
        color: '#D35400',
        gradient: { from: 'orange', to: 'yellow', deg: 45 },
        tags: ['medical'],
    },
    {
        type: 'URL',
        label: 'URL',
        description: 'A URL (Uniform Resource Locator), unique identifier used to locate a resource on the Internet',
        fa_icon: faLink,
        detectionMethod: 'Pattern match, context, and top-level URL validation',
        color: '#8E44AD',
        gradient: { from: 'purple', to: 'pink', deg: 45 },
        tags: ['internet'],
    },
    {
        type: 'US_BANK_NUMBER',
        label: 'US Bank Number',
        description: 'A US bank account number is between 8 to 17 digits.',
        fa_icon: faUniversity,
        detectionMethod: 'Pattern match and context',
        color: '#2ECC71',
        gradient: { from: 'green', to: 'lightgreen', deg: 45 },
        tags: ['financial'],
    },
    {
        type: 'US_DRIVER_LICENSE',
        label: 'US Driver License',
        description: 'A US driver license according to https://ntsi.com/drivers-license-format/',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match and context',
        color: '#FF5733',
        gradient: { from: 'indigo', to: 'cyan', deg: 45 },
        tags: ['identification'],
    },
    {
        type: 'US_ITIN',
        label: 'US ITIN',
        description: 'US Individual Taxpayer Identification Number (ITIN). Nine digits that start with a "9" and contain a "7" or "8" as the 4 digit.',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match and context',
        color: '#36A2EB',
        gradient: { from: 'blue', to: 'lightblue', deg: 45 },
        tags: ['tax'],
    },
    {
        type: 'US_PASSPORT',
        label: 'US Passport',
        description: 'A US passport number with 9 digits.',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match and context',
        color: '#FFC300',
        gradient: { from: 'yellow', to: 'orange', deg: 45 },
        tags: ['identification'],
    },
    {
        type: 'US_SSN',
        label: 'US Social Security Number',
        description: 'A US Social Security Number (SSN) with 9 digits.',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match and context',
        color: '#007BFF',
        gradient: { from: 'blue', to: 'lightblue', deg: 45 },
        tags: ['identification'],
    },
    {
        type: 'UK_NHS',
        label: 'UK NHS',
        description: 'A UK NHS number is 10 digits.',
        fa_icon: faHospital,
        detectionMethod: 'Pattern match, context, and checksum',
        color: '#2ECC71',
        gradient: { from: 'green', to: 'lightgreen', deg: 45 },
        tags: ['medical'],
    },
    {
        type: 'NIF',
        label: 'NIF',
        description: 'A Spanish NIF number (Personal tax ID).',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match, context, and checksum',
        color: '#8E44AD',
        gradient: { from: 'purple', to: 'pink', deg: 45 },
        tags: ['financial', 'identification'],
    },
    {
        type: 'IT_FISCAL_CODE',
        label: 'Italian Fiscal Code',
        description: 'An Italian personal identification code. https://en.wikipedia.org/wiki/Italian_fiscal_code',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match, context, and checksum',
        color: '#E67E22',
        gradient: { from: 'orange', to: 'yellow', deg: 45 },
        tags: ['financial', 'identification'],
    },
    {
        type: 'IT_DRIVER_LICENSE',
        label: 'Italian Driver License',
        description: 'An Italian driver license number.',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match and context',
        color: '#3498DB',
        gradient: { from: 'blue', to: 'lightblue', deg: 45 },
        tags: ['identification'],
    },
    {
        type: 'IT_VAT_CODE',
        label: 'Italian VAT Code',
        description: 'An Italian VAT code number.',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match, context, and checksum',
        color: '#95A5A6',
        gradient: { from: 'gray', to: 'lightgray', deg: 45 },
        tags: ['financial'],
    },
    {
        type: 'IT_PASSPORT',
        label: 'Italian Passport',
        description: 'An Italian passport number.',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match and context',
        color: '#D35400',
        gradient: { from: 'orange', to: 'yellow', deg: 45 },
        tags: ['identification'],
    },
    {
        type: 'IT_IDENTITY_CARD',
        label: 'Italian Identity Card',
        description: 'An Italian identity card number. https://en.wikipedia.org/wiki/Italian_electronic_identity_card',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match and context',
        color: '#8E44AD',
        gradient: { from: 'purple', to: 'pink', deg: 45 },
        tags: ['identification'],
    },
    {
        type: 'FIN/NRIC',
        label: 'National Registration Identification Card',
        description: 'A National Registration Identification Card.',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match and context',
        color: '#E67E22',
        gradient: { from: 'orange', to: 'yellow', deg: 45 },
        tags: ['identification'],
    },
    {
        type: 'AU_ABN',
        label: 'Australian Business Number',
        description: 'The Australian Business Number (ABN) is a unique 11-digit identifier issued to all entities registered in the Australian Business Register (ABR).',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match, context, and checksum',
        color: '#3498DB',
        gradient: { from: 'blue', to: 'lightblue', deg: 45 },
        tags: ['financial'],
    },
    {
        type: 'AU_ACN',
        label: 'Australian Company Number',
        description: 'An Australian Company Number is a unique nine-digit number issued by the Australian Securities and Investments Commission to every company registered under the Commonwealth Corporations Act 2001 as an identifier.',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match, context, and checksum',
        color: '#95A5A6',
        gradient: { from: 'gray', to: 'lightgray', deg: 45 },
        tags: ['financial'],
    },
    {
        type: 'AU_TFN',
        label: 'Australian Tax File Number',
        description: 'The tax file number (TFN) is a unique identifier issued by the Australian Taxation Office to each taxpaying entity.',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match, context, and checksum',
        color: '#D35400',
        gradient: { from: 'orange', to: 'yellow', deg: 45 },
        tags: ['tax'],
    },
    {
        type: 'AU_MEDICARE',
        label: 'Australian Medicare Number',
        description: 'Medicare number is a unique identifier issued by the Australian Government that enables the cardholder to receive rebates of medical expenses under Australia\'s Medicare system.',
        fa_icon: faIdCard,
        detectionMethod: 'Pattern match, context, and checksum',
        color: '#FF5733',
        gradient: { from: 'indigo', to: 'cyan', deg: 45 },
        tags: ['medical'],
    },
    {
        type: 'UNKNOWN',
        label: 'Unknown',
        description: 'An unknown entity type.',
        fa_icon: faQuestion,
        detectionMethod: 'N/A',
        color: '#A9A9A9',
        gradient: { from: 'indigo', to: 'cyan', deg: 45 },
        tags: ['unknown'],
    },
    {
        type: 'CUSTOM',
        label: 'Custom',
        description: 'A custom entity type.',
        fa_icon: faCog,
        detectionMethod: 'N/A',
        color: '#FF00FF',
        gradient: { from: 'indigo', to: 'cyan', deg: 45 },
        tags: ['custom'],
    },
];

export interface IEntity {
    type: string;
    label: string;
    description: string;
    fa_icon: IconDefinition;
    detectionMethod: string;
    color: string;
    gradient: { from: string; to: string; deg: number };
    tags?: string[];
}
