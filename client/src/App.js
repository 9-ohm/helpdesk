import Axios from 'axios';
import { useState } from 'react'
import { Form } from "react-bootstrap";


function App() {

  const [name, setName] = useState("")
  const [id, setId] = useState(0)
  const [location, setLocation] = useState("")
  const [condition, setCondition] = useState("")
  const [type, setType] = useState("Dictamen");

  const [articleList, setArticleList] = useState([])

  const getArticles = () => {
    Axios.get('http://localhost:3001/articles').then((response) => {
      setArticleList(response.data)
    })
  }

  const addArticles = () => {
    Axios.post('http://localhost:3001/addarticles', {
      name: name,
      id: id,
      location: location,
      condition: condition
    }).then(() => {
      setArticleList([
        ...articleList,
        {
          name: name,
          id: id,
          location: location,
          condition: condition
        }
      ])
    })
  }
  return (
    <div className="App container">
      <h1>รายละเอียดแจ้งซ่อม</h1>
      <div className="information">
        <from action="">
          <div className="mb-3">
            <label htmlFor="ชื่อครุภัณฑ์" className="form-label">ชื่อครุภัณฑ์:</label>
            <input
              type="text"
              className="form-control"
              placeholder="ระบุชื่อครุภัณฑ์"
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="หมายเลขครุภัณฑ์" className="form-label">หมายเลขครุภัณฑ์:</label>
            <input
              type="number"
              className="form-control"
              placeholder="ระบุหมายเลขครุภัณฑ์"
              onChange={(event) => {
                setId(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ตำแหน่งที่ตั้งอุปกรณ์" className="form-label">ตำแหน่งที่ตั้งอุปกรณ์:</label>
            <input
              type="text"
              className="form-control"
              placeholder="ระบุตำแหน่งที่ตั้งอุปกรณ์"
              onChange={(event) => {
                setLocation(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="อาการเสีย" className="form-label">อาการเสีย:</label>
            <Form.Group controlId="formBasicSelect">
              <Form.Control
                as="select"
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <option selected>โปรดเลือกปัญหาที่พบ</option>
                <option value="เปิดไม่ติด">เปิดไม่ติด</option>
                <option value="ใช้งานอินเทอร์เน็ตไม่ได้">ใช้งานอินเทอร์เน็ตไม่ได้</option>
              </Form.Control>
            </Form.Group>

          </div>

          <button className="btn btn-success" onClick={addArticles}>ยืนยัน</button>
        </from>
      </div>
      <hr />
      <div className="articles">
        <button className="btn btn-primary" onClick={getArticles}>แสดงรายการแจ้งซ่อม</button>
        <br></br><br></br>
        {articleList.map((val, key) => {
          return (
            <div className='articles card'>
              <div className='card-body text-left'>
                <p className="card-text">ชื่อครุภัณฑ์: {val.name}</p>
                <p className="card-text">หมายเลขครุภัณฑ์: {val.id}</p>
                <p className="card-text">ตำแหน่งที่ตั้งอุปกรณ์: {val.location}</p>
                <p className="card-text">อาการเสีย: {val.problem}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
