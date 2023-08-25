declare module 'react-native-video-controls' {
    import { Component } from 'react';
  
    interface VideoPlayerProps {
      source: any; // You can provide a more specific type here
      navigator: any; // You can provide a more specific type here
      // Define other props as needed
    }
  
    class VideoPlayer extends Component<VideoPlayerProps> {}
  
    export default VideoPlayer;
  }
  