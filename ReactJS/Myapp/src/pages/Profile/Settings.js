import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  FormGroup,
  Form,
} from "reactstrap"

import { connect } from "react-redux"
import axios from "axios"
import "../Css/setting.css"
import { setBreadcrumbItems } from "../../store/actions"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { IPAddress } from "util/APIUtil"
const Settings = props => {
  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: "Settings", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Setting", breadcrumbItems)
  })

  const [alertMessage, setAlertMessage] = useState("")
  const [Password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [passwordsMatch, setPasswordsMatch] = useState(false)
  const [showVisiblePassword, setShowVisiblePassword] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isAMpasswordValid, setIsampasswordValidate] = useState(true)

  const locationLoginState = useLocation().state
  useEffect(() => {
    if (locationLoginState && locationLoginState.alertMessage) {
      setAlertMessage(locationLoginState.alertMessage)
    }
    setTimeout(() => {
      setAlertMessage("")
    }, 6000)
  }, [locationLoginState])
  let isAccountManager = false

  function renderContent() {
    const storedFormValues = localStorage.getItem("authUser")

    const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}
    const role = authUser.rolesList[0]
    isAccountManager = role == "ACCOUNT_MANAGER" ? true : false
    console.log(role)
    console.log(isAccountManager)
  }

  renderContent()

  const PasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  const PasswordVisibility1 = () => {
    setShowVisiblePassword(prevShowVisiblePassword => !prevShowVisiblePassword)
  }

  const handlePasswordChange = (newPassword, repeatPassword) => {
    setNewPassword(newPassword)
    setRepeatPassword(repeatPassword)
    setPasswordsMatch(newPassword === repeatPassword)
    setIsPasswordValid(newPassword.length >= 6)
  }
  const handlePasswordChange1 = Password => {
    setPassword(Password)
    setIsampasswordValidate(Password.length >= 6)
  }

  const settingDTODetails = {
    newpassword: newPassword,
    currentpassword: repeatPassword,
  }
  const handleSettingFormSubmit = event => {
    event.preventDefault()

    const settingPasswordFormData = new FormData()
    settingPasswordFormData.append(
      "requestobj",
      JSON.stringify(settingDTODetails)
    )

    console.log("Setting:", JSON.stringify(settingDTODetails))

    axios.defaults.headers.common = {
      Authorization: `Bearer ${authUser.accessToken}`,
    }
    axios
      .put(`${IPAddress}`, settingPasswordFormData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const handleEmailPAsswordSubmit = event => {
    event.preventDefault()
  }
  return (
    <React.Fragment>
      <MetaTags>
        <title>Settings</title>
      </MetaTags>
      {alertMessage && (
        <div className="alert alert-success">{alertMessage}</div>
      )}
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <h4 className="card-title">Change Password</h4>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Current Password
                </label>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    id="password-input"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="password-input"
                  className="col-md-2 col-form-label"
                >
                  New Password
                </label>
                <div className="col-md-6">
                  <div className="password-input-wrapper">
                    <input
                      type="password"
                      className={`form-control ${
                        !isPasswordValid ? "is-invalid" : ""
                      }`}
                      id="password-input"
                      value={newPassword}
                      onChange={e =>
                        handlePasswordChange(e.target.value, repeatPassword)
                      }
                    />
                    {!isPasswordValid && (
                      <div className="invalid-password">
                        Password must be at least 6 characters long.
                      </div>
                    )}
                  </div>
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="repeat-password-input"
                  className="col-md-2 col-form-label"
                >
                  Repeat Password
                </label>
                <div className="col-md-6">
                  <div className="input-with-icon">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${
                        repeatPassword
                          ? passwordsMatch
                            ? "is-valid"
                            : "is-invalid"
                          : ""
                      }`}
                      id="repeat-password-input"
                      value={repeatPassword}
                      onChange={e =>
                        handlePasswordChange(newPassword, e.target.value)
                      }
                    />
                    <div
                      className="password-toggle1-icon"
                      onClick={PasswordVisibility}
                    >
                      {showPassword ? (
                        <i className="fa fa-eye-slash" />
                      ) : (
                        <i className="fa fa-eye" />
                      )}
                    </div>
                  </div>
                  {passwordsMatch && (
                    <div className="valid-feedback">Passwords match!</div>
                  )}
                  {!passwordsMatch && repeatPassword && (
                    <div className="invalid-feedback">
                      Passwords do not match.
                    </div>
                  )}
                </div>
              </Row>

              <div
                className="col-md-12 mt-10"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary w-md"
                  style={{ marginRight: "8px" }}
                  onClick={handleSettingFormSubmit}
                >
                  Submit
                </button>
              </div>
            </CardBody>
          </Card>
        </Col>

        {isAccountManager ? (
          <Col lg={12}>
            <Card>
              <CardBody>
                <h4 className="card-title">Configure Account Manager Email</h4>
                <Row className="mb-3">
                  <label
                    htmlFor="example-email-input"
                    className="col-md-2 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      id="email-input"
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="password-input"
                    className="col-md-2 col-form-label"
                  >
                    Password
                  </label>
                  <div className="col-md-6">
                    <div className="password-input-wrapper">
                      <input
                        type={showVisiblePassword ? "text" : "password"}
                        className={`form-control ${
                          !isAMpasswordValid ? "is-invalid" : ""
                        }`}
                        id="password-input"
                        value={Password}
                        onChange={e => handlePasswordChange1(e.target.value)}
                      />

                      <div
                        className="password-toggle2-icon"
                        onClick={PasswordVisibility1}
                      >
                        {showVisiblePassword ? (
                          <i className="fa fa-eye-slash" />
                        ) : (
                          <i className="fa fa-eye" />
                        )}
                      </div>
                    </div>
                    {!isAMpasswordValid && (
                      <div className="invalid-password">
                        Password must be at least 6 characters long.
                      </div>
                    )}
                  </div>
                </Row>
                <div
                  className="col-md-12 mt-10"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="submit"
                    className="btn btn-primary w-md"
                    style={{ marginRight: "8px" }}
                    onClick={handleEmailPAsswordSubmit}
                  >
                    Submit
                  </button>
                </div>
              </CardBody>
            </Card>
          </Col>
        ) : null}
      </Row>
    </React.Fragment>
  )
}
const mapStateToProps = state => ({
  user: state.user,
})

export default connect(null, { setBreadcrumbItems })(Settings)
