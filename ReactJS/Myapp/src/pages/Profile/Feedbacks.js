import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
// import './feedback.css';
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  FormGroup,
  Form,
} from "reactstrap"
import axios from "axios"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import ReactStars from "react-rating-stars-component"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { IPAddress } from "util/APIUtil"
import "../Css/feedback.css"
const Feedbacks = props => {
  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: "Feedback", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Feedback", breadcrumbItems)
  })

  const [toggleSwitch, settoggleSwitch] = useState(true)
  const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
  const [feedbacks, setfeedbacks] = useState([])
  const [rating, setRating] = useState(0)
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  const storedFormValues = localStorage.getItem("authUser")
  const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}

  const IPFeedbackList = employeeId => {
    if (
      authUser.rolesList[0] === "SUPER_ADMIN" ||
      authUser.rolesList[0] === "HR_SUPPORT"
    ) {
      return `${IPAddress}tracking/hrSupport/getAllRMFeedBacksList`
    } else {
      return `${IPAddress}tracking/employee/getMyRMFeedBacksList/${employeeId}`
    }
  }
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authUser")).accessToken
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

    axios
      .get(IPFeedbackList(authUser.employeeId), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setfeedbacks(response.data.employeesListDTOList)
        console.log(response.data.employeesListDTOList)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const handleFromDateChange = event => {
    setFromDate(event.target.value)
  }
  const history = useHistory()
  const handleCardClick = feedback => {
    history.push({
      pathname: "./hrfeedbackedit",
      state: { feedbackId: feedback.id },
    })
  }
  return (
    <React.Fragment>
      <MetaTags>
        <title>Feedbacks</title>
      </MetaTags>
      <div className="d-flex justify-content-end">
        <form className="app-search d-none d-lg-block">
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              placeholder={`${"Search"}...`}
            />
            <span className="fa fa-search"></span>
          </div>
        </form>
      </div>

      <Card>
        <CardBody>
          <Row>
            <h4 className="card-title">Feedbacks</h4>
            {feedbacks && feedbacks.length > 0 ? (
              feedbacks.map(feedbacks => (
                <Col lg={6} key={feedbacks.id}>
                  <Card
                    className="feedbacks-cards"
                    onClick={() => handleCardClick(feedbacks)}
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
                      <Row className="justify-content-center">
                        <div className="directory-content p-3">
                          <div style={{ display: "flex" }}>
                            <div className="col-md-6">
                              <label
                                htmlFor="example-search-input"
                                className="col-md-7 col-form-label"
                              >
                                Employee Id
                              </label>

                              <div className="col-md-7">
                                <input
                                  className="form-control"
                                  type="text"
                                  disabled={true}
                                  id="example-text-input"
                                  value={feedbacks.employeeId}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor="example-search-input"
                                className="col-md-7 col-form-label"
                              >
                                Employee Name
                              </label>

                              <div className="col-md-7">
                                <input
                                  className="form-control"
                                  type="text"
                                  disabled={true}
                                  id="example-text-input"
                                  value={feedbacks.employeeName}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="directory-content p-3">
                          <div style={{ display: "flex" }}>
                            <div className="col-md-6">
                              <label
                                htmlFor="example-search-input"
                                className="col-md-9 col-form-label"
                              >
                                Reporting Manager Name
                              </label>

                              <div className="col-md-7">
                                <input
                                  className="form-control"
                                  type="text"
                                  id="example-text-input"
                                  disabled={true}
                                  value={feedbacks.rmName}
                                />
                              </div>
                            </div>

                            <div className="col-md-9">
                              <label
                                htmlFor="example-date-input"
                                className="col-md-3 col-form-label"
                              >
                                Date
                              </label>

                              <div className="col-md-5">
                                <input
                                  className="form-control"
                                  type="date"
                                  id="example-date-input"
                                  disabled={true}
                                  value={feedbacks.rmFeedbackDate}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="directory-content p-3">
                          <div style={{ display: "flex" }}>
                            <div className="col-md-6">
                              <label
                                htmlFor="example-search-input"
                                className="col-md-9 col-form-label"
                              >
                                Reporting Manager Name
                              </label>

                              <div className="col-md-7">
                                <input
                                  className="form-control"
                                  type="text"
                                  id="example-text-input"
                                  disabled={true}
                                  value={feedbacks.businessUnit}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="directory-content p-3">
                          <div style={{ display: "flex" }}>
                            <div className="col-md-6">
                              <label
                                htmlFor="example-search-input"
                                className="col-md-9 col-form-label"
                              >
                                Reporting Manager Name
                              </label>

                              <div className="col-md-7">
                                <input
                                  className="form-control"
                                  type="text"
                                  id="example-text-input"
                                  disabled={true}
                                  value={feedbacks.rmName}
                                />
                              </div>
                            </div>

                            <div className="col-md-9">
                              <label
                                htmlFor="example-date-input"
                                className="col-md-3 col-form-label"
                              >
                                Date
                              </label>

                              <div className="col-md-5">
                                <input
                                  className="form-control"
                                  type="date"
                                  id="example-date-input"
                                  disabled={true}
                                  value={feedbacks.rmFeedbackDate}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="directory-content p-3">
                          <div style={{ display: "flex" }}>
                            <label
                              htmlFor="example-text-input"
                              className="col-md-2 col-form-label"
                            >
                              Feedback
                            </label>
                            <div className="col-md-9 ">
                              <textarea
                                className="form-control"
                                type="text"
                                id="example-text-input"
                                disabled={true}
                                value={feedbacks.comment}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="directory-content p-3">
                          <div style={{ display: "flex" }}>
                            <label
                              htmlFor="example-text-input"
                              className="col-md-2 col-form-label"
                            >
                              Ratings
                            </label>
                            <div className="col-md-5">
                              <ReactStars
                                count={5}
                                onChange={newRating => setRating(newRating)}
                                size={24}
                                activeColor="#ffd700"
                                value={feedbacks.ratings}
                                disabled={true}
                              />
                            </div>
                          </div>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No feedback</p>
            )}
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Feedbacks)
