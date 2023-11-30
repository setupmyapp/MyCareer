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
import hr from "date-fns/locale/hr"

const SelfAppraisalHr = props => {
  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: "Self  Appraisal List", link: "#" },
    { title: "Self  Appraisal ", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Self  Appraisal ", breadcrumbItems)
  })
  const authUser = localStorage.getItem("authUser")
    ? JSON.parse(localStorage.getItem("authUser"))
    : {}

  const history = useHistory()
  const { state } = useLocation()
  const selfAppraisalId = state && state.selfAppraisalId

  const addNewMySelfAppraisal = state && state.addNewMySelfAppraisal

  const [alertfirstsubmitError, setAlertFirstSubmitError] = useState(false)
  const [alertsecondsubmitError, setAlertSecondSubmitError] = useState(false)
  const [alertfourthsubmitError, setAlertFourthSubmitError] = useState(false)

  const [showSecondCard, setShowSecondCard] = useState(false)
  const [showThirdCard, SetShowThirdCard] = useState(false)
  const [showFourthCard, SetShowFourthCard] = useState(false)

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

  const [postSelfAppraisalHRData, setPostSelfAppraisalHRData] = useState({
    selfAppraisalId: "",
    employeeId: "",
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

  const [hrdata, setHrData] = useState({
    selfAppraisalId: "",
    employeeId: "",
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
    setPostSelfAppraisalHRData({
      ...postSelfAppraisalHRData,
      selfAppraisalId: selfAppraisalDTO.selfAppraisalId,
      employeeId: selfAppraisalDTO.employeeId,
      employeeName: selfAppraisalDTO.employeeName,
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
      gnoTentativeRating: selfAppraisalDTO.gnoTentativeRating,
      gnoTentativeRatingComment:
        selfAppraisalDTO.gnoTentativeRatingComment || "",
      gnoTentativeRatingDate: selfAppraisalDTO.gnoTentativeRatingDate || "",
      gnoRatingEmployeeAccepted:
        selfAppraisalDTO.gnoRatingEmployeeAccepted || "",
      gnoRatingEmployeeFeedback:
        selfAppraisalDTO.gnoRatingEmployeeFeedback || "",
      gnoFinalRating: selfAppraisalDTO.gnoFinalRating,
      gnoFinalRatingComment: selfAppraisalDTO.gnoFinalRatingComment || "",
      gnoFinalRatingDate: selfAppraisalDTO.gnoFinalRatingDate || "",
    })

    setHrData({
      ...hrdata,
      selfAppraisalId: selfAppraisalDTO.selfAppraisalId,
      employeeId: selfAppraisalDTO.employeeId,
      employeeName: selfAppraisalDTO.employeeName,
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
      gnoTentativeRating: selfAppraisalDTO.gnoTentativeRating,
      gnoTentativeRatingComment:
        selfAppraisalDTO.gnoTentativeRatingComment || "",
      gnoTentativeRatingDate: selfAppraisalDTO.gnoTentativeRatingDate || "",
      gnoRatingEmployeeAccepted:
        selfAppraisalDTO.gnoRatingEmployeeAccepted || "",
      gnoRatingEmployeeFeedback:
        selfAppraisalDTO.gnoRatingEmployeeFeedback || "",
      gnoFinalRating: selfAppraisalDTO.gnoFinalRating,
      gnoFinalRatingComment: selfAppraisalDTO.gnoFinalRatingComment || "",
      gnoFinalRatingDate: selfAppraisalDTO.gnoFinalRatingDate || "",
    })
  }

  const handleApprovedCheckboxChange = event => {
    const { checked } = event.target
    setPostSelfAppraisalHRData(prevPostData => ({
      ...prevPostData,
      gnoApproved: checked ? "true" : "false",
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
    setPostSelfAppraisalHRData(prevPostData => ({
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

    setPostSelfAppraisalHRData(prevPostData => ({
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

    setPostSelfAppraisalHRData(prevPostData => ({
      ...prevPostData,
      gnoFinalRatingDate: FinalDate,
    }))
  }
  const handleSelfAppraisalFirstFormSubmit = event => {
    event.preventDefault()
    console.log(postSelfAppraisalHRData)

    if (
      postSelfAppraisalHRData.gnoCommentByEmployee !== "" &&
      /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/.test(
        postSelfAppraisalHRData.gnoFromDate
      ) &&
      /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/.test(
        postSelfAppraisalHRData.gnoToDate
      )
    ) {
      postSelfAppraisalHRData.gnoTechnology = JSON.stringify(
        postSelfAppraisalHRData.gnoTechnology
      )
      postSelfAppraisalHRData.gnoJobKnowledge = JSON.stringify(
        postSelfAppraisalHRData.gnoJobKnowledge
      )
      postSelfAppraisalHRData.gnoDependability = JSON.stringify(
        postSelfAppraisalHRData.gnoDependability
      )
      postSelfAppraisalHRData.gnoAnalytical = JSON.stringify(
        postSelfAppraisalHRData.gnoAnalytical
      )
      postSelfAppraisalHRData.gnoQuality = JSON.stringify(
        postSelfAppraisalHRData.gnoQuality
      )
      postSelfAppraisalHRData.gnoCom = JSON.stringify(
        postSelfAppraisalHRData.gnoCom
      )
      postSelfAppraisalHRData.gnoTeamWork = JSON.stringify(
        postSelfAppraisalHRData.gnoTeamWork
      )
      postSelfAppraisalHRData.gnoCompletion = JSON.stringify(
        postSelfAppraisalHRData.gnoCompletion
      )

      const selfAppraisalForm = new FormData()
      selfAppraisalForm.append(
        "addNewMySelfAppraisalRequest",
        JSON.stringify(postSelfAppraisalHRData)
      )

      console.log("SelfAppraisal:", JSON.stringify(postSelfAppraisalHRData))

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
          setPostSelfAppraisalHRData(response.data)

          if (response.data.areSuccessful) {
            history.push("/SelfAppraisal-List", {
              alertMessage: "New Self-appraisal  Added!!",
            })
          } else {
            setAlertFirstSubmitError(true)

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
  const handleSelfAppraisalSecondFormSubmit = event => {
    event.preventDefault()
    console.log(postSelfAppraisalHRData)
    if (
      postSelfAppraisalHRData.gnoTentativeRatingComment !== "" &&
      postSelfAppraisalHRData.gnoTentativeRating !== "" &&
      /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/.test(
        postSelfAppraisalHRData.gnoTentativeRatingDate
      )
    ) {
      postSelfAppraisalHRData.gnoTechnology = JSON.stringify(
        postSelfAppraisalHRData.gnoTechnology
      )
      postSelfAppraisalHRData.gnoJobKnowledge = JSON.stringify(
        postSelfAppraisalHRData.gnoJobKnowledge
      )
      postSelfAppraisalHRData.gnoDependability = JSON.stringify(
        postSelfAppraisalHRData.gnoDependability
      )
      postSelfAppraisalHRData.gnoAnalytical = JSON.stringify(
        postSelfAppraisalHRData.gnoAnalytical
      )
      postSelfAppraisalHRData.gnoQuality = JSON.stringify(
        postSelfAppraisalHRData.gnoQuality
      )
      postSelfAppraisalHRData.gnoCom = JSON.stringify(
        postSelfAppraisalHRData.gnoCom
      )
      postSelfAppraisalHRData.gnoTeamWork = JSON.stringify(
        postSelfAppraisalHRData.gnoTeamWork
      )
      postSelfAppraisalHRData.gnoCompletion = JSON.stringify(
        postSelfAppraisalHRData.gnoCompletion
      )

      const selfAppraisalForm = new FormData()
      selfAppraisalForm.append(
        "editSelfAppraisalRequest",
        JSON.stringify(postSelfAppraisalHRData)
      )

      console.log("SelfAppraisal:", JSON.stringify(postSelfAppraisalHRData))

      axios.defaults.headers.common = {
        Authorization: `Bearer ${authUser.accessToken}`,
      }

      axios
        .put(
          `${IPAddress}tracking/hrSupport/editSelfAppraisal`,
          selfAppraisalForm,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then(response => {
          console.log(response.data)
          setPostSelfAppraisalHRData(response.data)
          if (response.data.areSuccessful) {
            history.push({
              pathname: "/SelfAppraisal-List",
            })
            SetShowThirdCard(true)
          } else {
            setAlertSecondSubmitError(true)

            setTimeout(() => {
              setAlertSecondSubmitError(false)
            }, 4000)
          }
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
  }

  const handleSelfAppraisalFourthFormSubmit = () => {
    if (
      postSelfAppraisalHRData.gnoFinalRatingComment !== "" &&
      /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/.test(
        postSelfAppraisalHRData.gnoFinalRatingDate
      )
    ) {
      postSelfAppraisalHRData.gnoTechnology = JSON.stringify(
        postSelfAppraisalHRData.gnoTechnology
      )
      postSelfAppraisalHRData.gnoJobKnowledge = JSON.stringify(
        postSelfAppraisalHRData.gnoJobKnowledge
      )
      postSelfAppraisalHRData.gnoDependability = JSON.stringify(
        postSelfAppraisalHRData.gnoDependability
      )
      postSelfAppraisalHRData.gnoAnalytical = JSON.stringify(
        postSelfAppraisalHRData.gnoAnalytical
      )
      postSelfAppraisalHRData.gnoQuality = JSON.stringify(
        postSelfAppraisalHRData.gnoQuality
      )
      postSelfAppraisalHRData.gnoCom = JSON.stringify(
        postSelfAppraisalHRData.gnoCom
      )
      postSelfAppraisalHRData.gnoTeamWork = JSON.stringify(
        postSelfAppraisalHRData.gnoTeamWork
      )
      postSelfAppraisalHRData.gnoCompletion = JSON.stringify(
        postSelfAppraisalHRData.gnoCompletion
      )

      const selfAppraisalForm = new FormData()
      selfAppraisalForm.append(
        "editSelfAppraisalRequest",
        JSON.stringify(postSelfAppraisalHRData)
      )

      console.log("SelfAppraisal:", JSON.stringify(postSelfAppraisalHRData))

      axios.defaults.headers.common = {
        Authorization: `Bearer ${authUser.accessToken}`,
      }
      axios
        .put(
          `${IPAddress}tracking/hrSupport/editSelfAppraisal`,
          selfAppraisalForm,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then(response => {
          console.log(response.data)
          setPostSelfAppraisalHRData(response.data)
          if (response.data.areSuccessful) {
            history.push({
              pathname: "/SelfAppraisal-List",
            })
          } else {
            setAlertFourthSubmitError(true)

            setTimeout(() => {
              setAlertFourthSubmitError(false)
            }, 4000)
          }
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      setAlertFourthSubmitError(true)

      setTimeout(() => {
        setAlertFourthSubmitError(false)
      }, 4000)
    }
  }

  // console.log(
  //   "Before Condition - addNewMySelfAppraisal:",
  //   addNewMySelfAppraisal
  // )
  // console.log(
  //   "Before Condition - gnoFinalRatingComment:",
  //   postSelfAppraisalHRData.gnoFinalRatingComment
  // )

  // useEffect(() => {
  //   axios.defaults.headers.common = {
  //     Authorization: `Bearer ${authUser.accessToken}`,
  //   }
  //   axios
  //     .get(`${IPAddress}tracking/hrSupport/getSelfAppraisal/${selfAppraisalId}`)
  //     .then(response => {
  //       console.log(response.data.selfAppraisalDTO)
  //       assignSelfAppraisalFields(response.data.selfAppraisalDTO)
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  // }, [])

  useEffect(() => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${authUser.accessToken}`,
    }
    if (addNewMySelfAppraisal) {
      setPostSelfAppraisalHRData({
        ...postSelfAppraisalHRData,
        employeeId,
      })
    } else {
      axios
        .get(
          `${IPAddress}tracking/hrSupport/getSelfAppraisal/${selfAppraisalId}`
        )
        .then(response => {
          if (response.data.selfAppraisalDTO != "") {
            assignSelfAppraisalFields(response.data.selfAppraisalDTO)

            const hrdata = response.data?.selfAppraisalDTO
            console.log(hrdata)
            if (
              hrdata.gnoApprovedDate !== "" &&
              hrdata.gnoApprovalComment !== "" &&
              hrdata.gnoApproved == "true"
            ) {
              console.log("Submit")
              setShowSecondCard(true)
            }
            if (
              (hrdata.gnoTentativeRating !== "" ||
                hrdata.gnoTentativeRating !== null) &&
              (hrdata.gnoTentativeRatingComment !== "" ||
                hrdata.gnoTentativeRatingComment !== null) &&
              (hrdata.gnoTentativeRatingDate !== "" ||
                hrdata.gnoTentativeRatingDate !== null)
            ) {
              console.log("Submit1")
              SetShowThirdCard(true)
            }
            if (
              (hrdata.gnoRatingEmployeeAccepted !== "" ||
                hrdata.gnoRatingEmployeeAccepted !== null) &&
              (hrdata.gnoRatingEmployeeFeedback !== "" ||
                hrdata.gnoRatingEmployeeFeedback !== null)
            ) {
              console.log("Submit2")
              SetShowFourthCard(true)
            }
            if (
              (hrdata.gnoFinalRating !== "" ||
                hrdata.gnoFinalRating !== null) &&
              (hrdata.gnoFinalRatingComment !== "" ||
                hrdata.gnoFinalRatingComment !== null) &&
              (hrdata.gnoFinalRatingDate !== "" ||
                hrdata.gnoFinalRatingDate !== null)
            ) {
              console.log("Submit3")

              // SetShowFourthCard(true)
            }
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
                            value={
                              postSelfAppraisalHRData.gnoTechnology
                                ?.weightage || ""
                            }
                            disabled={true}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
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
                            value={
                              postSelfAppraisalHRData.gnoTechnology?.measurement
                            }
                            disabled={true}
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
                            value={
                              postSelfAppraisalHRData.gnoJobKnowledge
                                ?.weightage || ""
                            }
                            name="jobknowledgeweightage"
                            disabled={true}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
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
                            value={
                              postSelfAppraisalHRData.gnoJobKnowledge
                                ?.measurement
                            }
                            name="jobknowledgemeasurement"
                            disabled={true}
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
                            value={
                              postSelfAppraisalHRData.gnoDependability
                                ?.weightage || ""
                            }
                            name="dependabilityandinitiativeweightage"
                            disabled={true}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
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
                            value={
                              postSelfAppraisalHRData.gnoDependability
                                ?.measurement
                            }
                            name="dependabilityandinitiativemeasurement"
                            disabled={true}
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
                            name="analyticalabilityweightage"
                            disabled={true}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
                              }
                            }}
                            value={
                              postSelfAppraisalHRData.gnoAnalytical
                                ?.weightage || ""
                            }
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
                            value={
                              postSelfAppraisalHRData.gnoAnalytical?.measurement
                            }
                            name="analyticalabilitymeasurement"
                            disabled={true}
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
                            value={
                              postSelfAppraisalHRData.gnoQuality?.weightage ||
                              ""
                            }
                            name="qualityweightage"
                            disabled={true}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
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
                            value={
                              postSelfAppraisalHRData.gnoQuality?.measurement
                            }
                            disabled={true}
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
                            value={
                              postSelfAppraisalHRData.gnoCom?.weightage || ""
                            }
                            name="comm&interpersonalweightage"
                            disabled={true}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
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
                            value={postSelfAppraisalHRData.gnoCom?.measurement}
                            name="comm&interpersonalmeasurement"
                            disabled={true}
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
                            value={
                              postSelfAppraisalHRData.gnoTeamWork?.weightage
                            }
                            name="teamworkweightage"
                            disabled={true}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
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
                            value={
                              postSelfAppraisalHRData.gnoTeamWork?.measurement
                            }
                            name="teamworkmeasurement"
                            disabled={true}
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
                            value={
                              postSelfAppraisalHRData.gnoCompletion
                                ?.weightage || ""
                            }
                            name="completionweightage"
                            disabled={true}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
                              if (value > 100) {
                                alert("Percentage cannot be greater than 100")
                                return
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
                            value={
                              postSelfAppraisalHRData.gnoCompletion?.measurement
                            }
                            name="completionmeasurement"
                            disabled={true}
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
                      <label className="col-form-label">From</label>
                      <InputGroup>
                        <DatePicker
                          className="form-control"
                          name="fromdate"
                          options={{
                            dateFormat: "d-M-Y",
                          }}
                          placeholder="dd-MON-yyyy"
                          value={postSelfAppraisalHRData.gnoFromDate}
                          onChange={date => handleFromSelfAppraisalDate(date)}
                          disabled={true}
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
                        value={postSelfAppraisalHRData.gnoToDate}
                        onChange={e =>
                          handleToSelfAppraisalDate(e.target.value)
                        }
                        disabled={true}
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
                        value={postSelfAppraisalHRData.gnoCommentByEmployee}
                        onChange={e =>
                          setPostSelfAppraisalHRData(prevPostData => ({
                            ...prevPostData,
                            gnoCommentByEmployee: e.target.value,
                          }))
                        }
                        disabled={true}
                      />
                    </div>
                  </div>
                </Row>

                <div className="form-check-right form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheck4"
                    value={postSelfAppraisalHRData.gnoApproved}
                    checked={postSelfAppraisalHRData.gnoApproved === "true"}
                    onChange={handleApprovedCheckboxChange}
                    disabled={hrdata.gnoApprovalComment != ""}
                  />

                  <label className="form-check-label" htmlFor="customCheck4">
                    Approve
                    <span className="text-danger">*</span>
                  </label>
                </div>

                <Row>
                  <div style={{ marginBottom: "7px" }} />
                  <div className="col-md-3 mt-10">
                    <label className="col-form-label">
                      Approved Date<span className="text-danger">*</span>
                    </label>
                    <InputGroup>
                      <DatePicker
                        className="form-control"
                        type="date"
                        name="approvedDate"
                        options={{
                          dateFormat: "d-M-Y",
                        }}
                        placeholder="dd-MON-yyyy"
                        disabled={
                          addNewMySelfAppraisal == false &&
                          postSelfAppraisalHRData.gnoApprovedDate != ""
                        }
                        value={postSelfAppraisalHRData.gnoApprovedDate}
                        onChange={date => handleApprovedSelfAppraisalDate(date)}
                      />
                    </InputGroup>
                  </div>
                </Row>

                <div className="row">
                  <div className="col-md-8 mt-10">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "20px",
                      }}
                    >
                      <label className="col-form-label">
                        Hr Feedback<span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        type="text"
                        id="example-text-input"
                        value={postSelfAppraisalHRData.gnoApprovalComment}
                        disabled={hrdata.gnoApprovalComment != ""}
                        onChange={e =>
                          setPostSelfAppraisalHRData(prevPostData => ({
                            ...prevPostData,
                            gnoApprovalComment: e.target.value,
                          }))
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
                      onClick={handleSelfAppraisalFirstFormSubmit}
                      disabled={postSelfAppraisalHRData.gnoApproved == "true"}
                      // disabled={hrdata.gnoApprovalComment != ""}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </AvForm>
            </CardBody>
          </Card>
        </Col>

        {postSelfAppraisalHRData.gnoApproved === "true" && (
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
                        // disabled={postSelfAppraisalHRData.gnoApproved == true}

                        value={postSelfAppraisalHRData.gnoTentativeRating}
                        onChange={e =>
                          setPostSelfAppraisalHRData(prevPostData => ({
                            ...prevPostData,
                            gnoTentativeRating: e.target.value,
                          }))
                        }
                        disabled={hrdata.gnoApprovalComment != ""}
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
                        name="tentatativeratingtotal"

                        // disabled={postSelfAppraisalHRData.gnoTentativeRating}
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
                        value={postSelfAppraisalHRData.gnoTentativeRatingDate}
                        disabled={
                          addNewMySelfAppraisal == false &&
                          postSelfAppraisalHRData.gnoTentativeRatingDate != ""
                        }
                        onChange={date =>
                          handleTentativeSelfAppraisalDate(date)
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
                        value={
                          postSelfAppraisalHRData.gnoTentativeRatingComment
                        }
                        disabled={
                          // addNewMySelfAppraisal == false
                          // &&
                          hrdata.gnoTentativeRatingComment != ""
                        }
                        onChange={e =>
                          setPostSelfAppraisalHRData(prevPostData => ({
                            ...prevPostData,
                            gnoTentativeRatingComment: e.target.value,
                          }))
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
                        onClick={handleSelfAppraisalSecondFormSubmit}
                        disabled={hrdata.gnoTentativeRatingComment != ""}
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
                    checked={
                      postSelfAppraisalHRData.gnoRatingEmployeeAccepted ===
                      "true"
                    }
                    disabled={true}
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
                        value={
                          postSelfAppraisalHRData.gnoRatingEmployeeFeedback
                        }
                        onChange={e =>
                          setPostSelfAppraisalHRData(prevPostData => ({
                            ...prevPostData,
                            gnoRatingEmployeeFeedback: e.target.value,
                          }))
                        }
                        disabled={true}
                      />
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
                        name="finalrating"
                        value={postSelfAppraisalHRData.gnoFinalRating}
                        disabled={
                          postSelfAppraisalHRData.gnoFinalRatingComment != ""
                        }
                        onChange={e =>
                          setPostSelfAppraisalHRData(prevPostData => ({
                            ...prevPostData,
                            gnoFinalRating: e.target.value,
                          }))
                        }
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
                        //value={postSelfAppraisalHRData.gnoFinalRating}
                        // disabled={postSelfAppraisalHRData.gnoFinalRating}
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
                        value={postSelfAppraisalHRData.gnoFinalRatingDate}
                        disabled={
                          addNewMySelfAppraisal == false &&
                          postSelfAppraisalHRData.gnoFinalRatingDate != ""
                        }
                        onChange={date => handleFinalSelfAppraisalDate(date)}
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
                        value={postSelfAppraisalHRData.gnoFinalRatingComment}
                        onChange={e =>
                          setPostSelfAppraisalHRData(prevPostData => ({
                            ...prevPostData,
                            gnoFinalRatingComment: e.target.value,
                          }))
                        }
                        disabled={hrdata.gnoFinalRatingComment != ""}
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
                        onClick={handleSelfAppraisalFourthFormSubmit}
                        disabled={hrdata.gnoFinalRatingComment != ""}
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
export default connect(null, { setBreadcrumbItems })(SelfAppraisalHr)
