import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from "react";
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Video } from 'expo-av';

export default function App() {
  const videoRef = useRef();
  //const [videoEnd, setVideoEnd] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [collectedCoin, setCollectedCoin] = useState(false);
  const [points, setPoints] = useState(0);

  const collectYourCoins = async () => {
    //setVideoEnd(!videoEnd);
    setCollectedCoin(!collectedCoin);
    setPoints(points + 1);
    try {
      (currentVideo != (mediaJSON.categories[0].videos.length - 1)) ? setCurrentVideo(currentVideo + 1) : setCurrentVideo(0);
      await videoRef.current.stopAsync();
      await videoRef.current.unloadAsync();
      await videoRef.current.loadAsync();
    } catch(error) {
      console.log(error)
    }
  }

  const nextVideo = async () => {
    //setVideoEnd(!videoEnd);
    setCollectedCoin(!collectedCoin);
    try {
      //(currentVideo != (mediaJSON.categories[0].videos.length - 1)) ?  setCurrentVideo(currentVideo + 1) : setCurrentVideo(0);
      await videoRef.current.loadAsync({uri: `${mediaJSON.categories[0].videos[currentVideo]["sources"]}`})
      await videoRef.current.playAsync()
    } catch(error) {
      console.log(error)
    }
  }

  const mediaJSON = { "categories" : [ { "name" : "Movies",
        "videos" : [
        { "description" : "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
          "sources" : [ "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" ],
          "subtitle" : "By Google",
          "thumb" : "https://d6u22qyv3ngwz.cloudfront.net/ad/76Ab/google-chromecast-bigger-blazes-small-7.jpg",
          "title" : "For Bigger Blazes"
        },
        { "description" : "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
          "sources" : [ "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" ],
          "subtitle" : "By Google",
          "thumb" : "https://i.ytimg.com/vi/ww3L56FTd1E/maxresdefault.jpg",
          "title" : "For Bigger Escape"
        },
        { "description" : "Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.",
          "sources" : [ "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" ],
          "subtitle" : "By Google",
          "thumb" : "https://www.cnet.com/a/img/resize/d917290bcbf175da001f554d648d8b0f653bc7b8/hub/2014/07/24/d855013b-a958-4e64-bd7e-4e7b412a7f59/google-chromecast-98031.jpg?auto=webp&width=768",
          "title" : "For Bigger Fun"
        },
        { "description" : "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.",
          "sources" : [ "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" ],
          "subtitle" : "By Google",
          "thumb" : "https://d6u22qyv3ngwz.cloudfront.net/ad/7TK8/google-chromecast-bigger-joyrides-small-6.jpg",
          "title" : "For Bigger Joyrides"
        },
        { "description" :"Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.", 
          "sources" : [ "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" ],
          "subtitle" : "By Google",
          "thumb" : "https://d6u22qyv3ngwz.cloudfront.net/ad/75GS/google-chromecast-bigger-meltdowns-small-5.jpg",
          "title" : "For Bigger Meltdowns"
        },
        { "description" : "The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500, and posting a video from the road every single day! The only place to watch them is by subscribing to The Smoking Tire or watching at BlackMagicShine.com",
          "sources" : [ "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" ],
          "subtitle" : "By Garage419",
          "thumb" : "https://www.automotiveaddicts.com/wp-content/uploads/2009/04/porsche-gt3-rsr.jpg",
          "title" : "We Are Going On Bullrun"
        },
    ]}]};
    
  return (
    <View style = {{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center"}}>
      <View style={styles.topContainer}>      
        <StatusBar style="auto" />
        <View style = {styles.textInTopContainer}/>
        <View style = {styles.textInTopContainer}>
          <Text>Your Points: {points}</Text>
        </View>
      </View>
      <View style={styles.videoContainer}>
        <Video
          ref = {videoRef}
          /*`${mediaJSON.categories[0].videos[currentVideo]["sources"]}`*/
          source = {{uri: ((points === 0) && `${mediaJSON.categories[0].videos[currentVideo]["sources"]}`)}}
          onPlaybackStatusUpdate = {(status) => {setCurrentStatus(status)}}/*((status.didJustFinish) && setVideoEnd(!videoEnd))*/
          shouldPlay
          style = {{width: "100%", height: "100%"}}
        />
        {!collectedCoin && <Text style = {{fontWeight: "bold"}}>{`${mediaJSON.categories[0].videos[currentVideo]["title"]}`}</Text>}
        {!collectedCoin && <Text>{`${mediaJSON.categories[0].videos[currentVideo]["subtitle"]}`}</Text>}
        <View style = {{width: "100%", height: "100%", position: "absolute", justifyContent: "center", alignItems: "center"}}>
          {collectedCoin && <Image source = {{uri: `${mediaJSON.categories[0].videos[currentVideo]["thumb"]}`}} style = {{width: "100%", height: "100%"}}/>}
        </View>
      </View>
      <View style={styles.container}> 
        {collectedCoin && <Text style = {{fontWeight: "bold"}}>{`${mediaJSON.categories[0].videos[currentVideo]["title"]}`}</Text>}
        {collectedCoin && <Text>{`${mediaJSON.categories[0].videos[currentVideo]["subtitle"]}`}</Text>}
        <View style = {{flexDirection: "column", width: "60%", marginTop: 32, rowGap: 16}}>
          {<Button title = "Get Your Point" color = "blue" disabled = {(currentStatus?.isPlaying || ((currentStatus?.positionMillis <= 1000) || !(currentStatus?.positionMillis)) || collectedCoin)} onPress = {() => collectYourCoins()}/>}
          {collectedCoin && <Button title = "Watch Another Video" color = "blue" onPress = {() => nextVideo()} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInTopContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 32,
    paddingRight: 32,
  },
  topContainer: {
    flex: .30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 64,
    alignItems: 'center',
    justifyContent: 'start',
  },
  videoContainer: {
    flex: 1,
    width: "100%",
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});