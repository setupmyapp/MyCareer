import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Card, CardBody, Col, InputGroup, Row } from "reactstrap"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import { AvForm } from "availity-reactstrap-validation"
import axios from "axios"
import { useLocation } from "react-router-dom"
import DatePicker from "react-flatpickr"
import { IPAddress } from "util/APIUtil"
import { values } from "lodash"
import ReactStars from "react-rating-stars-component"

const SelfAppraisal = props => {
  const breadcrumbItems = [
    { title: "My Career App", link: "#" },
    { title: "Self Appraisal", link: "#" },
  ]

  const { state } = useLocation()
  const [currentDate, setCurrentDate] = useState(null)

  const [xzgoalsandobjectivesformData, setGoalsAndObjectiveFormData] = useState(
    []
  )
  const [rating, setRating] = useState(0)
  const [rating1, setRating1] = useState(0)
  const [rating2, setRating2] = useState(0)

  const [step, Setstep] = useState(1)
  const [alertfirstsubmitError, setAlertFirstSubmitError] = useState(false)
  const [alertsecondsubmitError, setAlertSecondSubmitError] = useState(false)
  const [alertthirdsubmitError, setAlertThirdSubmitError] = useState(false)
  const [alertfourthsubmitError, setAlertFouthSubmitError] = useState(false)
  const [showSecondCard, SetShowSecondCard] = useState(false)

  var [date, setDate] = useState(new Date())

  const [postData, setPostData] = useState({
    selfAppraisalId: "",
    employeeId: "",
    employeeName: "",
    goalsAndObjectives: "",
    gnoCommentByEmployee: "",
    gnoFromDate: "",
    gnoToDate: "",
    gnoAddedDate: "",
    gnoApproved: "",
    gnoApprovalComment: "",
    gnoApprovedDate: "",
    gnoTentativeRating: "",
    gnoTentativeRatingComment: "",
    gnoTentativeRatingDate: "",
    gnoRatingEmployeeAccepted: false,
    gnoRatingEmployeeFeedback: "",
    gnoFinalRating: "",
    gnoFinalRatingComment: "",
    gnoFinalRatingDate: "",
  })

  const [hrFeedbackResponse, setHrFeedbackResponse] = useState("")

  const handleApprovedCheckboxChange = event => {
    const { checked } = event.target
    setPostData(prevPostData => ({
      ...prevPostData,
      gNOApproved: checked,
    }))
  }

  const handleRatingEmployeeAcceptedCheckbox = event => {
    console.log("Checkbox clicked")
    const { checked } = event.target
    setPostData(prevPostData => ({
      ...prevPostData,
      gNORatingEmployeeAccepted: checked,
    }))
  }

  const handleToSelfAppraisalDate = selectedDate => {
    const date = selectedDate[0]
    const day = date.getDate()
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
    const monthName = monthNames[date.getMonth()]
    const year = date.getFullYear()

    const toDate = `${day}-${monthName}-${year}`
    console.log(toDate)
    setPostData(prevPostData => ({
      ...prevPostData,
      gnoToDate: toDate,
    }))
  }

  const handleFromSelfAppraisalDate = selectedDate => {
    const date = selectedDate[0]
    const day = date.getDate()
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
    const monthName = monthNames[date.getMonth()]
    const year = date.getFullYear()

    const fromDate = `${day}-${monthName}-${year}`
    console.log(fromDate)
    setPostData(prevPostData => ({
      ...prevPostData,
      gnoFromDate: fromDate,
    }))
  }

  const handleApprovedSelfAppraisalDate = selectedDate => {
    const date = selectedDate[0]
    const day = date.getDate()
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
    const monthName = monthNames[date.getMonth()]
    const year = date.getFullYear()

    const approvedDate = `${day}-${monthName}-${year}`
    console.log(approvedDate)
    setPostData(prevPostData => ({
      ...prevPostData,
      gnoApprovedDate: approvedDate,
    }))
  }

  const handleTentativeSelfAppraisalDate = selectedDate => {
    const date = selectedDate[0]
    const day = date.getDate()
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
    const monthName = monthNames[date.getMonth()]
    const year = date.getFullYear()

    const tentativeDate = `${day}-${monthName}-${year}`

    setPostData(prevPostData => ({
      ...prevPostData,
      gnoTentativeRatingDate: tentativeDate,
    }))
  }

  const handleFinalSelfAppraisalDate = selectedDate => {
    const date = selectedDate[0]
    const day = date.getDate()
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
    const monthName = monthNames[date.getMonth()]
    const year = date.getFullYear()

    const FinalDate = `${day}-${monthName}-${year}`

    setPostData(prevPostData => ({
      ...prevPostData,
      gnoFinalRatingDate: FinalDate,
    }))
  }

  const handleGoalsandObjectiveChange = (index, field, value) => {
    setGoalsAndObjectiveFormData(prevFormData =>
      prevFormData.map((data, i) =>
        i === index ? { ...data, [field]: value } : data
      )
    )

    setPostData(prevPostData => ({
      ...prevPostData,
      selfAppraisalId: "",
      employeeId: JSON.parse(localStorage.getItem("authUser")).employeeId,
      employeeName: "",
      goalsAndObjectives: JSON.stringify(goalsandobjectivesformData),
      gnoCommentByEmployee: "",
      gnoFromDate: "",
      gnoToDate: "",
      gnoAddedDate: AddedDate(),
      gnoApprovalComment: hrFeedbackResponse,
      gnoApprovedDate: "",
      gnoApproved: false,
      gnoTentativeRating: rating.toString(),
      gnoTentativeRatingComment: "",
      gnoTentativeRatingDate: "",
      gnoRatingEmployeeAccepted: "",
      gnoRatingEmployeeFeedback: "",
      gnoFinalRating: rating2.toString(),
      gnoFinalRatingComment: "",
      gnoFinalRatingDate: "",
    }))
  }
  // const updatedPostData = {
  //   addNewMySelfAppraisalRequest: addNewMySelfAppraisalRequest,
  // }

  axios.defaults.headers.common = {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("authUser")).accessToken
    }`,
  }
  const storedFormValues = localStorage.getItem("authUser")
  const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}
  const AddedDate = () => {
    const date = new Date()
    var dateFormat =
      date.toLocaleString("default", { year: "numeric" }) +
      "-" +
      date.toLocaleString("default", { month: "2-digit" }) +
      "-" +
      date.toLocaleString("default", { day: "2-digit" })
    return dateFormat
  }
  const handleSelfAppraisalFormSubmit = submitButton => {
    // event.preventDefault()

    console.log("first")

    if (submitButton == "firstSubmit") {
      console.log("firstSubmit")
      if (
        postData.goalsAndObjectives !== "" &&
        postData.gnoCommentByEmployee !== "" &&
        /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/.test(
          postData.gnoFromDate
        ) &&
        /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/.test(
          postData.gnoToDate
        )
      ) {
        const selfAppraisalForm = new FormData()
        selfAppraisalForm.append(
          "addNewMySelfAppraisalRequest",
          JSON.stringify(postData)
        )

        console.log("SelfAppraisal:", JSON.stringify(postData))

        console.log(JSON.parse(localStorage.getItem("authUser")).accessToken)
        axios.defaults.headers.common = {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("authUser")).accessToken
          }`,
        }
        axios
          .put(
            `${IPAddress}tracking/employee/addNewMySelfAppraisal`,
            selfAppraisalForm,
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          )
          .then(response => {
            console.log(response.data)
            setPostData(response.data)
          })
          .catch(error => {
            console.error(error)
          })
        SetShowSecondCard(true)
      } else {
        setAlertFirstSubmitError(true)

        setTimeout(() => {
          setAlertFirstSubmitError(false)
        }, 4000)
      }
    } else if (submitButton === "secondSubmit") {
      if (
        postData.gnoTentativeRating !== "" &&
        postData.gnoTentativeRatingComment !== "" &&
        /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/.test(
          postData.gnoTentativeRatingDate
        )
      ) {
        const selfAppraisalForm = new FormData()
        selfAppraisalForm.append(
          "addNewMySelfAppraisalRequest",
          JSON.stringify(postData)
        )

        console.log("SelfAppraisal:", JSON.stringify(postData))

        console.log(JSON.parse(localStorage.getItem("authUser")).accessToken)
        axios.defaults.headers.common = {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("authUser")).accessToken
          }`,
        }
        axios
          .put(
            `${IPAddress}tracking/employee/addNewMySelfAppraisal`,
            selfAppraisalForm,
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          )
          .then(response => {
            console.log(response.data)
            setPostData(response.data)
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        setAlertSecondSubmitError(true)

        setTimeout(() => {
          setAlertSecondSubmitError(false)
        }, 4000)
      }
    } else if (submitButton === "thirdSubmit") {
      if (postData.gnoRatingEmployeeFeedback !== "") {
        const selfAppraisalForm = new FormData()
        selfAppraisalForm.append(
          "addNewMySelfAppraisalRequest",
          JSON.stringify(postData)
        )

        console.log("SelfAppraisal:", JSON.stringify(postData))

        console.log(JSON.parse(localStorage.getItem("authUser")).accessToken)
        axios.defaults.headers.common = {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("authUser")).accessToken
          }`,
        }
        axios
          .put(
            `${IPAddress}tracking/employee/addNewMySelfAppraisal`,
            selfAppraisalForm,
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          )
          .then(response => {
            console.log(response.data)
            setPostData(response.data)
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        setAlertThirdSubmitError(true)

        setTimeout(() => {
          setAlertThirdSubmitError(false)
        }, 4000)
      }
    } else if (submitButton === "fourthSubmit") {
      if (
        postData.gnoFinalRatingComment !== "" &&
        /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/.test(
          postData.gnoFinalRatingDate
        )
      ) {
        const selfAppraisalForm = new FormData()
        selfAppraisalForm.append(
          "addNewMySelfAppraisalRequest",
          JSON.stringify(postData)
        )

        console.log("SelfAppraisal:", JSON.stringify(postData))

        console.log(JSON.parse(localStorage.getItem("authUser")).accessToken)
        axios.defaults.headers.common = {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("authUser")).accessToken
          }`,
        }
        axios
          .put(
            `${IPAddress}tracking/employee/addNewMySelfAppraisal`,
            selfAppraisalForm,
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          )
          .then(response => {
            console.log(response.data)
            setPostData(response.data)
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        setAlertFouthSubmitError(true)

        setTimeout(() => {
          setAlertFouthSubmitError(false)
        }, 4000)
      }
    }
  }

  useEffect(() => {
    props.setBreadcrumbItems("Self Appraisal", breadcrumbItems)
    if (state) {
      console.log(state.appraisal)
    }

    if (state && state.appraisal && state.appraisal.employeeId) {
      setGoalsAndObjectiveFormData([
        {
          objective: state.appraisal.employeeId,
          weightage: "",
          measurement: "",
        },
      ])
    } else {
      setGoalsAndObjectiveFormData([
        {
          objective: "",
          weightage: "",
          measurement: "",
        },
      ])
    }
  }, [props, state])

  const handleRemoveField = index => {
    setGoalsAndObjectiveFormData(prevFormData =>
      prevFormData.filter((_, i) => i !== index)
    )
  }

  const handleAddField = () => {
    const isLastFieldFilled =
      goalsandobjectivesformData[goalsandobjectivesformData.length - 1]
        .objective &&
      goalsandobjectivesformData[goalsandobjectivesformData.length - 1]
        .weightage &&
      goalsandobjectivesformData[goalsandobjectivesformData.length - 1]
        .measurement
    if (isLastFieldFilled) {
      setGoalsAndObjectiveFormData(prevFormData => [
        ...prevFormData,
        { objective: "", weightage: "", measurement: "" },
      ])
    } else {
      alert(
        "Please fill all fields in the existing form before adding a new field."
      )
    }
  }

  const isFeedbackDisabled = hrFeedbackResponse === null
  return (
    <React.Fragment>
      <MetaTags>
        <title>Profile</title>
      </MetaTags>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <h4 className="card-title">Self Appraisal</h4>
              <AvForm>
                {goalsandobjectivesformData.map((data, index) => (
                  <Row key={index}>
                    <Col>
                      <label className="col-form-label">Objective</label>
                      <input
                        className="form-control col-3"
                        type="text"
                        name="goalsAndObjectives"
                        value={data.objective}
                        disabled={
                          authUser.rolesList[0] === "HR_SUPPORT" ||
                          authUser.rolesList[0] === "SUPER_ADMIN"
                        }
                        onChange={e =>
                          handleGoalsandObjectiveChange(
                            index,
                            "objective",
                            e.target.value
                          )
                        }
                      />
                    </Col>
                    <Col>
                      <div className="row">
                        <div className="col-md-4">
                          <label className="col-form-label">Weightage</label>
                          <div className="input-group">
                            <input
                              className="form-control"
                              type="text"
                              name="goalsAndObjectives"
                              value={data.weightage}
                              disabled={
                                authUser.rolesList[0] === "HR_SUPPORT" ||
                                authUser.rolesList[0] === "SUPER_ADMIN"
                              }
                              onInput={e => {
                                const value = e.target.value
                                const onlyNumbers = value.replace(/[^0-9]/g, "")
                                if (value > 100) {
                                  alert("Percentage cannot be greater than 100")
                                  return
                                }
                                handleGoalsandObjectiveChange(
                                  index,
                                  "weightage",
                                  onlyNumbers
                                )
                              }}
                            />

                            <div className="input-group-append">
                              <span className="input-group-text">%</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="col-form-label">Measurement</label>
                          <div className="input-group">
                            <input
                              className="form-control"
                              type="text"
                              name="goalsAndObjectives"
                              value={data.measurement}
                              onChange={e =>
                                handleGoalsandObjectiveChange(
                                  index,
                                  "measurement",
                                  e.target.value
                                )
                              }
                              disabled={
                                authUser.rolesList[0] === "HR_SUPPORT" ||
                                authUser.rolesList[0] === "SUPER_ADMIN"
                              }
                            />
                            {index ===
                              goalsandobjectivesformData.length - 1 && (
                              <div className="input-group-append">
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={handleAddField}
                                  style={{ marginLeft: "16px" }}
                                >
                                  +
                                </button>
                              </div>
                            )}
                            {goalsandobjectivesformData.length > 1 && (
                              <div
                                className="input-group-append"
                                style={{ marginLeft: "16px" }}
                              >
                                <button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={() => handleRemoveField(index)}
                                >
                                  -
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ))}
                <Row>
                  <div className="col-md-3 mt-10">
                    <div style={{ marginBottom: "5px" }}>
                      <label className="col-form-label">From</label>
                      <InputGroup>
                        <DatePicker
                          className="form-control"
                          name="fromdate"
                          options={{
                            dateFormat: "d-M-Y",
                          }}
                          placeholder="dd-MON-yyyy"
                          selected={postData.gnoFromDate}
                          onChange={date => handleFromSelfAppraisalDate(date)}
                          disabled={
                            authUser.rolesList[0] === "HR_SUPPORT" ||
                            authUser.rolesList[0] === "SUPER_ADMIN"
                          }
                        />
                      </InputGroup>
                    </div>
                  </div>
                  <div className="col-md-3 mb-10">
                    <label className="col-form-label">&nbsp;</label>
                    <label className="col-form-label">To</label>
                    <InputGroup>
                      <DatePicker
                        className="form-control"
                        name="todate"
                        options={{
                          dateFormat: "d-M-Y",
                        }}
                        placeholder="dd-MON-yyyy"
                        selected={postData.gnoToDate}
                        onChange={date => handleToSelfAppraisalDate(date)}
                        disabled={
                          authUser.rolesList[0] === "HR_SUPPORT" ||
                          authUser.rolesList[0] === "SUPER_ADMIN"
                        }
                      />
                    </InputGroup>
                  </div>
                </Row>

                <Row>
                  <div className="col-md-8 mt-10">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "20px",
                      }}
                    >
                      <label className="col-form-label">Comment</label>
                      <textarea
                        className="form-control"
                        type="text"
                        id="example-text-input"
                        value={postData.gnoCommentByEmployee}
                        onChange={e =>
                          setPostData(prevPostData => ({
                            ...prevPostData,
                            gnoCommentByEmployee: e.target.value,
                          }))
                        }
                        disabled={
                          authUser.rolesList[0] === "HR_SUPPORT" ||
                          authUser.rolesList[0] === "SUPER_ADMIN"
                        }
                      />
                    </div>
                  </div>
                </Row>

                <div className="form-check-right form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheck4"
                    checked={postData.gnoApproved}
                    onChange={handleApprovedCheckboxChange}
                    disabled={
                      authUser.rolesList[0] === "TEAM_MEMBER" ||
                      authUser.rolesList[0] === "ACCOUNT_MANAGER"
                    }
                  />
                  <label className="form-check-label" htmlFor="customCheck4">
                    Approve
                  </label>
                </div>

                {postData.gnoApproved && (
                  <>
                    <Row>
                      <div style={{ marginBottom: "7px" }} />
                      <div className="col-md-3 mt-10">
                        <label className="col-form-label">Approved Date</label>
                        <InputGroup>
                          <DatePicker
                            className="form-control"
                            type="date"
                            name="approvedDate"
                            options={{
                              dateFormat: "d-M-Y",
                            }}
                            placeholder="dd-MON-yyyy"
                            value={postData.gnoApprovedDate}
                            onChange={date =>
                              handleApprovedSelfAppraisalDate(date)
                            }
                            disabled={
                              authUser.rolesList[0] === "TEAM_MEMBER" ||
                              authUser.rolesList[0] === "ACCOUNT_MANAGER"
                            }
                          />
                        </InputGroup>
                      </div>
                    </Row>
                  </>
                )}

                <div className="row">
                  <div className="col-md-8 mt-10">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "20px",
                      }}
                    >
                      <label
                      // className={`col-form-label ${
                      //   isFeedbackDisabled ? "disabled" : ""
                      // }`}
                      >
                        Hr Feedback
                      </label>
                      <textarea
                        className="form-control"
                        type="text"
                        id="example-text-input"
                        value={hrFeedbackResponse || ""}
                        onChange={e => setHrFeedbackResponse(e.target.value)}
                        disabled={
                          authUser.rolesList[0] === "TEAM_MEMBER" ||
                          authUser.rolesList[0] === "ACCOUNT_MANAGER"
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5 d-flex flex-row justify-content-between align-items-start">
                    {alertfirstsubmitError && (
                      <div className="alert alert-danger ">
                        Please fill out all the necessary fields.
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 justify-item-center">
                    <button
                      type="submit"
                      style={{ marginLeft: "93%" }}
                      className="btn btn-primary w-md ml-auto"
                      onClick={() =>
                        handleSelfAppraisalFormSubmit("firstSubmit")
                      }
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </AvForm>
            </CardBody>
          </Card>
        </Col>

        {showSecondCard && (
          <Col lg={12}>
            <Card>
              <CardBody>
                <Row>
                  <Col className="d-flex align-items-center">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                      style={{ marginBottom: "0" }}
                    >
                      Tentative Rating
                    </label>

                    <div className="d-flex align-items-center">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        style={{
                          width: "40px",
                          height: "25px",
                          marginRight: "3px",
                        }}
                        disabled={
                          authUser.rolesList[0] === "TEAM_MEMBER" ||
                          authUser.rolesList[0] === "ACCOUNT_MANAGER"
                        }
                      />
                      <span>/</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        style={{
                          width: "40px",
                          height: "25px",
                          marginLeft: "3px",
                        }}
                        disabled={
                          authUser.rolesList[0] === "TEAM_MEMBER" ||
                          authUser.rolesList[0] === "ACCOUNT_MANAGER"
                        }
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={3}>
                    <label
                      htmlFor="example-text-input"
                      style={{ marginBottom: "7px" }}
                    >
                      Tentative Rating Date
                    </label>
                    <InputGroup>
                      <DatePicker
                        className="form-control"
                        type="date"
                        name="tentativeDate"
                        options={{
                          dateFormat: "d-M-Y",
                        }}
                        placeholder="dd-MON-yyyy"
                        value={postData.gnoTentativeRatingDate}
                        onChange={date =>
                          handleTentativeSelfAppraisalDate(date)
                        }
                        disabled={
                          authUser.rolesList[0] === "TEAM_MEMBER" ||
                          authUser.rolesList[0] === "ACCOUNT_MANAGER"
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <div className="col-md-8 mt-10">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "20px",
                      }}
                    >
                      <label className="col-form-label">
                        Tentative Rating Comment
                      </label>
                      <textarea
                        className="form-control"
                        type="text"
                        id="example-text-input"
                        value={postData.gnoTentativeRatingComment}
                        onChange={e =>
                          setPostData(prevPostData => ({
                            ...prevPostData,
                            gnoTentativeRatingComment: e.target.value,
                          }))
                        }
                        disabled={
                          authUser.rolesList[0] === "TEAM_MEMBER" ||
                          authUser.rolesList[0] === "ACCOUNT_MANAGER"
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5 d-flex flex-row justify-content-between align-items-start">
                      {alertsecondsubmitError && (
                        <div className="alert alert-danger ">
                          Please fill out all the necessary fields.
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 justify-item-center">
                      <button
                        type="submit"
                        style={{ marginLeft: "93%" }}
                        className="btn btn-primary w-md ml-auto"
                        onClick={() =>
                          handleSelfAppraisalFormSubmit("secondSubmit")
                        }
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        )}
        {showSecondCard && (
          <Col lg={12}>
            <Card>
              <CardBody>
                <div className="form-check-right form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheck4"
                    // checked={postData.gnoRatingEmployeeAccepted}
                    onChange={handleRatingEmployeeAcceptedCheckbox}
                    disabled={
                      authUser.rolesList[0] == "SUPER_ADMIN" ||
                      authUser.rolesList[0] === "HR_SUPPORT"
                    }
                  />
                  <label className="form-check-label" htmlFor="customCheck4">
                    Rating Accepted by Employee
                  </label>
                </div>

                <Row>
                  <div className="col-md-8 mt-10">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "20px",
                      }}
                    >
                      <label className="col-form-label">
                        Employee Feedback
                      </label>
                      <textarea
                        className="form-control"
                        type="text"
                        id="example-text-input"
                        value={postData.gnoRatingEmployeeFeedback}
                        onChange={e =>
                          setPostData(prevPostData => ({
                            ...prevPostData,
                            gnoRatingEmployeeFeedback: e.target.value,
                          }))
                        }
                        disabled={
                          authUser.rolesList[0] === "SUPER_ADMIN" ||
                          authUser.rolesList[0] === "HR_SUPPORT"
                        }
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-5 d-flex flex-row justify-content-between align-items-start">
                      {alertthirdsubmitError && (
                        <div className="alert alert-danger ">
                          Please fill out all the necessary fields.
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 justify-item-center">
                      <button
                        type="submit"
                        style={{ marginLeft: "93%" }}
                        className="btn btn-primary w-md ml-auto"
                        onClick={() =>
                          handleSelfAppraisalFormSubmit("thirdSubmit")
                        }
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        )}

        {showSecondCard && (
          <Col lg={12}>
            <Card>
              <CardBody>
                <Row>
                  <Col className="d-flex align-items-center">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                      style={{ marginBottom: "0" }}
                    >
                      Final Rating
                    </label>
                    <div className="d-flex align-items-center">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        style={{
                          width: "40px",
                          height: "25px",
                          marginRight: "3px",
                        }}
                        disabled={
                          authUser.rolesList[0] === "TEAM_MEMBER" ||
                          authUser.rolesList[0] === "ACCOUNT_MANAGER"
                        }
                      />
                      <span>/</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        style={{
                          width: "40px",
                          height: "25px",
                          marginLeft: "3px",
                        }}
                        disabled={
                          authUser.rolesList[0] === "TEAM_MEMBER" ||
                          authUser.rolesList[0] === "ACCOUNT_MANAGER"
                        }
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={3}>
                    <label
                      htmlFor="example-text-input"
                      style={{ marginBottom: "7px" }}
                    >
                      Final Rating Date
                    </label>
                    <InputGroup>
                      <DatePicker
                        className="form-control"
                        type="date"
                        name="finalratingDate"
                        options={{
                          dateFormat: "d-M-Y",
                        }}
                        placeholder="dd-MON-yyyy"
                        value={postData.gnoFinalRatingDate}
                        onChange={date => handleFinalSelfAppraisalDate(date)}
                        disabled={
                          authUser.rolesList[0] === "TEAM_MEMBER" ||
                          authUser.rolesList[0] === "ACCOUNT_MANAGER"
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <div className="col-md-8 mt-10">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "20px",
                      }}
                    >
                      <label className="col-form-label">
                        Final Rating Comment
                      </label>
                      <textarea
                        className="form-control"
                        type="text"
                        id="example-text-input"
                        value={postData.gnoFinalRatingComment}
                        onChange={e =>
                          setPostData(prevPostData => ({
                            ...prevPostData,
                            gnoFinalRatingComment: e.target.value,
                          }))
                        }
                        disabled={
                          authUser.rolesList[0] === "TEAM_MEMBER" ||
                          authUser.rolesList[0] === "ACCOUNT_MANAGER"
                        }
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-5 d-flex flex-row justify-content-between align-items-start">
                      {alertfourthsubmitError && (
                        <div className="alert alert-danger ">
                          Please fill out all the necessary fields.
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 justify-item-center">
                      <button
                        type="submit"
                        style={{ marginLeft: "93%" }}
                        className="btn btn-primary w-md ml-auto"
                        onClick={() =>
                          handleSelfAppraisalFormSubmit("fourthSubmit")
                        }
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(SelfAppraisal)
