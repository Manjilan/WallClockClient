import React, {useState, useEffect} from 'react';
import { Input, Card } from 'antd';
import './App.css';

function App() {
  const [requestedTime, setRequestedTime] = useState("");
  const [timezone, setTimezone] = useState("");
  useEffect(()=>{
    if(!requestedTime){
      fetch("http://localhost:4000")
      .then(response=>response.json())
      .then(result=>setRequestedTime(result));
    }    
  });
  let handleSubmit = async e => {
    e.preventDefault();
    await fetch("http://localhost:4000",
    {
      method: 'POST',
      body: JSON.stringify({timezone: timezone}),
      headers: {
        'Content-Type': 'application/json'
      },
      accept: 'application/json, text/plain, */*'
    })
    .then(async res=>await res.json())
    .then(res=>{
      console.log(res);
      setRequestedTime(res);
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <Card title="Local Time" bordered={false} style={{ width: 300 }}>
          <p>{requestedTime}</p>
        </Card>
        <form onSubmit={handleSubmit}>
          <Input placeholder="enter timezone" onChange={e=>setTimezone(e.target.value)}></Input>
          <button>Submit</button>
        </form>
      </header>
    </div>
  )
}

export default App;
