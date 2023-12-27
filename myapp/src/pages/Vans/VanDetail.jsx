import React from "react";
import { Await, defer, useLoaderData, useLocation, Link } from "react-router-dom"
import { getVan } from "../../api"

export async function loader({ params }) {
    return defer({ detail: getVan(params.id) })
}

export default function VansDetail() {
    const location = useLocation()
    const dataPromise = useLoaderData()
    const search = location.state && location.state.search || ""
    const type = location.state && location.state.type || "all"

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            <React.Suspense fallback={<h2>Loading...</h2>}>
                <Await resolve={dataPromise.detail}>
                    {(van) => {
                        return (
                            <div className="van-detail">
                                <img src={van.imageUrl} />
                                <br />
                                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                                <h2>{van.name}</h2>
                                <p className="van-price"><span>${van.price}</span>/day</p>
                                <p>{van.description}</p>
                                <button className="link-button">Rent this van</button>
                            </div>
                        )
                    }}
                </Await>
            </React.Suspense>
        </div>
    )

}