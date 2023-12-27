import React, { useState, useEffect } from "react";
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
                const loginUser = user.user
                const login = {
                    uid: uid,
                    login: "true",
                    user: user
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
    const storedUser = localStorage.getItem("user") || '';
    const [forceRender, setForceRender] = useState(0);

    function logout() {
        localStorage.removeItem("user")
    }

    useEffect(() => {
        // 这里的代码会在组件渲染后执行，类似于componentDidUpdate
        setForceRender(prev => prev + 1);
    }, [forceRender]); // 当 forceRender 更新时触发 useEffect
    // console.log(navigation)

    if (!!storedUser) {
        return (
            <div className="login-container">
                <h1>Log out</h1>
                <div>
                    <button onClick={() => logout()}>
                        logout
                    </button>
                </div>
            </div>
        )
    }
    else {
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
}