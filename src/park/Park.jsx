import React from "react"
import { useLoadScript, GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api"

import "./Park.css"
import ParkMarker from "./ParkMarker";



function Park() {

    // user location object
    const [userCoords, setUserCoords] = React.useState()

    // define libraries as const to prevent "Performance warning! LoadScript has been reloaded unintentionally" warning
    const [libraries] = React.useState(['places'])

    // all Marker components
    const [parkMarkers, setParkMarkers] = React.useState([])


    // use effect to get user location only once (prevent infinite component remounting)
    React.useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            // success callback sets user coords in state
            (position) => {
                const latLng = { lat: +position.coords.latitude, lng: +position.coords.longitude }
                setUserCoords(latLng)
            },
            // failure callback
            () => {
                return <ErrorDisplay />
            }
        )
    }, [])

    // this hook loads Maps API from CDN (API key is saved in environment variable)
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries
    })

    // only display map when Maps API and user coordinates are loaded
    if (!isLoaded || !userCoords) {
        return <ErrorDisplay />
    }

    // when the map loads, search for nearby parks
    function loadPlaces(map) {

        // request to find all parks closest to user's location
        const request = {
            location: userCoords,
            rankBy: google.maps.places.RankBy.DISTANCE,
            type: "park"
        };

        // Google Places "Nearby Search" API
        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(
            request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {

                    // create Bounds for map, which will expand to fit each LatLng
                    const bounds = new google.maps.LatLngBounds()

                    // limit to 5 results
                    for (let i = 0; i < results.length && i < 5; i++) {

                        // create CustomMarker component for each park and push to state array
                        let marker = <ParkMarker
                            key={results[i].place_id}
                            result={results[i]}
                        />

                        setParkMarkers(prevMarkers => [...prevMarkers, marker])

                        // expand bounds to include the marker
                        bounds.extend(results[i].geometry.location)
                    }

                    // after all Markers created, expand map to the bounds
                    map.fitBounds(bounds)
                }
            }
        )
    }




    return (
        <>
            <div className="centered">
                <h1>Get Fresh Air</h1>
                <p>Use the Park Locator to find your nearest green spaces. Click the markers to get details about each park.</p>

            </div>

            <div className="map-box">
                <GoogleMap
                    center={userCoords}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    onLoad={map => loadPlaces(map)}
                >
                    <MarkerF position={userCoords} />

                    {parkMarkers}

                </GoogleMap>

            </div>

        </>
    )
}


// this component is displayed if user denies geolocation or if Google Maps API call is unsuccessful
function ErrorDisplay(props) {
    return (
        <div className="centered">
            <h1>Get Fresh Air</h1>
            <p>Please enable browser geolocation to use this feature. </p>
            <p className="strong"> Waiting for map to load...</p>
        </div>
    )
}


export default Park