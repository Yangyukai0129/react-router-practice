import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const storedUser = localStorage.getItem('user')
    const parsedUser = JSON.parse(storedUser)
    // 如果localStorage內的資料消失了會返回false，如果只是單寫parsedUser.login的話localStorage內的資料消失會報錯
    const isLoggedIn = parsedUser && parsedUser.login
    const pathname = new URL(request.url).pathname
    // console.log(parsedUser)

    if (!isLoggedIn) {
        return redirect(`/login?message=You must log in first.&redirectTo=${pathname}`)
    }

    return null
}