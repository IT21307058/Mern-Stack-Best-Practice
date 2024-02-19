import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Card'
import Spiner from "../../components/Spiner/Spiner"
import { singleUsergetfunc } from '../../services/Apis';
import "./profile.css"
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../services/helper';
import moment from 'moment';

const Profile = () => {

  const [showspin, setShowSpin] = useState(true);

  const [userProfile, setUserProfile] = useState({});

  // id = dunnoth {id : wrgeth3653geg} that's why
  const {id} = useParams();

  const userProfileGet = async() => {
    const response = await singleUsergetfunc(id);

    if(response.status === 200){
      setUserProfile(response.data)
    }else{
      console.log("error");
    }
    
  }


  useEffect(() => {
    userProfileGet();

    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [id])


  return (
    <>
    {
      showspin ? <Spiner /> : 
      <div className='container'>
      <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
        <Card.Body>
          <Row>
            <div className='col'>
              <div className='card-profile-stats d-flex justify-content-center'>
                <img src={`${BASE_URL}/uploads/${userProfile.profile}`} alt="" />
              </div>
            </div>
          </Row>
          <div className='text-center'>
            <h3>{userProfile.fname + userProfile.lname}</h3>
            <h4><i class="fa-solid fa-envelope email"></i> &nbsp; :- <span>{userProfile.email}</span> </h4>
            <h5><i class="fa-solid fa-mobile"></i> &nbsp; :- <span>{userProfile.mobile}</span></h5>
            <h4><i class="fa-solid fa-person"></i> &nbsp; :- <span>{userProfile.gender}</span> </h4>
            <h4><i class="fa-solid fa-location-pin location"></i> &nbsp; :- <span>{userProfile.location}</span> </h4>
            <h4><i class="fa-solid fa-calendar-days calender"></i>&nbsp;Date Created &nbsp; :- <span>{moment(userProfile.datecreated).format("DD-MM-YYYY")}</span> </h4>
            <h4><i class="fa-solid fa-calendar-days calender"></i>&nbsp;Date Updated &nbsp; :- <span>{userProfile.dateupdated}</span> </h4>
          </div>
        </Card.Body>
      </Card>
    </div>
    }
    </>
  )
}

export default Profile