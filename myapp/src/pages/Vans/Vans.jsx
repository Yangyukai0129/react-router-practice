import React from "react";
import { defer, useLoaderData, useSearchParams } from "react-router-dom"
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

    return (
        <div>Vans is here</div>
    )
}