import React, { useEffect, useState } from "react"
import { Platform } from "react-native";
import configureStore from "./../store";
import { Provider } from "react-redux"
import YoutubeView from "./YoutubeView"
import Files from "./Files"
import LoadFiles from "./LoadFiles"
import OfflineScreen from "./OfflineScreen"
import NetInfo from "@react-native-community/netinfo";
import TrackPlayer from 'react-native-track-player';


const App = () => {
    // const netInfo = useNetInfo();
    const [netStateInfo, setNetInfo] = useState(false);
    NetInfo.addEventListener(networkState => {
        console.log("Connection type - ", networkState.type);
        console.log("Is connected? - ", networkState.isConnected);
        if (netStateInfo == false) {
            if (networkState.isConnected == true) {
                setNetInfo(true);
            }
        }
        else {
            if (networkState.isConnected == false) {
                setNetInfo(false);
            }
        }
    });
    useEffect(() => {
        // TrackPlayer.setupPlayer({}).then(async () => {
        // })
    }, []);
    return (
        <>
            <Provider store={configureStore}>
                {netStateInfo == true ? <YoutubeView /> : <OfflineScreen />}
                <Files />
                <LoadFiles />
            </Provider>
        </>

    )
}
export default App;