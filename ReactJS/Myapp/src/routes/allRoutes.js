import React from "react"
// import { Redirect } from "react-router-dom"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

// import Teammemberlayout from "pages/Team Members/Teammemberlayout"

// Profile
// import UserProfile from "../pages/Authentication/user-profile"

import MyProfile from "../pages/Profile/MyProfile"
import MyProfileEdit from "../pages/Profile/MyProfileEdit"
import UpSkill from "../pages/Profile/Upskills/UpSkill"
import UpskillLists from "pages/Profile/Upskills/Upskill-Lists"
import SelfAppraisalList from "pages/Profile/SelfAppraisalList"
import SelfAppraisalEmp from "pages/Profile/SelfAppraisalEmp"
import SelfAppraisalHr from "pages/Profile/SelfAppraisalHr"
import hrfeedbackform from "pages/Profile/hrfeedbackform"
import Feedbacks from "../pages/Profile/Feedbacks"
import Kpi from "../pages/Profile/Kpi"
import Settings from "../pages/Profile/Settings"

//Account Manager

import HREmployeeList from "../pages/Account Manager/HREmployeeList"
import ProfileEdit from "pages/Account Manager/ProfileEdit"

import HREditEmployeeDetails from "pages/Account Manager/HREditEmployee-Details"
import HREmployeeDetails from "pages/Account Manager/HREmployeeDetails"

//Team Member
import TeamMembersList from "pages/Team Members/TeamMemberList"
import EditEmployeeDetails from "pages/Team Members/EditEmployee-Details"
// import TeamMembersDetails from "pages/Team Members/TeamMembersDetails"
import TeamMembersDetails from "pages/Team Members/TeamMembersDetails"
//Customer Feedback
import PerformanceRating from "../pages/Customer Feedback/PerformanceRating"

// Pages Calendar
import Calendar from "../pages/Calendar/index"

//Email
import EmailInbox from "../pages/Email/email-inbox"
import EmailRead from "../pages/Email/email-read"
import EmailCompose from "../pages/Email/email-compose"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

// import Dashboardhr from "../pages/HrDashboard/dashboardhr"
// import teammemberDashboard from "../pages/teammemberDashboard/dashboardtm"
import accountmanagerDashboard from "../pages/accountmanagerDashboard/dashboardam"
import adminDashboard from "../pages/adminDashboard/dashboardadmin"
import hrDashboard from "pages/hrDashboard"

//Charts
import ChartsAppex from "../pages/Charts/charts-appex"
import ChartsChartist from "../pages/Charts/charts-chartist"
import ChartsJs from "../pages/Charts/charts-chartjs"
import ChartsKnob from "../pages/Charts/charts-knob"
import ChartsC3 from "../pages/Charts/charts-c3"
import ChartsSparkLine from "../pages/Charts/charts-sparkline"

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle"
import MapsVector from "../pages/Maps/MapsVector"
import MapsLeaflet from "../pages/Maps/MapsLeaflet"

//Icons
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign"
import Iconion from "../pages/Icons/Iconion"
import IconFontawesome from "../pages/Icons/IconFontawesome"
import IconThemify from "../pages/Icons/IconThemify"
import IconDripicons from "../pages/Icons/IconDripicons"
import IconTypicons from "../pages/Icons/IconTypicons"

//Tables
import BasicTables from "../pages/Tables/BasicTables"
import DatatableTables from "../pages/Tables/DatatableTables"
import ResponsiveTables from "../pages/Tables/ResponsiveTables"
import EditableTables from "../pages/Tables/EditableTables"

// Forms
import FormElements from "../pages/Forms/FormElements"
import FormAdvanced from "../pages/Forms/FormAdvanced"
import FormEditors from "../pages/Forms/FormEditors"
import FormValidations from "../pages/Forms/FormValidations"
import FormUpload from "../pages/Forms/FormUpload"
import FormXeditable from "../pages/Forms/FormXeditable"

//Ui
import UiAlert from "../pages/Ui/UiAlert"
import UiButtons from "../pages/Ui/UiButtons"
import UiBadge from "../pages/Ui/UiBadge"
import UiCards from "../pages/Ui/UiCards"
import UiCarousel from "../pages/Ui/UiCarousel"
import UiDropdown from "../pages/Ui/UiDropdown"
import UiGrid from "../pages/Ui/UiGrid"
import UiImages from "../pages/Ui/UiImages"
import UiLightbox from "../pages/Ui/UiLightbox"
import UiModal from "../pages/Ui/UiModal"
import UiPagination from "../pages/Ui/UiPagination"
import UiPopoverTooltips from "../pages/Ui/UiPopoverTooltips"
import UiProgressbar from "../pages/Ui/UiProgressbar"
import UiSweetAlert from "../pages/Ui/UiSweetAlert"
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions"
import UiTypography from "../pages/Ui/UiTypography"
import UiVideo from "../pages/Ui/UiVideo"
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout"
import UiRangeSlider from "../pages/Ui/UiRangeSlider"

//Extra Pages
import PagesTimeline from "../pages/Extra Pages/pages-timeline"
import PagesInvoice from "../pages/Extra Pages/pages-invoice"
import PagesDirectory from "../pages/Extra Pages/pages-directory"
import PagesBlank from "../pages/Extra Pages/pages-blank"
import Pages404 from "../pages/Extra Pages/pages-404"
import Pages500 from "../pages/Extra Pages/pages-500"

import testdashboard from "pages/testdashboard"
import Teamdashboard from "pages/Teamdashboard"

const storedFormValues = localStorage.getItem("authUser")
const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}
const role =
  authUser.rolesList && authUser.rolesList.length > 0
    ? authUser.rolesList[0]
    : null

const userRoutes = [
  // { path: "/dashboard", component: Dashboard },
  { path: "/dashboardadmin", component: adminDashboard },
  { path: "/dashboardam", component: accountmanagerDashboard },
  { path: "/dashboardtm", component: Teamdashboard },
  { path: "/dashboardhr", component: hrDashboard },
  { path: "/", component: testdashboard },

  // //calendar
  { path: "/calendar", component: Calendar },

  // // //profile
  // { path: "/profile", component: UserProfile },
  {
    path: "/My-Profile",
    component: MyProfile,
  },
  { path: "/Edit-MyProfile", component: MyProfileEdit },
  { path: "/up-skill", component: UpSkill },
  {
    path: "/upskill_lists",
    component: UpskillLists,
  },
  { path: "/SelfAppraisal-Emp", component: SelfAppraisalEmp },
  { path: "/SelfAppraisal-Hr", component: SelfAppraisalHr },
  { path: "/SelfAppraisal-List", component: SelfAppraisalList },
  { path: "/feedbacks", component: Feedbacks },
  { path: "/kpi", component: Kpi },
  { path: "/settings", component: Settings },
  { path: "/hrfeedbackedit", component: hrfeedbackform },
  // //Account Manager
  { path: "/hr-employees-list", component: HREmployeeList },
  { path: "/profile-edit", component: ProfileEdit },
  { path: "/hr-edit-employee-details", component: HREditEmployeeDetails },
  { path: "/hr-employee-details", component: HREmployeeDetails },

  //Team Member
  { path: "/team-members-List", component: TeamMembersList },
  { path: "/edit-employee-details", component: EditEmployeeDetails },
  { path: "/team-members-details", component: TeamMembersDetails },

  // //Customer Feedback
  {
    path: "/performance-rating?name='Sai%Subhashree'&reporting='PraveenDev'&dept='SONYSARD'&empId='20211331'",

    component: PerformanceRating,
  },

  // //Email
  { path: "/email-inbox", component: EmailInbox },
  { path: "/email-read", component: EmailRead },
  { path: "/email-compose", component: EmailCompose },

  // //Charts
  { path: "/apex-charts", component: ChartsAppex },
  { path: "/charts-chartist", component: ChartsChartist },
  { path: "/charts-chartjs", component: ChartsJs },
  { path: "/charts-knob", component: ChartsKnob },
  { path: "/charts-c3", component: ChartsC3 },
  { path: "/sparkline-charts", component: ChartsSparkLine },

  // // Icons
  { path: "/icons-materialdesign", component: IconMaterialdesign },
  { path: "/icons-ion", component: Iconion },
  { path: "/icons-fontawesome", component: IconFontawesome },
  { path: "/icons-themify", component: IconThemify },
  { path: "/icons-dripicons", component: IconDripicons },
  { path: "/icons-typicons", component: IconTypicons },

  // // Tables
  { path: "/tables-basic", component: BasicTables },
  { path: "/tables-datatable", component: DatatableTables },
  { path: "/tables-responsive", component: ResponsiveTables },
  { path: "/tables-editable", component: EditableTables },

  // // Maps
  { path: "/maps-google", component: MapsGoogle },
  { path: "/maps-vector", component: MapsVector },
  { path: "/maps-leaflet", component: MapsLeaflet },

  // // Forms
  { path: "/form-elements", component: FormElements },
  { path: "/form-advanced", component: FormAdvanced },
  { path: "/form-editors", component: FormEditors },
  { path: "/form-uploads", component: FormUpload },
  { path: "/form-validation", component: FormValidations },
  { path: "/form-xeditable", component: FormXeditable },

  // // Ui
  { path: "/ui-alerts", component: UiAlert },
  { path: "/ui-buttons", component: UiButtons },
  { path: "/ui-badge", component: UiBadge },
  { path: "/ui-cards", component: UiCards },
  { path: "/ui-carousel", component: UiCarousel },
  { path: "/ui-dropdowns", component: UiDropdown },
  { path: "/ui-grid", component: UiGrid },
  { path: "/ui-images", component: UiImages },
  { path: "/ui-lightbox", component: UiLightbox },
  { path: "/ui-modals", component: UiModal },
  { path: "/ui-pagination", component: UiPagination },
  { path: "/ui-popover-tooltip", component: UiPopoverTooltips },
  { path: "/ui-progressbars", component: UiProgressbar },
  { path: "/ui-sweet-alert", component: UiSweetAlert },
  { path: "/ui-tabs-accordions", component: UiTabsAccordions },
  { path: "/ui-typography", component: UiTypography },
  { path: "/ui-video", component: UiVideo },
  { path: "/ui-session-timeout", component: UiSessionTimeout },
  { path: "/ui-rangeslider", component: UiRangeSlider },

  // //Extra Pages
  { path: "/pages-timeline", component: PagesTimeline },
  { path: "/pages-invoice", component: PagesInvoice },
  { path: "/pages-directory", component: PagesDirectory },
  { path: "/pages-blank", component: PagesBlank },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-register", component: Register1 },
  { path: "/page-recoverpw", component: Recoverpw },
  { path: "/auth-lock-screen", component: LockScreen },
]
let roleBasedRoutes = []

console.log(role)
switch (role) {
  case "HR_SUPPORT":
    roleBasedRoutes = userRoutes.filter(
      route => route.allowedRoles == "hr support"
    )
    break

  case "ACCOUNT_MANAGER":
    roleBasedRoutes = userRoutes.filter(
      route => route.allowedRoles == "account manager"
    )
    break
  // ... (other cases)

  default:
    roleBasedRoutes = [
      {
        path: "/unauthorized",
        component: () => <div>Unauthorized access</div>,
      },
    ]
}
export { userRoutes, authRoutes, roleBasedRoutes }
