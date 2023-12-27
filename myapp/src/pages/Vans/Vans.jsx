import React from "react";
import { defer, useLoaderData, useSearchParams, Link, Await } from "react-router-dom"
import { getVans } from "../../api";

export async function loader() {
    return defer({ vans: getVans() })
}

export default function Vans() {
    const dataPromise = useLoaderData()
    const [searchParams, setSearchParam] = useSearchParams()
    const typeFilter = searchParams.get("type")

    function handleFilterChange(key, value) {
        setSearchParam(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            }
            else {
                prevParams.set(key, value)
            }

            return prevParams
        })
    }

    function renderVanElements(vans) {
        const displayedVans = typeFilter ? vans.filter(item => item.type.toLowerCase() === typeFilter) : vans
        const vanElements = displayedVans.map(van => (
            <div key={van.id} className="van-tile">
                <Link
                    to={van.id}
                    state={{ search: `${searchParams.toString()}`, type: typeFilter }}
                >
                    <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                    <div>
                        <h3>{van.name}</h3>
                        <p>${van.price}<span>/day</span></p>
                    </div>
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                </Link>
            </div>
        ))
        return (
            <>
                <div className="van-list-filter-buttons">
                    <button onClick={() => handleFilterChange("type", "simple")}
                        className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}>
                        simple
                    </button>
                    <button onClick={() => handleFilterChange("type", "rugged")}
                        className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}>
                        rugged
                    </button>
                    <button onClick={() => handleFilterChange("type", "luxury")}
                        className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}>
                        luxury
                    </button>
                    {typeFilter ? <button onClick={() => handleFilterChange("type", null)}
                        className="van-type clear-filters">
                        clear
                    </button> : null}
                </div>
                <div className="van-list">
                    {vanElements}
                </div>
            </>
        )
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <React.Suspense fallback={<h2>Loading vans...</h2>}>
                <Await resolve={dataPromise.vans}>
                    {renderVanElements}
                </Await>
            </React.Suspense>
        </div>
    )
}