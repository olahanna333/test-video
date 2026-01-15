import { useVideoPlayer, VideoSource } from 'expo-video';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [isPaused, setIsPaused] = useState(false);

  const videoSource: VideoSource = {
    uri: "https://jpr-ice.streamguys1.com/jpr-rhythm",
    metadata: {
      title: "Radio Player",
    },
  };


  const player = useVideoPlayer(videoSource, (player) => {
    player.staysActiveInBackground = true;
    player.showNowPlayingNotification = true;
    player.play();
  });

  const togglePlay = () => {
    if (player.playing) {
      player.pause();
      setIsPaused(true);
    } else {
      player.play();
      setIsPaused(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo-Video Crash Repro</Text>
      <Text>Status: {isPaused ? "Paused" : "Playing"}</Text>
      <View style={styles.buttonContainer}>
        <Button title={isPaused ? "Play" : "Pause"} onPress={togglePlay} />
      </View>
      <Text style={styles.instructions}>
        Instructions to crash:{"\n"}
        1. Leave the app in the background.{"\n"}
        2. Press Pause in player control.{"\n"}
        3. Swipe app away from Recent Apps.{"\n"}
        4. Observe "App has stopped" system alert.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  buttonContainer: { marginVertical: 20 },
  instructions: { marginTop: 40, textAlign: 'center', color: 'red' }
});