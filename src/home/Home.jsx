import React from "react";

import playButton from "../assets/play-button.svg"
import stopButton from "../assets/stop-button.svg"

import { musicList } from "./musicList";

import "./Home.css"

// home page component is a meditation timer
function Home() {

    const [startTime, setStartTime] = React.useState(null)
    const [elapsedTime, setElapsedTime] = React.useState(null)
    const [isPlaying, setPlaying] = React.useState(false)

    // music choice is array index. (can add more mp3s in musicList.js) 
    const [musicChoice, setMusicChoice] = React.useState(0)

    // helper function to format displayed time
    function formatTime(time) {
        if (!time) return "0:00"
        time = time / 1000
        let seconds = Math.floor(time % 60);
        let secondString = seconds < 10 ? "0" + seconds : seconds;
        time = Math.floor(time / 60)
        let minutes = time % 60;

        return `${minutes}:${secondString}`
    }

    // select dropdown options
    const selectOptions = musicList.map((song, index) => {
        return <option key={song.title} value={index}>{song.title} </option>
    })

    function formChange(event) {
        const audio = document.getElementById("audio")
        audio.pause()
        audio.currentTime = 0
        setMusicChoice(event.target.value)

        if (isPlaying) {
            /* play() returns a promise, using setTimeout to prevent this exception
            "Uncaught (in promise) DOMException: The play() request was interrupted by a new load request" */
            setTimeout(() => audio.play(), 100)
        }
    }


    function startMeditation() {
        // clear elapsed time first so display immediately shows 0:00
        setElapsedTime(null)
        document.getElementById("audio").play()
        setPlaying(true)
        setStartTime(new Date())

    }

    function stopMeditation() {
        const audio = document.getElementById("audio")
        audio.pause()
        audio.currentTime = 0
        setPlaying(false)
    }

    React.useEffect(() => {

        if (isPlaying) {
            // update the elapsed meditation time every 1 second
            const interval = setInterval(() => {
                setElapsedTime(new Date().getTime() - startTime.getTime())
            }, 1000)

            // return cleanup function to clear interval on unmount
            return () => clearInterval(interval)
        }

        // this effect will run when isPlaying changes
    }, [isPlaying])


    return (
        <>
            <div className="centered">
                <h1>Meditation Timer</h1>
                <p>Take a seat, press play, and focus on your breath, gently returning attention to your breath
                    when you notice your mind has wandered.</p>
            </div>
            <div className="timer">
                {formatTime(elapsedTime)}
            </div>
            <div className="buttons">
                <img
                    src={playButton}
                    alt="play meditation button"
                    onClick={startMeditation}
                    className={isPlaying ? "disabled" : "enabled"}
                >
                </img>
                <img
                    src={stopButton}
                    alt="stop meditation button"
                    onClick={stopMeditation}
                    className={isPlaying ? "enabled" : "disabled"}
                >
                </img>

                {/* music loops back to beginning at end of mp3 */}
                <audio loop id="audio" src={musicList[musicChoice].file}></audio>
            </div>

            {/* music choice form */}
            <div className="buttons">

                <select
                    id="musicChoice"
                    value={musicChoice}
                    onChange={formChange}
                    name="musicChoice"
                >
                    {selectOptions}
                </select>
            </div>
        </>
    )
}

export default Home


// rainforest
