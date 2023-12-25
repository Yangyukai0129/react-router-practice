import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
    const currentVan = useOutletContext()

    return (
        <div className="host-van-detail">
            <img src={currentVan.imageUrl}></img>
        </div>
    )
}