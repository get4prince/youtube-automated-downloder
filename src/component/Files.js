import React, { useEffect } from "react";
import RNBackgroundDownloader from 'react-native-background-downloader';

import { TouchableOpacity, Image, StyleSheet, Dimensions, View, Text } from "react-native";
import { DataTable } from 'react-native-paper';
import { connect } from 'react-redux'
import Sound from "react-native-sound";
import TrackPlayer, { State } from 'react-native-track-player';


const Files = (props) => {
    // let trackIndex = await TrackPlayer.getCurrentTrack();
    // console.log(trackIndex);
    // const dd = await TrackPlayer.getState();
    // if (dd === State.Playing) {
    //     console.log('The player is playing');
    // };

    const [ModalOpen, setModalOpen] = React.useState(false)
    const [fileStatus, setFileStatus] = React.useState({})

    const handleModelOpen = () => {
        setModalOpen(true);
    }

    useEffect(() => {
        setFileStatus(props.files);
    }, [props.files])

    const startTrackPlayer = async (fileUrl, key) => {
        console.log(`file://${fileUrl}`);
        // await TrackPlayer.setupPlayer({});

        await TrackPlayer.add([{
            id: key,
            url: `file://${fileUrl}`,
            title: 'Track Title',
            artist: 'Track Artist',
            artwork: `https://img.youtube.com/vi/${key.slice(0, key.length - 4)}/ 0.jpg`
        }]);
        await TrackPlayer.play();
        // let trackIndex = await TrackPlayer.getCurrentTrack();
        // console.log(trackIndex);
        // const dd = await TrackPlayer.getState();
        // if (dd === State.Playing) {
        //     console.log('The player is playing');
        // };


    }

    const start = (path, key) => {
        let url = `${RNBackgroundDownloader.directories.documents}/${key}`;
        startTrackPlayer(url, key);
        // console.log(`${url}/${key}`);
        if (fileStatus[key].statusPlay === "stop") {
            let filest = { ...fileStatus };
            fileStatus[key].sound.stop();
            filest[key].statusPlay = "play"
            setFileStatus(filest);
        }
        else {
            fileStatus[key].sound = new Sound(path, "", (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                else {
                    console.log('duration in seconds: ' + fileStatus[key].sound.getDuration() + 'number of channels: ' + fileStatus[key].sound.getNumberOfChannels());
                    for (let file in fileStatus) {
                        console.log(file, key, "mlkm");
                        if (file === key) {
                            let filest = { ...fileStatus };

                            fileStatus[key].sound.play();
                            filest[key].statusPlay = "stop"
                            setFileStatus(filest);
                        }
                        else {
                            let filest = { ...fileStatus };

                            if (fileStatus[file].sound) {
                                fileStatus[file].sound.stop();
                                filest[file].statusPlay = "play"
                                setFileStatus(filest);
                            }

                        }
                        // console.log(fileStatus[key]);
                        // setFileStatus(filest);
                    }
                }
            });
        }

    };

    return (
        <>
            {ModalOpen == false ?
                <TouchableOpacity
                    onPress={() => handleModelOpen()}
                    style={styles.touchableOpacityStyle}
                >
                    <Image
                        //We are making FAB using TouchableOpacity with an image
                        //We are using online image here
                        source={{
                            uri:
                                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
                        }}
                        //You can use you project image Example below
                        //source={require('./images/float-add-icon.png')}
                        style={styles.floatingButtonStyle}
                    />
                </TouchableOpacity>
                :
                <>
                    <View style={styles.ModalStyle}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Name</DataTable.Title>
                                <DataTable.Title numeric>Size</DataTable.Title>
                                <DataTable.Title numeric>Status</DataTable.Title>
                                <DataTable.Title numeric>Play Time</DataTable.Title>
                                <DataTable.Title numeric>Play</DataTable.Title>
                            </DataTable.Header>
                            {
                                Object.keys(props.files).map((key) => {
                                    if (props.logs[key.slice(0, key.length - 4)]) {
                                        return (
                                            <DataTable.Row key={key}>
                                                <DataTable.Cell>{props.files[key].videoName}</DataTable.Cell>
                                                <DataTable.Cell numeric>{props.files[key].size.toFixed(2)}</DataTable.Cell>
                                                <DataTable.Cell numeric>{props.files[key].status}</DataTable.Cell>
                                                <DataTable.Cell numeric>{props.logs[key.slice(0, key.length - 4)].count}</DataTable.Cell>
                                                <DataTable.Cell numeric>
                                                    <TouchableOpacity onPress={() => start(props.files[key].path, key)}>
                                                        <Text>{props.files[key].statusPlay == undefined || props.files[key].statusPlay == "play" ? "play" : props.files[key].statusPlay}</Text>
                                                    </TouchableOpacity>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                        )
                                    }
                                })
                            }

                        </DataTable>

                        <TouchableOpacity
                            onPress={() => setModalOpen(false)}
                            style={{ position: 'absolute', right: 10 }}
                        >
                            <Text style={styles.closeText}>X</Text>
                        </TouchableOpacity>

                    </View>

                </>
            }

            {/* <Tracker /> */}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        logs: state.logs,
        files: state.files
    };
};


export default connect(mapStateToProps)(Files);

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        zIndex: 1
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },
    ModalStyle: {
        height: Dimensions.get('window').height,
        width: '100%',
        backgroundColor: 'salmon',

    },
    closeText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})