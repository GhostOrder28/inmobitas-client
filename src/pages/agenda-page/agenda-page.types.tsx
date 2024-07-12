export type AgendaEvent = {
  eventId?: number;
  title: string;
  startDate: Date;
  endDate?: Date;
}

export type AgendaEventFormData = Omit<AgendaEvent, "eventId">;

export type AgendaTableColumns = [
  {
    Header: string;
    accessor: 'date';
  },
  {
    Header: string;
    accessor: 'time';
  },
  {
    Header: string;
    accessor: 'event';
  },
  {
    Header: string;
    accessor: 'options';
  }
];

