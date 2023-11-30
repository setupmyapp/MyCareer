import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
// Redux
// import { connect } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import axios from "axios"
import SweetAlert from "react-bootstrap-sweetalert"
import Swal from "sweetalert2"
import DatePicker from "react-flatpickr"
import {
  Card,
  CardBody,
  Col,
  Row,
  span,
  CardTitle,
  FormGroup,
  Form,
} from "reactstrap"

import { connect } from "react-redux"
import "../Css/HrEditEmployee-Details.css"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import profile from "../Profile/photo.png"
import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers"
import { IPAddress } from "util/APIUtil"
import { TIME_TO_CLOSE_MESSAGE } from "react-bootstrap-table2-editor/lib/src/const"

const HREmployeeDetails = props => {
  const breadcrumbItems = [
    { title: "My Career App", link: "#" },
    { title: "Employees", link: "#" },
    { title: "HR Employee Details", link: "#" },
  ]
  const { state } = useLocation()

  console.log(state?.employeeId)

  // useEffect(() => {
  //   getAllBands()
  // })
  const [employeeDetailsData, setEmployeeDetailsData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    emailId: "",
    contactNo: "",
    birthDate: "",
    designation: "",
    experienceWhenJoined: "",
    expbyskills: [],
    joiningDate: "",
    totalExperience: "",
    bandGrade: "",
    costCenterName: "",
    departmentName: "",
    underAM: "",
    previousAppraisalDate: "",
    appraisalDueDate: "",
    hasHRApproved: false,
    areBillable: false,
    areAM: false,
    kpiDetails: [],
  })
  const [dataBands, setDataBands] = useState([])
  const [showBtn, setShowBtn] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const storedFormValues = localStorage.getItem("authUser")
  const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}

  const history = useHistory()
  useEffect(() => {
    props.setBreadcrumbItems("Employee Details", breadcrumbItems)
    if (
      authUser.rolesList[0] === "HR_SUPPORT" ||
      authUser.rolesList[0] === "SUPER_ADMIN"
    )
      setShowBtn(true)
  }, [])

  const getAllBands = () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("authUser")).accessToken
      }`,
    }
    axios
      .get(`${IPAddress}tracking/common/getAllBands`)
      .then(response => {
        setDataBands(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const assignAllFields = employeeDTO => {
    console.log(employeeDTO)
    const totalexpwhenjoinedMonths = employeeDTO.experienceWhenJoined
    const years = Math.floor(totalexpwhenjoinedMonths / 12)
    const months = totalexpwhenjoinedMonths % 12
    const joiningDate = new Date(employeeDTO.joiningDate)
    const currentDate = new Date()
    let totalexperienceyears = 0
    let totalexperiencemonths = 0
    let bandGrade = ""

    if (!isNaN(joiningDate.getTime())) {
      const monthsDifference =
        (currentDate.getFullYear() - joiningDate.getFullYear()) * 12 +
        (currentDate.getMonth() - joiningDate.getMonth())

      const totalExperienceInMonths = years * 12 + months
      const totalexperience = totalExperienceInMonths + monthsDifference

      console.log(totalexperience)

      totalexperienceyears = Math.floor(totalexperience / 12)
      totalexperiencemonths = totalexperience % 12

      getAllBands()

      for (let i = dataBands.length - 1; i >= 0; i--) {
        const bandData = dataBands[i]
        if (totalexperience >= bandData.experience) {
          bandGrade = bandData.grade
          break
        }
      }

      console.log(bandGrade)
    }

    setEmployeeDetailsData({
      ...employeeDetailsData,
      employeeId: employeeDTO.employeeId,
      firstName: employeeDTO.firstName,
      middleName: employeeDTO.middleName,
      lastName: employeeDTO.lastName,
      emailId: employeeDTO.emailId,
      contactNo: employeeDTO.contactNo,
      birthDate: employeeDTO.birthDate,
      designation: employeeDTO.designation,
      experienceWhenJoined: `${years} years and ${months} months`,
      experienceWhenJoinedYears: years,
      experienceWhenJoinedMonths: months,
      expbyskills: JSON.parse(employeeDTO.experienceBySkills),
      joiningDate: employeeDTO.joiningDate,
      totalExperience: employeeDTO.totalexperience,
      totalexperienceyears: totalexperienceyears,
      totalexperiencemonths: totalexperiencemonths,
      bandGrade: bandGrade,
      costCenterName: employeeDTO.costCenterName,
      departmentName: employeeDTO.departmentName,
      underAM: employeeDTO.underAM,
      tmunderAM: employeeDTO.tmunderAM,
      previousAppraisalDate: employeeDTO.previousAppraisalDate,
      appraisalDueDate: employeeDTO.appraisalDueDate,
      hasHRApproved: employeeDTO.hasHRApproved,
      areBillable: employeeDTO.areBillable,
      areAM: employeeDTO.areAM,
      kpiDetails: JSON.parse(employeeDTO.kpiDetails),
    })
  }

  const handleEdit = () => {
    console.log(authUser.rolesList[0])
    if (
      authUser.rolesList[0] === "HR_SUPPORT" ||
      authUser.rolesList[0] === "SUPER_ADMIN"
    ) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to edit this Form?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, edit it!",
        cancelButtonText: "Cancel",
      }).then(result => {
        if (result.isConfirmed) {
          history.push({
            pathname: "/hr-edit-employee-details",
            state: { employeeDTO: employeeDetailsData },
          })
        }
      })
    } else {
      console.log("You are not authorised to edit.")
      setShowAlert(true)
    }
  }
  const handleShowMyCalender = () => {
    history.push({
      pathname: "/calendar",
    })
  }
  const handleShowteam = () => {
    history.push({
      pathname: "/hr-employees-list",
      state: {
        showTeamMembers: true,
        accountManagerEmployeeID: employeeDetailsData.employeeId,
      },
    })
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authUser")).accessToken
    const headers = {
      "Content-Type": "application/json",
    }
    console.log(headers)
    console.log(state?.employeeId)
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
    axios
      .get(
        `${IPAddress}tracking/hrSupport/getEmployeeProfileDetails/${state?.employeeId}`,
        { headers: headers }
      )
      .then(response => {
        assignAllFields(response.data.employeeDTO)
        console.log(JSON.stringify(response.data))

        // const experienceBySkills = JSON.parse(
        //   response.data.employeeDTO?.experienceBySkills || "[]"
        // )
        // console.log(experienceBySkills)
        // setExpbyskills(experienceBySkills)

        // console.log("teamexp", experienceBySkills)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <MetaTags>
          <title>Employee Details</title>
        </MetaTags>
        {employeeDetailsData.areAM == "true" && (
          <>
            <div className="col-auto" style={{ marginLeft: "66%" }}>
              <button
                className="btn btn-primary w-md"
                onClick={handleShowMyCalender}
              >
                Show My Calendar
              </button>
            </div>
            <div className="col-auto" style={{ marginLeft: "2%" }}>
              <button className="btn btn-primary w-md" onClick={handleShowteam}>
                Show Team Members
              </button>
            </div>

            <div className="postion-relative">
              <div>
                <input
                  className="form-control"
                  style={{
                    width: "40px",
                    marginLeft: "15px",
                  }}
                  type="text"
                  name="tmunderAM"
                  value={employeeDetailsData.tmunderAM}
                  disabled={true}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <br />

      <Row>
        <Col>
          {/* {areaccountmanager && (
            <button
              type="edit"
              className="btn btn-info w-md"
              style={{ float: "right", marginRight: "10px" }}
              onClick={handleEdit}
            >
              Edit
            </button>
          )} */}
          <Card>
            <CardBody>
              <Row className="mb-3">
                <h4 className="card-title">Employee Details</h4>

                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Employee ID
                </label>
                <div className="col-md-5">
                  <input
                    className="form-control"
                    type="text"
                    name="employeeId"
                    disabled={true}
                    value={employeeDetailsData.employeeId}
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  First Name
                </label>
                <div className="col-md-5">
                  <input
                    className="form-control"
                    type="text"
                    name="firstName"
                    value={employeeDetailsData.firstName}
                    disabled={true}
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Middle Name
                </label>
                <div className="col-md-5">
                  <input
                    className="form-control"
                    type="text"
                    disabled={true}
                    name="middleName"
                    value={employeeDetailsData.middleName}
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Last Name
                </label>
                <div className="col-md-5">
                  <input
                    className="form-control"
                    type="text"
                    disabled={true}
                    name="lastName"
                    value={employeeDetailsData.lastName}
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Email Id
                </label>
                <div className="col-md-5">
                  <input
                    className="form-control"
                    type="email"
                    disabled={true}
                    name="emailId"
                    value={employeeDetailsData.emailId}
                  />
                </div>
              </Row>
              <Row>
                <div className="col-md-12">
                  <img
                    src={profile}
                    alt="Profile Photo"
                    className="img-thumbnail"
                    style={{
                      width: "180px",
                      marginTop: "-23%",
                      marginLeft: "80%",
                    }}
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-tel-input"
                  className="col-md-2 col-form-label"
                >
                  Contact Number
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="tel"
                    disabled={true}
                    name="contactNo"
                    value={employeeDetailsData.contactNo}
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Date of Birth
                </label>
                <div className="col-md-10">
                  <DatePicker
                    className="form-control"
                    options={{
                      dateFormat: "d-M-Y",
                    }}
                    type="date"
                    placeholder="dd-MON-yyyy"
                    id="example-date-input"
                    disabled={true}
                    name="birthDate"
                    value={employeeDetailsData.birthDate}
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Designation
                </label>

                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="search"
                    disabled={true}
                    name="designation"
                    value={employeeDetailsData.designation}
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Experience When Joined
                </label>

                <div className="col-md-2 d-flex align-items-center">
                  <input
                    className="form-control small-input"
                    type="search"
                    defaultValue="Years"
                    disabled={true}
                    name="experienceWhenJoinedYears"
                    value={employeeDetailsData.experienceWhenJoinedYears}
                  />
                  <span>Years</span>
                </div>

                <div className="col-md-2 d-flex align-items-center">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue="Months"
                    disabled={true}
                    name="experienceWhenJoinedMonths"
                    value={employeeDetailsData.experienceWhenJoinedMonths}
                  />
                  <span>Months</span>
                </div>
              </Row>

              <div className="d-flex">
                <label className="col-md-2 col-form-label">
                  Experience By Skills
                </label>
                <div className="d-flex align-items-center">
                  <div className="flex-row-1">
                    {employeeDetailsData.expbyskills &&
                    employeeDetailsData.expbyskills.length > 0 ? (
                      employeeDetailsData.expbyskills.map(
                        (experience, index) => (
                          <div key={index} className="mb-3">
                            <div className="row align-items-center">
                              <div className="col-md-4 d-flex justify-content between align-items-center">
                                <input
                                  className="form-control"
                                  type="search"
                                  style={{ marginLeft: "2%" }}
                                  defaultValue="technology"
                                  disabled={true}
                                  name="experienceBySkills"
                                  value={experience.skillset || ""}
                                  onChange={e => {
                                    const updatedExperiences = [
                                      ...employeeDetailsData.expbyskills,
                                    ]
                                    updatedExperiences[index].skillset =
                                      e.target.value
                                    setEmployeeDetailsData({
                                      ...employeeDetailsData,
                                      expbyskills: updatedExperiences,
                                    })
                                  }}
                                />
                                <span>Technology</span>
                              </div>
                              <div className="col-md-3 d-flex justify-content-between align-items-center">
                                <input
                                  className="form-control"
                                  type="search"
                                  defaultValue="yearOfExperience"
                                  disabled={true}
                                  name="experienceBySkills"
                                  value={experience.yearOfExperience || ""}
                                  onChange={e => {
                                    const updatedExperiences = [
                                      ...employeeDetailsData.expbyskills,
                                    ]
                                    updatedExperiences[index].yearOfExperience =
                                      e.target.value
                                    setEmployeeDetailsData({
                                      ...employeeDetailsData,
                                      expbyskills: updatedExperiences,
                                    })
                                  }}
                                />
                                <span>Years</span>
                              </div>
                              <div className="col-md-3 d-flex justify-content-between align-items-center">
                                <input
                                  className="form-control"
                                  type="search"
                                  defaultValue="monthsOfExperience"
                                  disabled={true}
                                  value={experience.monthsOfExperience || ""}
                                  onChange={e => {
                                    const updatedExperiences = [
                                      ...employeeDetailsData.expbyskills,
                                    ]
                                    updatedExperiences[
                                      index
                                    ].monthsOfExperience = e.target.value
                                    setEmployeeDetailsData({
                                      ...employeeDetailsData,
                                      expbyskills: updatedExperiences,
                                    })
                                  }}
                                />
                                <span>Months</span>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <p>No experience data available</p>
                    )}
                  </div>
                </div>
              </div>

              <Row className="mb-3">
                <label
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Joining Date
                </label>
                <div className="col-md-10">
                  <DatePicker
                    className="form-control"
                    options={{
                      dateFormat: "d-M-Y",
                    }}
                    type="date"
                    placeholder="dd-MON-yyyy"
                    disabled={true}
                    name="joiningDate"
                    value={employeeDetailsData.joiningDate}
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Total Experience
                </label>

                <div className="col-md-2 d-flex align-items-center">
                  <input
                    className="form-control "
                    type="search"
                    defaultValue="Years"
                    disabled={true}
                    name="totalexperienceyears"
                    value={employeeDetailsData.totalexperienceyears}
                  />
                  <span>Years</span>
                </div>

                <div className="col-md-2 d-flex align-items-center">
                  <input
                    className="form-control mr-1"
                    type="search"
                    defaultValue="Months"
                    disabled={true}
                    name="totalexperiencemonths"
                    value={employeeDetailsData.totalexperiencemonths}
                  />
                  <span>Months</span>
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Band
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                    disabled={true}
                    name="bandGrade"
                    value={employeeDetailsData.bandGrade}
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Cost Center
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue=""
                    disabled={true}
                    name="costCenterName"
                    value={employeeDetailsData.costCenterName}
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Department
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="search"
                    disabled={true}
                    name="departmentName"
                    value={employeeDetailsData.departmentName}
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Reporting To
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                    disabled={true}
                    name="underAM"
                    value={employeeDetailsData.underAM}
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Previous Appraisal Date
                </label>
                <div className="col-md-10  ">
                  <DatePicker
                    className="form-control"
                    options={{
                      dateFormat: "d-M-Y",
                    }}
                    type="date"
                    id="example-date-input"
                    placeholder="dd-MON-yyyy"
                    disabled={true}
                    name="previousAppraisalDate"
                    value={employeeDetailsData.previousAppraisalDate}
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Appraisal Due Date
                </label>
                <div className="col-md-10">
                  <DatePicker
                    className="form-control"
                    options={{
                      dateFormat: "d-M-Y",
                    }}
                    type="date"
                    id="example-date-input"
                    placeholder="dd-MON-yyyy"
                    disabled={true}
                    name="appraisalDueDate"
                    value={employeeDetailsData.appraisalDueDate}
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Approved :
                </label>
                <div className="form-check form-switch   form-switch-md col-md-5 style={{ marginLeft: '20px' }}">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    disabled={true}
                    name="isAppbyhr"
                    checked={employeeDetailsData.hasHRApproved === "true"}
                    onChange={e => {
                      setEmployeeDetailsData({
                        ...employeeDetailsData,
                        hasHRApproved: e.target.checked,
                      })
                    }}
                  />

                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {employeeDetailsData.hasHRApproved === "true"
                      ? "True"
                      : "False"}
                  </label>
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Billable :
                </label>
                <div className="form-check form-switch   form-switch-md col-md-5 style={{ marginLeft: '20px' }}">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customSwitchsizemd"
                    name="areBillable"
                    disabled={true}
                    checked={employeeDetailsData.areBillable === "true"}
                    onChange={e => {
                      setEmployeeDetailsData({
                        ...employeeDetailsData,
                        areBillable: e.target.checked,
                      })
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {employeeDetailsData.areBillable === "true"
                      ? "True"
                      : "False"}
                  </label>
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Manager :
                </label>
                <div className="form-check form-switch   form-switch-md col-md-5 style={{ marginLeft: '20px' }}">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customSwitchsizemd"
                    name="areAM"
                    disabled={true}
                    checked={employeeDetailsData.areAM === "true"}
                    onChange={e => {
                      setEmployeeDetailsData({
                        ...employeeDetailsData,
                        areAM: e.target.checked,
                      })
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {employeeDetailsData.areAM === "true" ? "True" : "False"}
                  </label>
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
              <div style={{ marginTop: "2%" }}>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Reporting Manager Name
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      name="nameRM"
                      value={employeeDetailsData.nameRM}
                      disabled={true}
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Reporting Manager Email ID
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="email"
                      defaultValue=""
                      disabled={true}
                      value={employeeDetailsData.emailRM}
                    />
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary">Triggered Email</button>
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-email-input"
                    className="col-md-2 col-form-label"
                  >
                    Reporting Manager Contact Number
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="number"
                      defaultValue=""
                      disabled={true}
                      name="contactRM "
                      value={employeeDetailsData.contactRM}
                    />
                  </div>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <h5>KPI MATRICS</h5>
              <div style={{ marginTop: "2%" }}></div>
              <Row className="mb-3">
                {/* <Col md={4}>
                  <label className="col-form-label">KPI Parameter</label>
                  <input
                    className="form-control"
                    type="text"
                    name="kpiparameter"
                    disabled={true}
                  />
                </Col>

                <Col md={2}>
                  <label className="col-form-label">Percentage</label>
                  <input
                    className="form-control"
                    type="text"
                    name="percentage"
                    disabled={true}
                  />
                </Col> */}
                <div className="d-flex align-items-center">
                  <div className="flex-row-2">
                    <div class="row">
                      <div class="col-md-7 d-flex align-items-center justify-content-center">
                        <span>KPIs</span>
                      </div>
                      <div class="col-md-5 d-flex align-items-center justify-content-center">
                        <span>%</span>
                      </div>
                    </div>
                    {employeeDetailsData.kpiDetails &&
                    employeeDetailsData.kpiDetails.length > 0 ? (
                      employeeDetailsData.kpiDetails.map((matric, index) => (
                        <div key={index} className="mb-3">
                          <div className="row align-items-center">
                            <div className="col-md-8">
                              <div className="d-flex flex-column align-items-center">
                                <input
                                  className="form-control"
                                  type="search"
                                  style={{ marginTop: "2%" }}
                                  defaultValue="kpiparameterName"
                                  disabled={true}
                                  name="KpiMatric"
                                  value={matric.kpiparameterName || ""}
                                  onChange={e => {
                                    const updatedExperiences = [
                                      ...employeeDetailsData.kpiDetails,
                                    ]
                                    updatedExperiences[index].per =
                                      e.target.value
                                    setEmployeeDetailsData({
                                      ...employeeDetailsData,
                                      kpiDetails: updatedExperiences,
                                    })
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="d-flex flex-column align-items-center">
                                <input
                                  className="form-control"
                                  type="search"
                                  style={{ marginTop: "2%" }}
                                  defaultValue="kpipercentage"
                                  disabled={true}
                                  name="KpiMatric"
                                  value={matric.percentage || ""}
                                  onChange={e => {
                                    const updatedExperiences = [
                                      ...employeeDetailsData.kpiDetails,
                                    ]
                                    updatedExperiences[index].percentage =
                                      e.target.value
                                    setEmployeeDetailsData({
                                      ...employeeDetailsData,
                                      kpiDetails: updatedExperiences,
                                    })
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No kpi data available</p>
                    )}
                  </div>
                </div>
              </Row>

              {/* </div> */}

              <div>
                {showBtn == true && (
                  <button
                    type="button"
                    className="btn btn-info w-md"
                    style={{ float: "right", marginRight: "10px" }}
                    onClick={handleEdit}
                    disabled={employeeDetailsData.hasHRApproved === "true"}
                  >
                    Edit
                  </button>
                )}
              </div>

              <div></div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(HREmployeeDetails)
