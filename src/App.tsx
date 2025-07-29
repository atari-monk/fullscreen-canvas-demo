import "./App.css";
import "@atari-monk/fullscreen-canvas/FullscreenCanvas.css";
import { FullscreenCanvas } from "@atari-monk/fullscreen-canvas";
import { useEffect, useState } from "react";
import type { DrawingScheme } from "./types/DrawingScheme";
import { drawingSchemes } from "./stars/drawingSchemes";

function App() {
    const [currentSchemeIndex, setCurrentSchemeIndex] = useState(0);
    const [schemes] = useState<DrawingScheme[]>(drawingSchemes);
    const [isPlaying, setIsPlaying] = useState(false);

    const startAnimations = () => {
        setIsPlaying(true);
        document.body.classList.add("hide-cursor");
        // Play sound automatically when starting
        new Audio("music.mp3")
            .play()
            .catch((e) => console.error("Audio playback failed:", e));
    };

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setCurrentSchemeIndex(
                (prevIndex) => (prevIndex + 1) % schemes.length
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [schemes.length, isPlaying]);

    return (
        <div className="App">
            {/* Only show start button when not playing */}
            {!isPlaying && (
                <button
                    onClick={startAnimations}
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "15px 30px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "20px",
                        zIndex: 1000,
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    }}
                >
                    Start Animations
                </button>
            )}

            {/* <div className="scheme-info">
                <div className="scheme-name">
                    {schemes[currentSchemeIndex].name}
                </div>
                <div className="scheme-progress">
                    {currentSchemeIndex + 1}/{schemes.length}
                </div>
            </div> */}
            <FullscreenCanvas
                draw={schemes[currentSchemeIndex].draw}
                loop={true}
            />
        </div>
    );
}

export default App;
