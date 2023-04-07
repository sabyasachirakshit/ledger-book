import React,{useState} from 'react';
import { Table,Button } from 'antd';
import { Modal, Form,DatePicker,Input,InputNumber,Radio } from 'antd';

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

const online_transaction_data = [
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

const offline_transaction_data = [
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
      credits: 100,
      balance: 500,
    },
    {
      key: '3',
      dateTime: '2022-01-02 12:00:00',
      description: 'Another transaction',
      debits: 0,
      credits: 100,
      balance: 500,
    },
    {
      key: '4',
      dateTime: '2022-01-02 12:00:00',
      description: 'Another transaction',
      debits: 0,
      credits: 100,
      balance: 500,
    },
    {
        key: '5',
        dateTime: '2022-01-02 12:00:00',
        description: 'Another transaction',
        debits: 0,
        credits: 100,
        balance: 500,
      },
      {
      key: '6',
      dateTime: '2022-01-02 12:00:00',
      description: 'Another transaction',
      debits: 0,
      credits: 100,
      balance: 500,
    },
    {
        key: '7',
        dateTime: '2022-01-02 12:00:00',
        description: 'Another transaction',
        debits: 0,
        credits: 100,
        balance: 500,
      },
    // Add more transactions as needed
  ];

  const pagination = {
    pageSize: 20, // Show 20 rows per page
    position: ['bottomCenter'],
  };


const LedgerTable = () => {
    const [visible, setVisible] = useState(false);
    const TransactionForm = () => {
        const [form] = Form.useForm();

        return (
            <Modal
            open={visible}
            onCancel={() => setVisible(false)}
            onOk={() => form.submit()}
            >
            <Form form={form} onFinish={handleFormSubmit}>
                <Form.Item name="dateTime" label="Date and Time">
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                <Input />
                </Form.Item>
                <Form.Item name="amount" label="Amount">
                <InputNumber />
                </Form.Item>
                <Form.Item name="type" label="Type">
                <Radio.Group>
                    <Radio value="debit">Debit</Radio>
                    <Radio value="credit">Credit</Radio>
                </Radio.Group>
                </Form.Item>
                </Form>
            </Modal>
            );
        };
        const showForm = () => {
            setVisible(true);
};

const handleFormSubmit = (values) => {
    console.log('Form submitted:', values);
    setVisible(false);
};
  return (
    <div className="ledger-book-screen" style={{display:"flex",flexDirection:"column",gap:"20px"}}>
        <h1 className="total-balance-screen" style={{display:"flex",justifyContent:"center"}}>Total Balance: 58823.20</h1>
        <TransactionForm visible={visible} handleFormSubmit={handleFormSubmit} />
        <div className='ledger-tables-screen' style={{display:"flex",gap:"20px"}}>
        <div className="table-1" style={{width:"50%",display:"flex",flexDirection:"column",gap:"20px"}}>
            <h2 className='bank-balance' style={{display:"flex",justifyContent:"center"}}>Remaining Bank Balance: 4234.12</h2>
            <div className="transaction-button" style={{display:"flex",width:"100%",justifyContent:"center"}}>
                <Button type="primary" onClick={showForm}>Add Transaction</Button>
            </div>
            <Table
                columns={columns}
                dataSource={online_transaction_data}
                bordered
                title={() => (
                <h2 style={{ textAlign: 'center' }}>Bank Account Transactions</h2>
                )}
                pagination={pagination}
            />
        </div>
        <div className="table-2" style={{width:"50%",display:"flex",flexDirection:"column",gap:"20px"}}>
            <h2 className='bank-balance' style={{display:"flex",justifyContent:"center"}}>Remaining Cash in Hand: 4234.12</h2>
            <div className="transaction-button" style={{display:"flex",width:"100%",justifyContent:"center"}}>
                <Button type="primary" onClick={showForm}>Add Transaction</Button>
            </div>
            <Table
                columns={columns}
                dataSource={offline_transaction_data}
                bordered
                title={() => (
                <h2 style={{ textAlign: 'center' }}>Cash In Hand Transactions</h2>
                )}
                pagination={pagination}
            />
        </div>
    </div>
    </div>
    
  );
};

export default LedgerTable;
