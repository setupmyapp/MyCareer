import PropTypes from "prop-types"
import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { IPAddress } from "util/APIUtil"
// //Import Scrollbar
import SimpleBar from "simplebar-react"
// import "../Css/side"
// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

// import Dashboard from "pages/Dashboard"

const handleClick = e => {
  e.preventDefault()
}
const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  // const { state } = useLocation()
  // console.log(state.showTeamMembers)
  // console.log(state.accountManagerEmployeeID)

  const pathEnable = true

  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }
  const renderContent = () => {
    const storedFormValues = localStorage.getItem("authUser")
    const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}
    const employeeName = authUser.employeeName

    const role = authUser.rolesList[0]

    switch (role) {
      //Admin
      case "SUPER_ADMIN":
        return (
          <React.Fragment>
            <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
              <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                  <li className="menu-title">{props.t("Main")} </li>
                  <li>
                    <Link to="/dashboardadmin" className="waves-effect">
                      <i className="mdi mdi-view-dashboard"></i>
                      <span>{props.t("Admin Dashboard")}</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/hr-employees-list">
                      <i className="fas fa-users"></i>
                      <span>{props.t("Employees")}</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/feedbacks">
                      <i className="fas fa-chalkboard-teacher"></i>
                      <span>{props.t("Feedbacks")}</span>
                    </Link>
                  </li>

                  {/* 
                  <li>
                    <Link to="/team-member">
                      <i className="mdi mdi-email-outline"></i>
                      <span>{props.t("Team Members")}</span>
                    </Link>
                  </li> */}

                  {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi-access-point-network"></i>
                <span>{props.t("Customer Feedbacks")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/performance-rating">{props.t("Performance Rating")}</Link>
                </li>
                <li>
                  <Link to="/">{props.t("Offline")} </Link>
                </li>
              </ul>
            </li> */}

                  <li>
                    <Link to="/settings">
                      <i className="mdi ion ion-md-lock"></i>
                      <span>{props.t("Settings")}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </SimpleBar>
          </React.Fragment>
        )

      // HR
      case "HR_SUPPORT":
        return (
          <React.Fragment>
            <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
              <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                  <li className="menu-title">{props.t("Main")} </li>
                  <li>
                    <Link to="/dashboardhr" className="waves-effect">
                      <i className="mdi mdi-view-dashboard"></i>
                      <span>{props.t("HR Dashboard")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/hr-employees-list">
                      <i className="fas fa-users"></i>
                      <span>{props.t("Employees")}</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/Upskill_lists">
                      <i className="fas fa-chalkboard-teacher"></i>
                      <span>{props.t("Upskills")}</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/SelfAppraisal-List">
                      <i className="fas fa-users"></i>
                      <span>{props.t("Self Appraisals")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/feedbacks">
                      <i className="fas fa-chalkboard-teacher"></i>
                      <span>{props.t("Feedbacks")}</span>
                    </Link>
                  </li>

                  {/* <li>
                    <Link to="/team-member">
                      <i className="mdi mdi-email-outline"></i>
                      <span>{props.t("Team Members")}</span>
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/settings">
                      <i className="mdi ion ion-md-lock"></i>
                      <span>{props.t("Settings")}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </SimpleBar>
          </React.Fragment>
        )

      // ACCOUNT MANAGER
      case "ACCOUNT_MANAGER":
        return (
          <React.Fragment>
            <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
              <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                  <li className="menu-title">{props.t("Main")} </li>
                  {!pathEnable ? (
                    <>
                      <li>
                        <Link
                          to="/#"
                          className="waves-effect"
                          style={{ cursor: "default" }}
                          onClick={handleClick}
                          disabled
                        >
                          <i className="mdi mdi-view-dashboard"></i>
                          <span>{props.t("Dashboard")}</span>
                        </Link>
                      </li>

                      <li>
                        <Link to="/#" className="has-arrow waves-effect">
                          <i className="ion ion-md-person-add"></i>
                          <span aria-disabled style={{ cursor: "pointer" }}>
                            {employeeName}
                          </span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                          <li>
                            <Link
                              to="/#"
                              style={{ cursor: "default" }}
                              onClick={handleClick}
                              disabled
                            >
                              {props.t("Profile")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/#"
                              style={{ cursor: "default" }}
                              onClick={handleClick}
                              disabled
                            >
                              <span>{props.t("Upskills")}</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/#"
                              style={{ cursor: "default" }}
                              onClick={handleClick}
                              disabled
                            >
                              {props.t("Self Appraisal")}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/#"
                              style={{ cursor: "default" }}
                              onClick={handleClick}
                              disabled
                            >
                              {props.t("Feedbacks")}{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/#"
                              style={{ cursor: "default" }}
                              onClick={handleClick}
                              disabled
                            >
                              {props.t("My Calender")}
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/#"
                              style={{ cursor: "default" }}
                              onClick={handleClick}
                              disabled
                            >
                              {props.t("KPI")}{" "}
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/dashboardhr" className="waves-effect">
                          <i className="mdi mdi-view-dashboard"></i>
                          <span>{props.t("Dashboard")}</span>
                        </Link>
                      </li>

                      <li>
                        <Link to="/#" className="has-arrow waves-effect">
                          <i className="ion ion-md-person-add"></i>
                          <span aria-disabled style={{ cursor: "pointer" }}>
                            {employeeName}
                          </span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                          <li>
                            <Link to="/My-Profile">{props.t("Profile")}</Link>
                          </li>
                          <li>
                            <Link to="/Upskill_lists">
                              <span>{props.t("Upskills")}</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/SelfAppraisal-List">
                              {props.t("Self Appraisal")}
                            </Link>
                          </li>
                          <li>
                            <Link to="/feedbacks">{props.t("Feedbacks")} </Link>
                          </li>
                          <li>
                            <Link to="/calendar">{props.t("My Calender")}</Link>
                          </li>

                          <li>
                            <Link to="/kpi">{props.t("KPI")} </Link>
                          </li>
                        </ul>
                      </li>
                    </>
                  )}

                  {!pathEnable ? (
                    <li>
                      <Link
                        to="/#"
                        className="disabledCursor"
                        style={{ cursor: "default" }}
                        onClick={handleClick}
                        disabled
                      >
                        <i className="fas fa-users"></i>
                        <span>{props.t("Team Members")}</span>
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/team-members-List">
                        <i className="fas fa-users"></i>
                        <span>{props.t("Team Members")}</span>
                      </Link>
                    </li>
                  )}
                  {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi-access-point-network"></i>
                <span>{props.t("Customer Feedbacks")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/performance-rating">{props.t("Performance Rating")}</Link>
                </li>
                <li>
                  <Link to="/">{props.t("Offline")} </Link>
                </li>
              </ul>
            </li> */}

                  <li>
                    <Link to="/settings">
                      <i className="mdi ion ion-md-lock"></i>
                      <span>{props.t("Settings")}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </SimpleBar>
          </React.Fragment>
        )

      // Team Member
      case "TEAM_MEMBER":
        return (
          <React.Fragment>
            <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
              <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                  <li className="menu-title">{props.t("Main")} </li>
                  <li>
                    <Link to="/dashboardtm" className="waves-effect">
                      <i className="mdi mdi-view-dashboard"></i>
                      <span>{props.t("Dashboard")}</span>
                    </Link>
                  </li>
                  {pathEnable ? (
                    <li>
                      <Link
                        to="/#"
                        className="has-arrow waves-effect"
                        style={{ cursor: "default" }}
                        onClick={handleClick}
                        disabled
                      >
                        <i className="ion ion-md-person-add"></i>
                        <span>{employeeName}</span>
                      </Link>
                      <ul className="sub-menu" aria-expanded="false">
                        <li>
                          <Link
                            to="/#"
                            className="disabledCursor"
                            style={{ cursor: "default" }}
                            onClick={handleClick}
                            disabled
                          >
                            {props.t("Profile")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/#"
                            className="disabledCursor"
                            style={{ cursor: "default" }}
                            onClick={handleClick}
                            disabled
                          >
                            <span>{props.t("Upskills")}</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/#"
                            className="disabledCursor"
                            style={{ cursor: "default" }}
                            onClick={handleClick}
                            disabled
                          >
                            {props.t("Self Appraisal")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/#"
                            className="disabledCursor"
                            style={{ cursor: "default" }}
                            onClick={handleClick}
                            disabled
                          >
                            {props.t("Feedbacks")}{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/#"
                            className="disabledCursor"
                            style={{ cursor: "default" }}
                            onClick={handleClick}
                            disabled
                          >
                            {props.t("My Calender")}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/#"
                            className="disabledCursor"
                            style={{ cursor: "default" }}
                            onClick={handleClick}
                            disabled
                          >
                            {props.t("KPI")}{" "}
                          </Link>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <li>
                      <Link to="/#" className="has-arrow waves-effect">
                        <i className="ion ion-md-person-add"></i>
                        <span>{employeeName}</span>
                      </Link>
                      <ul className="sub-menu" aria-expanded="false">
                        <li>
                          <Link to="/My-Profile">{props.t("Profile")}</Link>
                        </li>

                        <li>
                          <Link to="/Upskill_lists">
                            <span>{props.t("Upskills")}</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/SelfAppraisal-List">
                            {props.t("Self Appraisal")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/feedbacks">{props.t("Feedbacks")} </Link>
                        </li>
                        <li>
                          <Link to="/calendar">{props.t("My Calender")}</Link>
                        </li>
                        <li>
                          <Link to="/kpi">{props.t("KPI")} </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                  {/* <li>
        <Link to="/#" className="has-arrow waves-effect">
          <i className="mdi-access-point-network"></i>
          <span>{props.t("Customer Feedbacks")}</span>
        </Link>
        <ul className="sub-menu" aria-expanded="false">
          <li>
            <Link to="/performance-rating">{props.t("Performance Rating")}</Link>
          </li>
          <li>
            <Link to="/">{props.t("Offline")} </Link>
          </li>
        </ul>
      </li> */}

                  <li>
                    <Link to="/settings">
                      <i className="mdi ion ion-md-lock"></i>
                      <span>{props.t("Settings")}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </SimpleBar>
          </React.Fragment>
        )

      default:
        return (
          <React.Fragment>
            <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
              <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                  <li className="menu-title">{props.t("Dashboard")} </li>
                </ul>
              </div>
            </SimpleBar>
          </React.Fragment>
        )
    }
  }

  return <div>{renderContent()}</div>
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
