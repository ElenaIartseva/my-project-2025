'use client';
import ReactPlayer from 'react-player';
import classes from './VideoPlayer.module.scss';
import { useState } from 'react';

export const VideoPlayer = ({
  url,
  poster,
}: {
  url: string;
  poster: string;
}) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className={classes.player_wrapper}>
      <ReactPlayer
        className={classes.react_player}
        url={url}
        playing={isReady}
        controls={true}
        width="100%"
        height="100%"
        light={false}
        onReady={() => setIsReady(true)}
        config={{
          file: {
            attributes: {
              poster,
              controlsList: 'nodownload',
              disablePictureInPicture: true,
              playsInline: true,
            },
          },
        }}
      />
    </div>
  );
};
