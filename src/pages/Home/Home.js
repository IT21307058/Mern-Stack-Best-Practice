import React, { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import {useNavigate} from "react-router-dom";
import Tables from '../../components/Tables/Tables';
import Spiner from "../../components/Spiner/Spiner"
import './home.css'
import { addData, updateData, dltdata } from '../../components/context/ContextProvider';
import { usergetfunc, deletfunc } from '../../services/Apis';
import Alert from 'react-bootstrap/Alert';
import { toast } from 'react-toastify';

const Home = () => {

  const [userdata, setUserData] = useState([]);

  const [showspin, setShowSpin] = useState(true);

  // add context
  const  { useradd, setUseradd } = useContext(addData);

  // update create context
  const {update, setUpdate} = useContext(updateData);
  const {deletedata, setDLtdata} = useContext(dltdata);

  // for search
// useState accepts an initial state and returns two values:
// The current state. search is current state
// A function that updates the state. setSearch is the function that update state
// we set the initial state to an empty string: useState("")
// The "React useState" Hook allows us to track state in a function component.
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");

  const navigate = useNavigate();

  const adduser = () => {
    navigate("/register");
  }

  // get user
  const userGet = async() => {
    const response = await usergetfunc(search, gender, status, sort);

    if(response.status === 200){
      setUserData(response.data)
    }else{
      console.log('error fro get user data')
    }
  }

  // user delete
  const deleteUser = async(id) => {
    const response = await deletfunc(id);

    if(response.status === 200){
      userGet()
      setDLtdata(response.data)
    }else{
      toast.error("Error");
    }
  }

  // call a function load page
  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [search, gender, status, sort])
  // In this case, the effect will run whenever the search variable changes.

  return (
    <>
    {
      useradd ? <Alert variant="success" onClose={() => setUseradd("")} dismissible>{useradd.fname.toUpperCase()} Successfully Added</Alert> : ""
    }

    {
      update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.fname.toUpperCase()} Successfully Updated</Alert> : ""
    }
    {
      deletedata ? <Alert variant="danger" onClose={() => setDLtdata("")} dismissible>{deletedata.fname.toUpperCase()} Successfully Deleted</Alert> : ""
    }
      <div className='container'>
        {/* search add btn */}

        <div className='search_add mt-5 d-flex justify-content-between'>
          <div className='search col-lg-4'>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange = {(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-success" className='search_btn'>Search</Button>
            </Form>
          </div>
          <div className='add_btn'>
            <Button variant="primary" onClick={adduser}><i class="fa-solid fa-plus"></i>&nbsp;Add User</Button>
          </div>
        </div>

        {/* export, gender, status */}
        <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
          <div className='export_csv'>
            <Button className="export_btn">Export to CSV</Button>
          </div>
          <div className='filter_gender'>
            <div className='filter'>
              <h3>Filter by Gender</h3>
              <div className='gender d-flex justify-content-between'>
                <Form.Check // prettier-ignore
                  type={"radio"}
                  label={`All`}
                  name="gender"
                  value={"All"}
                  onChange={(e) => setGender(e.target.value)}
                  defaultChecked
                />

                <Form.Check // prettier-ignore
                  type={"radio"}
                  label={`Male`}
                  name="gender"
                  value={"Male"}
                  onChange={(e) => setGender(e.target.value)}
                />

                <Form.Check // prettier-ignore
                  type={"radio"}
                  label={`Female`}
                  name="gender"
                  value={"Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* sort by value */}
          <div className='filter_newold'>
            <h3>Sort by Value</h3>
            <Dropdown className='text-center'>
              <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                <i className='fa-solid fa-sort'></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSort("new")}>New</Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("old")}>Old</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* filter by status */}
          <div className='filter_status'>
            <div className='status'>
              <h3>Filter By Status</h3>
              <div className='status_radio d-flex justify-content-around flex-wrap'>
              <Form.Check // prettier-ignore
                  type={"radio"}
                  label={`All`}
                  name="status"
                  value={"All"}
                  onChange={(e) => setStatus(e.target.value)}
                  defaultChecked
                />

                <Form.Check // prettier-ignore
                  type={"radio"}
                  label={`Active`}
                  name="status"
                  value={"Active"}
                  onChange={(e) => setStatus(e.target.value)}
                />

                <Form.Check // prettier-ignore
                  type={"radio"}
                  label={`InActive`}
                  name="status"
                  value={"InActive"}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {
          showspin ? <Spiner /> : <Tables 
            userdata = {userdata}
            deleteUser={deleteUser}
            userGet = {userGet}
          /> 
        }
      </div>
    </>
  )
}

export default Home