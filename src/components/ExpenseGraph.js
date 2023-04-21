import React,{useState,useEffect} from 'react'

function ExpenseGraph() {
  let [onlineArray, setOnlineArray] = useState([]);
  let [offlineArray, setOfflineArray] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/serverdata')
    .then(response => response.json())
    .then(data => {
      const offlineArray = data.offline_array;
      const onlineArray = data.online_array;
      onlineArray?setOnlineArray(onlineArray):setOnlineArray([]);
      offlineArray?setOfflineArray(offlineArray):setOfflineArray([]);
    })
    .catch(error => console.error(error));
  }, []);
  return (
    <div className='expense-graph-screen' style={{display:"flex",justifyContent:"center"}}>
      {onlineArray.map((item,index)=>{
        return (
          <div className='items' key={item.key}>
            {item.description}
          </div>
        );
        
      })}
    </div>
  )
}

export default ExpenseGraph