import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
// Redux
// import { connect } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import axios from "axios"
import SweetAlert from "react-bootstrap-sweetalert"
import DatePicker from "react-flatpickr"
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  FormGroup,
  Form,
} from "reactstrap"

import { connect } from "react-redux"
import { IPAddress } from "util/APIUtil"
import { setBreadcrumbItems } from "../../store/actions"
import profile from "../Profile/photo.png"
import Swal from "sweetalert2"
const TeamMembersDetails = props => {
  const breadcrumbItems = [
    { title: "My Career App", link: "#" },
    { title: "Team Member ", link: "#" },
    { title: "Employee Details", link: "#" },
  ]

  const { state } = useLocation()
  // const employee = state && state.employee
  // console.log(state.employeeId)

  const [teamMemberDetailsData, setTeamMemberDetailsData] = useState({
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
    kpimatric: [],
  })
  // const [isAppbyhr, setAppbyhr] = useState(false)
  // const [isAccountManagerChecked, setIsAccountManagerChecked] = useState(false)
  // const [isbillable, setIsBillable] = useState(false)
  // const [teamdata, setteamData] = useState()
  // const [lastWorkingDate, setLastworkingDate] = useState("")
  // const [skillset, setSkillset] = useState("")
  // const [yearOfExperience, setYearOfExperience] = useState("")
  // const [monthsOfExperience, setMonthsOfExperience] = useState("")

  // const [toggleSwitch, settoggleSwitch] = useState(true)
  // const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [showBtn, setShowBtn] = useState(false)

  const storedFormValues = localStorage.getItem("authUser")
  const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}

  const history = useHistory()
  useEffect(() => {
    props.setBreadcrumbItems("Employee Details", breadcrumbItems)
    if (
      authUser.rolesList[0] === "HR_SUPPORT" ||
      authUser.rolesList[0] === "SUPER_ADMIN"
    ) {
      setShowBtn(true)
    }
  }, [])

  const assignTeamMemberFields = employeeDTO => {
    const totalexpwhenjoinedMonths = employeeDTO.experienceWhenJoined
    const years = Math.floor(totalexpwhenjoinedMonths / 12)
    const months = totalexpwhenjoinedMonths % 12

    const joiningDate = new Date(employeeDTO.joiningDate)
    const currentDate = new Date()
    let totalexperienceyears = 0
    let totalexperiencemonths = 0
    if (!isNaN(joiningDate.getTime())) {
      const monthsDifference =
        (currentDate.getFullYear() - joiningDate.getFullYear()) * 12 +
        (currentDate.getMonth() - joiningDate.getMonth())

      const totalExperienceInMonths = years * 12 + months
      const totalexperience = totalExperienceInMonths + monthsDifference

      console.log(totalexperience)

      totalexperienceyears = parseInt(totalexperience / 12)
      totalexperiencemonths = totalexperience % 12
    }

    setTeamMemberDetailsData({
      ...teamMemberDetailsData,
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
      totalExperience: employeeDTO.totalExperience,
      totalexperienceyears: totalexperienceyears,
      totalexperiencemonths: totalexperiencemonths,
      bandGrade: employeeDTO.bandGrade,
      costCenterName: employeeDTO.costCenterName,
      departmentName: employeeDTO.departmentName,
      underAM: employeeDTO.underAM,
      tmunderAM: employeeDTO.tmunderAM,
      previousAppraisalDate: employeeDTO.previousAppraisalDate,
      appraisalDueDate: employeeDTO.appraisalDueDate,
      hasHRApproved: employeeDTO.hasHRApproved,
      areBillable: employeeDTO.areBillable,
      areAM: employeeDTO.areAM,
      kpimatric: employeeDTO.kpiMatric ? JSON.parse(employeeDTO.kpiMatric) : [],
    })
  }
  const handleEdit = () => {
    if (
      authUser.rolesList[0] === "HR_SUPPORT" ||
      authUser.rolesList[0] === "SUPER_ADMIN"
    ) {
      Swal.fire({
        title: "Are you sure?",
        text: "you want to edit this Form?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, edit it!",
        cancelButtonText: "Cancel",
      }).then(result => {
        if (result.isConfirmed) {
          history.push({
            pathname: "/Edit-Employee-Details",
            state: {
              employeeDTO: teamMemberDetailsData,
              employeeId: state.employeeId,
              employeeIdAM: state.employeeIdAM,
            },
          })
        }
      })
    }
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authUser"))?.accessToken

    if (token) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }

      axios.defaults.headers.common = { Authorization: `Bearer ${token}` }

      axios
        .get(
          `${IPAddress}tracking/hrSupport/getEmployeeProfileDetails/${state?.employeeId}`,
          { headers: headers }
        )
        .then(response => {
          assignTeamMemberFields(response.data.employeeDTO)
          console.log("test1", JSON.stringify(response.data))

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
    }
  }, [])

  // useEffect(() => {
  //   setIsAccountManagerChecked(teamMemberDetailsData.areAM)
  //   setIsBillable(teamMemberDetailsData.areBillable)
  //   setAppbyhr(teamMemberDetailsData.hasHRApproved)
  // })
  return (
    <React.Fragment>
      <MetaTags>
        <title>Employee Details</title>
      </MetaTags>

      <Row>
        <Col>
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
                    disabled={true}
                    name="employeeId"
                    value={teamMemberDetailsData.employeeId}
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
                    defaultValue=""
                    disabled={true}
                    name="firstName"
                    value={teamMemberDetailsData.firstName}
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
                    name="middleName"
                    disabled={true}
                    value={teamMemberDetailsData.middleName}
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
                    defaultValue=""
                    disabled={true}
                    name="lastName"
                    value={teamMemberDetailsData.lastName}
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-md-5">
                  <input
                    className="form-control"
                    type="email"
                    defaultValue=""
                    disabled={true}
                    name="emailId"
                    value={teamMemberDetailsData.emailId}
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
                    defaultValue=""
                    disabled={true}
                    name="contactNo"
                    value={teamMemberDetailsData.contactNo}
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
                    id="example-date-input"
                    disabled={true}
                    placeholder="dd-MON-yyyy"
                    name="birthDate"
                    value={teamMemberDetailsData.birthDate}
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
                    defaultValue=""
                    disabled={true}
                    name="designation"
                    value={teamMemberDetailsData.designation}
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

                <div className="col-md-2 d-flex  align-items-center">
                  <input
                    className="form-control"
                    style={{ marginRight: "2%" }}
                    type="search"
                    defaultValue="Years"
                    disabled={true}
                    name="experienceWhenJoined"
                    value={teamMemberDetailsData.experienceWhenJoinedYears}
                  />
                  <span>Years</span>
                </div>

                <div className="col-md-2 d-flex align-items-center">
                  <input
                    className="form-control"
                    type="text"
                    style={{ marginRight: "2%" }}
                    defaultValue="Months"
                    disabled={true}
                    name="experienceWhenJoined"
                    value={teamMemberDetailsData.experienceWhenJoinedMonths}
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
                    {teamMemberDetailsData.expbyskills &&
                    teamMemberDetailsData.expbyskills.length > 0 ? (
                      teamMemberDetailsData.expbyskills.map(
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
                                      ...teamMemberDetailsData.expbyskills,
                                    ]
                                    updatedExperiences[index].skillset =
                                      e.target.value
                                    setTeamMemberDetailsData({
                                      ...teamMemberDetailsData,
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
                                      ...teamMemberDetailsData.expbyskills,
                                    ]
                                    updatedExperiences[index].yearOfExperience =
                                      e.target.value
                                    setTeamMemberDetailsData({
                                      ...teamMemberDetailsData,
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
                                      ...teamMemberDetailsData.expbyskills,
                                    ]
                                    updatedExperiences[
                                      index
                                    ].monthsOfExperience = e.target.value
                                    setTeamMemberDetailsData({
                                      ...teamMemberDetailsData,
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
                    id="example-date-input"
                    disabled={true}
                    name="joiningDate"
                    value={teamMemberDetailsData.joiningDate || ""}
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
                    style={{ marginRight: "2%" }}
                    type="search"
                    defaultValue="Years"
                    disabled={true}
                    name="totalExperience"
                    value={teamMemberDetailsData.totalexperienceyears}
                  />
                  <span>Years</span>
                </div>

                <div className="col-md-2 d-flex align-items-center">
                  <input
                    className="form-control mr-1"
                    type="search"
                    style={{ marginRight: "2%" }}
                    defaultValue="Months"
                    disabled={true}
                    name="totalExperience"
                    value={teamMemberDetailsData.totalexperiencemonths}
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
                    defaultValue=""
                    disabled={true}
                    name="bandGrade"
                    value={teamMemberDetailsData.bandGrade}
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
                    type="email"
                    defaultValue=""
                    name="costCenterName"
                    disabled={true}
                    value={teamMemberDetailsData.costCenterName}
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
                    defaultValue=""
                    name="departmentName"
                    disabled={true}
                    value={teamMemberDetailsData.departmentName}
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
                    defaultValue=""
                    disabled={true}
                    name="underAM"
                    value={teamMemberDetailsData.underAM}
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
                    value={teamMemberDetailsData.previousAppraisalDate}
                    name="previousAppraisalDate"
                    disabled={true}
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
                    value={teamMemberDetailsData.appraisalDueDate}
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
                    name="isAppbyhr"
                    disabled={true}
                    checked={teamMemberDetailsData.hasHRApproved === "true"}
                    onChange={e => {
                      setTeamMemberDetailsData({
                        ...teamMemberDetailsData,
                        hasHRApproved: e.target.checked,
                      })
                    }}
                  />

                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {teamMemberDetailsData.hasHRApproved === "true"
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
                    checked={teamMemberDetailsData.areBillable === "true"}
                    onChange={e => {
                      setTeamMemberDetailsData({
                        ...teamMemberDetailsData,
                        areBillable: e.target.checked,
                      })
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {teamMemberDetailsData.areBillable === "true"
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
                    name="areBillable"
                    disabled={true}
                    checked={teamMemberDetailsData.areAM === "true"}
                    onChange={e => {
                      setTeamMemberDetailsData({
                        ...teamMemberDetailsData,
                        areAM: e.target.checked,
                      })
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {teamMemberDetailsData.areAM === "true" ? "True " : "False"}
                  </label>
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Last Working Date
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
                    value={teamMemberDetailsData.lastWorkingDate}
                    name="lastWorkingDate"
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
                      disabled={true}
                      value={teamMemberDetailsData.nameRM}
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-email-input"
                    className="col-md-2 col-form-label"
                  >
                    Reporting Manager Email ID
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="email"
                      defaultValue=""
                      disabled={true}
                      name="emailRM"
                      value={teamMemberDetailsData.emailRM}
                    />

                    {/* <button
                    className="btn btn-info w-md-5 "
                    style={{
                      float: "right",
                      marginRight: "65%",
                      marginTop: "7%",
                    }}
                  >
                    {" "}
                    Triggred Email
                  </button> */}
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
                      type="email"
                      defaultValue=""
                      disabled={true}
                      name="contactRM"
                      value={teamMemberDetailsData.contactRM}
                    />
                  </div>
                </Row>
              </div>

              <div></div>
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
                  <div className="flex-row-1">
                    {teamMemberDetailsData.kpimatric &&
                    teamMemberDetailsData.kpimatric.length > 0 ? (
                      teamMemberDetailsData.kpimatric.map((matric, index) => (
                        <div key={index} className="mb-3">
                          <div className="row align-items-center">
                            <div className="col-md-4 d-flex justify-content between align-items-center">
                              <input
                                className="form-control"
                                type="search"
                                style={{ marginLeft: "2%" }}
                                defaultValue="kpiParameter"
                                disabled={true}
                                name="KpiMatric"
                                value={matric.kpiParameter || ""}
                                onChange={e => {
                                  const updatedExperiences = [
                                    ...teamMemberDetailsData.kpimatric,
                                  ]
                                  updatedExperiences[index].kpiParameter =
                                    e.target.value
                                  setTeamMemberDetailsData({
                                    ...teamMemberDetailsData,
                                    kpimatric: updatedExperiences,
                                  })
                                }}
                              />
                              <span>KPI Parameter</span>
                            </div>
                            <div className="col-md-3 d-flex justify-content-between align-items-center">
                              <input
                                className="form-control"
                                type="search"
                                defaultValue="kpipercentage"
                                disabled={true}
                                name="KpiMatric"
                                value={matric.kpipercentage || ""}
                                onChange={e => {
                                  const updatedExperiences = [
                                    ...teamMemberDetailsData.kpimatric,
                                  ]
                                  updatedExperiences[index].kpipercentage =
                                    e.target.value
                                  setTeamMemberDetailsData({
                                    ...teamMemberDetailsData,
                                    kpimatric: updatedExperiences,
                                  })
                                }}
                              />
                              <span>KPI Percentage</span>
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

              {showBtn && (
                <button
                  type="button"
                  className="btn btn-info w-md"
                  style={{ float: "right", marginRight: "10px" }}
                  onClick={handleEdit}
                  disabled={teamMemberDetailsData.hasHRApproved === "true"}
                >
                  Edit
                </button>
              )}

              {showAlert == true && (
                <SweetAlert
                  title="Unauthorized"
                  warning
                  showCancel
                  confirmBtnBsStyle="success"
                  cancelBtnBsStyle="danger"
                  onConfirm={() => {}}
                  onCancel={() => {
                    window.location.reload()
                  }}
                >
                  You are not authorized to edit.
                </SweetAlert>
              )}

              <div></div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}
export default connect(null, { setBreadcrumbItems })(TeamMembersDetails)
