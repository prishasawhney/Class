import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";

const SongsContext = createContext();
const audioRef = new Audio(); // ✅ Persistent audio instance across components

export const SongsProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
    const { username } = useAuth(); // Get username from AuthContext

    const tracks = [
        {
            title: "Perfect",
            artist: "Ed Sheeran",
            src: "https://mr-jat.in/dlod/6239?&volume=75&showstop=1&showvolume=1",
            image: "https://i1.sndcdn.com/artworks-000223977248-5owk0a-t500x500.jpg"
        },
        {
            title: "Apna Bana Le",
            artist: "Arijit Singh",
            src: "https://pagalfree.com/musics/128-Apna%20Bana%20Le%20-%20Bhediya%20128%20Kbps.mp3",
            image: "https://i.scdn.co/image/ab67616d0000b27329455d0a5c4ae1ac20510f84",
        },
        {
            title: "Softly",
            artist: "Karan Aujla",
            src: "https://pagalfree.com/musics/128-Softly%20-%20Making%20Memories%20128%20Kbps.mp3",
            image: "https://i1.sndcdn.com/artworks-Kxf3gjwEYxWyWETy-eHg5zg-t1080x1080.jpg",
        },
    ];

    useEffect(() => {
        if (audioRef.src !== tracks[currentTrack].src) {
            audioRef.pause(); 
            audioRef.src = tracks[currentTrack].src; 
            audioRef.load();
            audioRef.currentTime = 0; 
        }

        if (isPlaying) {
            audioRef.play().catch((err) => console.error("Error playing:", err));
        }

        audioRef.onended = () => handleNext();

        return () => {
            audioRef.onended = null;
        };
    }, [currentTrack, isPlaying]); 

    const handlePlayPause = () => {
        if (audioRef.paused) {
            audioRef.play();
            setIsPlaying(true);
            if (!hasPlayedOnce) setHasPlayedOnce(true);
        } else {
            audioRef.pause();
            setIsPlaying(false);
        }
    };

    const handleNext = () => {
        setIsPlaying(false); 
        setTimeout(() => {
            setCurrentTrack((prev) => (prev + 1) % tracks.length);
            setIsPlaying(true);
        }, 100);
    };

    const handlePrevious = () => {
        setIsPlaying(false);
        setTimeout(() => {
            setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
            setIsPlaying(true);
        }, 100);
    };

    const handleTrackClick = (index) => {
        setIsPlaying(false); 
        setTimeout(() => {
            setCurrentTrack(index); 
            setIsPlaying(true);
        }, 100);
    };

    return (
        <SongsContext.Provider
            value={{
                tracks,
                currentTrack,
                isPlaying,
                hasPlayedOnce,
                handlePlayPause,
                handleNext,
                handlePrevious,
                handleTrackClick,
                audioRef,
            }}
        >
            {children}
        </SongsContext.Provider>
    );
};

export const useSongs = () => {
    return useContext(SongsContext);
};
