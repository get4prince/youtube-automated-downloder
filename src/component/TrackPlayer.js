import React, { useEffect } from "react";
import TrackPlayer from 'react-native-track-player';

export const TrackPlayer = (props) => {
    useEffect(async () => {
        await TrackPlayer.setupPlayer({})
    }, [])
    return (
        <></>
    )
}