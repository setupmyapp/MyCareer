import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import MetaTags from "react-meta-tags"
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

const PerformanceRating = props => {
  const history = useHistory()
  const location = useLocation()

  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: "Customer Feedback", link: "#" },
    { title: "Performance Rating", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Performance Ratings", breadcrumbItems)
  }, [])

  const queryParams = new URLSearchParams(location.search)
  const nameFromQuery = queryParams.get("name")
  const reportingFromQuery = queryParams.get("reporting")
  const deptFromQuery = queryParams.get("dept")
  const empIdFromQuery = queryParams.get("empId")

  const [name, setName] = useState(nameFromQuery || "")
  const [reporting, setReporting] = useState(reportingFromQuery || "")
  const [dept, setDept] = useState(deptFromQuery || "")
  const [empId, setEmpId] = useState(empIdFromQuery || "")
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
  // useEffect(() => {
  //   const updatedQueryParams = new URLSearchParams()
  //   updatedQueryParams.set("name", name)
  //   updatedQueryParams.set("reporting", reporting)
  //   updatedQueryParams.set("dept", dept)
  //   updatedQueryParams.set("empId", empId)

  //   const newUrl = `${
  //     window.location.pathname
  //   }?${updatedQueryParams.toString()}`
  //   history.replace(newUrl) // Use replace to update URL without creating a new history entry
  // }, [name, reporting, dept, empId])
  const handleSubmit = () => {}

  return (
    <React.Fragment>
      <MetaTags>
        <title>Performance Ratings</title>
      </MetaTags>

      <Row>
        <Col lg={12}>
          <h4
            className="card-title"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            Performance Ratings
          </h4>
          <Card>
            <CardBody>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Name of Consultant
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={true}
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Date
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="date"
                    id="example-date-input"
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Reporting Manager
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                    value={reporting}
                    onChange={e => setReporting(e.target.value)}
                    disabled={true}
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Business/Dpt
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                    value={dept}
                    onChange={e => setDept(e.target.value)}
                    disabled={true}
                  />
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <Row className="mb-8">
                <div className="table-responsive">
                  <div className="style-table" style={{ textAlign: "center" }}>
                    <Table className="table-bordered mb-10">
                      <thead>
                        <tr>
                          <th style={{ width: "170px" }}>Performance Rating</th>
                          <th style={{ width: "290px" }}>Priority/weights</th>
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
                            />
                          </td>

                          <td>
                            {" "}
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                            />{" "}
                          </td>

                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
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
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
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
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
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
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
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
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                            />
                          </td>

                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
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
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
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
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
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
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
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
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue=""
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <h4 className="card-title"></h4>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Strengths
                </label>
                <div className="col-md-10">
                  <textarea
                    className="form-control"
                    type="text"
                    defaultValue=""
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Areas of Improvement
                </label>
                <div className="col-md-10">
                  <textarea
                    className="form-control"
                    type="text"
                    defaultValue=""
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Traning Needed
                </label>
                <div className="col-md-10">
                  <textarea
                    className="form-control"
                    type="text"
                    defaultValue=""
                  />
                </div>
              </Row>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary w-md"
                  style={{ float: "right" }}
                  onClick={handleSubmit}
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

export default connect(null, { setBreadcrumbItems })(PerformanceRating)
