import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Card, CardBody, Col, Row } from "reactstrap"
import axios from "axios"
import { AvForm } from "availity-reactstrap-validation"
import { connect } from "react-redux"
import {
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min"
import { setBreadcrumbItems } from "../../store/actions"
import ReactInputMask from "react-input-mask"
import { IPAddress } from "util/APIUtil"
import "../Css/SelfAppraisal.css"

const SelfAppraisalList = props => {
  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: "SelfAppraisals", link: "#" },
  ]

  const [appraisal, setAppraisal] = useState([])
  const [showselfAppBtn, setShowselfAppBtn] = useState(false)

  const history = useHistory()
  const locationState = useLocation().state
  const [alertMessage, setAlertMessage] = useState("")

  const [showSecondCard, SetShowSecondCard] = useState(false)

  const storedFormValues = localStorage.getItem("authUser")
  const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}

  const showAlertMessage = message => {
    setAlertMessage(message)
  }
  useEffect(() => {
    props.setBreadcrumbItems("SelfAppraisal List", breadcrumbItems)
    if (
      authUser.rolesList[0] === "ACCOUNT_MANAGER" ||
      authUser.rolesList[0] === "TEAM_MEMBER"
    ) {
      setShowselfAppBtn(true)
    }
  }, [])
  useEffect(() => {
    if (locationState && locationState.alertMessage) {
      setAlertMessage(locationState.alertMessage)
    }
  }, [locationState])
  useEffect(() => {
    if (locationState && locationState.showSecondCard) {
      SetShowSecondCard(locationState.showSecondCard)
    }
  }, [locationState])

  const IPAdd = id => {
    if (
      authUser.rolesList[0] === "ACCOUNT_MANAGER" ||
      authUser.rolesList[0] === "TEAM_MEMBER"
    ) {
      return `${IPAddress}tracking/employee/getMySelfAppraisalsList/${id}`
    } else {
      return `${IPAddress}tracking/hrSupport/getAllSelfAppraisalsList`
    }
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authUser")).accessToken

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

    axios
      .get(IPAdd(authUser.employeeId), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setAppraisal(response.data.selfAppraisalsListDTOList)

        console.log(response.data.selfAppraisalsListDTOList)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  // const handleCardclick = appraisal => {
  //   history.push({
  //     pathname: "./Self-Appraisal",
  //     state: { appraisal },
  //   })
  // }
  const handleAddNewselfappraisal = (employeeId, addNewMySelfAppraisal) => {
    history.push({
      pathname: "/SelfAppraisal-Emp",
      state: {
        employeeId: employeeId,
        addNewMySelfAppraisal: addNewMySelfAppraisal,
      },
    })
  }
  // const handleCardclick = selfAppraisalId => {
  //   let path
  //   if (
  //     authUser.rolesList[0] === "ACCOUNT_MANAGER" ||
  //     authUser.rolesList[0] === "TEAM_MEMBER"
  //   ) {
  //     path = "./SelfAppraisal-Emp"
  //   } else if (
  //     authUser.rolesList[0] === "HR_SUPPORT" ||
  //     authUser.rolesList[0] === "SUPER_ADMIN"
  //   ) {
  //     path = "./SelfAppraisal-Hr"
  //   }
  //   history.push({
  //     pathname: path,
  //     state: { appraisal },
  //   })
  // }

  const handleCardclick = (selfAppraisalId, addNewMySelfAppraisal) => {
    let path

    if (
      authUser.rolesList[0] === "ACCOUNT_MANAGER" ||
      authUser.rolesList[0] === "TEAM_MEMBER"
    ) {
      path = "./SelfAppraisal-Emp"
    } else if (
      authUser.rolesList[0] === "HR_SUPPORT" ||
      authUser.rolesList[0] === "SUPER_ADMIN"
    ) {
      path = "./SelfAppraisal-Hr"
    }

    history.push({
      pathname: path,
      state: {
        selfAppraisalId: selfAppraisalId,
        addNewMySelfAppraisal: addNewMySelfAppraisal,
        showSecondCard: true,
        showFirstCard: false,
      },
    })
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>SelfAppraisal List</title>
      </MetaTags>
      <div className="d-flex justify-content-end">
        {showselfAppBtn == true && (
          <button
            type="Addselfappraisal"
            className="btn btn-info w-md"
            style={{ margin: "10px", width: "auto", padding: "10px" }}
            onClick={() => handleAddNewselfappraisal(authUser.employeeId, true)}
          >
            Add New SelfAppraisal
          </button>
        )}
        <form className="app-search d-none d-lg-block">
          <div className="position-relative">
            <ReactInputMask
              type="text"
              className="form-control"
              placeholder={`${"Search"}...`}
            />
            <span className="fa fa-search"></span>
          </div>
        </form>
      </div>
      <Card>
        {alertMessage && (
          <div className="alert alert-success">{alertMessage}</div>
        )}
        <CardBody>
          <Row>
            <h4 className="card-title">Self Appraisal</h4>
            {appraisal && appraisal.length > 0 ? (
              appraisal.map(appraisalList => (
                <Col key={appraisalList.id} lg={4}>
                  <Card
                    className="selfapp-card"
                    onClick={() =>
                      handleCardclick(appraisalList.selfAppraisalId, false)
                    }
                    style={{
                      borderRadius: "25px",
                      border: " 1px solid #e683e6bb",
                      padding: " 0px",
                      boxShadow: " 0px 4px 10px rgba(108, 103, 103, 0.2)",
                      transition:
                        "background-color 0.3s, transform 0.3s, boxShadow 0.3s",
                      cursor: "pointer",
                    }}
                  >
                    <CardBody>
                      <AvForm>
                        <Row>
                          <Col>
                            <div className="d-flex align-items-center">
                              <label className="col-form-label mr-3">
                                SelfAppraisal Id
                              </label>
                              <span
                                className="ml-1"
                                style={{
                                  width: "150px",
                                  marginLeft: "18px",
                                  border: "none",
                                  background: "none",
                                  padding: "0",
                                }}
                              >
                                {appraisalList.selfAppraisalId}
                              </span>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="d-flex align-items-center">
                              <label className="col-form-label mr-3">
                                Employee ID
                              </label>
                              <span
                                className="ml-1"
                                style={{
                                  width: "150px",
                                  marginLeft: "18px",
                                  border: "none",
                                  background: "none",
                                  padding: "0",
                                }}
                              >
                                {appraisalList.employeeId}
                              </span>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="d-flex align-items-center">
                              <label className="col-form-label mr-3">
                                Employee Name
                              </label>
                              <span
                                className="ml-1"
                                style={{
                                  width: "150px",
                                  marginLeft: "18px",
                                  border: "none",
                                  background: "none",
                                  padding: "0",
                                }}
                              >
                                {appraisalList.employeeName}
                              </span>
                            </div>
                          </Col>
                        </Row>
                        {/* {appraisalList.goalsAndObjectives &&
                        appraisalList.goalsAndObjectives.length > 0 ? (
                          appraisalList.goalsAndObjectives.map(
                            (goalobj, index) => (
                              <div key={index}>
                                <Row>
                                  <Col>
                                    <div className="d-flex align-items-center">
                                      <label className="col-form-label mr-3">
                                        Objective
                                      </label>
                                      <span
                                        className="ml-1"
                                        style={{
                                          width: "150px",
                                          marginLeft: "18px",
                                          border: "none",
                                          background: "none",
                                          padding: "0",
                                        }}
                                      >
                                        {goalobj.objective}
                                      </span>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div className="row">
                                      <div className="col-md-4">
                                        <label className="col-form-label">
                                          Weightage
                                        </label>
                                        <div className="input-group">
                                          <span
                                            className="ml-1"
                                            style={{
                                              width: "150px",
                                              marginLeft: "18px",
                                              border: "none",
                                              background: "none",
                                              padding: "0",
                                            }}
                                          >
                                            {goalobj.weightage}
                                          </span>
                                          <div className="input-group-append">
                                            <span className="input-group-text">
                                              %
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <label className="col-form-label">
                                          Measurement
                                        </label>
                                        <div className="input-group">
                                          <span
                                            className="ml-1"
                                            style={{
                                              width: "150px",
                                              marginLeft: "18px",
                                              border: "none",
                                              background: "none",
                                              padding: "0",
                                            }}
                                          >
                                            {goalsAndObjectives.measurement}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            )
                          )
                        ) : (
                          <p>No goals and objectives available.</p>
                        )} */}

                        <Row>
                          <div className="col-md-6 mt-10">
                            <label className="col-form-label">From</label>
                            <div className="input-group">
                              <span className="ml-1">
                                {appraisalList.gnoFromDate}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6 mb-10">
                            <label className="col-form-label">To</label>
                            <div className="input-group">
                              <span className="ml-1">
                                {appraisalList.gnoToDate}
                              </span>
                            </div>
                          </div>
                        </Row>

                        <Row>
                          <div className="directory-content p-3">
                            <div style={{ display: "flex" }}>
                              <label className="col-form-label">Comment</label>
                              {/* <textarea
                                  className="form-control"
                                  type="text"
                                  id="example-text-input"
                                  readOnly
                                /> */}
                            </div>
                          </div>
                        </Row>
                      </AvForm>
                    </CardBody>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No appraisals available.</p>
            )}
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(SelfAppraisalList)
