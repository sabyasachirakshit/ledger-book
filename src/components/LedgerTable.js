import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Date and Time',
    dataIndex: 'dateTime',
    key: 'dateTime',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Debits',
    dataIndex: 'debits',
    key: 'debits',
  },
  {
    title: 'Credits',
    dataIndex: 'credits',
    key: 'credits',
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
  },
];

const data = [
  {
    key: '1',
    dateTime: '2022-01-01 12:00:00',
    description: 'Example transaction',
    debits: 1000,
    credits: 0,
    balance: 1000,
  },
  {
    key: '2',
    dateTime: '2022-01-02 12:00:00',
    description: 'Another transaction',
    debits: 0,
    credits: 500,
    balance: 500,
  },
  // Add more transactions as needed
];

const LedgerTable = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default LedgerTable;
