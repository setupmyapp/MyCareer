import React, { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { AvForm, AvField, AvGroup } from "availity-reactstrap-validation"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  UncontrolledAlert,
} from "reactstrap"
import MetaTags from "react-meta-tags"

import { loginUser, apiError } from "../../store/actions"
import logoLightPng from "../../assets/images/logo-light.png"
import logoDark from "../../assets/images/logo-dark.png"
import "../Css/login.css"

const Login = props => {
  const formRef = useRef(null)

  const [passwordInputValue, setPasswordInputValue] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const PasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  const handlePasswordChange = e => {
    setPasswordInputValue(e.target.value)
  }

  const handleValidSubmit = (event, values) => {
    props.loginUser(values, props.history)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>MY CAREER</title>
      </MetaTags>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <h3 className="text-center mt-5 mb-4">
                    <Link to="/" className="d-block auth-logo">
                      <img
                        src={logoDark}
                        alt=""
                        height="40"
                        className="auth-logo-dark"
                      />
                      <img
                        src={logoLightPng}
                        alt=""
                        height="40"
                        className="auth-logo-light"
                      />
                    </Link>
                  </h3>
                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">
                      Welcome Back!
                    </h4>
                    <p className="text-muted text-center">
                      Sign in to continue to MyCareer App.
                    </p>
                    <AvForm
                      ref={formRef}
                      className="form-horizontal mt-4"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {props.error && (
                        <div className="mb-2">
                          <Alert color="danger">{props.error}</Alert>
                        </div>
                      )}

                      <div className="mb-3">
                        <AvGroup>
                          <AvField
                            name="email"
                            label="Email/Username"
                            value=""
                            className="form-control"
                            placeholder="Enter email/username"
                            type="text"
                            required
                          />
                        </AvGroup>
                      </div>

                      <div className="mb-3 ">
                        <AvGroup>
                          <AvField
                            name="password"
                            label="Password"
                            value={passwordInputValue}
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Enter Password"
                            onChange={handlePasswordChange}
                            validate={{
                              minLength: {
                                value: 6,
                                errorMessage:
                                  "Password must be at least 6 characters",
                              },
                            }}
                          />
                          <div
                            className="password-toggle3-icon"
                            onClick={PasswordVisibility}
                          >
                            {showPassword ? (
                              <i className="fa fa-eye-slash" />
                            ) : (
                              <i className="fa fa-eye" />
                            )}
                          </div>
                        </AvGroup>
                      </div>

                      <div className="mb-3 row mt-4">
                        <div className="col text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default connect(mapStateToProps, { loginUser, apiError })(Login)
