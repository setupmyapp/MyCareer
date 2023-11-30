import React from "react"
import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

import { useHistory } from "react-router-dom"
// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"
import { IPAddress } from "../../../util/APIUtil"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeLogin,
  postJwtLogin,
} from "../../../helpers/fakebackend_helper"
import Swal from "sweetalert2"
import { error } from "toastr"

const fireBaseBackend = getFirebaseBackend()

// function* loginUser({ payload: { user, history } }) {
//   //console.log(user);
//   if (user && user.email && user.password) {
//     const url = "http://localhost:8085/rest/noAuth/sample/loginUserRequest"

//     const headers = {
//       "Content-Type": "application/json",
//     }

//     const data = {
//       email: user.email,
//       passWrd: user.password,
//     }
//     console.log(data)
//     try {
//       const response = yield fetch(url, {
//         //mode: 'cors',
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(data),
//       })

//       const validUser = yield response.json()
//       // console.log("validUser", validUser)

//       localStorage.setItem("authUser", JSON.stringify(validUser))
//       //       if (validUser.data === 'User logged in successfully!') {
//       //         history.push('/dashboard');

//       //       }
//       //     } catch (error) {
//       //       console.log('Error:', error);
//       //     }
//       //   } else {
//       //     console.log("Invalid user");

//       //   }
//       // }
//       console.log(authUser)
//       Swal.fire(
//         "Congratulation!",
//         "Succesfully Logged in",

//         "success"
//       )
//       if (validUser.accessToken) {
//         console.log(validUser.hasPassWrdChanged)
//         if (validUser.hasPassWrdChanged == false) {
//           history.push("/settings")
//         } else {
//           const Token = validUser.accessToken

//           history.push("/dashboard")
//         }
//       }
//     } catch (error) {
//       console.log("Error:", error)
//     }
//   }
// }
function* loginUser({ payload: { user, history } }) {
  try {
    const url = `${IPAddress}user/NoAuth/loginUser`

    const headers = {
      "Content-Type": "application/json",
    }
    const data = {
      userName: user.email,
      passWrd: user.password,
    }

    const response = yield fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })

    if (response.status === 200) {
      const validUser = yield response.json()
      localStorage.setItem("authUser", JSON.stringify(validUser))

      Swal.fire("congratulation!", "Successfully Logged In")
      const storedFormValues = localStorage.getItem("authUser")
      const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}
      const role = authUser.rolesList[0]
      authUser.newKey = "value"
      const newKeyValue = authUser.newKey
      console.log(newKeyValue)
      localStorage.setItem("authUser1", JSON.stringify(authUser))

      const loginresponse = {
        isLoggin: true,
      }

      if (loginresponse.isLoggin) {
        history.push("/settings", {
          alertMessage: "Kindly Change Your Password!!",
        })

        // if (role === "HR_SUPPORT") {
        //   history.push("/dashboardhr");
        // } else if (role === "SUPER_ADMIN") {
        //   history.push("/dashboardadmin");
        // } else if (role === "ACCOUNT_MANAGER") {
        //   history.push("/dashboardam");
        // } else {
        //   history.push("/dashboardtm");
        // }
      }
    } else {
      Swal.fire("Login Failed", "Invalid Username/Password", "error")
    }
  } catch (error) {
    console.log("Error:", error)
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response))
    }
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
