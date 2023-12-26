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
            <div key={van.id}>
                <Link
                    to={van.id}
                >
                    <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                    <div>
                        <h3>{van.name}</h3>
                        <p>${van.price}<span>/day</span></p>
                    </div>
                    <i>{van.type}</i>
                </Link>
            </div>
        ))
        return (
            <>
                <div>
                    <button onClick={() => handleFilterChange("type", "simple")}>
                        simple
                    </button>
                    <button onClick={() => handleFilterChange("type", "rugged")}>
                        rugged
                    </button>
                    <button onClick={() => handleFilterChange("type", "luxury")}>
                        luxury
                    </button>
                    {typeFilter ? <button onClick={() => handleFilterChange("type", null)}>
                        clear
                    </button> : null}
                </div>
                <div>
                    {vanElements}
                </div>
            </>
        )
    }

    return (
        <React.Suspense fallback={<h2>Loading vans...</h2>}>
            <Await resolve={dataPromise.vans}>
                {renderVanElements}
            </Await>
        </React.Suspense>
    )
}