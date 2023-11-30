import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { useHistory, useLocation } from "react-router-dom"
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
import { IPAddress } from "util/APIUtil"
import axios from "axios"
import user from "../Profile/photo.png"
import { connect } from "react-redux"
import "../Css/employees.css"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { Link } from "react-router-dom"

const TeamMembersList = props => {
  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: "Team Member", link: "#" },
  ]
  const storedFormValues = localStorage.getItem("authUser")
  const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}

  const { state } = useLocation()
  // let employeeId = ""
  // if (
  //   authUser.rolesList[0] === "HR_SUPPORT" ||
  //   authUser.rolesList[0] === "SUPER_ADMIN"
  // ) {
  //   employeeId = state && state.employeeId
  // } else {
  let employeeId = authUser.employeeId
  // }
  console.log("Team Member", employeeId)

  useEffect(() => {
    props.setBreadcrumbItems("Team Member ", breadcrumbItems)
  })

  const history = useHistory()
  const [toggleSwitch, settoggleSwitch] = useState(true)
  const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
  const [teamMember, setteamMember] = useState([])

  const handleClick = (employeeId, employeeIdAM) => {
    // const selectedMember = teamMember.find(
    //   member => member.employeeId === member1.employeeId
    // )

    history.push({
      pathname: "./team-members-details",
      state: { employeeId: employeeId, employeeIdAM: employeeIdAM },
    })
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authUser")).accessToken
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }

    axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
    console.log("employeeId", employeeId)
    axios
      .get(
        `${IPAddress}tracking/accountManager/getAllMyTeamMembers/${employeeId}`,

        { headers: headers }
      )
      .then(response => {
        setteamMember(response.data.employeesListDTOList)
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const cardsPerRow = 3

  const rows = []
  for (let i = 0; i < teamMember.length; i += cardsPerRow) {
    const rowSlice = teamMember.slice(i, i + cardsPerRow)
    rows.push(rowSlice)
  }
  return (
    <React.Fragment>
      <MetaTags>
        <title>Team Members</title>
      </MetaTags>

      <div className="d-flex justify-content-end">
        <form className="app-search d-none d-lg-block">
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              placeholder={`${"Search"}...`}
            />
            <span className="fa fa-search"></span>
          </div>
        </form>
      </div>
      <Row>
        <Col lg={14}>
          <Card>
            <CardBody>
              <h4 className="card-title">Team Member</h4>

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
                  {row.map(member => (
                    <Col md="6" xl="4" key={member.employeeId}>
                      <Card
                        className="directory-card"
                        onClick={() =>
                          handleClick(member.employeeId, employeeId)
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
                            <p className="mt-4">{member.designation}</p>
                            <h5 className="font-size-16">
                              {member.firstName} {member.lastName}
                            </h5>

                            <p className="text-muted">{member.emailId}</p>
                            <p className="text-muted">{member.contactNo}</p>
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
                                        // checked={member.areAM}
                                        value={member.areAM === "true"}
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
                                      Approved by Hr
                                    </label>
                                  </div>
                                  <div className="col-auto">
                                    <div className="form-check form-switch form-switch-md">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        // id={`billableCheckbox-${manager.employeeId}`}
                                        // checked={member.hasHRApproved}
                                        value={member.hasHRApproved}
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

export default connect(null, { setBreadcrumbItems })(TeamMembersList)
