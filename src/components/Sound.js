import React from 'react'
import useSound from 'use-sound';
import slotSounds from '../assets/sounds/slotSounds.mp3';

const spriteMap = {
    ambient: [
      0,
      8124.081632653061
    ],
    BackgroundSound2: [
      10000,
      9273.4693877551
    ],
    backgroundsound3: [
      21000,
      8124.081632653059
    ],
    betmax: [
      31000,
      940.4081632653067
    ],
    chgBetPerLine: [
      33000,
      313.4693877550987
    ],
    Cost: [
      35000,
      313.4693877550987
    ],
    reelStart: [
      55000,
      653.0612244897966
    ],
    seepays: [
      59000,
      287.34693877551365
    ],
    win: [
      61000,
      1071.020408163264
    ],
    Line1: [
      37000,
      391.83673469387514
    ],
    Line2: [
      39000,
      365.714285714283
    ],
    Line3: [
      41000,
      391.83673469387514
    ],
    Line4: [
      43000,
      391.83673469387514
    ],
    Line5: [
      45000,
      391.83673469387514
    ],
  };

function Sound() {
   const [play, { pause, stop, isPlaying } ] = useSound(slotSounds, {
      sprite: spriteMap
    });


  return (
    <div>

    </div>
  )
}

export default Sound


