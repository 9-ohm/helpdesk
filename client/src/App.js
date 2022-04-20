
function App() {
  return (
    <div className="App container">
      <h1>ระบบแจ้งซ่อม</h1>
      <div className="information">
        <from action="">
          <div className="mb-3">
            <label htmlFor="ชื่อครุภัณฑ์" className="form-label">Name:</label>
            <input type="text" className="form-control" placeholder="ระบุชื่อครุภัณฑ์"/>
          </div>
          <div className="mb-3">
            <label htmlFor="หมายเลขครุภัณฑ์" className="form-label">Name:</label>
            <input type="number" className="form-control" placeholder="ระบุหมายเลขครุภัณฑ์"/>
          </div>
          <div className="mb-3">
            <label htmlFor="ตำแหน่ง" className="form-label">Name:</label>
            <input type="text" className="form-control" placeholder="ระบุตำแหน่งอุปกรณ์"/>
          </div>
          <div className="mb-3">
            <label htmlFor="อาการเสีย" className="form-label">Name:</label>
            <input type="text" className="form-control" placeholder="ระบุอาการเสีย"/>
          </div>
        </from>
      </div>
      
    </div>
  );
}

export default App;
