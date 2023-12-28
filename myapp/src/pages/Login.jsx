import React from "react";
import { Form, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom"
import Auth from "../api"

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"

    try {
        await Auth(email, password).then(
            user => {
                const uid = user.uid
                const login = {
                    uid: uid,
                    login: "true",
                }
                localStorage.setItem('user', JSON.stringify(login))
            }
        )

        setTimeout(function () {
            // 清除localStorage中的特定数据
            localStorage.removeItem('user')
            // console.log('localStorage data cleared!');
        }, 100000)

        return redirect(pathname)
    }
    catch (err) {
        if (!email) {
            return "Please enter your Email"
        }
        if (!password) {
            return "Please enter your password"
        }
        return "Your Email or password is wrong"
    }
}

export default function Login() {
    const navigation = useNavigation()
    const errorMessage = useActionData()
    const storedUser = localStorage.getItem("user") || ''
    const navigate = useNavigate()

    function Logout() {
        localStorage.removeItem("user")
        window.location.reload()
    }


    // console.log(navigation)

    if (!storedUser) {
        return (
            <div className="login-container">
                <h1>Sign in to your account</h1>
                {errorMessage && <h3 className="red">{errorMessage}</h3>}
                <Form method="post" className="login-form" replace>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <button disabled={navigation.state === "submitting"}>
                        {navigation.state === "submitting" ? "Logging" : "Log in"}
                    </button>
                </Form>
            </div >
        )
    }
    else {
        return (
            <div className="login-container">
                <div className="login-form">
                    <h1>Do you want to Log out?</h1>
                    <div className="logout-button">
                        <button
                            className="logout-reject"
                            onClick={() => navigate(-1)}>
                            No
                        </button>
                        <button onClick={() => Logout()}>
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}