
const FilesReducer = (state = { oldLoaded: false }, action) => {
    switch (action.type) {
        case "LOAD_ALL_OLD_SONG": {
            let newState = {};
            for (let i = 0; i < action.payload.length; i++) {
                let dd = {};
                dd[action.payload[i].name] = {
                    name: action.payload[i].name,
                    path: action.payload[i].path,
                    size: action.payload[i].size / (1024 * 1024),
                    status: "Downloaded",
                    videoName: action.payload[i].videoName
                }
                newState = { ...newState, ...dd }
            }
            return {
                ...newState, ...{ oldLoaded: true }
            }
        }
        case "LOAD_ALL_DOWNLOAD": {
            let data = action.payload
            let newEntry = {};
            newEntry[data.name] = data;
            return {
                ...state, ...newEntry
            }
        }
        default: {
            return state
        }
    }
}

export default FilesReducer