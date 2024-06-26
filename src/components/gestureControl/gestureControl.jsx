"use client"
import * as tf from "@tensorflow/tfjs";
import React, { useRef, useState, useEffect } from "react";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
import * as fp from "fingerpose";
import styles from './gestureControl.module.css'
import {loveYouGesture, nextGesture, playGesture, pauseGesture, previousGesture, volumeDownGesture, volumeUpGesture} from "./gestures";
import { useGlobalSong } from "@/app/globalSongContext";

export function GestureControl() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const {currGest, setCurrGest} = useGlobalSong();
  const [isGestureControlOpen, setIsGestureControlOpen] = useState(false);

  const toggleGestureControl = () => {
    setIsGestureControlOpen(!isGestureControlOpen);
  };

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          loveYouGesture,
          playGesture,
          pauseGesture,
          nextGesture,
          previousGesture,
          volumeUpGesture,
          volumeDownGesture,
        ]);
        const gesture =  GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          console.log(confidence);
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          
          console.log(gesture.gestures[maxConfidence]);
          setCurrGest(gesture.gestures[maxConfidence].name);
        }
      }
      else{
        setCurrGest(null)
      }
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };
  
  useEffect(()=>{runHandpose()},[]);
  
  return (
    <div className={isGestureControlOpen ? styles.section : styles.noSection}>
        {isGestureControlOpen && (
          <div className={styles.camContainer}>
        <Webcam
          ref={webcamRef}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            right: 0,
            textAlign: "center",
            zindex: 9,
            height: 500,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position:"absolute",
            marginLeft: "auto",
            marginRight: "auto",
            top: 50,
            right: "-210px",
            textAlign: "center",
            zindex: 9,
            height: 500,
          }}
        />
        </div>
        )}
        <button className={styles.toggleButton} onClick={toggleGestureControl}>
          {isGestureControlOpen ? "Close Gesture Control" : "Use Gesture Control"}
        </button>
    </div>
  );
}
