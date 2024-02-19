import React, { useEffect, useState, useContext } from 'react'
import Card from 'react-bootstrap/Card';
import "./edit.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from "../../components/Spiner/Spiner"
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { singleUsergetfunc, editfunc } from '../../services/Apis';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../services/helper';
import { updateData } from '../../components/context/ContextProvider';

const Edit = () => {

  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  })

  const [showspin, setShowSpin] = useState(true);

  const [status, setStatus] = useState("Active");
  const [imgdata, setImgdata] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  // create context
  const {update, setUpdate} = useContext(updateData);

  // use Navigate hook
  const navigate = useNavigate();

  const {id} = useParams();

  //status option
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' }
  ];

  // set Input value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  // status set
  const setStatusValue = (e) => {
    setStatus(e.value)
  }

  // profile set
  const setProfile = (e) => {
    setImage(e.target.files[0]);
  }

  const userProfileGet = async() => {
    const response = await singleUsergetfunc(id);

    if(response.status === 200){
      setInputData(response.data)
      setStatus(response.data.status)
      setImgdata(response.data.profile)
    }else{
      console.log("error");
    }
    
  }


  // submit userdata
  const submitUserData = async(e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputdata;

    if (fname == "") {
      toast.error("First name is Required!")
    } else if (lname === "") {
      toast.error("First name is Required!")
    } else if (email === "") {
      toast.error("Email is Required!")
    } else if (!email.includes("@")) {
      toast.error("Enter valid email!")
    } else if (mobile === "") {
      toast.error("Mobile is Required!")
    } else if (mobile.length > 10) {
      toast.error("Enter valid mobile!")
    } else if (gender === "") {
      toast.error("Gender is Required!")
    } else if (status === "") {
      toast.error("Status is Required!")
    } else if (location === "") {
      toast.error("Location is Required!")
    } else {

      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("status", status);
      data.append("gender", gender);
      // old image or new image
      data.append("user_profile", image || imgdata);
      data.append("location", location)

      const config = {
        "Content-Type": "multipart/form-data"
      }

      const response = await editfunc(id, data, config);

      if(response.status === 200){
        setUpdate(response.data);
        navigate("/")
      }
    }


  }

  useEffect(() => {

    if (image) {
      setImgdata("")
      setPreview(URL.createObjectURL(image))
    }
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [image])


  return (
    <>
      {
        showspin ? <Spiner /> :
          <div className='container'>
            <h2 className='text-container mt-1'>Update Your Details</h2>
            <Card className='shadow mt-3 p-3'>
              <div className='profile_div text-center'>
                <img src={image ? preview : `${BASE_URL}/uploads/${imgdata}`} alt="img" />
              </div>

              <Form>
                <Row>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="fname" value={inputdata.fname} onChange={setInputValue} placeholder='Enter FirstName' />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lname" value={inputdata.lname} onChange={setInputValue} placeholder='Enter LastName' />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" name="email" value={inputdata.email} onChange={setInputValue} placeholder='Enter Email' />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="text" name="mobile" value={inputdata.mobile} onChange={setInputValue} placeholder='Enter Mobile Number' />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Select Your Gender</Form.Label>
                    <Form.Check // prettier-ignore
                      type={"radio"}
                      label={`Male`}
                      name="gender"
                      value={"Male"}
                      checked={inputdata.gender == "Male" ? true : false}
                      onChange={setInputData}
                    />

                    <Form.Check // prettier-ignore
                      type={"radio"}
                      label={`Female`}
                      name="gender"
                      value={"Female"}
                      checked={inputdata.gender == "Female" ? true : false}
                      onChange={setInputData}
                    />

                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Select Your Status</Form.Label>
                    <Select
                      options={options}
                      defaultValue={status}
                      onChange={setStatusValue}
                    />

                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Select your profile</Form.Label>
                    <Form.Control type="file" name="user_profile" onChange={setProfile} placeholder='Select your profile' />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Enter your location</Form.Label>
                    <Form.Control type="text" name="location" value={inputdata.location} onChange={setInputValue} placeholder='Enter your location' />
                  </Form.Group>

                  <Button variant="primary" type="submit" onClick={submitUserData}>
                    Submit
                  </Button>
                </Row>
              </Form>
            </Card>
            <ToastContainer position="top-center" />
          </div>
      }

    </>
  )
}

export default Edit