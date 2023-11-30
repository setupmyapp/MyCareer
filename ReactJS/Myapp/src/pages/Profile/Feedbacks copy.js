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
import { IPAddress } from "util/APIUtil"
import { connect } from "react-redux"
import ReactStars from "react-rating-stars-component"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
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

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authUser")).accessToken
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

    axios
      .get(`${IPAddress}tracking/hrSupport/getAllEmployees`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setAppraisal(response.data.employeeListStructureList)
        console.log(response.data.employeeListStructureList)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const handleFromDateChange = event => {
    setFromDate(event.target.value)
  }

  const handleToDateChange = event => {
    setToDate(event.target.value)
  }
  return (
    <React.Fragment>
      <MetaTags>
        <title>profile</title>
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
      <Row className="justify-content-center">
        <h4 className="card-title">Feedbacks</h4>
        {feedbacks.map(feedbacks => (
          <Col lg={6} xs={8} key={feedbacks.id}>
            <Card
              style={{ boarderRadius: "15px" }}
              className="feedback-card-hover"
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
                          Reporting Manager
                        </label>

                        <div className="col-md-5">
                          <input
                            className="form-control"
                            type="text"
                            id="example-text-input"
                            value={feedbacks.manager}
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
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="directory-content p-3">
                    <div style={{ display: "flex" }}>
                      <label
                        htmlFor="example-date-input"
                        className="col-md-1 col-form-label"
                      >
                        From
                      </label>
                      <div className="col-md-5">
                        <input
                          className="form-control"
                          type="text"
                          id="example-date-input"
                          value={feedbacks.from}
                          onChange={handleFromDateChange}
                        />
                      </div>

                      <div style={{ margin: "0 10px" }}></div>
                      <label
                        htmlFor="example-date-input"
                        className="col-md-1 col-form-label"
                      >
                        To
                      </label>
                      <div className="col-md-5">
                        <input
                          className="form-control"
                          type="text"
                          id="example-date-input"
                          value={feedbacks.to}
                          onChange={handleToDateChange}
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
                        Feedback
                      </label>
                      <div className="col-md-9 ">
                        <textarea
                          className="form-control"
                          type="text"
                          id="example-text-input"
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
                        />
                      </div>
                    </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Feedbacks)
