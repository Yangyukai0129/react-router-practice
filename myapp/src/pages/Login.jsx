import React, { useEffect } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom"
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
                    login: "true"
                }
                localStorage.setItem('user', JSON.stringify(login))

            }
        )

        // localStorage.setItem("login", true)

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


    // console.log(navigation)
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