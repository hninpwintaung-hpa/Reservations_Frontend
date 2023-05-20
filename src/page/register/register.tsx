import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import axios from "axios";
const Register: React.FC= () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [status, setStatus] = useState(0);
  const [role, setRole] = useState(3);
  const [message,setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/register",{
          name: userName,
          email: email,
          employee_id: employee_id,
          password: password,
          status: status,
          team_id: teamName,
          role_id: role,
          phone: phone,
          
        },
      )
      .then(function (response) {
        setMessage(response.data.message);
        alert(response.data.message);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error) => {
        if(error.response && error.response.data){
          console.log(error.response.data.message);
        }
      });
      setUserName("");
      setEmail("");
      setConfirmPassword("");
      setPassword("");
      setTeamName("");
      setMessage("");
      setPhone("");
      setEmployeeId("");
    
  };


  return (
    <div className="register_wrapper">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <h1 className="txt-register">Register</h1>
          <div className="username">
            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="username"
              required
            />
          </div>
          <div className="email">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user.aceplus@gmail.com"
              required
            />
          </div>
          <div className="password">
            <input
              type="text"
              name="employeeId"
              value={employee_id}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="ACE-****"
              required
            />
          </div>
          <div style={{ marginBottom:"7px" }}>
            <PhoneInput
              country="us"
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
          </div>
          <div className="team">
            <select
              className="option"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            >
              <option value="1">Management Team</option>
              <option value="2">HR team</option>
              <option value="3">Japanese Team</option>
              <option value="4">Frontend Team</option>
              <option value="5">Backend Team</option>
            </select>
          </div>
          <div className="password">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="confirmPassword">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter confirm password"
              required
            />
          </div>
          <div className="submit">
            <button type="submit">Register Me</button>
          </div>
          <div className="txt-link">
            <span className="text">
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Login Now
              </Link>
            </span>
          </div>
        </form>
      </div>
      <div className="inner-wrapper">
        <div className="inner-right">
          <h1>Register Form</h1>
          <p>ACE plus Solutions Company Limited</p>
        </div>
      </div>
    </div>
  );
};

export default Register;