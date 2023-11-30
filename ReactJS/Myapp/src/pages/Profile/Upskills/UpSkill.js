import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Card, CardBody, Col, Row, InputGroup } from "reactstrap"
import { connect } from "react-redux"
import DatePicker from "react-flatpickr"
import { setBreadcrumbItems } from "../../../store/actions"
import { AvField, AvForm, AvInput } from "availity-reactstrap-validation"
import axios from "axios"
import { IPAddress } from "util/APIUtil"
import Select from "react-select"
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

const storedFormValues = localStorage.getItem("authUser")
const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}
const employeeName = authUser.employeeName

const UpSkill = props => {
  const breadcrumbItems = [
    { title: "My Career App", link: "#" },
    { title: "UpSkills  List", link: "#" },
    { title: "UpSkills", link: "#" },
  ]
  useEffect(() => {
    props.setBreadcrumbItems("UpSkills ", breadcrumbItems)
  })

  const history = useHistory()
  const [upSkillSubmitData, setupSkillSubmitData] = useState({
    upSkillId: "",
    courseName: "",
    upSkillTypeName: "",
    employeeId: "",
    employeeName: "",
    targetSkillSet: "",
    fees: "",
    startDate: "",
    endDate: "",
    feesReceiptFilePath: "",
    certificateFilePath: "",
    hasHRVerified: "",
    hasHRApprovedFees: "",
  })
  const [certificatefile, setCertificateFile] = useState(null)
  const [feesfile, setFeesfile] = useState(null)
  const [upSkillTypesList, setupSkillTypesList] = useState([])

  const [alertError, setAlertError] = useState(false)

  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("authUser")).accessToken
  )
  const { state } = useLocation()
  const addNewUpSkill = state?.addNewUpSkill
  const userRole = (JSON.parse(localStorage.getItem("authUser")) || {})
    .rolesList?.[0]

  const IPAddGetUpskill = upSkillId => {
    console.log(userRole)
    if (userRole === "SUPER_ADMIN" || userRole === "HR_SUPPORT") {
      return `${IPAddress}tracking/hrSupport/getUpskill/${upSkillId}`
    } else {
      return `${IPAddress}tracking/employee/getMyUpskill/${upSkillId}`
    }
  }

  const IPSubmitUpskill = () => {
    if (addNewUpSkill) {
      return `${IPAddress}tracking/employee/addNewUpSkill`
    } else {
      if (userRole === "ACCOUNT_MANAGER" || userRole === "TEAM_MEMBER") {
        return `${IPAddress}tracking/employee/editMyUpSkill`
      } else {
        return `${IPAddress}tracking/employee/editUpSkill`
      }
    }
  }

  const APIFormDataParam = () => {
    if (addNewUpSkill) {
      console.log("addNewUpSkillRequest")
      return "addNewUpSkillRequest"
    } else {
      if (userRole === "ACCOUNT_MANAGER" || userRole === "TEAM_MEMBER") {
        console.log("editMyUpSkillRequest")
        return "editMyUpSkillRequest"
      } else {
        console.log("editUpSkillRequest")
        return "editUpSkillRequest"
      }
    }
  }

  const assignAllFields = upSkillDTO => {
    setupSkillSubmitData({
      ...upSkillSubmitData,
      upSkillId: upSkillDTO.upSkillId,
      courseName: upSkillDTO.courseName,
      upSkillTypeName: upSkillDTO.upSkillTypeName,
      employeeId: upSkillDTO.employeeId,
      employeeName: upSkillDTO.employeeName,
      targetSkillSet: upSkillDTO.targetSkillSet,
      fees: upSkillDTO.fees,
      startDate: upSkillDTO.startDate,
      endDate: upSkillDTO.endDate,
      feesReceiptFilePath: upSkillDTO.feesReceiptFilePath,
      certificateFilePath: upSkillDTO.certificateFilePath,
      hasHRVerified: upSkillDTO.hasHRVerified,
      hasHRApprovedFees: upSkillDTO.hasHRApprovedFees,
    })
  }

  useEffect(() => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${accessToken}`,
    }
    axios
      .get(`${IPAddress}tracking/common/getAllUpSkillTypes`)
      .then(response => {
        setupSkillTypesList(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      })

    if (addNewUpSkill) {
      setupSkillSubmitData({
        ...upSkillSubmitData,
        employeeId: state.employeeId,
        employeeName: employeeName,
      })
    } else {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${accessToken}`,
      }
      axios
        .get(IPAddGetUpskill(state?.upSkillId))
        .then(response => {
          assignAllFields(response.data.upSkillDTO)
          console.log(JSON.stringify(response.data))
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [])

  const handleInputToggleChange = event => {
    const { name, value, type, checked } = event.target
    const newValue = type === "checkbox" ? checked : value
    setupSkillSubmitData({
      ...upSkillSubmitData,
      [name]: newValue === true ? "true" : "false",
    })
  }

  const handleInputStartDate = selectedDate => {
    const day = selectedDate.getDate()
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
    const monthName = monthNames[selectedDate.getMonth()]
    const year = selectedDate.getFullYear()

    const formattedStartDate = `${day}-${monthName}-${year}`
    setupSkillSubmitData({
      ...upSkillSubmitData,
      startDate: formattedStartDate,
    })
  }

  const handleInputEndDate = selectedDate => {
    const day = selectedDate.getDate()
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
    const monthName = monthNames[selectedDate.getMonth()]
    const year = selectedDate.getFullYear()

    const formattedEndDate = `${day}-${monthName}-${year}`
    setupSkillSubmitData({
      ...upSkillSubmitData,
      endDate: formattedEndDate,
    })
  }

  const handleInputTextFieldChange = event => {
    const { name, value } = event.target
    setupSkillSubmitData({
      ...upSkillSubmitData,
      [name]: value,
    })
  }

  const handleInputTypeOfCourse = selectedOption => {
    setupSkillSubmitData({
      ...upSkillSubmitData,
      upSkillTypeName: selectedOption.value,
    })
  }

  const handleInputcertificatefile = event => {
    const selectedCertificateFile = event.target.files[0]
    setCertificateFile(selectedCertificateFile)
  }

  const handleInputFeesFile = event => {
    const selectedfeesfile = event.target.files[0]
    setFeesfile(selectedfeesfile)
  }

  const handleInputUpskillFormSubmit = () => {
    if (
      // upSkillSubmitData.employeeId !== "" &&
      upSkillSubmitData.targetSkillSet !== "" &&
      upSkillSubmitData.certificateFilePath != null &&
      // /^[A-Za-z\s]+$/.test(upSkillSubmitData.employeeName) &&
      /^[a-zA-Z0-9]+$/.test(upSkillSubmitData.courseName) &&
      /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/.test(
        upSkillSubmitData.startDate
      ) &&
      /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/.test(
        upSkillSubmitData.endDate
      )
    ) {
      const upskillFormData = new FormData()
      upskillFormData.append(
        APIFormDataParam(),
        JSON.stringify(upSkillSubmitData)
      )
      upskillFormData.append("upskillFees", feesfile || "")
      upskillFormData.append("upskillCertificate", certificatefile)

      axios.defaults.headers.common = {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("authUser")).accessToken
        }`,
      }
      if (addNewUpSkill) {
        axios
          .post(IPSubmitUpskill(), upskillFormData, {
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
      } else {
        axios
          .put(IPSubmitUpskill(), upskillFormData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then(response => {
            console.log(response.data)
            history.push("/Upskill_lists", {
              alertMessage: "New Upskills Added!!",
            })
          })
          .catch(error => {
            console.error(error)
          })
      }
    } else {
      setAlertError(true)
      setTimeout(() => {
        setAlertError(false)
      }, 4000)
    }
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Profile</title>
      </MetaTags>

      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <AvForm>
                <Row className="mb-3">
                  <Col md={2}>
                    <label
                      htmlFor="example-text-input"
                      className="col-form-label"
                    >
                      Employee ID
                      <span className="text-danger">*</span>
                    </label>
                  </Col>
                  <Col md={5}>
                    <AvField
                      className="form-control"
                      type="text"
                      name="employeeId"
                      value={upSkillSubmitData.employeeId}
                      onChange={handleInputTextFieldChange}
                      disabled={
                        authUser.rolesList[0] === "SUPER_ADMIN" ||
                        authUser.rolesList[0] === "HR_SUPPORT"
                      }
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={2}>
                    <label
                      htmlFor="example-text-input"
                      className="col-form-label"
                    >
                      Employee Name
                      <span className="text-danger">*</span>
                    </label>
                  </Col>
                  <Col md={5}>
                    <AvField
                      className="form-control"
                      type="text"
                      name="employeeName"
                      onChange={handleInputTextFieldChange}
                      value={upSkillSubmitData.employeeName}
                      placeholder="Employee Name"
                      disabled={
                        authUser.rolesList[0] === "SUPER_ADMIN" ||
                        authUser.rolesList[0] === "HR_SUPPORT"
                      }
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={2}>
                    <label
                      htmlFor="example-text-input"
                      className="col-form-label"
                    >
                      Course/Bootcamp Name
                      <span className="text-danger">*</span>
                    </label>
                  </Col>
                  <Col md={5}>
                    <AvField
                      className="form-control"
                      type="text"
                      name="courseName"
                      onChange={handleInputTextFieldChange}
                      value={upSkillSubmitData.courseName}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Course/Bootcamp Name is required",
                        },
                      }}
                      placeholder="Enter Course/Bootcamp Name"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Type of Course/Bootcamp Name
                    <span className="text-danger">*</span>
                  </label>

                  <div className="col-md-6">
                    <Select
                      options={upSkillTypesList.map(option => ({
                        label: option.upSkillTypeName,
                        value: option.upSkillTypeName,
                      }))}
                      name="upSkillTypeName"
                      onChange={handleInputTypeOfCourse}
                      value={{
                        value: upSkillSubmitData.upSkillTypeName,
                        label: upSkillSubmitData.upSkillTypeName,
                      }}
                      //defaultValue={upSkillSubmitData.upSkillTypeName}
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-email-input"
                    className="col-md-2 col-form-label"
                  >
                    Target Skills-Set<span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <AvField
                      className="form-control"
                      type="text"
                      name="targetSkillSet"
                      onChange={handleInputTextFieldChange}
                      value={upSkillSubmitData.targetSkillSet}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Target Skills-Set is required",
                        },
                      }}
                      placeholder="Enter Target Skills-Set"
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Fees
                  </label>

                  <div className="col-md-3">
                    <label htmlFor="amountField">Amount</label>
                    <AvField
                      className="form-control"
                      type="text"
                      name="fees"
                      value={upSkillSubmitData.fees}
                      onChange={handleInputTextFieldChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Fees Receipt:</label>
                    <input
                      type="file"
                      className="form-control form-control-file"
                      data-buttonname="btn-secondary"
                      accept=".pdf"
                      onChange={handleInputFeesFile}
                    />
                  </div>
                </Row>

                <Row className="mb-3 ">
                  <div className="col-md-2">
                    <label
                      htmlFor="example-date-input"
                      className="col-md-7 col-form-label"
                    >
                      Start Date<span className="text-danger">*</span>
                    </label>
                  </div>

                  <div className="col-md-3">
                    <InputGroup>
                      <DatePicker
                        className="form-control d-block"
                        options={{
                          dateFormat: "d-M-Y",
                        }}
                        placeholder="dd-MON-yyyy"
                        value={upSkillSubmitData.startDate}
                        onChange={date => handleInputStartDate(date[0])}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-md-2 ">
                    <label
                      htmlFor="example-date-input"
                      className="col-md-6 col-form-label"
                    >
                      End Date<span className="text-danger">*</span>
                    </label>
                  </div>

                  <div className="col-md-3">
                    <InputGroup style={{ marginRight: "50px" }}>
                      <DatePicker
                        className="form-control d-block"
                        options={{
                          dateFormat: "d-M-Y",
                        }}
                        placeholder="dd-MON-yyyy"
                        value={upSkillSubmitData.endDate}
                        onChange={date => handleInputEndDate(date[0])}
                      />
                    </InputGroup>
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Certificates
                  </label>
                  <div className="col-md-10">
                    <input
                      type="file"
                      className="form-control form-control-file"
                      data-buttonname="btn-secondary"
                      accept=".pdf"
                      onChange={handleInputcertificatefile}
                    />
                  </div>
                </Row>
                <Row className="mb-3 align-items-center">
                  <Col md={2}>
                    <label htmlFor="hrverified" className="col-form-label">
                      HR Verified
                    </label>
                  </Col>

                  <Col md={8}>
                    <div className="form-check form-switch form-switch-md col-md-9">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="hrverified"
                        disabled={true}
                        name="hasHRVerified"
                        onChange={handleInputToggleChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <Col md={2}>
                    <label
                      htmlFor="feesapprovedbyhr"
                      className="col-form-label"
                    >
                      Fees Approved By HR
                    </label>
                  </Col>

                  <Col md={8}>
                    <div className="form-check form-switch form-switch-md col-md-9">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="feesapprovedbyhr"
                        name="hasHRApprovedFees"
                        disabled={true}
                        onChange={handleInputToggleChange}
                      />
                    </div>
                  </Col>
                </Row>

                <div className="row">
                  <div className="col-md-5 d-flex flex-row justify-content-between align-items-start">
                    {alertError && (
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
                      onClick={handleInputUpskillFormSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}
export default connect(null, { setBreadcrumbItems })(UpSkill)
