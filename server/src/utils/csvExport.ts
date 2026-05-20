import { Parser } from 'json2csv';
import { ILead, IUser } from '../types/index';

interface CsvLeadRow {
  Name: string;
  Email: string;
  Status: string;
  Source: string;
  'Created At': string;
  'Created By': string;
}

const CSV_FIELDS: Array<keyof CsvLeadRow> = [
  'Name',
  'Email',
  'Status',
  'Source',
  'Created At',
  'Created By',
];

export const generateLeadsCsv = (leads: ILead[]): string => {
  const rows: CsvLeadRow[] = leads.map((lead) => ({
    Name: lead.name,
    Email: lead.email,
    Status: lead.status,
    Source: lead.source,
    'Created At': new Date(lead.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    'Created By':
      typeof lead.createdBy === 'object'
        ? (lead.createdBy as IUser).name
        : lead.createdBy,
  }));

  const parser = new Parser({ fields: CSV_FIELDS });
  return parser.parse(rows);
};
