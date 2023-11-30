import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
import { SketchPicker } from "react-color"
import ColorPicker from "@vtaits/react-color-picker"
import "@vtaits/react-color-picker/dist/index.css"
import "react-datepicker/dist/react-datepicker.css"
import Switch from "react-switch"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import DatePicker from "react-flatpickr"
import { AvForm, AvField } from "availity-reactstrap-validation"
// Import Flatepicker
import axios from "axios"
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import SweetAlert from "react-bootstrap-sweetalert"

import { IPAddress } from "util/APIUtil"
import {
  Card,
  CardBody,
  Col,
  Row,
  InputGroup,
  Alert,
  UncontrolledAlert,
  CardTitle,
  FormGroup,
  Form,
} from "reactstrap"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import profile from "../Profile/photo.png"

const ProfileEdit = props => {
  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: "Employees", link: "#" },
    { title: "Add Employee", link: "#" },
  ]

  const getAllBands = () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("authUser")).accessToken
      }`,
    }

    axios
      .get(`${IPAddress}tracking/common/getAllBands`)
      .then(response => {
        console.log(response.data)
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
        console.log(response.data)
        setDataCostCenter(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getAllBands(), getAllDepartments(), getAllCostCenters()
  }, [])

  const [showAlert, setShowAlert] = useState(false)
  const [isSuccessAlert, setIsSuccessAlert] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  const [file, setFile] = useState({})
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedfile] = useState(null)

  const [empid, setEmpid] = useState("")
  const [empidIsValid, setEmpidIsValid] = useState(true)
  const [fname, setFname] = useState("")
  const [fnameIsValid, setFnameIsValid] = useState(true)
  const [lname, setLname] = useState("")
  const [lnameIsValid, setLnameIsValid] = useState(true)
  const [mname, setMname] = useState("")
  const [email, setEmail] = useState("")
  const [emailIsValid, setEmailIsValid] = useState(true)
  const [contactno, setContactno] = useState("")
  const [contactnoIsValid, setContactnoIsValid] = useState(true)
  const [dob, setDob] = useState("")
  const [designation, setDesignation] = useState("")
  const [technology, setTechnology] = useState("")
  const [techyear, setTechyear] = useState("")
  const [techmonth, setTechmonth] = useState("")
  const [skillset, setSkillset] = useState("")
  const [yearOfExperience, setYearOfExperience] = useState("")
  const [monthsOfExperience, setMonthsOfExperience] = useState("")
  const [expyear, setExpyear] = useState("")
  const [expmonth, setExpmonth] = useState("")
  const [expyear1, setExpyear1] = useState("")
  const [expmonth1, setExpmonth1] = useState("")
  const [joiningdate, setJoiningDate] = useState("")
  const [lastWorkingDate, setLastworkingDate] = useState("")
  const [bandName, setBandname] = useState("")
  const [totalExperienceInYearAndMonth, setTotalExperienceInYearAndMonth] =
    useState(0)
  const [department, setDepartment] = useState("")
  const [accmanship, setAccmanship] = useState("")
  const [prevappdate, setPrevappdate] = useState("")
  const [appraisaldate, setAppraisaldate] = useState("")
  const [appbyhr, setAppbyhr] = useState(false)
  const [billable, setBillable] = useState(false)
  const [areAM, setareAm] = useState(false)
  const [nameRM, setnameRM] = useState("")
  const [nameRMvalid, setnameRMvalid] = useState(true)
  const [emailRM, setemailRM] = useState("")
  const [emailRMIsValid, setemailRMIsValid] = useState(true)
  const [contactRM, setcontactRM] = useState("")
  const [contactRMIsValid, setcontactRMIsValid] = useState(true)
  const [company, setCompany] = useState("")
  const [totalexperience, setTotalExperience] = useState("")
  const [experienceWhenJoined, setExperiencewhenJoined] = useState("")
  const [costCenterName, setCostcenterName] = useState()
  const [costCenterComment, setcostCenterComment] = useState("")
  const [dataBands, setDataBands] = useState([])
  const [bandGrade, setBandGrade] = useState([])
  const [dataDept, setDataDept] = useState([])
  const [departmentName, setDepartmentName] = useState()
  const [dataCostCenter, setDataCostCenter] = useState([])
  const [profileeditalerterror, setProfileeditAlertError] = useState(false)
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
    asssignTotalExperience(expyear1, expmonth1, joiningdate)
  }, [expyear1, expmonth1, joiningdate])

  const handleChange = e => {
    if (e.target && e.target.name) {
      const { name, value } = e.target

      switch (name) {
        case "empid":
          setEmpid(value)
          setEmpidIsValid(/^[A-Za-z0-9]+$/.test(value))
          break
        case "fname":
          setFname(value)
          setFnameIsValid(/^[A-Za-z\s]+$/.test(value))
          break
        case "lname":
          setLname(value)
          setLnameIsValid(/^[A-Za-z\s]+$/.test(value))
          break
        case "mname":
          setMname(value)
          break
        case "email":
          setEmail(value)
          setEmailIsValid(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)
          )

          break
        case "contactno":
          setContactno(value)
          setContactnoIsValid(/^\d{10}$/.test(value))

          break
        case "dob":
          setDob(value)
          break
        case "designation":
          setDesignation(value)
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
        case "joiningdate":
          setJoiningDate(value)
          break
        case "lastWorkingDate":
          setLastworkingDate(value)
          break
        case "band":
          setBand(value)
          break
        case "department":
          setDepartment(value)
          break
        case "accmanship":
          setAccmanship(value)
          break
        case "prevappdate":
          setPrevappdate(value)
        case "appraisaldate":
          setAppraisaldate(value)
          break

        case "nameRM":
          setnameRM(value)
          setnameRMvalid(/^[A-Za-z\s]+$/.test(value))
          break
        case "emailRM":
          setemailRM(value)
          setemailRMIsValid(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)
          )
          break
        case "contactRM":
          setcontactRM(value)
          setcontactRMIsValid(/^\d{10}$/.test(value))
          break
        case "costcenterName":
          setCostcenterName(value)
          break

        case "costCenterComment":
          setcostCenterComment(value)
          break
        default:
          break
      }

      // const years = parseInt(expyear1) || 0
      // const months = parseInt(expmonth1) || 0

      // if (
      //   name === "expyear1" ||
      //   name === "expmonth1" ||
      //   name === "joiningdate"
      // ) {
      //   const joiningdate1 = new Date(joiningdate)
      //   const currentDate = new Date()
      //   const monthsDifference =
      //     (currentDate.getFullYear() - joiningdate1.getFullYear()) * 12 +
      //     (currentDate.getMonth() - joiningdate1.getMonth())

      //   console.log(monthsDifference)

      //   const totalExperienceInMonths =
      //     Number(monthsDifference) + Number(years * 12) + Number(months)

      //   const years1 = Number(Math.floor(totalExperienceInMonths / 12))
      //   const remainingMonths1 = Number(totalExperienceInMonths % 12)
      //   console.log(years1, remainingMonths1)

      //   setExpyear(years1)
      //   setExpmonth(remainingMonths1)

      // Set totalExperience immediately after calculation
      //   setTotalExperience(totalExperienceInMonths)
      // }

      // const years = parseInt(expyear) || 0
      // const months = parseInt(expmonth) || 0

      // const joiningdate = new Date()
      // const currentDate = new Date()
      // const monthsDifference =
      //   (currentDate.getFullYear() - joiningdate.getFullYear()) * 12 +
      //   (currentDate.getMonth() - joiningdate.getMonth())

      // const newTotalExperience = monthsDifference + years * 12 + months
      // console.log(newTotalExperience)

      // setTotalExperience(newTotalExperience)
    }
  }

  const handleBillableToggle = event => {
    setBillable(event.target.checked ? "true" : "false")
  }

  const handleAppByHR = event => {
    setAppbyhr(event.target.checked ? "true" : "false")
  }

  const handleManger = event => {
    setareAm(event.target.checked ? "true" : "false")
  }
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

      const appraisalDate = `${day}-${monthName}-${year}`
      setAppraisaldate(appraisalDate)
      console.log(appraisalDate)
    } else {
      setAppraisaldate(null)
    }
  }

  // const handleappduedate = selectedDate => {
  //   const day = selectedDate.getDate()
  //   const monthNames = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ]
  //   const monthName = monthNames[selectedDate.getMonth()]
  //   const year = selectedDate.getFullYear()

  //   const formattedDate = `${day}-${monthName}-${year}`
  //   console.log(formattedDate)
  //   setAppraidaldate(formattedDate)
  // }
  const handleImportEmp = () => {
    fileInputRef.current.click()
  }

  const asssignTotalExperience = (expyear1, expmonth1, joiningdate) => {
    if ((expyear1 || expmonth1) && joiningdate) {
      const currentDate = new Date()
      const joiningDate = new Date(joiningdate)

      if (!isNaN(joiningDate.getTime())) {
        const monthsDifference =
          (currentDate.getFullYear() - joiningDate.getFullYear()) * 12 +
          (currentDate.getMonth() - joiningDate.getMonth())

        const totalyears = parseInt(expyear1) || 0
        const totalMonths = parseInt(expmonth1) || 0

        const totalExperienceInMonths = totalyears * 12 + totalMonths

        const totalExperienceInYearAndMonth =
          totalExperienceInMonths + monthsDifference

        setExpyear(Math.floor(totalExperienceInYearAndMonth / 12))
        setExpmonth(totalExperienceInYearAndMonth % 12)
        setTotalExperience(totalExperienceInMonths)
        setTotalExperienceInYearAndMonth(totalExperienceInYearAndMonth)

        let Band = ""
        for (let i = dataBands.length - 1; i >= 0; i--) {
          if (dataBands[i].experience) {
            if (totalExperienceInYearAndMonth >= dataBands[i].experience) {
              Band = dataBands[i].grade
              break
            }
          }
        }

        setBandname(Band)

        console.log("Total Experience: " + totalExperienceInYearAndMonth)
        console.log("Band: " + Band)
      } else {
        console.log("Invalid joining date")
      }
    }
  }

  const handleExpwhenjoinedChange = e => {
    const { name, value } = e.target
    if (name === "expyear1") {
      setExpyear1(value)
    } else if (name === "expmonth1") {
      setExpmonth1(value)
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

    if (selectedDate) {
      const joiningDay = selectedDate.getDate()

      if (joiningDay > 15) {
        selectedDate.setMonth(selectedDate.getMonth() + 1)
        selectedDate.setDate(1)
      } else {
        selectedDate.setMonth(selectedDate.getMonth())
        selectedDate.setDate(15)
      }

      setAppraisaldate(selectedDate)
    } else {
      setAppraisaldate(null)
    }
  }

  const handleFileInputChange = event => {
    const selectedXlsxFile = event.target.files[0]

    if (selectedXlsxFile) {
      if (!selectedXlsxFile.name.endsWith(".xlsx")) {
        console.log(
          "Selected file does not have the .xlsx extension:",
          selectedXlsxFile.name
        )
      } else {
        const formData = new FormData()
        formData.append("newEmployeesFile", selectedXlsxFile)
        setIsSuccessAlert(false)
        setShowAlert(true)

        setTimeout(() => {
          setShowAlert(false)
        }, 5000)
        const token = JSON.parse(localStorage.getItem("authUser")).accessToken

        axios.defaults.headers.common = {
          Authorization: `Bearer ${token}`,
        }
        axios
          .post(`${IPAddress}tracking/hrSupport/importNewEmployees`, formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then(response => {
            console.log("File uploaded", response)
            setSelectedfile(null)
            setIsSuccessAlert(true)
            setShowAlert(true)
          })
          .catch(error => {
            console.error("Error uploading file:", error)
            setIsSuccessAlert(false)
            setShowAlert(true)
          })
      }
    }
    console.log(event.target.files)
    event.target.value = null
    console.log(event.target.files)
  }
  const handleEdit = () => {
    fileInputRef.current.click()
  }
  const handleFileSelect = event => {
    const file = event.target.files[0]
    setSelectedImage(URL.createObjectURL(file))
    setFile(file)
  }

  const handleSubmit = event => {
    event.preventDefault()

    // if (expyear !== "" && expmonth !== "") {
    //   setTotalExperience(Number(expyear * 12) + Number(expmonth))
    // } else if (expyear != "" && expmonth == "") {
    //   setTotalExperience(Number(expyear * 12))
    // } else if (expyear == "" && expmonth == "") {
    //   setTotalExperience(0)
    // }

    if (expyear1 !== "" && expmonth1 !== "") {
      const totalExperience = Number(expyear1) * 12 + Number(expmonth1)
      setExperiencewhenJoined(totalExperience.toString())
    } else if (expyear1 !== "" && expmonth1 === "") {
      setExperiencewhenJoined((Number(expyear1) * 12).toString())
    } else if (expyear1 === "" && expmonth1 === "") {
      setExperiencewhenJoined("100") // Convert 0 to a string
    } else if (expyear1 === "" && expmonth1 !== "") {
      setExperiencewhenJoined(Number(expmonth1).toString())
    }

    // const totalExperience = new Date(currentDate)
    // totalExperience.setMonth(currentDate.getMonth() - totalExperienceInMonths)
    // console.log(totalExperience)

    const data = {
      employeeId: empid || "",
      firstName: fname || "",
      middleName: mname || "",
      lastName: lname || "",
      emailId: email || "",
      contactNo: contactno || "",
      birthDate: dob || "",
      dpFilePath: "",
      designation: designation || "",
      experienceWhenJoined: experienceWhenJoined || "",
      totalExperience: totalexperience || "",
      experienceBySkills: JSON.stringify(skillData) || "",
      joiningDate: joiningdate || "",
      lastWorkingDate: lastWorkingDate || "",
      previousAppraisalDate: prevappdate || "",
      appraisalDueDate: appraisaldate || "",
      bandName: bandName || "",
      costCenterName: costCenterName || "",
      costCenterComment: "",
      departmentName: department || "",
      nameRM: nameRM || "",
      emailRM: emailRM || "",
      contactRM: contactRM || "",
      emailAM: "",
      passwrdAM: "",
      underAM: "",
      hasHRApproved: appbyhr || "",
      areBillable: billable || "",
      areAM: areAM || "",
    }

    if (!/^[A-Za-z0-9]+$/.test(data.employeeId)) {
      setEmpidIsValid(false)
    }
    if (!/^[A-Za-z\s]+$/.test(data.firstName)) {
      setFnameIsValid(false)
    }
    if (!/^[A-Za-z\s]+$/.test(data.lastName)) {
      setLnameIsValid(false)
    }
    if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.emailId)
    ) {
      setEmailIsValid(false)
    }

    if (!/^\d{10}$/.test(data.contactNo)) {
      setContactnoIsValid(false)
    }
    if (data.areBillable == true) {
      if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.emailRM)
      ) {
        setemailRMIsValid(false)
      }

      if (!/^[A-Za-z\s]+$/.test(data.nameRM)) {
        setnameRMvalid(false)
      }

      if (!/^\d{10}$/.test(data.contactRM)) {
        setcontactRMIsValid(false)
      }
    }
    if (
      /^[A-Za-z0-9]+$/.test(data.employeeId) &&
      /^[A-Za-z\s]+$/.test(data.firstName) &&
      /^[A-Za-z\s]+$/.test(data.lastName) &&
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(data.emailId) &&
      /^\d{10}$/.test(data.contactNo) &&
      ((data.areBillable == true &&
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(
          data.emailRM
        ) &&
        /^[A-Za-z\s]+$/.test(data.nameRM) &&
        /^\d{10}$/.test(data.contactRM)) ||
        !data.areBillable)
    ) {
      const formDataAddNewEmployee = new FormData()

      formDataAddNewEmployee.append(
        "addNewEmployeeRequest",
        JSON.stringify(data)
      )
      formDataAddNewEmployee.append("employeeDPFile", file || "")

      axios.defaults.headers.common = {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("authUser")).accessToken
        }`,
      }
      axios
        .post(
          `${IPAddress}tracking/hrSupport/addNewEmployee`,
          formDataAddNewEmployee,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then(response => {
          console.log(JSON.stringify(response.data))
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      setProfileeditAlertError(true)
      setTimeout(() => {
        setProfileeditAlertError(false)
      }, 4000)
    }
  }

  const handlebandGroup = selectedOption => {
    setBandGrade(selectedOption.value)
  }
  const handledepartmentGroup = selectedOption => {
    setDepartmentName(selectedOption.value)
  }
  const handlecostcenterGroup = selectedOption => {
    setCostcenterName(selectedOption.value)
  }

  const [skillData, setSkillData] = useState([
    {
      skillset: "",
      yearOfExperience: "",
      monthsOfExperience: "",
    },
  ])

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

  const handleSkillChange = (e, index) => {
    const { name, value } = e.target
    const updatedskillData = [...skillData]
    updatedskillData[index][name] = value
    setSkillData(updatedskillData)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>profile</title>
      </MetaTags>
      <Row>
        <div className="d-flex justify-content-end">
          <label
            htmlFor="fileInput"
            className="btn btn-info w-md"
            style={{ margin: "10px", width: "auto", padding: "px" }}
          >
            Import Employees
          </label>
          <input
            id="fileInput"
            type="file"
            ref={fileInputRef}
            accept=".xlsx"
            onChange={handleFileInputChange}
            style={{ display: "none", position: "absolute" }}
          />
          {showAlert && (
            <div
              className={`alert ${
                isSuccessAlert ? "alert-success" : "alert-danger"
              }`}
              style={{ position: "absolute", bottom: "70%" }}
            >
              {isSuccessAlert
                ? "Employees file successfully imported!"
                : "An error occurred while importing employees."}
            </div>
          )}
        </div>

        <Col>
          <Card>
            <CardBody>
              <Row className="mb-3">
                <h4 className="card-title">Personal Details</h4>

                <Row className="mb-3">
                  <Col md={2}>
                    <label htmlFor="empid" className="col-form-label">
                      Employee ID<span className="text-danger">*</span>
                    </label>
                  </Col>
                  <Col md={5}>
                    <input
                      className={`form-control ${
                        empidIsValid ? "" : "is-invalid"
                      }`}
                      type="text"
                      id="empid"
                      name="empid"
                      value={empid}
                      placeholder="Enter EmployeeId "
                      onChange={handleChange}
                      required
                      pattern="^[A-Za-z0-9]+$"
                    />
                    {!empidIsValid && (
                      <div className="invalid-feedback">
                        Please enter only letters and numbers.
                      </div>
                    )}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={2}>
                    <label htmlFor="fname" className="col-form-label">
                      First Name<span className="text-danger">*</span>
                    </label>
                  </Col>
                  <Col md={5}>
                    <input
                      type="text"
                      name="fname"
                      value={fname}
                      onChange={handleChange}
                      className={`form-control ${
                        fnameIsValid ? "" : "is-invalid"
                      }`}
                      placeholder="Enter First Name"
                      required
                      pattern="^[A-Za-z\s]+$"
                    />
                    {!fnameIsValid && (
                      <div className="invalid-feedback">
                        Please enter only letters and spaces for the first name.
                      </div>
                    )}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={2}>
                    <label
                      htmlFor="example-text-input"
                      className="col-form-label"
                    >
                      Middle Name
                    </label>
                  </Col>
                  <Col md={5}>
                    <input
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
                    <label htmlFor="lname" className="col-form-label">
                      Last Name<span className="text-danger">*</span>
                    </label>
                  </Col>
                  <Col md={5}>
                    <input
                      type="text"
                      className={`form-control ${
                        lnameIsValid ? "" : "is-invalid"
                      }`}
                      name="lname"
                      value={lname}
                      onChange={handleChange}
                      required
                      placeholder="Enter Last Name"
                      pattern="^[A-Za-z\s]+$"
                    />
                    {!lnameIsValid && (
                      <div className="invalid-feedback">
                        Please enter only letters and spaces for the first name.
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={2}>
                    <label htmlFor="email" className="col-form-label">
                      Email Id<span className="text-danger">*</span>
                    </label>
                  </Col>
                  <Col md={5}>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      className={`form-control ${
                        emailIsValid ? "" : "is-invalid"
                      }`}
                      placeholder="Enter Valid Email"
                      required
                      pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$"
                    />
                    {!emailIsValid && (
                      <div className="invalid-feedback">
                        Please enter a valid email address.
                      </div>
                    )}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={2}>
                    <label htmlFor="contactno" className="col-form-label">
                      Contact Number<span className="text-danger">*</span>
                    </label>
                  </Col>
                  <Col md={5}>
                    <input
                      type="tel"
                      name="contactno"
                      value={contactno}
                      onChange={handleChange}
                      className={`form-control ${
                        contactnoIsValid ? "" : "is-invalid"
                      }`}
                      placeholder="Enter Only Digits"
                      required
                      pattern="^[0-9]+$"
                    />
                    {!contactnoIsValid && (
                      <div className="invalid-feedback">
                        Please enter a valid contact number with only digits.
                      </div>
                    )}
                  </Col>
                </Row>
              </Row>
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
              </Row>
              <Row className="mb-3">
                <Row>
                  <label htmlFor="fileInput">
                    <button
                      type="button"
                      className="btn btn-info"
                      style={{
                        position: "absolute",
                        top: "-115px",
                        left: "86%",
                        width: "82px",
                        height: "37px",
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

                <div className="col-md-4">
                  <input
                    className="form-control"
                    type="search"
                    onChange={handleChange}
                    value={designation || ""}
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
                    name="expyear1"
                    value={expyear1 || ""}
                    onChange={handleExpwhenjoinedChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Months"
                    onChange={handleExpwhenjoinedChange}
                    name="expmonth1"
                    value={expmonth1 || ""}
                  />
                </div>
              </Row>
              <div>
                <div className="row mb-3">
                  <label className="col-md-2 col-form-label">
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
                            value={skillData.skillset}
                            onChange={e => handleSkillChange(e, index)}
                          />
                        </div>
                        <div className="col-md-2">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Years"
                            name="yearOfExperience"
                            value={skillData.yearOfExperience}
                            onInput={e => {
                              const value = e.target.value
                              const onlyNumbers = value.replace(/[^0-9]/g, "")
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
                            type="text"
                            placeholder="Months"
                            name="monthsOfExperience"
                            value={skillData.monthsOfExperience}
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
                  <div className="col-md-10">
                    <Select
                      options={dataBands.map(option => ({
                        value: option.grade,
                        label: option.grade,
                      }))}
                      onChange={handlebandGroup}
                      name="bandName"
                      // value={bandName}
                      value={{ value: bandName, label: bandName }}
                    />
                  </div>
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Cost Center
                </label>
                <div className="col-md-10">
                  <div className="col-md-10">
                    <Select
                      options={dataCostCenter.map(option => ({
                        value: option.costCenterName,
                        label: option.costCenterName,
                      }))}
                      onChange={handlecostcenterGroup}
                      name="costCenterName"
                      value={{ value: costCenterName, label: costCenterName }}
                    />
                  </div>
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Department
                </label>
                <div className="col-md-10">
                  <div className="col-md-10">
                    <Select
                      options={dataDept.map(option => ({
                        value: option.departmentName,
                        label: option.departmentName,
                      }))}
                      onChange={handledepartmentGroup}
                      name="department"
                      value={{ value: departmentName, label: departmentName }}
                    />
                  </div>
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
                        dateFormat: "d-M-y",
                      }}
                      value={appraisaldate}
                      placeholder="dd-MON-yyyy"
                      readOnly
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
                    value={accmanship || ""}
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
                      value={appbyhr}
                      onChange={handleAppByHR}
                      checked={appbyhr === "true"}
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
                      name="areBillable"
                      onChange={handleBillableToggle}
                      checked={billable === "true"}
                    />
                  </div>
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {billable === "true" ? "True" : "False"}
                  </label>
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
                      name="areAm"
                      value={areAM}
                      onChange={handleManger}
                      checked={areAM === "true"}
                    />
                  </div>
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {areAM === "true" ? "True" : "False"}
                  </label>
                </Col>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Last Working Date
                </label>
                <div className="col-md-10">
                  <InputGroup>
                    <DatePicker
                      className="form-control d-block"
                      options={{
                        dateFormat: "d-M-Y",
                      }}
                      value={lastWorkingDate}
                      placeholder="dd-MON-yyyy"
                      onChange={date => handlelastworkingDate(date[0])}
                    />
                  </InputGroup>
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

              {/* <div>
                <button
                  type="submit"
                  className="btn btn-primary w-md"
                  style={{ float: "right" }}
                  onClick={handleSubmit}
                >
                  Add Employee
                </button>
              </div> */}
              <div className="row">
                <div className="col-md-5 d-flex flex-row justify-content-between align-items-start">
                  {profileeditalerterror && (
                    <div className="alert alert-danger ">
                      Please fill out all the necessary fields.
                    </div>
                  )}
                </div>
                <div className="col-md-6 justify-item-center">
                  <button
                    type="submit"
                    style={{ marginLeft: "90%", width: "25%" }}
                    className="btn btn-primary w-md ml-auto"
                    onClick={handleSubmit}
                  >
                    Add Employee
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

export default connect(null, { setBreadcrumbItems })(ProfileEdit)
