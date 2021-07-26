import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"

export const viewVideo = async id => {
    let name = await axios.get(`https://node-app-gold.vercel.app/video?id=${id}`);
    return {
        type: "VIEW_VIDEO_LOG",
        payload: { id, name: name.data }
    }
}


export const getLogs = async (data) => {
    let aa = await AsyncStorage.getItem("@logs");
    aa = JSON.parse(aa);
    let result = aa;
    // console.log(result);
    if (aa) {
        // result = aa;
        return {
            type: "GETLOGS",
            payload: result
        }
    }
    return {
        type: "GETLOGS",
        payload: {}
    }
}