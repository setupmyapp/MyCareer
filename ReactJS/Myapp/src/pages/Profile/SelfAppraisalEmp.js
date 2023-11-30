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

import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const SelfAppraisalEmp = props => {
  const breadcrumbItems = [
    { title: "My Career App", link: "#" },
    { title: "Self Appraisal List", link: "#" },
    { title: "Self Appraisal ", link: "#" },
  ]
  useEffect(() => {
    props.setBreadcrumbItems("Self  Appraisal ", breadcrumbItems)
  })

  const authUser = localStorage.getItem("authUser")
    ? JSON.parse(localStorage.getItem("authUser"))
    : {}

  const history = useHistory()

  const { state } = useLocation()
  const employeeId = authUser.employeeId
  const addNewMySelfAppraisal = state && state.addNewMySelfAppraisal
  const selfAppraisalId = state && state.selfAppraisalId

  const [alertfirstsubmitError, setAlertFirstSubmitError] = useState(false)

  const [alertthirdsubmitError, setAlertThirdSubmitError] = useState(false)

  const [showSecondCard, setShowSecondCard] = useState(false)
  const [showThirdCard, setShowThirdCard] = useState(false)
  const [showFourthCard, setShowFourthCard] = useState(false)

  const AddedDate = () => {
    const date = new Date()
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

    const dateAdded = `${day}-${monthName}-${year}`

    return dateAdded
  }

  const [gnoTechnologyJson, setGnoTechnologyJson] = useState({
    objective: "Technology",
    weightage: "",
    measurement: "",
  })

  const [gnoJobKnowledgeJson, setGnoJobKnowledgeJson] = useState({
    objective: "Job knowledge",
    weightage: "",
    measurement: "",
  })
  const [gnoDependabilityJson, setGnoDependabilityJson] = useState({
    objective: "Dependability & Initiative",
    weightage: "",
    measurement: "",
  })
  const [gnoAnalyticalJson, setGnoAnalyticalJson] = useState({
    objective: "Analytical Ability",
    weightage: "",
    measurement: "",
  })
  const [gnoQualityJson, setGnoQualityJson] = useState({
    objective: "Quality",
    weightage: "",
    measurement: "",
  })
  const [gnoComJson, setGnoComJson] = useState({
    objective: "Communication & Interpersonal Skills",
    weightage: "",
    measurement: "",
  })
  const [gnoTeamWorkJson, setGnoTeamWorkJson] = useState({
    objective: "Team Work",
    weightage: "",
    measurement: "",
  })
  const [gnoCompletionJson, setGnoCompletionJson] = useState({
    objective: "Completion of Work",
    weightage: "",
    measurement: "",
  })

  const [postSelfAppraisal, setPostSelfAppraisal] = useState({
    selfAppraisalId: "",
    employeeId: employeeId,
    employeeName: "",
    gnoTechnology: {
      objective: "Technology",
      weightage: "",
      measurement: "",
    },
    gnoJobKnowledge: {
      objective: "Job knowledge",
      weightage: "",
      measurement: "",
    },
    gnoDependability: {
      objective: "Dependability & Initiative",
      weightage: "",
      measurement: "",
    },
    gnoAnalytical: {
      objective: "Analytical Ability",
      weightage: "",
      measurement: "",
    },
    gnoQuality: {
      objective: "Quality",
      weightage: "",
      measurement: "",
    },
    gnoCom: {
      objective: "Communication & Interpersonal Skills",
      weightage: "",
      measurement: "",
    },
    gnoTeamWork: {
      objective: "Team Work",
      weightage: "",
      measurement: "",
    },
    gnoCompletion: {
      objective: "Completion of Work",
      weightage: "",
      measurement: "",
    },
    gnoCommentByEmployee: "",
    gnoFromDate: "",
    gnoToDate: "",
    gnoAddedDate: AddedDate(),
    gnoApproved: "",
    gnoApprovalComment: "",
    gnoApprovedDate: "",
    gnoTentativeRating: "",
    gnoTentativeRatingComment: "",
    gnoTentativeRatingDate: "",
    gnoRatingEmployeeAccepted: "",
    gnoRatingEmployeeFeedback: "",
    gnoFinalRating: "",
    gnoFinalRatingComment: "",
    gnoFinalRatingDate: "",
  })
  const [Empdata, setEmpData] = useState({
    selfAppraisalId: "",
    employeeId: employeeId,
    employeeName: "",
    gnoTechnology: {
      objective: "Technology",
      weightage: "",
      measurement: "",
    },
    gnoJobKnowledge: {
      objective: "Job knowledge",
      weightage: "",
      measurement: "",
    },
    gnoDependability: {
      objective: "Dependability & Initiative",
      weightage: "",
      measurement: "",
    },
    gnoAnalytical: {
      objective: "Analytical Ability",
      weightage: "",
      measurement: "",
    },
    gnoQuality: {
      objective: "Quality",
      weightage: "",
      measurement: "",
    },
    gnoCom: {
      objective: "Communication & Interpersonal Skills",
      weightage: "",
      measurement: "",
    },
    gnoTeamWork: {
      objective: "Team Work",
      weightage: "",
      measurement: "",
    },
    gnoCompletion: {
      objective: "Completion of Work",
      weightage: "",
      measurement: "",
    },
    gnoCommentByEmployee: "",
    gnoFromDate: "",
    gnoToDate: "",
    gnoAddedDate: AddedDate(),
    gnoApproved: "",
    gnoApprovalComment: "",
    gnoApprovedDate: "",
    gnoTentativeRating: "",
    gnoTentativeRatingComment: "",
    gnoTentativeRatingDate: "",
    gnoRatingEmployeeAccepted: "",
    gnoRatingEmployeeFeedback: "",
    gnoFinalRating: "",
    gnoFinalRatingComment: "",
    gnoFinalRatingDate: "",
  })

  const assignSelfAppraisalFields = selfAppraisalDTO => {
    console.log(selfAppraisalDTO)
    setPostSelfAppraisal({
      ...postSelfAppraisal,
      selfAppraisalId: selfAppraisalDTO.selfAppraisalId || "",
      employeeId: selfAppraisalDTO.employeeId || "",
      employeeName: selfAppraisalDTO.employeeName || "",
      gnoTechnology: JSON.parse(selfAppraisalDTO.gnoTechnology),
      gnoJobKnowledge: JSON.parse(selfAppraisalDTO.gnoJobKnowledge),
      gnoDependability: JSON.parse(selfAppraisalDTO.gnoDependability),
      gnoAnalytical: JSON.parse(selfAppraisalDTO.gnoAnalytical),
      gnoQuality: JSON.parse(selfAppraisalDTO.gnoQuality),
      gnoCom: JSON.parse(selfAppraisalDTO.gnoCom),
      gnoTeamWork: JSON.parse(selfAppraisalDTO.gnoTeamWork),
      gnoCompletion: JSON.parse(selfAppraisalDTO.gnoCompletion),
      gnoCommentByEmployee: selfAppraisalDTO.gnoCommentByEmployee || "",
      gnoFromDate: selfAppraisalDTO.gnoFromDate || "",
      gnoToDate: selfAppraisalDTO.gnoToDate || "",
      gnoApproved: selfAppraisalDTO.gnoApproved,
      gnoApprovalComment: selfAppraisalDTO.gnoApprovalComment || "",
      gnoApprovedDate: selfAppraisalDTO.gnoApprovedDate || "",
      gnoTentativeRating: selfAppraisalDTO.gnoTentativeRating || "",
      gnoTentativeRatingComment:
        selfAppraisalDTO.gnoTentativeRatingComment || "",
      gnoTentativeRatingDate: selfAppraisalDTO.gnoTentativeRatingDate || "",
      gnoRatingEmployeeAccepted:
        selfAppraisalDTO.gnoRatingEmployeeAccepted || "",
      gnoRatingEmployeeFeedback:
        selfAppraisalDTO.gnoRatingEmployeeFeedback || "",
      gnoFinalRating: selfAppraisalDTO.gnoFinalRating || "",
      gnoFinalRatingComment: selfAppraisalDTO.gnoFinalRatingComment || "",
      gnoFinalRatingDate: selfAppraisalDTO.gnoFinalRatingDate || "",
    })

    setGnoTechnologyJson(JSON.parse(selfAppraisalDTO.gnoTechnology))
    setGnoJobKnowledgeJson(JSON.parse(selfAppraisalDTO.gnoJobKnowledge))
    setGnoDependabilityJson(JSON.parse(selfAppraisalDTO.gnoDependability))
    setGnoAnalyticalJson(JSON.parse(selfAppraisalDTO.gnoAnalytical))
    setGnoQualityJson(JSON.parse(selfAppraisalDTO.gnoQuality))
    setGnoComJson(JSON.parse(selfAppraisalDTO.gnoCom))
    setGnoTeamWorkJson(JSON.parse(selfAppraisalDTO.gnoTeamWork))
    setGnoCompletionJson(JSON.parse(selfAppraisalDTO.gnoCompletion))

    setEmpData({
      ...Empdata,
      selfAppraisalId: selfAppraisalDTO.selfAppraisalId || "",
      employeeId: selfAppraisalDTO.employeeId || "",
      employeeName: selfAppraisalDTO.employeeName || "",
      gnoTechnology: JSON.parse(selfAppraisalDTO.gnoTechnology),
      gnoJobKnowledge: JSON.parse(selfAppraisalDTO.gnoJobKnowledge),
      gnoDependability: JSON.parse(selfAppraisalDTO.gnoDependability),
      gnoAnalytical: JSON.parse(selfAppraisalDTO.gnoAnalytical),
      gnoQuality: JSON.parse(selfAppraisalDTO.gnoQuality),
      gnoCom: JSON.parse(selfAppraisalDTO.gnoCom),
      gnoTeamWork: JSON.parse(selfAppraisalDTO.gnoTeamWork),
      gnoCompletion: JSON.parse(selfAppraisalDTO.gnoCompletion),
      gnoCommentByEmployee: selfAppraisalDTO.gnoCommentByEmployee || "",
      gnoFromDate: selfAppraisalDTO.gnoFromDate || "",
      gnoToDate: selfAppraisalDTO.gnoToDate || "",
      gnoApproved: selfAppraisalDTO.gnoApproved,
      gnoApprovalComment: selfAppraisalDTO.gnoApprovalComment || "",
      gnoApprovedDate: selfAppraisalDTO.gnoApprovedDate || "",
      gnoTentativeRating: selfAppraisalDTO.gnoTentativeRating || "",
      gnoTentativeRatingComment:
        selfAppraisalDTO.gnoTentativeRatingComment || "",
      gnoTentativeRatingDate: selfAppraisalDTO.gnoTentativeRatingDate || "",
      gnoRatingEmployeeAccepted:
        selfAppraisalDTO.gnoRatingEmployeeAccepted || "",
      gnoRatingEmployeeFeedback:
        selfAppraisalDTO.gnoRatingEmployeeFeedback || "",
      gnoFinalRating: selfAppraisalDTO.gnoFinalRating || "",
      gnoFinalRatingComment: selfAppraisalDTO.gnoFinalRatingComment || "",
      gnoFinalRatingDate: selfAppraisalDTO.gnoFinalRatingDate || "",
    })
  }

  const handleSelfAppraisalJsonInputChange = (stateVariable, name, value) => {
    console.log(" name:", name, "and value:", value)
    stateVariable(prevState => {
      const newState = {
        ...prevState,
        [name]: value,
      }
      console.log("New State:", newState)
      return newState
    })
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
    setPostSelfAppraisal(prevPostData => ({
      ...prevPostData,
      gnoFromDate: fromDate,
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
    setPostSelfAppraisal(prevPostData => ({
      ...prevPostData,
      gnoToDate: toDate,
    }))
  }

  const handleRatingEmployeeAcceptedCheckbox = event => {
    const { checked } = event.target

    setPostSelfAppraisal(prevPostData => ({
      ...prevPostData,
      gnoRatingEmployeeAccepted: checked ? "true" : "false",
    }))
  }

  const handleSelfAppraisalFirstFormSubmit = event => {
    event.preventDefault()
    const totalWeightage =
      (parseInt(gnoTechnologyJson.weightage) || 0) +
      (parseInt(gnoJobKnowledgeJson.weightage) || 0) +
      (parseInt(gnoDependabilityJson.weightage) || 0) +
      (parseInt(gnoAnalyticalJson.weightage) || 0) +
      (parseInt(gnoQualityJson.weightage) || 0) +
      (parseInt(gnoComJson.weightage) || 0) +
      (parseInt(gnoTeamWorkJson.weightage) || 0) +
      (parseInt(gnoCompletionJson.weightage) || 0)

    if (totalWeightage !== 100) {
      alert("Total weightage should be 100")
      return
    }

    if (
      postSelfAppraisal.gnoCommentByEmployee !== "" &&
      /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/.test(
        postSelfAppraisal.gnoFromDate
      ) &&
      /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/.test(
        postSelfAppraisal.gnoToDate
      )
    ) {
      postSelfAppraisal.gnoTechnology = JSON.stringify(gnoTechnologyJson)
      postSelfAppraisal.gnoJobKnowledge = JSON.stringify(gnoJobKnowledgeJson)
      postSelfAppraisal.gnoDependability = JSON.stringify(gnoDependabilityJson)
      postSelfAppraisal.gnoAnalytical = JSON.stringify(gnoAnalyticalJson)
      postSelfAppraisal.gnoQuality = JSON.stringify(gnoQualityJson)
      postSelfAppraisal.gnoCom = JSON.stringify(gnoComJson)
      postSelfAppraisal.gnoTeamWork = JSON.stringify(gnoTeamWorkJson)
      postSelfAppraisal.gnoCompletion = JSON.stringify(gnoCompletionJson)

      const selfAppraisalForm = new FormData()
      selfAppraisalForm.append(
        "addNewMySelfAppraisalRequest",
        JSON.stringify(postSelfAppraisal)
      )

      console.log("SelfAppraisal:", JSON.stringify(postSelfAppraisal))

      console.log(JSON.parse(localStorage.getItem("authUser")).accessToken)

      axios.defaults.headers.common = {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("authUser")).accessToken
        }`,
      }

      axios
        .post(
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
          setPostSelfAppraisal(response.data)

          if (response.data.areSuccessful) {
            history.push("/SelfAppraisal-List", {
              alertMessage: "New Self-appraisal  Added!!",
            })
            // SetShowSecondCard(true)
          } else {
            setAlertFirstSubmitError(true)
            // setIsSubmitted(true)
            setTimeout(() => {
              setAlertFirstSubmitError(false)
            }, 4000)
          }
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      setAlertFirstSubmitError(true)
      setTimeout(() => {
        setAlertFirstSubmitError(false)
      }, 4000)
    }
  }

  const handleSelfAppraisalThirdFormSubmit = event => {
    event.preventDefault()
    console.log(postSelfAppraisal)
    if (postSelfAppraisal.gnoRatingEmployeeFeedback !== "") {
      postSelfAppraisal.gnoTechnology = JSON.stringify(gnoTechnologyJson)
      postSelfAppraisal.gnoJobKnowledge = JSON.stringify(gnoJobKnowledgeJson)
      postSelfAppraisal.gnoDependability = JSON.stringify(gnoDependabilityJson)
      postSelfAppraisal.gnoAnalytical = JSON.stringify(gnoAnalyticalJson)
      postSelfAppraisal.gnoQuality = JSON.stringify(gnoQualityJson)
      postSelfAppraisal.gnoCom = JSON.stringify(gnoComJson)
      postSelfAppraisal.gnoTeamWork = JSON.stringify(gnoTeamWorkJson)
      postSelfAppraisal.gnoCompletion = JSON.stringify(gnoCompletionJson)

      const selfAppraisalForm = new FormData()
      selfAppraisalForm.append(
        "editMySelfAppraisalRequest",
        JSON.stringify(postSelfAppraisal)
      )

      console.log("SelfAppraisal:", JSON.stringify(postSelfAppraisal))

      console.log(JSON.parse(localStorage.getItem("authUser")).accessToken)
      axios.defaults.headers.common = {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("authUser")).accessToken
        }`,
      }
      axios
        .put(
          `${IPAddress}tracking/employee/editMySelfAppraisal`,
          selfAppraisalForm,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then(response => {
          console.log(response.data)
          setPostSelfAppraisal(response.data)
          if (response.data.areSuccessful) {
            history.push("/SelfAppraisal-List", {
              alertMessage: "New Self-appraisal  Added!!",
            })
            setThirdSubmit(true)
          } else {
            setAlertThirdSubmitError(true)

            setTimeout(() => {
              setAlertThirdSubmitError(false)
            }, 4000)
          }
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
  }
  // useEffect(() => {
  //   console.log(" postSelfAppraisal:", postSelfAppraisal)
  // }, [postSelfAppraisal])

  useEffect(() => {
    if (addNewMySelfAppraisal) {
      setPostSelfAppraisal({
        ...postSelfAppraisal,
        employeeId,
      })
    } else {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${authUser.accessToken}`,
      }
      axios
        .get(
          `${IPAddress}tracking/employee/getMySelfAppraisal/${selfAppraisalId}`
        )
        .then(response => {
          console.log(response.data.selfAppraisalDTO)
          assignSelfAppraisalFields(response.data.selfAppraisalDTO)
          //console.log("assign complete")
          // console.log(postSelfAppraisal)
          //console.log(postSelfAppraisal.gnoApproved)
          // if (postSelfAppraisal.gnoApproved == true) {
          //   setShowSecondCard(true)
          // }

          // if (
          //   postSelfAppraisal.gnoTentativeRating &&
          //   postSelfAppraisal.gnoTentativeRatingDate &&
          //   postSelfAppraisal.gnoTentativeRatingComment
          // ) {
          //   SetShowThirdCard(true)
          // }
          const postSelfAppraisal = response.data.selfAppraisalDTO
          console.log(postSelfAppraisal)
          if (
            postSelfAppraisal.gnoApprovedDate !== "" &&
            postSelfAppraisal.gnoApprovalComment !== "" &&
            postSelfAppraisal.gnoApproved === "true"
          ) {
            setShowSecondCard(true)
          }
          if (
            (postSelfAppraisal.gnoTentativeRating !== "" ||
              postSelfAppraisal.gnoTentativeRating !== null) &&
            (postSelfAppraisal.gnoTentativeRatingComment !== "" ||
              postSelfAppraisal.gnoTentativeRatingComment !== null) &&
            (postSelfAppraisal.gnoTentativeRatingDate !== "" ||
              postSelfAppraisal.gnoTentativeRatingDate !== null)
          ) {
            setShowThirdCard(true)
          }
          if (
            (postSelfAppraisal.gnoRatingEmployeeAccepted !== "" ||
              postSelfAppraisal.gnoRatingEmployeeAccepted !== null) &&
            (postSelfAppraisal.gnoRatingEmployeeFeedback !== "" ||
              postSelfAppraisal.gnoRatingEmployeeFeedback !== null)
          ) {
            setShowFourthCard(true)
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [])

  return (
    <React.Fragment>
      <MetaTags>
        <title>Self Appraisal</title>
      </MetaTags>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <h4 className="card-title">Self Appraisal</h4>
              <AvForm>
                {/* <p>Technology: {postSelfAppraisal.gnoTechnology}</p> */}
                <Row>
                  <Col>
                    <label className="col-form-label">Objective</label>
                    <input
                      className="form-control col-3"
                      type="text"
                      placeholder="Technolgy"
                      name="technologyobjective"
                      disabled={true}
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
                            name="technologyweightage"
                            value={gnoTechnologyJson?.weightage}
                            disabled={addNewMySelfAppraisal == false}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (onlyNumbers > 100) {
                                alert("Percentage cannot be greater than 100")
                                e.preventDefault()
                              }
                            }}
                            onChange={e => {
                              if (
                                !addNewMySelfAppraisal ||
                                e.target.value <= 100
                              ) {
                                handleSelfAppraisalJsonInputChange(
                                  setGnoTechnologyJson,
                                  "weightage",
                                  e.target.value
                                )
                              }
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
                            name="technologymeasurement"
                            value={gnoTechnologyJson.measurement}
                            disabled={addNewMySelfAppraisal == false}
                            onChange={e =>
                              handleSelfAppraisalJsonInputChange(
                                setGnoTechnologyJson,
                                "measurement",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="mb-3"></div>

                <Row>
                  <Col>
                    <input
                      className="form-control col-3"
                      type="text"
                      placeholder="Job knowledge"
                      name="jobknowledgeobjective"
                      disabled={true}
                    />
                  </Col>

                  <Col>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            value={gnoJobKnowledgeJson?.weightage}
                            name="jobknowledgeweightage"
                            disabled={addNewMySelfAppraisal == false}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
                              }
                            }}
                            onChange={e => {
                              if (
                                !addNewMySelfAppraisal ||
                                e.target.value <= 100
                              ) {
                                handleSelfAppraisalJsonInputChange(
                                  setGnoJobKnowledgeJson,
                                  "weightage",
                                  e.target.value
                                )
                              }
                            }}
                          />

                          <div className="input-group-append">
                            <span className="input-group-text">%</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            value={gnoJobKnowledgeJson?.measurement}
                            name="jobknowledgemeasurement"
                            disabled={addNewMySelfAppraisal == false}
                            onChange={e =>
                              handleSelfAppraisalJsonInputChange(
                                setGnoJobKnowledgeJson,
                                "measurement",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="mb-3"></div>
                <Row>
                  <Col>
                    <input
                      className="form-control col-3"
                      type="text"
                      placeholder="Dependability & Initiative"
                      name="dependabilityandinitiativeobjective"
                      disabled={true}
                    />
                  </Col>

                  <Col>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            value={gnoDependabilityJson?.weightage}
                            name="dependabilityandinitiativeweightage"
                            disabled={addNewMySelfAppraisal == false}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
                              }
                            }}
                            onChange={e => {
                              if (
                                !addNewMySelfAppraisal ||
                                e.target.value <= 100
                              ) {
                                handleSelfAppraisalJsonInputChange(
                                  setGnoDependabilityJson,
                                  "weightage",
                                  e.target.value
                                )
                              }
                            }}
                          />

                          <div className="input-group-append">
                            <span className="input-group-text">%</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            value={gnoDependabilityJson?.measurement}
                            name="dependabilityandinitiativemeasurement"
                            disabled={addNewMySelfAppraisal == false}
                            onChange={e =>
                              handleSelfAppraisalJsonInputChange(
                                setGnoDependabilityJson,
                                "measurement",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="mb-3"></div>
                <Row>
                  <Col>
                    <input
                      className="form-control col-3"
                      type="text"
                      placeholder="Analytical Ability"
                      name="analyticalabilityobjective"
                      disabled={true}
                    />
                  </Col>

                  <Col>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            value={gnoAnalyticalJson?.weightage}
                            name="analyticalabilityweightage"
                            disabled={addNewMySelfAppraisal == false}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
                              }
                            }}
                            onChange={e => {
                              if (
                                !addNewMySelfAppraisal ||
                                e.target.value <= 100
                              ) {
                                handleSelfAppraisalJsonInputChange(
                                  setGnoAnalyticalJson,
                                  "weightage",
                                  e.target.value
                                )
                              }
                            }}
                          />

                          <div className="input-group-append">
                            <span className="input-group-text">%</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            value={gnoAnalyticalJson?.measurement}
                            name="analyticalabilitymeasurement"
                            disabled={addNewMySelfAppraisal == false}
                            onChange={e => {
                              handleSelfAppraisalJsonInputChange(
                                setGnoAnalyticalJson,
                                "weightage",
                                e.target.value
                              )
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="mb-3"></div>
                <Row>
                  <Col>
                    <input
                      className="form-control col-3"
                      type="text"
                      placeholder="Quality"
                      name="qualityobjective"
                      disabled={true}
                    />
                  </Col>

                  <Col>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            value={gnoQualityJson?.weightage}
                            name="qualityweightage"
                            disabled={addNewMySelfAppraisal == false}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
                              }
                            }}
                            onChange={e => {
                              if (
                                !addNewMySelfAppraisal ||
                                e.target.value <= 100
                              ) {
                                handleSelfAppraisalJsonInputChange(
                                  setGnoQualityJson,
                                  "weightage",
                                  e.target.value
                                )
                              }
                            }}
                          />

                          <div className="input-group-append">
                            <span className="input-group-text">%</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            name="qualitymeasurement"
                            value={gnoQualityJson?.measurement}
                            disabled={addNewMySelfAppraisal == false}
                            onChange={e =>
                              handleSelfAppraisalJsonInputChange(
                                setGnoQualityJson,
                                "measurement",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="mb-3"></div>
                <Row>
                  <Col>
                    <input
                      className="form-control col-3"
                      type="text"
                      placeholder="Comm & Interpersonal skills"
                      name="comm&interpersonalobjective"
                      disabled={true}
                    />
                  </Col>

                  <Col>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            value={gnoComJson?.weightage}
                            name="comm&interpersonalweightage"
                            disabled={addNewMySelfAppraisal == false}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
                              }
                            }}
                            onChange={e => {
                              if (
                                !addNewMySelfAppraisal ||
                                e.target.value <= 100
                              ) {
                                handleSelfAppraisalJsonInputChange(
                                  setGnoComJson,
                                  "weightage",
                                  e.target.value
                                )
                              }
                            }}
                          />

                          <div className="input-group-append">
                            <span className="input-group-text">%</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            value={gnoComJson?.measurement}
                            name="comm&interpersonalmeasurement"
                            disabled={addNewMySelfAppraisal == false}
                            onChange={e =>
                              handleSelfAppraisalJsonInputChange(
                                setGnoComJson,
                                "measurement",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="mb-3"></div>
                <Row>
                  <Col>
                    <input
                      className="form-control col-3"
                      type="text"
                      placeholder="Team Work"
                      name="teamworkobjective"
                      disabled={true}
                    />
                  </Col>

                  <Col>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            value={gnoTeamWorkJson?.weightage}
                            name="teamworkweightage"
                            disabled={addNewMySelfAppraisal == false}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
                              }
                            }}
                            onChange={e => {
                              if (
                                !addNewMySelfAppraisal ||
                                e.target.value <= 100
                              ) {
                                handleSelfAppraisalJsonInputChange(
                                  setGnoTeamWorkJson,
                                  "weightage",
                                  e.target.value
                                )
                              }
                            }}
                          />

                          <div className="input-group-append">
                            <span className="input-group-text">%</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            value={gnoTeamWorkJson?.measurement}
                            name="teamworkmeasurement"
                            disabled={addNewMySelfAppraisal == false}
                            onChange={e =>
                              handleSelfAppraisalJsonInputChange(
                                setGnoTeamWorkJson,
                                "measurement",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="mb-3"></div>
                <Row>
                  <Col>
                    <input
                      className="form-control col-3"
                      type="text"
                      placeholder="Completion of work"
                      name="completionobjective"
                      disabled={true}
                    />
                  </Col>

                  <Col>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            value={gnoCompletionJson?.weightage}
                            name="completionweightage"
                            disabled={addNewMySelfAppraisal == false}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
                              }
                            }}
                            onChange={e => {
                              if (
                                !addNewMySelfAppraisal ||
                                e.target.value <= 100
                              ) {
                                handleSelfAppraisalJsonInputChange(
                                  setGnoCompletionJson,
                                  "weightage",
                                  e.target.value
                                )
                              }
                            }}
                          />

                          <div className="input-group-append">
                            <span className="input-group-text">%</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            value={gnoCompletionJson?.measurement}
                            name="completionmeasurement"
                            disabled={addNewMySelfAppraisal == false}
                            onChange={e =>
                              handleSelfAppraisalJsonInputChange(
                                setGnoCompletionJson,
                                "measurement",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="mb-3"></div>
                <Row>
                  <div className="col-md-3 mt-10">
                    <div style={{ marginBottom: "5px" }}>
                      <label className="col-form-label">
                        From
                        <span className="text-danger">*</span>
                      </label>
                      <InputGroup>
                        <DatePicker
                          className="form-control"
                          name="fromdate"
                          options={{
                            dateFormat: "d-M-Y",
                          }}
                          placeholder="dd-MON-yyyy"
                          value={postSelfAppraisal.gnoFromDate}
                          onChange={date => handleFromSelfAppraisalDate(date)}
                          disabled={
                            addNewMySelfAppraisal == false &&
                            postSelfAppraisal.gnoFromDate != ""
                          }
                        />
                      </InputGroup>
                    </div>
                  </div>
                  <div className="col-md-3 mb-10">
                    <label className="col-form-label">&nbsp;</label>
                    <label className="col-form-label">
                      To
                      <span className="text-danger">*</span>
                    </label>
                    <InputGroup>
                      <DatePicker
                        className="form-control"
                        name="todate"
                        options={{
                          dateFormat: "d-M-Y",
                        }}
                        placeholder="dd-MON-yyyy"
                        value={postSelfAppraisal.gnoToDate}
                        onChange={date => handleToSelfAppraisalDate(date)}
                        disabled={
                          addNewMySelfAppraisal == false &&
                          postSelfAppraisal.gnoToDate != ""
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
                      <label className="col-form-label">
                        Comment
                        <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        type="text"
                        name="commentbyemployee"
                        id="example-text-input"
                        value={postSelfAppraisal.gnoCommentByEmployee}
                        onChange={e =>
                          setPostSelfAppraisal(prevPostData => ({
                            ...prevPostData,
                            gnoCommentByEmployee: e.target.value,
                          }))
                        }
                        disabled={
                          addNewMySelfAppraisal == false &&
                          postSelfAppraisal.gnoCommentByEmployee != ""
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
                    name="approvebyhr"
                    checked={
                      postSelfAppraisal.gnoApproved === "true" ? true : false
                    }
                    disabled={true}
                  />
                  <label className="form-check-label" htmlFor="customCheck4">
                    Approve
                  </label>
                </div>

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
                          value={postSelfAppraisal.gnoApprovedDate}
                          disabled={true}
                        />
                      </InputGroup>
                    </div>
                  </Row>
                </>

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
                        value={postSelfAppraisal.gnoApprovalComment}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5 d-flex flex-row justify-content-between align-items-start">
                    {alertfirstsubmitError && (
                      <div className="alert alert-danger ">
                        Please fill out all the (*) necessary fields.
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 justify-item-center">
                    <button
                      type="submit"
                      style={{ marginLeft: "93%" }}
                      className="btn btn-primary w-md ml-auto"
                      onClick={handleSelfAppraisalFirstFormSubmit}
                      disabled={addNewMySelfAppraisal == false}
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
                        name="tentatativeratings"
                        disabled={
                          // postSelfAppraisal.gnoApproved == true ||
                          true
                        }
                        value={postSelfAppraisal.gnoTentativeRating}
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
                        name="tentatativeratingtotal"
                        disabled={postSelfAppraisal.gnoTentativeRating}
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
                        value={postSelfAppraisal.gnoTentativeRatingDate}
                        disabled={true}
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
                        value={postSelfAppraisal.gnoTentativeRatingComment}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5 d-flex flex-row justify-content-between align-items-start"></div>
                    <div className="col-md-6 justify-item-center">
                      <button
                        type="submit"
                        style={{ marginLeft: "93%" }}
                        className="btn btn-primary w-md ml-auto"
                        disabled={true}
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

        {showThirdCard && (
          <Col lg={12}>
            <Card>
              <CardBody>
                <div className="form-check-right form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheck4"
                    name="ratingemployeeaccepted"
                    value={postSelfAppraisal.gnoRatingEmployeeAccepted}
                    checked={
                      postSelfAppraisal.gnoRatingEmployeeAccepted === "true"
                        ? true
                        : false
                    }
                    onChange={handleRatingEmployeeAcceptedCheckbox}
                    disabled={Empdata.gnoRatingEmployeeFeedback != ""}
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
                        value={postSelfAppraisal.gnoRatingEmployeeFeedback}
                        name="ratingemployeefeedback"
                        disabled={Empdata.gnoRatingEmployeeFeedback != ""}
                        onChange={e =>
                          setPostSelfAppraisal(prevPostData => ({
                            ...prevPostData,
                            gnoRatingEmployeeFeedback: e.target.value,
                          }))
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
                        onClick={handleSelfAppraisalThirdFormSubmit}
                        disabled={
                          Empdata.gnoRatingEmployeeFeedback != "" &&
                          postSelfAppraisal.gnoRatingEmployeeAccepted === "true"
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

        {showFourthCard && (
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
                        disabled={true}
                        name="finalratings"
                        value={postSelfAppraisal.gnoFinalRating}
                      />
                      <span>/</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="10"
                        style={{
                          width: "40px",
                          height: "25px",
                          marginLeft: "3px",
                        }}
                        name="finalratingtotal"
                        disabled={true}
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
                        value={postSelfAppraisal.gnoFinalRatingDate}
                        disabled={true}
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
                        value={postSelfAppraisal.gnoFinalRatingComment}
                        disabled={true}
                        name="finalratingcomment"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-5 d-flex flex-row justify-content-between align-items-start">
                      {/* {alertfourthsubmitError && (
                        <div className="alert alert-danger ">
                          Please fill out all the necessary fields.
                        </div>
                      )} */}
                    </div>
                    <div className="col-md-6 justify-item-center">
                      <button
                        type="submit"
                        style={{ marginLeft: "93%" }}
                        className="btn btn-primary w-md ml-auto"
                        disabled={true}
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

export default connect(null, { setBreadcrumbItems })(SelfAppraisalEmp)
