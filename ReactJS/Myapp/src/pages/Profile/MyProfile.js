import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { IPAddress } from "util/APIUtil"
// import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import DatePicker from "react-flatpickr"
import ProfileElements1 from "./MyProfileEdit"
import Swal from "sweetalert2"
import axios from "axios"
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

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import profile from "../Profile/photo.png"
const MyProfile = props => {
  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: "First Name", link: "#" },
    { title: "Profile", link: "#" },
  ]
  const history = useHistory()
  useEffect(() => {
    props.setBreadcrumbItems("Profile", breadcrumbItems)
  })

  const [MyProfileDetailsData, setMyProfileDetailsData] = useState({
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
  })

  const assignMyProfileFields = employeeDTO => {
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

    setMyProfileDetailsData({
      ...MyProfileDetailsData,
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
    })
  }

  const handleEdit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to edit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit!",
    }).then(result => {
      if (result.isConfirmed) {
        props.history.push("/Edit-MyProfile", {
          myProfileData: MyProfileDetailsData,
        })
      }
    })
  }

  const authUser = JSON.parse(localStorage.getItem("authUser"))
  const token = JSON.parse(localStorage.getItem("authUser")).accessToken

  const employeeId = authUser.employeeId
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` }

    axios
      .get(`${IPAddress}tracking/employee/getMyProfileDetails/${employeeId}`, {
        headers: headers,
      })
      .then(response => {
        assignMyProfileFields(response.data.employeeDTO)

        console.log("AMdetails", JSON.stringify(response.data))
        // const experienceBySkills = JSON.parse(
        //   response.data.employeeDTO.experienceBySkills || "[]"
        // )

        // setExpbyskills(experienceBySkills)

        // console.log("exp", experienceBySkills)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])
  // useEffect(() => {
  //   if (data && data.employeeDTO) {
  //     setIsAccountManagerChecked(data.employeeDTO.areAM)
  //     setIsBillable(data.employeeDTO.areBillable)
  //     setAppbyhr(data.employeeDTO.hasHRApproved)
  //   }
  // })

  return (
    <React.Fragment>
      <MetaTags>
        <title>profile</title>
      </MetaTags>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row className="mb-3">
                <h4 className="card-title">Personal Details</h4>

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
                    defaultValue=""
                    name="employeeId"
                    value={MyProfileDetailsData.employeeId}
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
                    value={MyProfileDetailsData.firstName}
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
                    defaultValue=""
                    name="middleName"
                    disabled={true}
                    value={MyProfileDetailsData.middleName}
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
                    value={MyProfileDetailsData.lastName}
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
                    disabled={true}
                    name="emailId"
                    value={MyProfileDetailsData.emailId}
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
                    value={MyProfileDetailsData.contactNo}
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
                    placeholder="dd-MON-yyyy"
                    disabled={true}
                    value={MyProfileDetailsData.birthDate}
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
                    type="text"
                    defaultValue=""
                    disabled={true}
                    value={MyProfileDetailsData.designation}
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
                    className="form-control"
                    type="text"
                    style={{ marginRight: "2%" }}
                    defaultValue="Years"
                    disabled={true}
                    name="experienceWhenJoined"
                    value={MyProfileDetailsData.experienceWhenJoinedYears}
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
                    value={MyProfileDetailsData.experienceWhenJoinedMonths}
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
                    {MyProfileDetailsData.expbyskills &&
                    MyProfileDetailsData.expbyskills.length > 0 ? (
                      MyProfileDetailsData.expbyskills.map(
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
                    id="example-date-input"
                    placeholder="dd-MON-yyyy"
                    disabled={true}
                    value={MyProfileDetailsData.joiningDate}
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
                    style={{ marginRight: "2%" }}
                    defaultValue="Years"
                    disabled={true}
                    name="totalExperience"
                    value={MyProfileDetailsData.totalexperienceyears}
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
                    value={MyProfileDetailsData.totalexperiencemonths}
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
                    value={MyProfileDetailsData.bandGrade}
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
                    disabled={true}
                    value={MyProfileDetailsData.costCenterName}
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
                    disabled={true}
                    value={MyProfileDetailsData.departmentName}
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
                    value={MyProfileDetailsData.underAM}
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
                    value={MyProfileDetailsData.previousAppraisalDate}
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
                    placeholder="dd-MON-yyyy"
                    id="example-date-input"
                    disabled={true}
                    name="appraisalDueDate"
                    value={MyProfileDetailsData.appraisalDueDate}
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
                    checked={MyProfileDetailsData.hasHRApproved === "true"}
                    onChange={e => {
                      setMyProfileDetailsData({
                        ...MyProfileDetailsData,
                        hasHRApproved: e.target.checked,
                      })
                    }}
                  />

                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {MyProfileDetailsData.hasHRApproved === "true"
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
                    checked={MyProfileDetailsData.areBillable === "true"}
                    onChange={e => {
                      setMyProfileDetailsData({
                        ...MyProfileDetailsData,
                        areBillable: e.target.checked,
                      })
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {MyProfileDetailsData.areBillable === "true"
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
                    checked={MyProfileDetailsData.areAM === "true"}
                    onChange={e => {
                      setMyProfileDetailsData({
                        ...MyProfileDetailsData,
                        areAM: e.target.checked,
                      })
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {MyProfileDetailsData.areAM === "true" ? "True" : "False"}
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
                      defaultValue=""
                      disabled={true}
                      value={MyProfileDetailsData.nameRM}
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
                      type="text"
                      defaultValue=""
                      disabled={true}
                      value={MyProfileDetailsData.emailRM}
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
                      type="email"
                      defaultValue=""
                      disabled={true}
                      value={MyProfileDetailsData.contactRM}
                    />
                  </div>
                </Row>
              </div>

              <div>
                <button
                  type="edit"
                  className="btn btn-info w-md"
                  style={{ float: "right", marginRight: "10px" }}
                  onClick={handleEdit}
                  disabled={MyProfileDetailsData.hasHRApproved === "true"}
                >
                  Edit{" "}
                </button>
              </div>
              <div></div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(MyProfile)
