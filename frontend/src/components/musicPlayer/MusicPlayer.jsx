import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useSongs } from '../../contexts/SongsContext';

export default function MediaControlCard() {
    const theme = useTheme();
    const { 
        tracks, currentTrack, isPlaying, handlePlayPause, 
        handleNext, handlePrevious, audioRef
    } = useSongs();

    React.useEffect(() => {
        // Ensure audio plays/pauses correctly when state updates
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => console.error("Playback error:", error));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    return (
        <Card sx={{ display: 'flex', maxWidth: 320, height: 100, marginTop: '10px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 1 }}>
                <CardContent sx={{ flex: '1 0 auto', p: 0.5 }}>
                    <Typography component="div" variant="h6" sx={{ fontSize: 16 }}>
                        {tracks[currentTrack]?.title || "No Track Selected"}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{ color: 'text.secondary', fontSize: 12 }}
                    >
                        {tracks[currentTrack]?.artist || "Unknown Artist"}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 0.3, pb: 0.5 }}>
                    <IconButton aria-label="previous" size="small" onClick={handlePrevious}>
                        {theme.direction === 'rtl' ? <SkipNextIcon fontSize="small" /> : <SkipPreviousIcon fontSize="small" />}
                    </IconButton>
                    <IconButton aria-label="play/pause" size="small" onClick={handlePlayPause}>
                        {isPlaying ? <PauseIcon sx={{ height: 24, width: 24 }} /> : <PlayArrowIcon sx={{ height: 24, width: 24 }} />}
                    </IconButton>
                    <IconButton aria-label="next" size="small" onClick={handleNext}>
                        {theme.direction === 'rtl' ? <SkipPreviousIcon fontSize="small" /> : <SkipNextIcon fontSize="small" />}
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: '35%', height: '100%' }}
                image={tracks[currentTrack].image}
                alt="Album cover"
            />
        </Card>
    );
}
