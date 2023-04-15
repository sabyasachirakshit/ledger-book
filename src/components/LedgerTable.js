import React,{useState,useEffect} from 'react';
import { Table,Button } from 'antd';
import moment from 'moment-timezone';
import { Modal, Form,DatePicker,TimePicker,Input,InputNumber,Radio } from 'antd';

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
    pageSize: 20,
    position: ['bottomCenter'],
  };

const LedgerTable = () => {
  let [visible, setVisible] = useState(false);
  let [onlineArray, setOnlineArray] = useState([]);
  let [offlineArray, setOfflineArray] = useState([]);
  let [onlineKey, setOnlineKey] = useState(1);
  let [offlineKey, setOfflineKey] = useState(1);
  let [remaining_bank_balance,setRemainingBankBalance]=useState(0);
  let [remaining_cash_in_hand_balance,setRemainingCashInHandBalance]=useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/serverdata')
    .then(response => response.json())
    .then(data => {
      const offlineArray = data.offline_array;
      const onlineArray = data.online_array;
      onlineArray?setOnlineArray(onlineArray):setOnlineArray([]);
      if(onlineArray){
        if(onlineArray.length>=1){
          setRemainingBankBalance(onlineArray[onlineArray.length-1].balance);
        }
      }
      offlineArray?setOfflineArray(offlineArray):setOfflineArray([]);
      if(offlineArray){
      if(offlineArray.length>=1){
        setRemainingCashInHandBalance(offlineArray[offlineArray.length-1].balance);
      }
      }
    })
    .catch(error => console.error(error));
  }, []);

    const TransactionForm = () => {
        const [form] = Form.useForm();
        return (
           <Modal open={visible} onCancel={() => setVisible(false)} onOk={() => form.submit()}>
            <Form form={form} onFinish={handleFormSubmit}>
              <Form.Item name="date" label="Transaction Date" rules={[{ required: true }]}>
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item name="time" label="Transaction Time" rules={[{ required: true }]}>
                <TimePicker format="HH:mm:ss" />
              </Form.Item>
              <Form.Item name="description" label="Transaction Description" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="amount" label="Transaction Amount" rules={[{ required: true }]}>
                <InputNumber />
              </Form.Item>
              <Form.Item name="t_type" label="Transaction Type" rules={[{ required: true }]}>
                <Radio.Group>
                  <Radio value="debit">Debit</Radio>
                  <Radio value="credit">Credit</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="m_type" label="Transaction Mode" rules={[{ required: true }]}>
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


const handleFormSubmit = async(values) => {
  const date = moment(values.date).format("YYYY-MM-DD");
  const time = values.time.format("HH:mm:ss");
  const dateTime = moment(`${date} ${time}`).tz(moment.tz.guess()).format("YYYY-MM-DD HH:mm:ss");
    if(values.m_type==="online"){
        if(values.t_type==="debit"){
          let total_balance=0;
          if(onlineArray.length>=1){
           total_balance = onlineArray[onlineArray.length-1].balance;
          }
            let online_transaction = {
                key:onlineKey,
                dateTime: dateTime,
                description: values.description,
                debits: values.amount,
                credits:0,
                balance:total_balance-values.amount
              };
              setOnlineKey(onlineKey++);
              
              const response = await fetch('http://localhost:4000/write-online-array', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(online_transaction)
              });
              const json = await response.json();
              console.log(json);
        }else if(values.t_type==="credit"){
          let total_balance=0;
          if(onlineArray.length>=1){
           total_balance = onlineArray[onlineArray.length-1].balance;
          }
            let online_transaction = {
                key:onlineKey,
                dateTime: dateTime,
                description: values.description,
                debits: 0,
                credits:values.amount,
                balance:total_balance+values.amount
              };
              onlineKey++;
              
              const response = await fetch('http://localhost:4000/write-online-array', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(online_transaction)
              });
              const json = await response.json();
              console.log(json);
        }
    }else if(values.m_type==="offline"){
        if(values.t_type==="debit"){
          let total_balance=0;
          if(offlineArray.length>=1){
           total_balance = offlineArray[offlineArray.length-1].balance;
          }
            let offline_transaction = {
                key:offlineKey,
                dateTime: dateTime,
                description: values.description,
                debits: values.amount,
                credits:0,
                balance:total_balance-values.amount
              };
              setOfflineKey(offlineKey++);
              const response = await fetch('http://localhost:4000/write-offline-array', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(offline_transaction)
              });
              const json = await response.json();
              console.log(json);
        }else if(values.t_type==="credit"){
          let total_balance=0;
          if(offlineArray.length>=1){
           total_balance = offlineArray[offlineArray.length-1].balance;
          }
            let offline_transaction = {
                key:offlineKey,
                dateTime: dateTime,
                description: values.description,
                debits: 0,
                credits:values.amount,
                balance:total_balance+values.amount
              };
              offlineKey++;
              const response = await fetch('http://localhost:4000/write-offline-array', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(offline_transaction)
              });
              const json = await response.json();
              console.log(json);
        }
    }
    setVisible(false);
    window.location.reload();
};
  return (
    <div className="ledger-book-screen" style={{display:"flex",flexDirection:"column",gap:"20px"}}>
        <h1 className="total-balance-screen" style={{display:"flex",justifyContent:"center"}}>Total Balance: {remaining_bank_balance+remaining_cash_in_hand_balance}</h1>
        <TransactionForm visible={visible} handleFormSubmit={handleFormSubmit} />
        <div className="transaction-button" style={{display:"flex",width:"100%",justifyContent:"center"}}>
                <Button type="primary" onClick={showForm}>Add Transaction</Button>
            </div>
        <div className='ledger-tables-screen' style={{display:"flex",gap:"20px"}}>
        <div className="table-1" style={{width:"50%",display:"flex",flexDirection:"column",gap:"20px"}}>
            <h2 className='bank-balance' style={{display:"flex",justifyContent:"center"}}>Remaining Bank Balance: {remaining_bank_balance}</h2>           
            <Table
                columns={columns}
                dataSource={[...onlineArray].reverse()}
                bordered
                title={() => (
                <h2 style={{ textAlign: 'center' }}>Bank Account Transactions</h2>
                )}
                pagination={pagination}
            />
        </div>
        <div className="table-2" style={{width:"50%",display:"flex",flexDirection:"column",gap:"20px"}}>
            <h2 className='bank-balance' style={{display:"flex",justifyContent:"center"}}>Remaining Cash in Hand: {remaining_cash_in_hand_balance}</h2>
            <Table
                columns={columns}
                dataSource={[...offlineArray].reverse()}
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
