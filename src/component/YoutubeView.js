import React, { useState } from "react"
import { WebView } from 'react-native-webview';
import TrackSong from "./TrackSong"

const YoutubeView = () => {
    const [currentUrl, setCurrentUrl] = useState("");
    const injectScript = `
  (function () {
    const clear = (() => {
      const defined = v => v !== null && v !== undefined;
      const timeout = setInterval(() => {
          const ad = [...document.querySelectorAll('.ad-showing')][0];
          if (defined(ad)) {
              const video = document.querySelector('video');
              if (defined(video)) {
                  video.currentTime = video.duration;
              }
          }
      }, 500);
      return function() {
          clearTimeout(timeout);
      }
  })();
                  }());
`;
    return (
        <>
            <WebView
                source={{
                    uri: "https://music.youtube.com/",
                }}
                onLoadProgress={({ nativeEvent }) => {
                    setCurrentUrl(nativeEvent.url);
                }}
                injectedJavaScript={injectScript}
            />
            <TrackSong url={currentUrl} />
        </>
    )
}
export default YoutubeView;