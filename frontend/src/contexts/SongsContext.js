import { createContext, useState, useRef, useEffect, useContext } from "react";

const SongsContext = createContext();

export const SongsProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
    const audioRef = useRef(new Audio()); // Initialize an Audio object

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

    // Whenever `currentTrack` changes, load & play if needed
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = tracks[currentTrack].src;
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch((err) => console.error("Error playing:", err));
            }
        }
    }, [currentTrack]); // No need to track `isPlaying` here

    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
            if (!hasPlayedOnce) setHasPlayedOnce(true); // Mark the first play
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleNext = () => {
        setCurrentTrack((prev) => (prev + 1) % tracks.length);
        setIsPlaying(true); // Auto-play next song
    };

    const handlePrevious = () => {
        setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
        setIsPlaying(true); // Auto-play previous song
    };

    const handleTrackClick = (index) => {
        setCurrentTrack(index);
        setIsPlaying(true);
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
