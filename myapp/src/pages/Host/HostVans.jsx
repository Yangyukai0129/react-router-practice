import React, { Suspense } from "react";
import { defer, useLoaderData, Await, Link } from "react-router-dom"
import { requireAuth } from "../../util";
import { getHostVans } from "../../api"

export async function loader({ request }) {
    await requireAuth(request)
    return defer({ van: getHostVans() })
}

export default function HostVans() {
    const dataPromise = useLoaderData()

    return (
        <section>
            <h1 className="host-vans-title">Your list van</h1>
            <React.Suspense fallback={<h2>Loading vans...</h2>}>
                <Await resolve={dataPromise.van}>
                    {
                        (van) => {
                            const hostVanEls = van.map(van => (
                                <Link
                                    to={van.id}
                                    key={van.id}
                                    className="host-van-link-wrapper"
                                >
                                    <div className="host-van-single">
                                        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                                        <div className="host-van-info">
                                            <h3>{van.name}</h3>
                                            <p>${van.price}<span>/day</span></p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                            return (
                                <div className="host-vans-list">
                                    <section>
                                        {hostVanEls}
                                    </section>
                                </div>
                            )
                        }
                    }
                </Await>
            </React.Suspense>
        </section >
    )
}