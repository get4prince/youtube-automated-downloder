import React, { useEffect } from "react";
import ytdl from "react-native-ytdl"
import { viewVideo } from "./../actions/logs"
import { loadNewDownload } from "./../actions/files";
import { connect } from 'react-redux'
import RNFS from 'react-native-fs'
import { bindActionCreators } from 'redux';
import RNBackgroundDownloader from 'react-native-background-downloader';
import axios from "axios";

const maxSong = 10;
const TrackSong = (props) => {
    const downloadsong = (downloadUrl, url, id) => {
        let size = null;
        let task = RNBackgroundDownloader.download({
            id: `${id}.mp3`,
            url: downloadUrl,
            destination: `${url}/${id}.mp3`
        }).begin((expectedBytes) => {
            console.log(`Going to download ${expectedBytes} bytes!`);
            size = expectedBytes;
        }).progress((percent) => {
            console.log(`Downloaded: ${percent * 100}%`);
            return true;
        }).done(async () => {
            console.log('Download is done!');
            let url = RNBackgroundDownloader.directories.documents;
            let videoName = await axios.get(`https://node-app-gold.vercel.app/video?id=${id}`);

            let data = {
                name: `${id}.mp3`,
                path: `${url}/${id}.mp3`,
                size: size / (1024 * 1024),
                status: "Downloaded",
                videoName: videoName.data,
            }
            props.loadNewDownload(data);
        }).error((error) => {
            console.log('Download canceled due to error: ', error);
        });
    }

    const startDownloading = async (id) => {
        if (id) {
            let apiUrl = `https://node-app-gold.vercel.app/download?id=${id}`;
            let url = RNBackgroundDownloader.directories.documents;

            try {
                let data = await axios.get(apiUrl);
                let downloadUrl = data.data[0].url;
                return downloadsong(downloadUrl, url, id)
            }
            catch (err) {
                console.log(err, "dsdsa");
            }
        }
        // }
    }

    useEffect(() => {
        let params = props.url.split("v=");
        if (params.length > 1) {
            let id = ytdl.getVideoID(props.url);
            if (id) {
                props.viewVideo(id)
            }
        }
    }, [props.url]);

    useEffect(() => {
        if (props.files.oldLoaded) {
            let logs = props.logs;
            let files = props.files;
            console.log(files, "dsa");
            let topList = [];
            for (let key in logs) {
                topList.push({ id: key, count: logs[key].count })
            }

            let dd = topList.slice(0, maxSong);

            for (let i = 0; i < dd.length; i++) {
                if (files[`${dd[i].id}.mp3`] === undefined) {
                    console.log("download command");
                    startDownloading(dd[i].id);
                }
            }
        }

    }, [props.logs]);

    const deleteFiles = (id) => {
        let url = RNBackgroundDownloader.directories.documents;
        const filepath = `${url}/${id}.mp3`;

        RNFS.exists(filepath)
            .then((result) => {
                console.log("file exists: ", result);

                if (result) {
                    return RNFS.unlink(filepath)
                        .then(() => {
                            console.log('FILE DELETED');
                            // props.triggerFile();
                        })
                        // `unlink` will throw an error, if the item to unlink does not exist
                        .catch((err) => {
                            console.log(err.message);
                        });
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        let logs = props.logs;
        let files = props.files;
        if (files.oldLoaded) {
            let topList = [];
            for (let key in logs) {
                topList.push({ id: key, count: logs[key].count })
            }
            topList.sort(function (a, b) {
                return b.count - a.count;
            })
            let dd = topList.slice(0, maxSong);

            for (let key in files) {//trash removing
                if (key !== "oldLoaded") {
                    let ff = dd.find(element => element.id == key.slice(0, key.length - 4));
                    if (ff) {

                    }
                    else {
                        // no logs found then delete
                        deleteFiles(key.slice(0, key.length - 4));
                    }
                }
            }
        }
    }, [props.files]);

    return (
        <></>
    )
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        viewVideo, loadNewDownload
    }, dispatch)
);


const mapStateToProps = (state) => {
    return {
        logs: state.logs,
        files: state.files
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackSong);