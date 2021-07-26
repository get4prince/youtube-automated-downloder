import AsyncStorage from '@react-native-async-storage/async-storage';

async function setData(data) {
    let dd = JSON.stringify(data);
    await AsyncStorage.setItem("@logs", dd);
}

const loggerReducer = (state = { loaded: false }, action) => {
    switch (action.type) {
        case "VIEW_VIDEO_LOG": {
            let data = { ...state };
            let { id, name } = action.payload;
            if (data[id] === undefined) {
                data[id] = {
                    count: 1,
                    name
                }
            }
            else {
                data[id].count++;
            }
            let dd = { ...state, ...data, ...{ loaded: false } };
            setData(dd);
            return dd;
        }
        case "GETLOGS": {
            let ss = action.payload;
            return {
                ...ss, ... {
                    loaded: true
                }
            }
        }
        default: return { ...state, ...{ loaded: false } }
    }
}

export default loggerReducer