import Axios from 'axios';
import { useState } from 'react'
import { Form } from "react-bootstrap";

function App() {

  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [location, setLocation] = useState("")
  const [problem, setProblem] = useState("")

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
      problem: problem
    }).then(() => {
      setArticleList([
        ...articleList,
        {
          name: name,
          id: id,
          location: location,
          problem: problem
        }
      ])
    })
  }

  const delArticles = (rid) => {
    Axios.delete(`http://localhost:3001/delarticles/${rid}`).then((respond) => {
      setArticleList(
        articleList.filter((val) => {
          return val.rid !== rid;
        })
      )
    })
  }

  return (
    <div className="App container">
      <h1>แจ้งปัญหา/งานซ่อม</h1>
      <div className="information">
        <from action="">
          <div className="mb-3">
            <label htmlFor="ชื่อครุภัณฑ์" className="form-label">ชื่อครุภัณฑ์:</label>
            <Form.Group controlId="form-select">
              <Form.Control
                as="select"
                onChange={(event) => {
                  setName(event.target.value);
                  console.log(event.target.value)
                }}
              >
                <option value="">โปรดเลือกเลือกประเภทของครุภัณฑ์</option>
                <option value="คอมพิวเตอร์">คอมพิวเตอร์</option>
                <option value="โปรเจ็คเตอร์">โปรเจ็คเตอร์</option>
                <option value="เครื่องเสียง">เครื่องเสียง</option>
                <option value="เครื่อง x-ray">เครื่อง x-ray</option>
                <option value="เครื่องสำรองไฟ">เครื่องสำรองไฟ</option>
                <option value="โต๊ะ/เก้าอี้">โต๊ะ/เก้าอี้</option>
              </Form.Control>
            </Form.Group>

          </div>

          <div className="mb-3">
            <label htmlFor="ทะเบียนครุภัณฑ์" className="form-label">ทะเบียนครุภัณฑ์:</label>
            <input
              type="text"
              className="form-control"
              placeholder="ระบุทะเบียนครุภัณฑ์"
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
            <label htmlFor="ปัญหาที่พบ" className="form-label">ปัญหาที่พบ:</label>
            <Form.Group controlId="formBasicSelect">
              <Form.Control
                as="select"
                onChange={(event) => {

                  setProblem(event.target.value);
                  console.log(event.target.value)
                }}
              >
                <option value="">โปรดเลือกปัญหาที่พบ</option>
                <option value="เปิดไม่ติด">เปิดไม่ติด</option>
                <option value="ใช้งานอินเทอร์เน็ตไม่ได้">ใช้งานอินเทอร์เน็ตไม่ได้</option>
                <option value="มีเสียงผิดปรกติ">มีเสียงผิดปรกติ</option>
                <option value="มีเสียงร้องเตือน">มีเสียงร้องเตือน</option>
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
                <p className="card-text">ทะเบียนครุภัณฑ์: {val.id}</p>
                <p className="card-text">ตำแหน่งที่ตั้งอุปกรณ์: {val.location}</p>
                <p className="card-text">อาการเสีย: {val.problem}</p>
                <button className="btn btn-danger" onClick={() => { delArticles(val.rid) }}>ยกเลิกรายการ</button>

              </div>

            </div>
          )
        })}
      </div>
    </div>
  );
}
export default App;
