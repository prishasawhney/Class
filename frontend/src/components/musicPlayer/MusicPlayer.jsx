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
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function MediaControlCard() {
    const theme = useTheme();

    return (
        <Card sx={{ display: 'flex', maxWidth: 300, height: 80, marginTop: '10px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 0.5 }}>
                <CardContent sx={{ flex: '1 0 auto', p: 0.5 }}>
                    <Typography component="div" variant="h5" sx={{ fontSize: 15 }}>
                        Live From Space
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{ color: 'text.secondary', fontSize: 12 }}
                    >
                        Mac Miller
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 0.3, pb: 0.5 }}>
                    <IconButton aria-label="previous" size="small">
                        {theme.direction === 'rtl' ? <SkipNextIcon fontSize="small" /> : <SkipPreviousIcon fontSize="small" />}
                    </IconButton>
                    <IconButton aria-label="play/pause" size="small">
                        <PlayArrowIcon sx={{ height: 20, width: 20 }} />
                    </IconButton>
                    <IconButton aria-label="next" size="small">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon fontSize="small" /> : <SkipNextIcon fontSize="small" />}
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: '40%', height: '100%' }}
                image="https://wallpapers.com/images/featured/aesthetic-pictures-hv6f88paqtseqh92.jpg"
                alt="Live from space album cover"
            />
        </Card>
    );
}
