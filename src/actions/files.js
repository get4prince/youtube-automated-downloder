
export const loadAllOldSong = data => {
    return {
        type: "LOAD_ALL_OLD_SONG",
        payload: data
    }
}

export const loadNewDownload = data => {
    return {
        type: "LOAD_ALL_DOWNLOAD",
        payload: data
    }
}
