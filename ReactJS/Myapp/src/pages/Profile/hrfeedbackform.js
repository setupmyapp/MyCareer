import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import MetaTags from "react-meta-tags"
import ReactStars from "react-rating-stars-component"
import axios from "axios"
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  FormGroup,
  Form,
  Table,
} from "reactstrap"

import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"

const Hrfeedbacksform = props => {
  const location = useLocation()
  const feedbackId = location.state.feedbackId

  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: "Hr Feedbacks Form", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Hr Feedbacks Form", breadcrumbItems)
  })
  const history = useHistory()
  const { state } = useLocation()
  const [name, setName] = useState("")
  const [reporting, setReporting] = useState("")
  const [dept, setDept] = useState("")
  const [empId, setEmpId] = useState("")
  const [rating, setRating] = useState(0)
  const [technology, setTechnology] = useState({
    priority: "",
    ranking: "",
    remarks: "",
  })
  const [jobknowledge, setJobKnowledge] = useState({
    priority: "",
    ranking: "",
    remarks: "",
  })
  const [dependability, setDependability] = useState({
    priority: "",
    ranking: "",
    remarks: "",
  })
  const [analytical, setAnalytical] = useState({
    priority: "",
    ranking: "",
    remarks: "",
  })

  const [quality, setQuality] = useState({
    priority: "",
    ranking: "",
    remarks: "",
  })
  const [comm, setComm] = useState({
    priority: "",
    ranking: "",
    remarks: "",
  })
  const [teamwork, setTeamwork] = useState({
    priority: "",
    ranking: "",
    remarks: "",
  })
  const [Completion, setCompletion] = useState({
    priority: "",
    ranking: "",
    remarks: "",
  })
  const [postData, setPostData] = useState({
    rmFeedbackId: "",
    employeeId: "",
    employeeName: "",
    rmName: "",
    businessUnit: "",
    rmFeedbackDate: "",

    performanceRatings: [
      {
        technology: technology,
        jobknowledge: jobknowledge,
        dependability: dependability,
        analytical: analytical,
        quality: quality,
        comm: comm,
        teamwork: teamwork,
        Completion: Completion,
      },
    ],
    averageRating: "",
    commentStrengths: "",
    commentAreasOfImprovement: "",
    commentTrainingNeeded: "",
    hrApproved: "",
    hrAverageRating: "",
    hrCommentStrengths: "",
    hrCommentAreasOfImprovement: "",
    hrCommentTrainingNeeded: "",
  })

  const IPAddGetFeedBack = rmFeedbackId => {}
  const assignFeedbackFields = RMFeedBackDTO => {
    setPostData({
      ...postData,
      rmFeedbackId: RMFeedBackDTO.rmFeedbackId.rmFeedbackId,
      employeeId: RMFeedBackDTO.employeeId,
      employeeName: RMFeedBackDTO.employeeName,
      rmName: RMFeedBackDTO.rmName,
      businessUnit: RMFeedBackDTO.businessUnit,
      rmFeedbackDate: RMFeedBackDTO.rmFeedbackDate,
      performanceRatings: RMFeedBackDTO.performanceRatings,
      averageRating: RMFeedBackDTO.averageRating,
      commentStrengths: RMFeedBackDTO.commentStrengths,
      commentAreasOfImprovement: RMFeedBackDTO.commentAreasOfImprovement,
      commentTrainingNeeded: RMFeedBackDTO.commentTrainingNeeded,
      hrApproved: RMFeedBackDTO.hrApproved,
      hrAverageRating: RMFeedBackDTO.hrAverageRating,
      hrCommentStrengths: RMFeedBackDTO.hrCommentStrengths,
      hrCommentAreasOfImprovement: RMFeedBackDTO.hrCommentAreasOfImprovement,
      hrCommentTrainingNeeded: RMFeedBackDTO.hrCommentTrainingNeeded,
    })
  }
  useEffect(() => {
    if (addNewUpSkill) {
      setPostData({
        ...postData,
        employeeId: state.employeeId,
        employeeName: employeeName,
      })
    } else {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${accessToken}`,
      }
      axios
        .get(IPAddGetFeedBack(state?.rmFeedbackId))
        .then(response => {
          assignFeedbackFields(response.data.RMFeedBackDTO)
          console.log(JSON.stringify(response.data))
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [])
  const handleCheckChange = event => {
    const { checked } = event.target
    setPostData(prevPostData => ({
      ...prevPostData,
      hrApproved: checked,
    }))
  }

  const handleChange = (field, value) => {
    setPostData(prevPostData => ({
      ...prevPostData,
      [field]: value,
    }))
  }
  axios.defaults.headers.common = {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("authUser")).accessToken
    }`,
  }
  const storedFormValues = localStorage.getItem("authUser")
  const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}
  const handleFormSubmit = event => {
    event.preventDefault()

    console.log("hrFeedback:", postData)
    axios
      .post("", postData)
      .then(response => {
        console.log(response.postData)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const [performanceRatings, setPerformanceRatings] = useState([])
  return (
    <React.Fragment>
      <MetaTags>
        <title>Performance Ratings</title>
      </MetaTags>

      <Row>
        <Col
          lg={12}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card>
            <div style={{ marginTop: "20px" }}></div>
            <CardBody>
              <Row className="mb-4 ms-4" style={{ marginLeft: "40px" }}>
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label pe-4"
                  // style={{ margin: "0px  " }}
                >
                  Name of Consultant
                </label>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={true}
                  />
                </div>

                <div
                  className="col-md-2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    htmlFor="example-date-input"
                    className="col-form-label"
                    style={{ margin: "0 74px 0px  " }}
                  >
                    Date
                  </label>
                </div>
                <div className="col-md-3" style={{ marginLeft: "10px" }}>
                  <input
                    className="form-control"
                    type="date"
                    id="example-date-input"
                  />
                </div>
              </Row>

              <Row className="mb-4 ms-4">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label pe-4"
                >
                  Reporting Manager
                </label>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="text"
                    value={reporting}
                    onChange={e => setReporting(e.target.value)}
                    disabled={true}
                  />
                </div>

                <div
                  className="col-md-2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label
                    htmlFor="example-text-input"
                    className="col-form-label"
                    style={{ margin: "0 70px 0px  " }}
                  >
                    Business/Dpt
                  </label>
                </div>
                <div className="col-md-3" style={{ marginLeft: "10px" }}>
                  <input
                    className="form-control"
                    type="text"
                    value={dept}
                    onChange={e => setDept(e.target.value)}
                    disabled={true}
                  />
                </div>
                <div style={{ marginTop: "40px" }}></div>
                <Row className="mb-9">
                  <div className="table-responsive">
                    <div
                      className="style-table"
                      style={{ textAlign: "center" }}
                    >
                      {}
                      <Table className="table-bordered mb-12">
                        <thead>
                          <tr>
                            <th style={{ width: "130px" }}>
                              Performance Rating
                            </th>
                            <th style={{ width: "250px" }}>Priority/weights</th>
                            <th style={{ width: "200px" }}>Ranking</th>
                            <th style={{ width: "290px" }}>Remarks</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <th scope="row">Technology</th>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>

                            <td>
                              {" "}
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />{" "}
                            </td>

                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Job knowledge</th>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Dependability & Initiative</th>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">Analytical Ability</th>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Quality</th>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>

                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Comm & Interpersonal skills</th>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Team Work</th>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">Completion of work</th>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Average</th>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                disabled={true}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Row>
                <div style={{ marginTop: "20px" }}></div>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Strengths
                  </label>
                  <div className="col-md-10">
                    {/* <textarea
                      className="form-control"
                      type="text"
                      defaultValue=""
                    /> */}
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-4 col-form-label"
                  >
                    Areas of Improvement
                  </label>
                  <div className="col-md-10">
                    {/* <textarea
                      className="form-control"
                      type="text"
                      defaultValue=""
                    /> */}
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-3 col-form-label"
                  >
                    Traning Needed
                  </label>
                  <div className="col-md-10">
                    {/* <textarea
                      className="form-control"
                      type="text"
                      defaultValue=""
                    /> */}
                  </div>
                </Row>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <h4 className="card-title">HR FEEDBACK</h4>
              <div style={{ marginTop: "15px" }}></div>
              <div className="form-check-right form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customCheck4"
                  checked={postData.hrApproved}
                  onChange={handleCheckChange}
                />
                <label className="form-check-label" htmlFor="customCheck4">
                  Approve
                </label>
              </div>

              {postData.hrApproved && (
                <>
                  <div style={{ marginTop: "15px" }}></div>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      HR Average
                    </label>
                    <div className="col-md-10">
                      <ReactStars
                        count={5}
                        onChange={newRating2 => {
                          setPostData(prevPostData => ({
                            ...prevPostData,
                            gNOFinalRating: newRating2,
                          }))
                        }}
                        size={24}
                        activeColor="#ffd700"
                        value={rating}
                        style={{ marginRight: "10px" }}
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      HR Strengths
                    </label>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        type="text"
                        value={postData.hrCommentStrengths}
                        onChange={e =>
                          setPostData(prevPostData => ({
                            ...prevPostData,
                            hrCommentStrengths: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      HR Areas of Improvement
                    </label>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        type="text"
                        defaultValue=""
                        value={postData.hrCommentAreasOfImprovement}
                        onChange={e =>
                          setPostData(prevPostData => ({
                            ...prevPostData,
                            hrCommentAreasOfImprovement: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      HR Traning Needed
                    </label>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        type="text"
                        defaultValue=""
                        value={postData.hrCommentTrainingNeeded}
                        onChange={e =>
                          setPostData(prevPostData => ({
                            ...prevPostData,
                            hrCommentTrainingNeeded: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </Row>
                </>
              )}
              <div>
                <button
                  type="submit"
                  className="btn btn-primary w-md"
                  style={{ float: "right" }}
                  onClick={handleFormSubmit}
                >
                  Submit
                </button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Hrfeedbacksform)
