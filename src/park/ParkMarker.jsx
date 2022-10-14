import React from "react"
import { MarkerF, InfoWindowF } from "@react-google-maps/api"

import "./Park.css"
import treeMarker from "../assets/tree-marker.svg"

/* customizing the MarkerF component allows for each marker to maintain its own active state, 
showing its associated InfoWindowF component when clicked and hiding it on window's closeClick event */
function ParkMarker(props) {

    // true when InfoWindow is visible
    const [isActive, setIsActive] = React.useState(false)

    return (
        <MarkerF
            position={props.result.geometry.location}
            icon={treeMarker}
            onClick={() => setIsActive(true)}
        >

            {isActive
                &&
                <InfoWindowF
                    position={props.result.geometry.location}
                    onCloseClick={() => setIsActive(false)}
                >
                    <>
                        <div className="place-title">{props.result.name}</div>
                        <div className="place-address">{props.result.vicinity}</div>
                    </>
                </InfoWindowF>
            }

        </MarkerF>
    )

}



export default ParkMarker