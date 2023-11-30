import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { useHistory, Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  FormGroup,
  Form,
  CardImg,
  CardText,
  CardHeader,
  CardImgOverlay,
  CardFooter,
  CardDeck,
} from "reactstrap"
import { IPAddress } from "../../util/APIUtil"
import axios from "axios"
import user from "../Profile/photo.png"
import { connect } from "react-redux"
import "../Css/employees.css"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

const HREmployeeList = props => {
  const [accountManagerList, setAccountManagerList] = useState([])
  const history = useHistory()
  const [search, setSearch] = useState([])

  useEffect(() => {
    const breadcrumbItems = [
      { title: "My CareerApp", link: "#" },
      { title: "Employees", link: "#" },
    ]
    props.setBreadcrumbItems("Employees", breadcrumbItems)
  }, [])

  const { state } = useLocation()

  const showTeamMembers = (state && state.showTeamMembers) || ""
  const accountManagerEmployeeID =
    (state && state.accountManagerEmployeeID) || ""

  const hremployeelist = () => {
    console.log("showTeamMembers - " + showTeamMembers)
    console.log("accountManagerEmployeeID - " + accountManagerEmployeeID)
    if (showTeamMembers && accountManagerEmployeeID) {
      return `${IPAddress}tracking/accountManager/getAllMyTeamMembers/${accountManagerEmployeeID}`
    } else {
      return `${IPAddress}tracking/hrSupport/getAllEmployees`
    }
  }
  const handleClick = employeeId => {
    history.push({
      pathname: "./hr-employee-details",
      state: {
        employeeId: employeeId,
      },
    })
  }

  const handleAddEdit = () => {
    history.push("./profile-edit")
  }

  const token = JSON.parse(localStorage.getItem("authUser")).accessToken
  const headers = {
    "content-Type": "application/json",
  }
  console.log(headers)
  useEffect(() => {
    axios
      .get(hremployeelist())

      .then(response => {
        setAccountManagerList(response.data.employeesListDTOList)
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const cardsPerRow = 3

  const rows = []
  for (let i = 0; i < accountManagerList.length; i += cardsPerRow) {
    const rowSlice = accountManagerList.slice(i, i + cardsPerRow)
    rows.push(rowSlice)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Employees</title>
      </MetaTags>

      <div className="d-flex justify-content-end">
        <button
          type="Add"
          className="btn btn-info w-md"
          style={{ margin: "10px", width: "auto", padding: "10px" }}
          onClick={handleAddEdit}
        >
          Add New Employee
        </button>
        <form className="app-search d-none d-lg-block">
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              name="search"
              value={search}
              placeholder={`${"Search"}...`}
            />
            <span className="fa fa-search"></span>
          </div>
        </form>
      </div>

      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              {rows.map((row, rowIndex) => (
                <Row
                  key={rowIndex}
                  xs="1"
                  sm="2"
                  md="3"
                  lg="4"
                  xl="5"
                  className="g3"
                >
                  {row.map(manager => (
                    <Col xl="4" md="6" key={manager.employeeId}>
                      <Card
                        className="directory-card"
                        onClick={() =>
                          handleClick(
                            manager.employeeId,
                            manager.showTeamMembers,
                            manager.accountManagerEmployeeID
                          )
                        }
                      >
                        <div>
                          <div className="directory-bg text-center">
                            <div className="directory-overlay">
                              <img
                                className="rounded-circle avatar-lg img-thumbnail custom-img"
                                src={user}
                                alt="Generic placeholder"
                              />
                            </div>
                          </div>

                          <div className="directory-content text-center p-4">
                            <p className="mt-4">{manager.designation}</p>
                            <h5 className="font-size-16">
                              {manager.firstName} {manager.lastName}
                            </h5>

                            <p className="text-muted">{manager.emailId}</p>

                            <div className="flex-grow-5">
                              <div className="mb-3">
                                <div className="row align-items-center">
                                  <div className="col-auto">
                                    <label
                                      className="form-check-label"
                                      // htmlFor={`accountManagerCheckbox-${manager.employeeId}`}
                                    >
                                      Account Manager
                                    </label>
                                  </div>
                                  <div className="col-auto">
                                    <div className="form-check form-switch form-switch-md">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={manager.areAM === "true"}
                                        id="customSwitchsizemd"
                                        // defaultValuevalue={manager.areAM}
                                        // onChange={() => setareAccountManager}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* {areaccountmanager && (
                                <Link
                                  to={{
                                    pathname: "/am-employee-details",
                                  }}
                                ></Link>
                              )} */}
                              <div className="mb-3">
                                <div className="row align-items-center">
                                  <div className="col-auto">
                                    <label className="form-check-label">
                                      Billable
                                    </label>
                                  </div>
                                  <div className="col-auto">
                                    <div className="form-check form-switch form-switch-md">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={manager.areBillable === "true"}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

HREmployeeList.propTypes = {
  setBreadcrumbItems: PropTypes.func.isRequired,
}

export default connect(null, { setBreadcrumbItems })(HREmployeeList)
