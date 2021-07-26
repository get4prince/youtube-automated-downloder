import React, { useState, useEffect } from "react";
import RNBackgroundDownloader from 'react-native-background-downloader';
import RNFS, { getAllExternalFilesDirs } from 'react-native-fs'
import { loadAllOldSong } from "./../actions/files"
import { getLogs } from "./../actions/logs"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import axios from "axios"
import { LogBox } from "react-native";

const LoadFiles = (props) => {
    const getAllFiles = async () => {
        let url = RNBackgroundDownloader.directories.documents;
        RNFS.readDir(url) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then(async (result) => {
                // console.log(result, result.length, "dskandlmsaml");
                let arrNewDownload = [];
                for (let i = 0; i < result.length; i++) {//stat all files
                    let key = result[i].name.slice(0, result[i].name.length - 4);
                    let data = result[i];
                    data.videoName = props.logs[key].name;
                    arrNewDownload.push(data);
                }
                props.loadAllOldSong(arrNewDownload);
            })
            .then((statResult) => {
            })
            .then((contents) => {
            })
            .catch((err) => {
                console.log(err);
                console.log(err.message, err.code);
            });
    }


    useEffect(() => {
        if (props.logs.loaded) {
            getAllFiles();
        }
    }, [props.logs]);

    useEffect(() => {
        props.getLogs();
    }, []);

    return (
        <></>
    );
}


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        loadAllOldSong, getLogs
    }, dispatch)
);


const mapStateToProps = (state) => {
    return {
        logs: state.logs,
        files: state.files
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(LoadFiles);