import PropTypes from "prop-types"
import React, { useEffect } from "react"

import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes, roleBasedRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"
import PerformanceRating from "pages/Customer Feedback/PerformanceRating"
// Import scss
import "./assets/scss/theme.scss"

const storedFormValues = localStorage.getItem("authUser")
const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}
// const role = authUser.rolesList[0]

const isAuthenticated = true
// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

//import fakeBackend from "./helpers/AuthType/fakeBackend"

// Activating fake backend
//fakeBackend()

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// }

// init firebase backend
// initFirebaseBackend(firebaseConfig)
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
)

console.log(roleBasedRoutes)
const App = props => {
  // {alert('hiii')}
  //   useEffect(() => {
  //     alert('hii')
  //     document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  //   }, [])

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {/* Public route - accessible without login */}

          <Route
            exact
            path="/performance-rating?name='Sai%Subhashree'&reporting='PraveenDev'&dept='SONYSARD'&empId='20211331'"
            component={PerformanceRating}
          />

          <PrivateRoute
            exact
            path="/performance-rating"
            component={PerformanceRating}
            isAuthenticated={isAuthenticated}
          />

          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}

          {roleBasedRoutes.map((route, idx) => (
            <Authmiddleware
              key={idx}
              path={route.path}
              layout={Layout}
              component={route.component}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
