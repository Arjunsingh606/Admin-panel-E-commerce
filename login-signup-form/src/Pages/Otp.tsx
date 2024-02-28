import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css";
import { Link } from "react-router-dom";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";

interface formBannerProps {
  image: string;
}
const Otp: React.FC<formBannerProps> = (props) => {
  const [otp, setOtp] = useState<string>("")

  const navigate = useNavigate();

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  const numberOtp = generateOtp()
  const [otpDigit, setOtpDigit] = useState<string>(numberOtp);

  const handleSubmitOtp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (otp === otpDigit) {
      navigate("/resetPassword");
    } else {
      alert("Enter correct otp");
    }
  };
  const handleResendOtp = () => {
    setOtpDigit(generateOtp());
  };

  return (
    <>
      <div className="container-fluid form-body">
        <div className="row user-form">
          <div className="col-md-6 form-size form-banner">
            <div className="form-banner">
              <img
                className="img-fluid form-image"
                src={props.image}
                alt="loading"
              />
            </div>
          </div>
          <div className="col-md-4 form-size">
            <div className="main-form">
              <Form>
                <h3 className="text-start">OTP verification</h3>
                <div>
                  <Timer otpDigit={otpDigit} otpNumber={handleResendOtp} />
                </div>
                <Form.Group
                  className="mb-3 form-field"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Enter 6 digit OTP</Form.Label>
                  <Form.Control
                    type="text"
                    name="otp"
                    placeholder=""
                    // ref={input}
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value)}
                  />
                </Form.Group>

                <Button
                  onClick={handleSubmitOtp}
                  className="form-btn"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <div className="sign-up-link">
                  <p>
                    Not a member?
                    <span>
                      <Link to="/signUp"> Sign up</Link>
                    </span>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
