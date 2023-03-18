import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Edit.scss";
import { useLocation } from "react-router-dom";
import { LoginContext } from "../../helpers/Context";
import { useContext } from "react";

var temp_USER = {};
function Edit(props) {
  const { user, loading, setLoading } = useContext(LoginContext);
  const [message, setMessage] = useState("");
  const [imageSelected, setImageSelected] = useState("gfjebwfbweif");
  const [imageUrl, setImageUrl] = useState("");
  const [verify, setVerify] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    const Load = async () => {
      await new Promise((r) => setTimeout(r, 1000));

      setLoading((loading) => !loading);
    };

    Load();
  }, []);

  const uploadImage = () => {
    console.log(imageSelected);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "profile_image");
    console.log(formData);

    axios
      .post("https://api.cloudinary.com/v1_1/dheskw46y/image/upload", formData)
      .then((res) => {
        console.log(res.data.url);
        setImageUrl(res.data.url);
        setImageUploaded(true);
      });
  };
  // Getting User Data From Backend
  useEffect(() => {
    axios
      .post("http://localhost:5000/profile", {
        email: user.email,
      })
      .then((res) => {
        // console.log(res.data.User[0]);
        // temp_USER = res.data.User[0];
        // console.log(temp_USER);

        setUserData(res.data.User[0]);
        // setImageUrl(temp_USER.profile_img);
        setImageUrl(res.data.User[0].profile_img);
        console.log(userData);
      });
  }, []);


  const [userData, setUserData] = useState({});

  //sending data to store in the database

  const onSubmit = () => {
    axios
      .post("http://localhost:5000/userData", {
        email: user.email,
        name: userData.name,
        roll_no: userData.roll_no,
        academic_program: userData.academic_program,
        department: userData.department,
        personal_email_id: userData.personal_email_id,
        contact_details: userData.contact_details,
        alternate_contact_details: userData.contact_details,
        address: userData.contact_details,
        current_company: userData.current_company,
        designation: userData.designation,
        about: userData.about,
        profile_img: imageUrl,
      })
      .then((res) => {
        console.log(res.data.message);
        setMessage(res.data.message);
        setVerify(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setOptionValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const resendMail = () =>{
    console.log("yeah")
    axios.post("http://localhost:5000/resendMail",{
    userId: user.email,
    personalMailId:userData.personal_email_id
  }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }

  //Get the data for edit profile
  // useEffect(()=>{
  //   axios.post('http://localhost:5000/profile', {
  //     email: user.email
  //   }).then((res)=>{
  //     // console.log(res.data);
  //     // setUserData(...userData, res.data);
  //     setUserData({...userData, })
  //   })
  // })

  return (
    <>
      {loading && (
        <div className="spinner">
          <span class="loader"></span>
        </div>
      )}
      {!loading && (
        <div className="container">
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');
          </style>
          <div className="container2">
            <div className="left">
              <h2> </h2>
              <br />
              <h1>Edit your Profile</h1>
              <br />
              <input
                type="text"
                placeholder="Name*"
                size="60"
                name="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                placeholder="Roll Number*"
                size="60"
                name="roll_no"
                value={userData.roll_no}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <select
                name="academic_program"
                id=""
                defaultValue={userData.academic_program}
                onChange={setOptionValue}
              >
                <option value="" name="Academic Program" selected disabled>
                  Academic Program
                </option>
                <option
                  value="Bachelor of Technology (BTech)"
                  name="academic_program"
                >
                  Bachelor of Technology (BTech)
                </option>
                <option
                  value="Master of Technology (MTech)"
                  name="academic_program"
                >
                  Master of Technology (MTech)
                </option>
                <option value="Master of Science (MSc)" name="academic_program">
                  Master of Science (MSc)
                </option>
                <option value="Five Year BTech + MTech" name="academic_program">
                  Five Year BTech + MTech
                </option>
                <option value="MS (Research)" name="academic_program">
                  MS (Research)
                </option>
                <option value="Doctor of Philosophy" name="academic_program">
                  Doctor of Philosophy
                </option>
              </select>
              <br />
              <input
                type="text"
                placeholder="Department*"
                size="60"
                name="department"
                value={userData.department}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                placeholder="Personal Email ID*"
                size="60"
                name="personal_email_id"
                value={userData.personal_email_id}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                placeholder="Contact Number*"
                size="60"
                name="contact_details"
                value={userData.contact_details}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                placeholder="Alternate Contact Number*"
                size="60"
                name="alternate_contact_details"
                value={userData.alternate_contact_details}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                placeholder="Address*"
                size="60"
                name="address"
                value={userData.address}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                placeholder="Current Company (if any)"
                size="60"
                name="current_company"
                value={userData.current_company}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                placeholder="Designation"
                size="60"
                name="designation"
                value={userData.designation}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              <input
                type="text"
                placeholder="About Me"
                size="60"
                name="about"
                value={userData.about}
                onChange={(e) =>
                  setUserData({ ...userData, [e.target.name]: e.target.value })
                }
              />
              <br />
              {verify && <h2>{message}</h2>}
              <button className="submit1" onClick={onSubmit}>
                Submit
              </button>
              {verify && (
                <button className="submit1" onClick={resendMail}>
                  Resend Mail
                </button>
              )}
            </div>
            <div className="right">
              <span className="dot">
                <img id="ip" src={imageUrl} />
              </span>
              {/* <h2> </h2> */}
              <br />
              <h4 id="disclaimer">
                <div className="disc">Disclaimer:</div> This picture will be
                printed in the yearbook.
              </h4>
              <input
                type="file"
                onChange={(event) => {
                  setImageSelected(event.target.files[0]);
                }}
              />
              <button onClick={uploadImage} style={{ color: "white" }}>
                Upload Image
              </button>
              {imageUploaded && (
                <h3 style={{ color: "white" }}>Image Uploaded</h3>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Edit;
