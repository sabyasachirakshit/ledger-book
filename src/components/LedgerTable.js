import React,{useState,useEffect} from 'react';
import { Table,Button } from 'antd';
import moment from 'moment';
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

  const pagination = {
    pageSize: 20, // Show 20 rows per page
    position: ['bottomCenter'],
  };

const LedgerTable = () => {
  let [visible, setVisible] = useState(false);
  let [onlineArray, setOnlineArray] = useState([]);
  let [offlineArray, setOfflineArray] = useState([]);
  let [total_online_balance, setTotalOnlineBalance] = useState(0);
  let [total_offline_balance, setTotalOfflineBalance] = useState(0);
  let [onlineKey, setOnlineKey] = useState(1);
  let [offlineKey, setOfflineKey] = useState(1);

  useEffect(() => {
    let balance = 0;
    onlineArray.forEach((transaction) => {
      if (transaction.credits > 0) {
        balance += transaction.credits;
      } else {
        balance -= transaction.debits;
      }
      transaction.balance = balance;
    });
    setTotalOnlineBalance(balance);
  }, [onlineArray]);

  useEffect(() => {
    let balance = 0;
    offlineArray.forEach((transaction) => {
      if (transaction.credits > 0) {
        balance += transaction.credits;
      } else {
        balance -= transaction.debits;
      }
      transaction.balance = balance;
    });
    setTotalOfflineBalance(balance);
  }, [offlineArray]);

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
                key:onlineKey,
                date: moment(values.dateTime).format('YYYY-MM-DD HH:mm:ss'),
                description: values.description,
                debits: values.amount,
                credits:0,
                balance:total_online_balance-values.amount
              };
              setOnlineKey(onlineKey++);
              setOnlineArray(onlineArray.push(online_transaction));
              console.log("Online Array:",onlineArray);
              console.log(online_transaction.date);
        }else if(values.t_type==="credit"){
            let online_transaction = {
                key:onlineKey,
                date: moment(values.dateTime).format('YYYY-MM-DD HH:mm:ss'),
                description: values.description,
                debits: 0,
                credits:values.amount,
                balance:total_online_balance+values.amount
              };
              onlineKey++;
              setOnlineArray(onlineArray.push(online_transaction));
              console.log("Online Array:",onlineArray);
        }
    }else if(values.m_type==="offline"){
        if(values.t_type==="debit"){
            let offline_transaction = {
                key:offlineKey,
                date: moment(values.dateTime).format('YYYY-MM-DD HH:mm:ss'),
                description: values.description,
                debits: values.amount,
                credits:0,
                balance:total_offline_balance-values.amount
              };
              setOfflineKey(offlineKey++);
              setOfflineArray(offlineArray.push(offline_transaction));
              console.log("Offline Array:",offlineArray);
        }else if(values.t_type==="credit"){
            let offline_transaction = {
                key:offlineKey,
                date: moment(values.dateTime).format('YYYY-MM-DD HH:mm:ss'),
                description: values.description,
                debits: 0,
                credits:values.amount,
                balance:total_offline_balance+values.amount
              };
              offlineKey++;
              setOfflineArray(offlineArray.push(offline_transaction));
              console.log("Offline Array:",offlineArray);
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
                dataSource={onlineArray}
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
                dataSource={offlineArray}
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
