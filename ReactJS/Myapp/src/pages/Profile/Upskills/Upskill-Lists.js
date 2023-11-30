import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { useHistory, NavLink } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  FormGroup,
  Form,
  Button,
} from "reactstrap"
import axios from "axios"
import { connect } from "react-redux"
import ReactInputMask from "react-input-mask"

import { setBreadcrumbItems } from "../../../store/actions"

import "../../Css/Upskill.css"
import { IPAddress } from "util/APIUtil"

const UpSkill_List = props => {
  const breadcrumbItems = [
    { title: "My CareerApp", link: "#" },
    { title: "UpSKill Lists", link: "#" },
    { title: "UpSKills", link: "#" },
  ]

  const [upskillList, setupskillList] = useState([])
  const [showUpskillBtn, setShowUpskillBtn] = useState(false)

  const history = useHistory()

  const storedFormValues = localStorage.getItem("authUser")
  const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}

  useEffect(() => {
    props.setBreadcrumbItems("Upskill", breadcrumbItems)
    if (
      authUser.rolesList[0] === "ACCOUNT_MANAGER" ||
      authUser.rolesList[0] === "TEAM_MEMBER"
    ) {
      setShowUpskillBtn(true)
    }
  }, [])

  const IPAddUpSKillList = employeeId => {
    if (
      authUser.rolesList[0] === "SUPER_ADMIN" ||
      authUser.rolesList[0] === "HR_SUPPORT"
    ) {
      return `${IPAddress}tracking/hrSupport/getAllUpskills`
    } else {
      return `${IPAddress}tracking/employee/getMyUpSkillsList/${employeeId}`
    }
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authUser")).accessToken
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

    axios
      .get(IPAddUpSKillList(authUser.employeeId), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setupskillList(response.data.upSkillsListDTOList)
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const handleAddNew = (employeeId, addNewUpSkill) => {
    history.push({
      pathname: "/up-skill",
      state: {
        employeeId: employeeId,
        addNewUpSkill: addNewUpSkill,
      },
    })
  }

  const handleCardClick = (upSkillId, addNewUpSkill) => {
    history.push({
      pathname: "/up-skill",
      state: {
        upSkillId: upSkillId,
        addNewUpSkill: addNewUpSkill,
      },
    })
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>UpSkills</title>
      </MetaTags>

      <div className="d-flex justify-content-end">
        {showUpskillBtn == true && (
          <button
            className="btn btn-primary w-md "
            style={{ margin: "10px", width: "auto", padding: "10px" }}
            onClick={() => handleAddNew(authUser.employeeId, true)}
            size="sm"
          >
            Add New Skills Set
          </button>
        )}
        <form className="app-search d-none d-lg-block">
          <div className="position-relative">
            <ReactInputMask
              type="text"
              className="form-control"
              placeholder={`${"Search"}...`}
            />
            <span className="fa fa-search"></span>
          </div>
        </form>
      </div>

      <Card>
        <CardBody>
          <Row>
            <h4 className="card-title mb-3">UpSkill List</h4>
            {upskillList && upskillList.length > 0 ? (
              upskillList.map(upskillList => (
                <Col lg={6} key={upskillList.upSkillId}>
                  <Card
                    className="upskill-cards"
                    onClick={() =>
                      handleCardClick(upskillList.upSkillId, false)
                    }
                    style={{
                      borderRadius: "15px",

                      border: "1px solid #e683e6bb ",
                      boxShadow: "0px 4px 10px rgba(108, 103, 103, 0.2)",
                      transition:
                        "background-color 0.3s, transform 0.3s, boxShadow 0.3s",
                      cursor: "pointer",
                    }}
                  >
                    <CardBody>
                      <Row className="justify-content-center">
                        <div className="col-md-5">
                          <label htmlFor="example-text-input">
                            Employee ID :
                          </label>

                          <div className="col-md-7">
                            <input
                              className="form-control"
                              type="text"
                              id="example-text-input"
                              value={upskillList.employeeId}
                            />
                          </div>
                        </div>

                        <div className="col-md-5">
                          <label htmlFor="example-text-input">
                            Employee Name :
                          </label>

                          <div className="col-md-7">
                            <input
                              className="form-control"
                              type="text"
                              id="example-text-input"
                              value={upskillList.employeeName}
                            />
                          </div>
                        </div>
                      </Row>
                      <div style={{ marginTop: "20px" }}></div>
                      <Row className="justify-content-center">
                        <div className="col-md-5">
                          <label htmlFor="example-text-input">
                            Course/Bootcamp Name:
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="example-text-input"
                            value={upskillList.courseName}
                          />
                        </div>

                        <div className="col-md-5">
                          <label htmlFor="example-search-input">
                            Fees Approved By HR:
                          </label>
                          <div className="form-check form-switch form-switch-md col-md-9">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customSwitchsizemd"
                              checked={upskillList.hasHRVerified === "true"}
                              // disabled={true}
                            />

                            <div style={{ marginTop: "0px" }}>
                              <span>{upskillList.hasHRVerified}</span>
                            </div>
                          </div>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No appraisals available.</p>
            )}
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(UpSkill_List)
