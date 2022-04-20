
function App() {
  return (
    <div className="App container">
      <h1>ระบบแจ้งซ่อม</h1>
      <div className="information">
        <from action="">
          <div className="mb-3">
            <label htmlFor="ชื่อครุภัณฑ์" className="form-label">ชื่อครุภัณฑ์:</label>
            <input type="text" className="form-control" placeholder="ระบุชื่อครุภัณฑ์"/>
          </div>
          <div className="mb-3">
            <label htmlFor="หมายเลขครุภัณฑ์" className="form-label">หมายเลขครุภัณฑ์:</label>
            <input type="number" className="form-control" placeholder="ระบุหมายเลขครุภัณฑ์"/>
          </div>
          <div className="mb-3">
            <label htmlFor="ตำแหน่งที่ตั้งอุปกรณ์" className="form-label">ตำแหน่งที่ตั้งอุปกรณ์:</label>
            <input type="text" className="form-control" placeholder="ระบุตำแหน่งที่ตั้งอุปกรณ์"/>
          </div>
          <div className="mb-3">
            <label htmlFor="อาการเสีย" className="form-label">อาการเสีย:</label>
            <input type="text" className="form-control" placeholder="ระบุอาการเสีย"/>
          </div>
          <button className="btn btn-success">ยืนยัน</button>
        </from>
      </div>
      <hr/>
      <div className="articles">
        <button className="btn btn-primary">แสดงรายการแจ้งซ่อม</button>
      </div>
    </div>
  );
}

export default App;
