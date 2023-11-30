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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
// Import Flatepicker
import Swal from "sweetalert2"
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import SweetAlert from "react-bootstrap-sweetalert"
import {
  Card,
  CardBody,
  Col,
  Row,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  InputGroup,
  CardTitle,
  FormGroup,
  Form,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
// Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import profile from "../Profile/photo.png"
import axios from "axios"
import { IPAddress } from "util/APIUtil"
import { select } from "redux-saga/effects"
import { set } from "lodash"

// import "../Css/"
const HREditEmployeeDetails = props => {
  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: "Edit Employee Details", link: "#" },
  ]

  const { state } = useLocation()
  const stateEmployeeDTO = state?.employeeDTO

  useEffect(() => {
    getAllBands(), getAllDepartments(), getAllCostCenters(), getAllKPI()
  }, [])
  useEffect(() => {
    if (stateEmployeeDTO?.expbyskills) {
      setSkillData(stateEmployeeDTO?.expbyskills)
    }
  }, [stateEmployeeDTO?.expbyskills])
  useEffect(() => {
    if (stateEmployeeDTO?.kpiDetails) {
      setKpiMatricsData(stateEmployeeDTO?.kpiDetails)
    }
  }, [stateEmployeeDTO?.kpiDetails])

  useEffect(() => {
    if (stateEmployeeDTO?.experienceWhenJoined) {
      const experienceWhenJoined = stateEmployeeDTO?.experienceWhenJoined
      const experienceWhenJoinedYears =
        stateEmployeeDTO?.experienceWhenJoinedYears || ""
      const experienceWhenJoinedMonths =
        stateEmployeeDTO?.experienceWhenJoinedMonths || ""

      console.log("Experience When Joined:", experienceWhenJoined)
      console.log("Year:", experienceWhenJoinedYears)
      console.log("Month:", experienceWhenJoinedMonths)
    }
  }, [
    stateEmployeeDTO?.experienceWhenJoined,
    stateEmployeeDTO?.experienceWhenJoinedYears,
    stateEmployeeDTO?.experienceWhenJoinedMonths,
  ])

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
  const getAllKPI = () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("authUser")).accessToken
      }`,
    }
    axios
      .get(`${IPAddress}tracking/common/getAllKPIs`)
      .then(response => {
        console.log("API Response:", response.data)
        setDataKpiparameter(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const handleFileSelect = event => {
    const file = event.target.files[0]
    setSelectedImage(URL.createObjectURL(file))
    setFile(file)
  }
  // const [data, setData] = useState()

  const [showAlert, setShowAlert] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const [empid, setEmpid] = useState(stateEmployeeDTO?.employeeId)

  const [empidIsValid, setEmpidIsValid] = useState(true)
  const [fname, setFname] = useState(stateEmployeeDTO?.firstName)
  const [fnameIsValid, setFnameIsValid] = useState(true)
  const [lname, setLname] = useState(stateEmployeeDTO?.lastName)
  const [lnameIsValid, setLnameIsValid] = useState(true)
  const [mname, setMname] = useState(stateEmployeeDTO?.middleName)
  const [email, setEmail] = useState(stateEmployeeDTO?.emailId)
  const [emailIsValid, setEmailIsValid] = useState(true)
  const [contactno, setContactno] = useState(stateEmployeeDTO?.contactNo)
  const [contactnoIsValid, setContactnoIsValid] = useState(true)
  const [dob, setDob] = useState(stateEmployeeDTO?.birthDate)
  const [designation, setDesignation] = useState(stateEmployeeDTO?.designation)

  const [expyear, setExpyear] = useState(stateEmployeeDTO?.totalExperience)
  const [expmonth, setExpmonth] = useState(stateEmployeeDTO?.totalExperience)
  const [lastWorkingDate, setLastworkingDate] = useState("")
  const [joiningdate, setJoiningDate] = useState(stateEmployeeDTO?.joiningDate)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [bandGrade, setBandGrade] = useState(stateEmployeeDTO?.bandGrade)
  const [departmentName, setDepartmentName] = useState(
    stateEmployeeDTO?.departmentName
  )
  const [accmanship, setAccmanship] = useState(stateEmployeeDTO?.underAM)
  const [prevappdate, setPrevappdate] = useState(
    stateEmployeeDTO?.previousAppraisalDate
  )
  const [appraisaldate, setAppraisaldate] = useState(
    stateEmployeeDTO?.appraisalDueDate
  )
  const [isAppbyhr, setAppbyhr] = useState(false)
  const [isbillable, setIsBillable] = useState(false)
  const [isAccountManagerChecked, setIsAccountManagerChecked] = useState(false)
  const [nameRM, setnameRM] = useState(stateEmployeeDTO?.nameRM)
  const [nameRMvalid, setnameRMvalid] = useState(true)
  const [emailRM, setemailRM] = useState(stateEmployeeDTO?.emailRM)
  const [emailRMIsValid, setemailRMIsValid] = useState(true)
  const [contactRM, setcontactRM] = useState(stateEmployeeDTO?.contactRM)
  const [contactRMIsValid, setcontactRMIsValid] = useState(true)
  const [totalexperience, setTotalExperience] = useState("")
  const [costCenterName, setCostcenterName] = useState(
    stateEmployeeDTO?.costCenterName
  )
  const [costCenterComment, setcostCenterComment] = useState(
    stateEmployeeDTO?.costCenterComment
  )
  const [submitAlertError, setSubmitAlertError] = useState(false)
  const [experienceWhenJoined, setExperiencewhenJoined] = useState("")
  const [expwhenjonyear, setExpwhenjonyear] = useState(
    stateEmployeeDTO?.experienceWhenJoinedYears
  )
  const [expwhenjonmonth, setExpwhenjonmonth] = useState(
    stateEmployeeDTO?.experienceWhenJoinedMonths
  )
  const [dataBands, setDataBands] = useState([])
  const [dataDept, setDataDept] = useState([])
  const [dataCostCenter, setDataCostCenter] = useState([])
  const [totalExperienceInYearAndMonth, setTotalExperienceInYearAndMonth] =
    useState(0)
  const [kpiMatricsData, setKpiMatricsData] = useState([
    { kpiparameterName: "", percentage: "" },
  ])
  const [kpiparameterName, setKpiParameterName] = useState(
    stateEmployeeDTO?.kpiname
  )
  const [datakpiparameter, setDataKpiparameter] = useState([])
  const [selectedKPIs, setSelectedKPIs] = useState(new Set())

  const [skillData, setSkillData] = useState([
    {
      skillset: "",
      yearOfExperience: "",
      monthsOfExperience: "",
    },
  ])

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

        case "expyear":
          setExpyear(value)
          break
        case "expmonth":
          setExpmonth(value)
          break
        case "expwhenjonyear":
          setExpwhenjonyear(value)
          break
        case "expwhenjonmonth":
          setExpwhenjonmonth(value)
          break
        case "totalExperience":
          setTotalExperience(value)
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
        case "costCenterComment":
          setcostCenterComment(value)
          break

        default:
          break
      }
    }
  }

  const handleAppByHR = event => {
    setAppbyhr(event.target.checked ? "true" : "false")
  }

  const handleBillableToggle = event => {
    setIsBillable(event.target.checked ? "true" : "false")
  }
  const handleManager = event => {
    setIsAccountManagerChecked(event.target.checked ? "true" : "false")
  }
  useEffect(() => {
    if (stateEmployeeDTO) {
      setIsAccountManagerChecked(stateEmployeeDTO.areAM)
      setIsBillable(stateEmployeeDTO.areBillable)
      setAppbyhr(stateEmployeeDTO.hasHRApproved)
    }
  }, [])

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
        //   let Band = ""
        //   for (let i = dataBands.length - 1; i >= 0; i--) {
        //     if (dataBands[i].experience) {
        //       if (totalExperienceInYearAndMonth >= dataBands[i].experience) {
        //         Band = dataBands[i].grade
        //         break
        //       }
        //     }
        //   }

        //   setBandGrade(Band)

        //   console.log("Total Experience: " + totalExperienceInYearAndMonth)
        //   console.log("Band: " + Band)
        // } else {
        //   console.log("Invalid joining date")
        // }
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

  const isKPIPercentageValid = kpiMatricsData => {
    let sum = 0

    for (let i = 0; i < kpiMatricsData.length; i++) {
      const matric = kpiMatricsData[i]
      const parsedkpiPercentage = parseInt(matric.percentage)
      sum += parsedkpiPercentage

      if (parsedkpiPercentage < 0) {
        return false
      }
    }

    return sum === 100
  }

  const handleEdit = () => {
    fileInputRef.current.click()
  }
  const handleSubmit = () => {
    // if (expyear !== "" && expmonth != "") {
    //   setTotalExperience(Number(expyear * 12) + Number(expmonth))
    // } else if (expyear != "" && expmonth == "") {
    //   setTotalExperience(Number(expyear * 12))
    // } else if (expyear == "" && expmonth == "") {
    //   setTotalExperience(0)
    // } else if (expyear == "" && expmonth != "") {
    //   setTotalExperience(Number(expmonth))
    // }

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

    const data = {
      employeeId: empid || "",
      firstName: fname || "",
      middleName: mname || "",
      lastName: lname || "",
      emailId: email || "",
      contactNo: contactno || "",
      birthDate: dob || "",
      designation: designation || "",
      experienceWhenJoined: experienceWhenJoined || "",
      totalExperience: totalexperience || "",
      experienceBySkills: JSON.stringify(skillData) || "",
      joiningDate: joiningdate || "",
      previousAppraisalDate: prevappdate || "",
      appraisalDueDate: appraisaldate || "",
      bandGrade: bandGrade || "",
      costCenterName: costCenterName || "",
      costCenterComment: costCenterComment || "",
      departmentName: departmentName || "",
      nameRM: nameRM || "",
      emailRM: emailRM || "",
      contactRM: contactRM || "",
      emailAM: "",
      passwrdAM: "",
      underAM: "",
      hasHRApproved: isAppbyhr || "",
      areBillable: isbillable || "",
      areAM: isAccountManagerChecked || "",
      kpiDetails: JSON.stringify(kpiMatricsData || {}),
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
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(data.emailId)
    ) {
      setEmailIsValid(false)
    }

    if (!/^\d{10}$/.test(data.contactNo)) {
      setContactnoIsValid(false)
    }

    if (isbillable == true) {
      if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(data.emailRM)
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
      ((isbillable === "true" &&
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(
          data.emailRM
        ) &&
        /^[A-Za-z\s]+$/.test(data.nameRM) &&
        /^\d{10}$/.test(data.contactRM)) ||
        isbillable === "false")
    ) {
      if (!isKPIPercentageValid(kpiMatricsData)) {
        alert("Invalid sum of KPI percentages. The total should be 100.")
        setSubmitAlertError(true)
        setTimeout(() => {
          setSubmitAlertError(false)
        }, 4000)
      } else {
        const token = JSON.parse(localStorage.getItem("authUser")).accessToken

        const formDataEditEmployee = new FormData()
        formDataEditEmployee.append(
          "editEmployeeProfileDetailsRequest",
          JSON.stringify(data)
        )
        formDataEditEmployee.append("employeeDPFile", file || "")

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

        axios
          .put(
            `${IPAddress}tracking/hrSupport/editEmployeeProfileDetails`,
            formDataEditEmployee,
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

        setSubmitAlertError(false)
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Employee Edited Successfully!!!",
          confirmButtonText: "OK",
        }).then(result => {
          if (result.isConfirmed) {
            props.history.push("/hr-employees-list")
          }
        })
      }
    } else {
      setSubmitAlertError(true)
      setTimeout(() => {
        setSubmitAlertError(false)
      }, 4000)
    }
  }

  const handleDepartmentGroup = selectedOption => {
    setDepartmentName(selectedOption.value)
  }

  const handlecostcenterGroup = selectedOption => {
    setCostcenterName(selectedOption.value)
  }

  const handleBandGradeGroup = selectedOption => {
    setBandGrade(selectedOption.value)
  }
  const handleKpiParameterGroup = (selectedOption, index) => {
    setKpiMatricsData(prevData => {
      const newData = [...prevData]
      newData[index].kpiparameterName = selectedOption.value
      return newData
    })
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

  const handleAddKPIField = () => {
    const kpilastEntry = kpiMatricsData[kpiMatricsData.length - 1]
    if (kpilastEntry.kpiParameter === "" || kpilastEntry.percentage === "") {
      alert("Please fill out all KPI Metric fields before adding a new entry.")
    } else {
      setKpiMatricsData([
        ...kpiMatricsData,
        {
          percentage: "",
        },
      ])
    }
  }

  const handleRemoveKPIField = index => {
    const updatedKPIData = [...kpiMatricsData]
    updatedKPIData.splice(index, 1)
    setKpiMatricsData(updatedKPIData)
  }
  const handleKPIChange = (e, index, newValue) => {
    const percentagevalue = newValue || e.target.value

    if (parseFloat(percentagevalue) > 100) {
      alert("Percentage cannot be greater than 100")
      return
    }

    const selectedKPI = e.target.value
    if (!selectedKPIs.has(selectedKPI)) {
      setSelectedKPIs(new Set(selectedKPIs).add(selectedKPI))

      const updatedKPIData = [...kpiMatricsData]
      updatedKPIData[index][e.target.name] = percentagevalue
      setKpiMatricsData(updatedKPIData)
    }
  }

  const isOptionDisabled = kpi => selectedKPIs.has(kpi)

  return (
    <React.Fragment>
      <MetaTags>
        <title>Edit Employee Details</title>
      </MetaTags>

      <Row>
        <div className="d-flex justify-content-end"></div>
        <Col>
          <Card>
            <CardBody>
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
                  <input
                    className={`form-control ${
                      empidIsValid ? "" : "is-invalid"
                    }`}
                    type="text"
                    name="empid"
                    value={stateEmployeeDTO?.employeeId}
                    defaultValue=""
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
                  <label
                    htmlFor="example-text-input"
                    className="col-form-label"
                  >
                    First Name<span className="text-danger">*</span>
                  </label>
                </Col>
                <Col md={5}>
                  <input
                    className={`form-control ${
                      fnameIsValid ? "" : "is-invalid"
                    }`}
                    type="text"
                    name="fname"
                    value={stateEmployeeDTO?.firstName}
                    onChange={handleChange}
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
                    value={stateEmployeeDTO?.middleName}
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
                  <input
                    className="form-control"
                    type="text"
                    name="lname"
                    value={stateEmployeeDTO?.lastName}
                    onChange={handleChange}
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
                  <label
                    htmlFor="example-email-input"
                    className="col-form-label"
                  >
                    Email Id<span className="text-danger">*</span>
                  </label>
                </Col>
                <Col md={5}>
                  <input
                    className={`form-control ${
                      emailIsValid ? "" : "is-invalid"
                    }`}
                    type="email"
                    name="email"
                    value={stateEmployeeDTO?.emailId}
                    onChange={handleChange}
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
                  <label htmlFor="example-tel-input" className="col-form-label">
                    Contact Number<span className="text-danger">*</span>
                  </label>
                </Col>
                <Col md={5}>
                  <input
                    className={`form-control ${
                      contactnoIsValid ? "" : "is-invalid"
                    }`}
                    type="tel"
                    name="contactno"
                    onChange={handleChange}
                    value={stateEmployeeDTO?.contactNo}
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
                        marginTop: "-38%",
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
                    name="expwhenjonyear"
                    value={expwhenjonyear}
                    onChange={handleExpwhenjoinedChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Months"
                    name="expwhenjonmonth"
                    value={expwhenjonmonth}
                    onChange={handleExpwhenjoinedChange}
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
                            value={data.skillset}
                            onChange={e => handleSkillChange(e, index)}
                          />
                        </div>
                        <div className="col-md-2">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Years"
                            name="yearOfExperience"
                            value={data.yearOfExperience}
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
                            value={data.monthsOfExperience}
                            onChange={e => handleSkillChange(e, index)}
                          />
                          {index === skillData.length - 1 && (
                            <div className="input-group-append">
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleAddField}
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
                      name="bandGrade"
                      value={{ value: bandGrade, label: bandGrade }}
                      onChange={handleBandGradeGroup}
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
                      name="costCenterName"
                      value={{ value: costCenterName, label: costCenterName }}
                      onChange={handlecostcenterGroup}
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
                      name="departmentName"
                      value={{ value: departmentName, label: departmentName }}
                      onChange={handleDepartmentGroup}
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
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Approved:
                </label>
                <div className="form-check form-switch form-switch-md col-md-5">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customSwitchsizemd"
                    name="hasHRApproved"
                    onChange={handleAppByHR}
                    checked={isAppbyhr === "true"}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {isAppbyhr === "true" ? "True" : "False"}
                  </label>
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Billable:
                </label>
                <div className="form-check form-switch form-switch-md col-md-5">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customSwitchsizemd"
                    name="areBillable"
                    checked={isbillable === "true"}
                    onChange={handleBillableToggle}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {isbillable === "true" ? "True" : "False"}
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
                    onChange={handleManager}
                    checked={isAccountManagerChecked === "true"}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizemd"
                  >
                    {isAccountManagerChecked === "true" ? "True" : "False"}
                  </label>
                </div>
              </Row>
              {/* <Row className="mb-3">
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
              </Row> */}
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
                    <span className="text-danger">*</span>
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
                    <span className="text-danger">*</span>
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
                    <span className="text-danger">*</span>
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
                  {submitAlertError && (
                    <div className="alert alert-danger ">
                      Please fill out all the necessary fields.
                    </div>
                  )}
                </div>
                {/* <div className="col-md-6 justify-item-center">
                  <button
                    type="submit"
                    style={{ marginLeft: "93%" }}
                    className="btn btn-primary w-md ml-auto"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div> */}
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

      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <h5>KPI MATRICS</h5>
              <div style={{ marginTop: "2%" }}></div>
              {kpiMatricsData.map((matric, index) => (
                <Row key={index} className="mb-3">
                  <Col md={4}>
                    <label
                      htmlFor="example-text-input"
                      className="col-md-4 col-form-label"
                    >
                      KPI Parameter
                    </label>
                    <div className="col-md-10">
                      <Select
                        options={datakpiparameter.map(option => ({
                          value: option.kpiname,
                          label: option.kpiname,
                        }))}
                        onChange={selectedOption =>
                          handleKpiParameterGroup(selectedOption, index)
                        }
                        name={`kpiname_${index}`}
                        value={{
                          value: kpiMatricsData[index].kpiparameterName,
                          label: kpiMatricsData[index].kpiparameterName,
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={2}>
                    <label className="col-form-label">Percentage</label>
                    <div className="d-flex align-items-center">
                      <input
                        className="form-control"
                        type="text"
                        name="percentage"
                        value={matric.percentage}
                        onChange={e => handleKPIChange(e, index)}
                      />

                      {kpiMatricsData.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveKPIField(index)}
                          style={{ marginLeft: "8px" }}
                        >
                          -
                        </button>
                      )}
                      {index === kpiMatricsData.length - 1 && (
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={handleAddKPIField}
                          style={{ marginLeft: "8px" }}
                        >
                          +
                        </button>
                      )}
                    </div>
                  </Col>
                </Row>
              ))}

              <div className="row">
                <div className="col-md-5 d-flex flex-row justify-content-between align-items-start">
                  {submitAlertError && (
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
          </Card>

          <CardBody>
            <span className="text-danger">*</span>
            <span style={{ marginLeft: "5px" }}>All fields are mandatory.</span>
          </CardBody>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(HREditEmployeeDetails)
