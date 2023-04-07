import React,{useState,useEffect} from 'react';
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

// const online_transaction_data = [
//   {
//     key: '1',
//     dateTime: '2022-01-01 12:00:00',
//     description: 'Example transaction',
//     debits: 1000,
//     credits: 0,
//     balance: 1000,
//   },
//   {
//     key: '2',
//     dateTime: '2022-01-02 12:00:00',
//     description: 'Another transaction',
//     debits: 0,
//     credits: 500,
//     balance: 500,
//   },
//   // Add more transactions as needed
// ];

// const offline_transaction_data = [
//     {
//       key: '1',
//       dateTime: '2022-01-01 12:00:00',
//       description: 'Example transaction',
//       debits: 1000,
//       credits: 0,
//       balance: 1000,
//     },
//     {
//       key: '2',
//       dateTime: '2022-01-02 12:00:00',
//       description: 'Another transaction',
//       debits: 0,
//       credits: 100,
//       balance: 500,
//     },
//     {
//       key: '3',
//       dateTime: '2022-01-02 12:00:00',
//       description: 'Another transaction',
//       debits: 0,
//       credits: 100,
//       balance: 500,
//     },
//     {
//       key: '4',
//       dateTime: '2022-01-02 12:00:00',
//       description: 'Another transaction',
//       debits: 0,
//       credits: 100,
//       balance: 500,
//     },
//     {
//         key: '5',
//         dateTime: '2022-01-02 12:00:00',
//         description: 'Another transaction',
//         debits: 0,
//         credits: 100,
//         balance: 500,
//       },
//       {
//       key: '6',
//       dateTime: '2022-01-02 12:00:00',
//       description: 'Another transaction',
//       debits: 0,
//       credits: 100,
//       balance: 500,
//     },
//     {
//         key: '7',
//         dateTime: '2022-01-02 12:00:00',
//         description: 'Another transaction',
//         debits: 0,
//         credits: 100,
//         balance: 500,
//       },
//     // Add more transactions as needed
//   ];

  const pagination = {
    pageSize: 20, // Show 20 rows per page
    position: ['bottomCenter'],
  };

  let offline_array=[];
  let online_array=[];
  let total_online_balance=0;
  let total_offline_balance=0;
  let online_key=1;
  let offline_key=1;

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
                <Form.Item name="dateTime" label="Transaction Date and Time">
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item name="description" label="Transaction Description">
                <Input />
                </Form.Item>
                <Form.Item name="amount" label="Transaction Amount">
                <InputNumber />
                </Form.Item>
                <Form.Item name="t_type" label="Transaction Type">
                <Radio.Group>
                    <Radio value="debit">Debit</Radio>
                    <Radio value="credit">Credit</Radio>
                </Radio.Group>
                </Form.Item>
                <Form.Item name="m_type" label="Transaction Mode">
                <Radio.Group>
                    <Radio value="online">Online Bank Transaction</Radio>
                    <Radio value="offline">Offline Cash Transaction</Radio>
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
    // console.log('Form submitted:', values);
    if(values.m_type==="online"){
        if(values.t_type==="debit"){
            let online_transaction = {
                key:online_key,
                date: values.dateTime,
                description: values.description,
                debits: values.amount,
                credits:0,
                balance:total_online_balance-values.amount
              };
              online_key++;
              online_array.push(online_transaction);
              console.log("Online Array:",online_array);
        }else if(values.t_type==="credit"){
            let online_transaction = {
                key:online_key,
                date: values.dateTime,
                description: values.description,
                debits: 0,
                credits:values.amount,
                balance:total_online_balance+values.amount
              };
              online_key++;
              online_array.push(online_transaction);
              console.log("Online Array:",online_array);
        }
    }else if(values.m_type==="offline"){
        if(values.t_type==="debit"){
            let offline_transaction = {
                key:offline_key,
                date: values.dateTime,
                description: values.description,
                debits: values.amount,
                credits:0,
                balance:total_offline_balance-values.amount
              };
              offline_key++;
              offline_array.push(offline_transaction);
              console.log("Offline Array:",offline_array);
        }else if(values.t_type==="credit"){
            let offline_transaction = {
                key:offline_key,
                date: values.dateTime,
                description: values.description,
                debits: 0,
                credits:values.amount,
                balance:total_offline_balance+values.amount
              };
              offline_key++;
              offline_array.push(offline_transaction);
              console.log("Offline Array:",offline_array);
        }
    }
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
                dataSource={online_array}
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
                dataSource={offline_array}
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
