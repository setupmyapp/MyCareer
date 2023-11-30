import React, { useEffect, useState, useRef } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
import MetaTags from "react-meta-tags"
import { SketchPicker } from "react-color"
import ColorPicker from "@vtaits/react-color-picker"
import "@vtaits/react-color-picker/dist/index.css"
import "react-datepicker/dist/react-datepicker.css"

import DatePicker from "react-flatpickr"
import makeAnimated from "react-select/animated"
import axios from "axios"
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

import SweetAlert from "react-bootstrap-sweetalert"
import { AvForm, AvField, AvGroup } from "availity-reactstrap-validation"
import {
  Card,
  CardBody,
  Col,
  Row,
  InputGroup,
  CardTitle,
  FormGroup,
  Form,
} from "reactstrap"

import { connect } from "react-redux"
import { IPAddress } from "util/APIUtil"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import profile from "../Profile/photo.png"
import Swal from "sweetalert2"
import { sign } from "jsonwebtoken"
import { type } from "@testing-library/user-event/dist/type"

const MyProfileEdit = props => {
  const storedFormValues = localStorage.getItem("authUser")
  const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}
  const employeeName = authUser.employeeName
  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: employeeName, link: "#" },
    { title: "Profile", link: "#" },
  ]
  // const employeeId = props.location.state.data
  // console.log(employeeId)

  const myProfileData = props.location.state.myProfileData
  console.log(myProfileData)
  const employeeId = myProfileData ? myProfileData.employeeId : ""

  useEffect(() => {
    getAllBands(), getAllDepartments(), getAllCostCenters()
  }, [])

  const [selectedImage, setSelectedImage] = useState(null)

  const [file, setFile] = useState(null)

  const fileInputRef = useRef(null)
  console.log(props.location.state.myProfileData.employeeId)

  const [empid, setEmpid] = useState(
    myProfileData ? myProfileData.employeeId : ""
  )
  const [fname, setFname] = useState(
    myProfileData ? myProfileData.firstName : ""
  )

  const [mname, setMname] = useState(
    myProfileData ? myProfileData.middleName : ""
  )
  const [lname, setLname] = useState(
    myProfileData ? myProfileData.lastName : ""
  )
  const [email, setEmail] = useState(myProfileData ? myProfileData.emailId : "")
  const [contactno, setContactno] = useState(
    myProfileData ? myProfileData.contactNo : ""
  )
  const [dob, setDob] = useState(myProfileData ? myProfileData.birthDate : "")
  const [designation, setDesignation] = useState(
    myProfileData ? myProfileData.designation : ""
  )

  const [expyear, setExpyear] = useState("")
  const [expmonth, setExpmonth] = useState("")
  const [joiningdate, setJoiningDate] = useState(
    myProfileData ? myProfileData.joiningDate : ""
  )
  const [bandName, setBandName] = useState(
    myProfileData ? myProfileData.bandGrade : ""
  )

  const [department, setDepartment] = useState(null)
  const [accmanship, setAccmanship] = useState("")
  const [prevappdate, setPrevappdate] = useState(
    myProfileData ? myProfileData.previousAppraisalDate : ""
  )
  const [appraisaldate, setAppraisaldate] = useState(
    myProfileData ? myProfileData.appraisalDueDate : ""
  )
  const [appbyhr, setAppbyhr] = useState(
    myProfileData ? myProfileData.hasHRApproved : false
  )
  const [billable, setBillable] = useState(
    myProfileData ? myProfileData.areBillable : false
  )
  const [areAM, setAreAM] = useState(
    myProfileData ? myProfileData.areAM : false
  )
  const [nameRM, setNameRm] = useState(
    myProfileData ? myProfileData.nameRM : ""
  )

  const [nameRMvalid, setnameRMvalid] = useState(true)
  const [emailRM, setEmailRM] = useState(
    myProfileData ? myProfileData.emailRM : ""
  )

  const [emailRMIsValid, setemailRMIsValid] = useState(true)
  const [contactRM, setcontactRM] = useState("")
  const [contactRMIsValid, setcontactRMIsValid] = useState(true)
  const [lastWorkingDate, setLastworkingDate] = useState("")
  const [totalexperience, setTotalExperience] = useState(0)
  const [costcenter, setCostcenter] = useState("")

  const [dataBands, setDataBands] = useState([])
  const [dataDept, setDataDept] = useState([])
  const [dataCostCenter, setDataCostCenter] = useState([])
  const [costCenterName, setCostcenterName] = useState(
    myProfileData ? myProfileData.costCenterName : ""
  )
  const [totalExperienceInYearAndMonth, setTotalExperienceInYearAndMonth] =
    useState(0)
  const [costCenterComment, setcostCenterComment] = useState(
    myProfileData ? myProfileData.costCenterComment : ""
  )
  const [experienceWhenJoined, setExperiencewhenJoined] = useState("")
  const [expwhenjonyear, setExpwhenjonyear] = useState(
    myProfileData ? myProfileData.experienceWhenJoinedYears : ""
  )
  const [expwhenjonmonth, setExpwhenjonmonth] = useState(
    myProfileData ? myProfileData.experienceWhenJoinedMonths : ""
  )
  const [profileelementalerterror, setProfileElementAlertError] =
    useState(false)

  const validate = {
    empid: {
      errorMessage: "",
    },
    email: {
      errorMessage: "",
    },
    fname: {
      errorMessage: "",
    },
    mname: {
      errorMessage: "",
    },
    lname: {
      errorMessage: "",
    },
    contactno: {
      errorMessage: "",
    },
  }

  useEffect(() => {
    asssignTotalExperience(expwhenjonyear, expwhenjonmonth, joiningdate)
  }, [expwhenjonyear, expwhenjonmonth, joiningdate])

  const handleChange = e => {
    if (e.target && e.target.name) {
      const { name, value } = e.target
      switch (name) {
        case "empid":
          setEmpid(value)
          break
        case "fname":
          setFname(value)
          break
        case "lname":
          setLname(value)
          break
        case "mname":
          setMname(value)
          break
        case "email":
          setEmail(value)
          break
        case "contactno":
          setContactno(value)
          break
        case "dob":
          setDob(value)
          break
        case "designation":
          setDesignation(value)
          break
        case "technology":
          setTechnology(value)
          break
        case "techyear":
          setTechyear(value)
          break
        case "skillset":
          setSkillset(value)
          break
        case "techmonth":
          setTechmonth(value)
          break
        case "yearOfExperience":
          setYearOfExperience(value)
          break
        case "monthsOfExperience":
          setMonthsOfExperience(value)
          break
        case "expyear":
          setExpyear(value)
          break
        case "expmonth":
          setExpmonth(value)
          break
        case "totalExperience":
          setTotalExperience(value)
          break
        case "expwhenjonyear":
          setExpwhenjonyear(value)
          break
        case "expwhenjonmonth":
          setExpwhenjonmonth(value)
          break
        case "experienceWhenJoined":
          setExperiencewhenJoined(value)
          break
        case "joiningdate":
          setJoiningDate(value)
          break
        case "accmanship":
          setAccmanship(value)
          break
        case "prevappdate":
          setPrevappdate(value)
        case "appraisaldate":
          setAppraisaldate(value)
          break
        case "appbyhr":
          setAppbyhr(e.target.checked)
          break
        case "billable":
          setBillable(e.target.checked)
          break
        case "areAM":
          setAreAM(e.target.checked)
          break

        case "nameRM":
          setNameRm(value)
          setnameRMvalid(/^[A-Za-z\s]+$/.test(value))
          break
        case "emailRM":
          setEmailRM(value)
          setemailRMIsValid(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)
          )
          break
        case "contactRM":
          setcontactRM(value)
          setcontactRMIsValid(/^\d{10}$/.test(value))
          break
        case "costCenterComment":
          setcostCenterComment(value)
          break
        default:
          break
      }
    }
  }
  const disabledbandOption = "Option 2"

  const handledobdate = selectedDate => {
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

    const formattedDate = `${day}-${monthName}-${year}`
    console.log(formattedDate)
    setDob(formattedDate)
  }

  const [skillData, setSkillData] = useState([
    {
      skillset: "",
      yearOfExperience: "",
      monthsOfExperience: "",
    },
  ])

  // useEffect(() => {
  //   const experienceBySkills = JSON.parse(
  //     myProfileData?.myProfileData.experienceBySkills || "[]"
  //   )
  //   console.log("experienceBySkills:", experienceBySkills)
  //   setSkillData(experienceBySkills)
  // }, [])

  const asssignTotalExperience = (
    expwhenjonyear,
    expwhenjonmonth,
    joiningdate
  ) => {
    if ((expwhenjonyear || expwhenjonmonth) && joiningdate) {
      const currentDate = new Date()
      const joiningDate = new Date(joiningdate)

      if (!isNaN(joiningDate.getTime())) {
        const monthsDifference =
          (currentDate.getFullYear() - joiningDate.getFullYear()) * 12 +
          (currentDate.getMonth() - joiningDate.getMonth())

        const totalyears = parseInt(expwhenjonyear) || 0
        const totalMonths = parseInt(expwhenjonmonth) || 0

        const totalExperienceInMonths = totalyears * 12 + totalMonths

        const Totalexperienceinyearandmonth =
          totalExperienceInMonths + monthsDifference

        setExpyear(Math.floor(Totalexperienceinyearandmonth / 12))
        setExpmonth(Totalexperienceinyearandmonth % 12)
        setTotalExperience(totalExperienceInMonths)
        setTotalExperienceInYearAndMonth(Totalexperienceinyearandmonth)
        console.log(Totalexperienceinyearandmonth)
        console.log(monthsDifference)
        console.log(totalyears)
        console.log(totalMonths)
      } else {
        console.log("invalid joing date")
      }
    }
  }

  const handleExpwhenjoinedChange = e => {
    const { name, value } = e.target
    if (name === "expwhenjonyear") {
      setExpwhenjonyear(value)
    } else if (name === "expwhenjonmonth") {
      setExpwhenjonmonth(value)
    }
  }
  const handlejondate = selectedDate => {
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

    const formattedDate = `${day}-${monthName}-${year}`
    console.log(formattedDate)
    setJoiningDate(formattedDate)
  }

  const handlepadate = selectedDate => {
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

    const formattedDate = `${day}-${monthName}-${year}`
    console.log(formattedDate)
    setPrevappdate(formattedDate)

    if (selectedDate) {
      const previousAppraisalDay = selectedDate.getDate()

      if (previousAppraisalDay >= 16) {
        selectedDate.setMonth(selectedDate.getMonth() + 1)
      }

      selectedDate.setDate(1)

      const year = selectedDate.getFullYear()
      const month = selectedDate.getMonth()
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
      const monthName = monthNames[month]
      const day = 1

      const AppraisalformattedDate = `${day}-${monthName}-${year}`
      setAppraisaldate(AppraisalformattedDate)
    } else {
      setAppraisaldate(null)
    }
  }
  const handlelastworkingDate = selectedDate => {
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

    const formattedDate = `${day}-${monthName}-${year}`
    console.log(formattedDate)
    setLastworkingDate(formattedDate)
  }

  // }
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
      })
      .catch(error => {
        console.error(error)
      })
  }

  const getAllDepartments = () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("authUser")).accessToken
      }`,
    }

    axios
      .get(`${IPAddress}tracking/common/getAllDepartments`)
      .then(response => {
        setDataDept(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const getAllCostCenters = () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("authUser")).accessToken
      }`,
    }
    axios
      .get(`${IPAddress}tracking/common/getAllCostCenters`)
      .then(response => {
        setDataCostCenter(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleFileSelect = event => {
    const file = event.target.files[0]
    setSelectedImage(URL.createObjectURL(file))
    setFile(file)
  }

  const isCostCenterSelected = costcenter !== ""

  const handleEdit = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = () => {
    const formData = new FormData()
    if (file) {
      formData.append("file", file)

      const fileUploadRequestObj = {
        fileName: file.name,
        type: "application/png",
      }

      formData.append("fileUploadRequest", JSON.stringify(fileUploadRequestObj))

      axios
        .post(`${IPAddress}rest/noAuth/sample/fileUpload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(response => {
          console.log("Uploaded the file successfully", response.data)
          setSelectedImage(null)
          setFile(null)
          setIsLoading(false)
        })
        .catch(error => {
          console.error("Error uploading image:", error)
          setIsLoading(false)
        })
    }

    if (expwhenjonyear !== "" && expwhenjonmonth != "") {
      setExperiencewhenJoined(
        Number(expwhenjonyear * 12) + Number(expwhenjonmonth)
      )
    } else if (expwhenjonyear != "" && expwhenjonmonth == "") {
      setExperiencewhenJoined(Number(expwhenjonyear * 12))
    } else if (expwhenjonyear == "" && expwhenjonmonth == "") {
      setExperiencewhenJoined(0)
    } else if (expwhenjonyear == "" && expwhenjonmonth != "") {
      setExperiencewhenJoined(Number(expwhenjonmonth))
    }

    const editMyProfileDetails = {
      employeeId: empid || "",
      firstName: fname || "",
      middleName: mname || "",
      lastName: lname || "",
      emailId: email || "",
      contactNo: contactno || "",
      birthDate: dob || "",
      designation: designation || "",
      totalExperience: totalexperience || "",
      experienceBySkills: JSON.stringify(skillData) || "",
      experienceWhenJoined: experienceWhenJoined || "",
      joiningDate: joiningdate || "",
      previousAppraisalDate: prevappdate || "",
      appraisalDueDate: appraisaldate || "",
      bandGrade: bandName || "",
      costCenterName: "",
      costCenterComment: "",
      departmentName: department || "",
      nameRM: nameRM || "",
      emailRM: emailRM || "",
      contactRM: contactRM || "",
      emailAM: "",
      passwrdAM: "",
      underAM: "",
      tMUnderAM: "",
      hasHRApproved: appbyhr,
      areBillable: billable,
      areAM: areAM,
    }

    if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(
        editMyProfileDetails.emailRM
      )
    ) {
      setemailRMIsValid(false)
    }

    if (!/^[A-Za-z\s]+$/.test(editMyProfileDetails.nameRM)) {
      setnameRMvalid(false)
    }

    if (!/^\d{10}$/.test(editMyProfileDetails.contactRM)) {
      setcontactRMIsValid(false)
    }

    if (
      /^[A-Za-z0-9]+$/.test(editMyProfileDetails.employeeId) &&
      /^[A-Za-z\s]+$/.test(editMyProfileDetails.firstName) &&
      /^[A-Za-z\s]+$/.test(editMyProfileDetails.lastName) &&
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(
        editMyProfileDetails.emailId
      ) &&
      /^\d{10}$/.test(editMyProfileDetails.contactNo)
    ) {
      const token = JSON.parse(localStorage.getItem("authUser")).accessToken

      console.log("test1", editMyProfileDetails)
      const formDataMyProfile = new FormData()
      formDataMyProfile.append(
        "editMyProfileDetailsRequest",
        JSON.stringify(editMyProfileDetails)
      )
      formDataMyProfile.append("employeeDPFile", file || "")

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      axios
        .put(
          `${IPAddress}tracking/employee/editMyProfileDetails`,
          formDataMyProfile,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )

        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      setProfileElementAlertError(true)
      setTimeout(() => {
        setProfileElementAlertError(false)
      }, 4000)
    }

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Profile successfully edited.",
      confirmButtonText: "OK",
    }).then(result => {
      if (result.isConfirmed) {
        props.history.push("/My-Profile")
      }
    })
  }
  const handlebandGroup = selectedOption => {
    setBandGrade(selectedOption)
  }
  const handledepartmentGroup = selectedOption => {
    setDepartmentName(selectedOption)
  }
  const handlecostcenterGroup = selectedOption => {
    // console.log(selectedOption.value)
    setCostcenterName(selectedOption)
  }

  const handleAddField = () => {
    const lastEntry = skillData[skillData.length - 1]
    if (lastEntry.skillset === "" || lastEntry.yearOfExperience === "") {
      alert("Please fill out all fields before adding a new entry.")
    } else {
      setSkillData([
        ...skillData,
        {
          skillset: "",
          yearOfExperience: "",
          monthsOfExperience: "",
        },
      ])
    }
  }
  const handleRemoveField = index => {
    const updatedskillData = [...skillData]
    updatedskillData.splice(index, 1)
    setSkillData(updatedskillData)
  }

  const handleSkillChange = (e, index, newValue) => {
    const updatedSkillData = [...skillData]
    updatedSkillData[index][e.target.name] = newValue || e.target.value
    setSkillData(updatedSkillData)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>profile</title>
      </MetaTags>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="card-title">Personal Details</h4>
              <AvForm>
                <Row className="mb-3">
                  <Col md={2}>
                    <label
                      htmlFor="example-text-input"
                      className="col-form-label"
                    >
                      Employee ID<span className="text-danger">*</span>
                    </label>
                  </Col>
                  <Col md={5}>
                    <AvField
                      className="form-control"
                      type="text"
                      name="empid"
                      defaultValue=""
                      value={employeeId}
                      readonly
                      disabled={true}
                      onChange={handleChange}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Employee ID is required",
                        },
                        pattern: {
                          value: /^[A-Za-z0-9]+$/,
                          errorMessage: "Invalid Employee ID",
                        },
                      }}
                      placeholder="Enter Employee Id"
                      errorMessage="Invalid EmployeeId"
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={2}>
                    <label
                      htmlFor="example-text-input"
                      className="col-form-label"
                    >
                      First Name<span className="text-danger">*</span>
                    </label>
                  </Col>
                  <Col md={5}>
                    <AvField
                      className="form-control"
                      type="text"
                      name="fname"
                      value={fname}
                      onChange={handleChange}
                      placeholder="Enter First Name"
                      required
                      disabled={true}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "First Name is required",
                        },
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          errorMessage: "Invalid First Name",
                        },
                      }}
                      defaultValue=""
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={2}>
                    <label
                      htmlFor="example-text-input"
                      Name
                      className="col-form-label"
                    >
                      Middle Name
                    </label>
                  </Col>
                  <Col md={5}>
                    <AvField
                      className="form-control"
                      type="text"
                      name="mname"
                      value={mname}
                      onChange={handleChange}
                      placeholder="Enter Middle Name"
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={2}>
                    <label
                      htmlFor="example-text-input"
                      className="col-form-label"
                    >
                      Last Name<span className="text-danger">*</span>
                    </label>
                  </Col>
                  <Col md={5}>
                    <AvField
                      className="form-control"
                      type="text"
                      name="lname"
                      value={lname}
                      onChange={handleChange}
                      disabled={true}
                      placeholder="Enter Last Name"
                      required
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Last Name is required",
                        },
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          errorMessage: "Invalid Last Name",
                        },
                      }}
                      defaultValue=""
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={2}>
                    <label
                      htmlFor="example-email-input"
                      className="col-form-label"
                    >
                      Email<span className="text-danger">*</span>
                    </label>
                  </Col>
                  <Col md={5}>
                    <AvField
                      className="form-control"
                      type="email"
                      disabled={true}
                      name="email"
                      defaultValue=""
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      required
                      value={email}
                      onChange={handleChange}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Email is required",
                        },
                        email: { value: true },
                      }}
                      placeholder="Enter Valid Email"
                      errorMessage="Invalid Email"
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={2}>
                    <label
                      htmlFor="example-tel-input"
                      className="col-form-label"
                    >
                      Contact Number<span className="text-danger">*</span>
                    </label>
                  </Col>
                  <Col md={5}>
                    <AvField
                      type="number"
                      name="contactno"
                      value={contactno}
                      disabled={true}
                      onChange={handleChange}
                      errorMessage="Enter Only Digits"
                      placeholder="Enter Only Digits"
                      validate={{
                        required: { value: true },
                        pattern: {
                          value: "^[0-9]+$",
                          errorMessage: "Only Digits",
                        },
                      }}
                    />
                  </Col>
                </Row>
              </AvForm>

              <Row>
                <div className="col-md-12">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Profile Photo"
                      className="img-thumbnail"
                      style={{
                        width: "200px",
                        marginTop: "-43%",
                        marginLeft: "80%",
                      }}
                    />
                  ) : (
                    <img
                      src={profile}
                      alt="Profile Photo"
                      className="img-thumbnail"
                      style={{
                        width: "200px",
                        marginTop: "-43%",
                        marginLeft: "80%",
                      }}
                    />
                  )}
                </div>

                <Row>
                  <label htmlFor="fileInput">
                    <button
                      type="button"
                      className="btn btn-info"
                      style={{
                        position: "absolute",

                        top: "-120px",
                        left: "87%",
                        width: "80px",
                        height: "38px",
                        fontSize: "13px",
                      }}
                      onClick={handleEdit}
                    >
                      Upload
                      <input
                        id="fileInput"
                        accept=".jpg,.png"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        style={{ display: "none", position: "absolute" }}
                      />
                    </button>
                  </label>
                </Row>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Date of Birth
                </label>
                <div className="col-md-10">
                  <InputGroup>
                    <DatePicker
                      className="form-control d-block"
                      options={{
                        dateFormat: "d-M-Y",
                      }}
                      placeholder="dd-MON-yyyy"
                      value={dob}
                      onChange={date => handledobdate(date[0])}
                    />
                  </InputGroup>
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Designation
                </label>

                <div className="col-md-5">
                  <input
                    className="form-control"
                    type="search"
                    onChange={handleChange}
                    value={designation}
                    name="designation"
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
                <div className="col-md-2">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Years"
                    onChange={handleExpwhenjoinedChange}
                    name="expwhenjonyear"
                    value={expwhenjonyear}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Months"
                    onChange={handleExpwhenjoinedChange}
                    name="expwhenjonmonth"
                    value={expwhenjonmonth}
                  />
                </div>
              </Row>
              <div>
                <div className="row mb-3">
                  <label className="col-md-2 col-form-label">
                    {" "}
                    Experience By Skills
                  </label>
                  <div className="col-md-10">
                    {skillData.map((data, index) => (
                      <div key={index} className="row mb-2">
                        <div className="col-md-2">
                          <input
                            id={`skillset-${index}`}
                            className="form-control"
                            type="text"
                            placeholder="technology"
                            name="skillset"
                            value={data.skillset || ""}
                            onChange={e => handleSkillChange(e, index)}
                          />
                        </div>
                        <div className="col-md-2">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Years"
                            name="yearOfExperience"
                            value={data.yearOfExperience || ""}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "") // Add the 'g' flag to replace all occurrences.
                              const onlyLetters = value.replace(
                                /[^a-zA-Z]/g,
                                ""
                              )
                              if (onlyLetters.length > 0) {
                                console.log("Please enter only numbers.")
                                return
                              }
                              if (onlyNumbers > 100) {
                                alert("Year cannot be greater than 100")
                                return
                              }
                              handleSkillChange(e, index, onlyNumbers)
                            }}
                          />
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Months"
                            name="monthsOfExperience"
                            value={data.monthsOfExperience}
                            onChange={e => handleSkillChange(e, index)}
                          />
                          {index === skillData.length - 1 && (
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
                          {skillData.length > 1 && (
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
                    ))}
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
                  <InputGroup>
                    <DatePicker
                      className="form-control d-block"
                      options={{
                        dateFormat: "d-M-Y",
                      }}
                      value={joiningdate}
                      placeholder="dd-MON-yyyy"
                      onChange={date => handlejondate(date[0])}
                    />
                  </InputGroup>
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Total Experience
                </label>

                <div className="col-md-2">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Years"
                    name="expyear"
                    value={expyear}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Months"
                    onChange={handleChange}
                    name="expmonth"
                    value={expmonth}
                  />
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
                  <InputGroup>
                    <DatePicker
                      className="form-control d-block"
                      options={{
                        dateFormat: "d-M-Y",
                      }}
                      value={prevappdate}
                      placeholder="dd-MON-yyyy"
                      onChange={date => handlepadate(date[0])}
                    />
                  </InputGroup>
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
                  <InputGroup>
                    <DatePicker
                      className="form-control d-block"
                      options={{
                        dateFormat: "d-M-Y",
                      }}
                      value={appraisaldate}
                      placeholder="dd-MON-yyyy"
                      // onChange={date => handleappduedate(date[0])}
                    />
                  </InputGroup>
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
                    value={accmanship}
                    name="accmanship"
                    onChange={handleChange}
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <Col className="col-2 col-sm-2 d-flex align-items-center">
                  <span className="fs-6">Approved :</span>
                </Col>
                <Col className="col-2 col-sm-6 d-flex justify-content-start align-items-center">
                  <div className="form-check form-switch form-switch-md">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customSwitchsizemd"
                      name="appbyhr"
                      checked={appbyhr === "true"}
                      disabled={true}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="customSwitchsizemd"
                    >
                      {appbyhr === "true" ? "True" : "False"}
                    </label>
                  </div>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col className="col-2 col-sm-2 d-flex align-items-center">
                  <span className="fs-6">Billable:</span>
                </Col>
                <Col className="col-2 col-sm-6 d-flex justify-content-start align-items-center">
                  <div className="form-check form-switch form-switch-md">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customSwitchsizemd"
                      name="billable"
                      checked={billable === "true"}
                      // checked="true"
                      disabled={true}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="customSwitchsizemd"
                    >
                      {billable === "true" ? "True" : "False"}
                    </label>
                  </div>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col className="col-2 col-sm-2 d-flex align-items-center">
                  <span className="fs-6"> Manager:</span>
                </Col>
                <Col className="col-2 col-sm-6 d-flex justify-content-start align-items-center">
                  <div className="form-check form-switch form-switch-md">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customSwitchsizemd"
                      name="areAM"
                      checked={areAM === "true"}
                      // checked="true"
                      disabled={true}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="customSwitchsizemd"
                    >
                      {areAM === "true" ? "True" : "False"}
                    </label>
                  </div>
                </Col>
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
                      className={`form-control ${
                        nameRMvalid ? "" : "is-invalid"
                      }`}
                      type="text"
                      id="nameRM"
                      name="nameRM"
                      value={nameRM}
                      onChange={handleChange}
                      required
                    />
                    {!nameRMvalid && (
                      <span className="invalid-feedback">
                        Please enter only letters and spaces.
                      </span>
                    )}
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
                      className={`form-control ${
                        emailRMIsValid ? "" : "is-invalid"
                      }`}
                      type="email"
                      id="emailRM"
                      name="emailRM"
                      value={emailRM}
                      onChange={handleChange}
                      required
                    />
                    {!emailRMIsValid && (
                      <span className="invalid-feedback">
                        Please enter a valid email address.
                      </span>
                    )}
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
                      className={`form-control ${
                        contactRMIsValid ? "" : "is-invalid"
                      }`}
                      type="tel"
                      id="contactRM"
                      name="contactRM"
                      value={contactRM}
                      onChange={handleChange}
                      required
                    />
                    {!contactRMIsValid && (
                      <span className="invalid-feedback">
                        Please enter a valid 10-digit phone number.
                      </span>
                    )}
                  </div>
                </Row>
              </div>

              <div className="row">
                <div className="col-md-5 d-flex flex-row justify-content-between align-items-start">
                  {profileelementalerterror && (
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
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </CardBody>
            <CardBody>
              <span className="text-danger">*</span>
              <span style={{ marginLeft: "5px" }}>
                All fields are mandatory.
              </span>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(MyProfileEdit)
