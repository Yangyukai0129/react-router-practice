import React from "react";
import { Link, NavLink, Outlet, defer, Await, useLoaderData } from "react-router-dom";
import { requireAuth } from "../../util";
import { getVan } from "../../api";

export async function loader({ request, params }) {
    await requireAuth(request)
    // 返回一個包含資料的對象，以便在組件中使用
    return defer({ detail: getVan(params.id) });
}

export default function HostVanDetail() {
    const dataPromise = useLoaderData()

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span>
            </Link>
            <div className="host-van-detail-layout-container">
                <React.Suspense fallback={<h2>Loading...</h2>}>
                    <Await resolve={dataPromise.detail}>
                        {(currentVan) => {
                            return (
                                <>
                                    <div className="host-van-detail">
                                        <img src={currentVan.imageUrl} width={150} />
                                        <div>
                                            <i className={`van-type van-type-${currentVan.type}`}>{currentVan.type}</i>
                                            <h3>{currentVan.name}</h3>
                                            <h4>${currentVan.price}/day</h4>
                                        </div>
                                    </div>
                                    <nav className="host-nav">
                                        <NavLink
                                            to="."
                                            end
                                            style={({ isActive }) => isActive ? activeStyles : null}>Details</NavLink>
                                        <NavLink
                                            to="photos"
                                            style={({ isActive }) => isActive ? activeStyles : null}>Photos</NavLink>
                                        <NavLink
                                            to="pricing"
                                            style={({ isActive }) => isActive ? activeStyles : null}>Pricing</NavLink>
                                    </nav>
                                    <Outlet context={currentVan} />
                                </>)
                        }
                        }
                    </Await>
                </React.Suspense>
            </div>
        </section>
    )
}