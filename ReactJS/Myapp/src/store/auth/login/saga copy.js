import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { useHistory } from "react-router-dom"
// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeLogin,
  postJwtLogin,
} from "../../../helpers/fakebackend_helper"
import Swal from "sweetalert2"

const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user, history } }) {
  //console.log(user);
  if (user && user.email && user.password) {
    const url = "http://localhost:8085/rest/noAuth/sample/loginUserRequest"

    const headers = {
      "Content-Type": "application/json",
    }

    const data = {
      email: user.email,
      passWrd: user.password,
    }
    console.log(data)
    try {
      const response = yield fetch(url, {
        //mode: 'cors',
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })

      const validUser = yield response.json()
      // console.log("validUser", validUser)

      localStorage.setItem("authUser", JSON.stringify(validUser))
      //       if (validUser.data === 'User logged in successfully!') {
      //         history.push('/dashboard');

      //       }
      //     } catch (error) {
      //       console.log('Error:', error);
      //     }
      //   } else {
      //     console.log("Invalid user");

      //   }
      // }
      // Swal.fire(
      //   "Congratulation!",
      //   "Succesfully Logged in",

      //   "success"
      // )
      if (validUser.accessToken) {
        console.log(validUser.hasPassWrdChanged)
        const authUser = storedFormValues ? JSON.parse(storedFormValues) : {}
        const role = authUser.rolesList[0]
        console.log(role)
        if (validUser.hasPassWrdChanged == false) {
          history.push("/settings")
        } else {
          const Token = validUser.accessToken

          history.push("/testdashboard")
        }
      }
    } catch (error) {
      console.log("Error:", error)
    }
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
