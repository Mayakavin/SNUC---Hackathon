import { useEffect, useState } from 'react';

function App() {
  const [serverMessage, setServerMessage] = useState("Connecting to Backend...");

  useEffect(() => {
    // MAGIC LINE: This converts your Frontend URL to your Backend URL
    // Example: converts port 5173 to 3000 automatically
    const backendUrl = window.location.origin.replace(/:\d+/, ':3000');

    console.log("Attempting to connect to:", backendUrl);

    fetch(`${backendUrl}/api/hello`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then((data) => setServerMessage(data.message))
      .catch((err) => {
        console.error("Fetch error:", err);
        setServerMessage("Backend found, but connection refused. Check CORS!");
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>Project Status</h1>
      <div style={{ 
        padding: '20px', 
        display: 'inline-block', 
        backgroundColor: '#eef', 
        borderRadius: '10px',
        border: '2px solid #33f' 
      }}>
        <p>Message from Server:</p>
        <h2 style={{ color: '#33f' }}>{serverMessage}</h2>
      </div>
    </div>
  );
}

export default App;