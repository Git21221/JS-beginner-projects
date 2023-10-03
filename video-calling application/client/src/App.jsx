import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Peer from "peerjs";

const App = () => {
  const [socket, _] = useState(
    io("http://localhost:5000/")
  );
  const peerInst = useRef(null);
  const videoRef1 = useRef(null);
  const pid = useRef("");
  const ct = useRef(0);
  const room = useRef(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
      pid.current = socket.id;
      const peer = new Peer(socket.id);
      playVideo();
      socket.emit("leave_room", localStorage.getItem("room"));
      localStorage.removeItem("room");
      socket.on("new_user", (rmId) => {
        console.log("new user with " + rmId);
        handleSubmit2(rmId);
      });

      socket.on("user_left", (data) => {
        console.log(data);
        document.getElementById(data).remove();
      });

      peer.on("call", function (call) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then(function (mediaStream) {
            call.answer(mediaStream);
          });
        call.on("stream", function (stream) {
          const existingIds = Array.from(
            document.querySelectorAll(".videoContainer>video")
          ).map((video) => video.id);

          if (existingIds.includes(call.peer)) {
            return;
          }
          if (ct.current % 2 !== 0) {
            const newVideo = document.createElement("video");
            newVideo.setAttribute("autoplay", "true");
            newVideo.setAttribute("class", "rmVideo");
            newVideo.setAttribute("id", call.peer);
            newVideo.srcObject = stream;
            console.log(ct);
            document.querySelector(".videoContainer").appendChild(newVideo);
          }
          ct.current++;
        });
      });
      peerInst.current = peer;
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("leave_room", localStorage.getItem("room"));
    const videos = document.querySelectorAll(".rmVideo");
    Array.from(videos).forEach((video) => {
      video.remove();
    });
    socket.emit("join_room", room.current.value);
    localStorage.setItem("room", room.current.value);
  }
  async function handleSubmit2(rmId) {
    console.log(rmId);
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const call = peerInst.current.call(rmId, mediaStream, pid.current);
    call.on("stream", function (stream) {
      // const video2 = videoRef2.current;
      // video2.srcObject = stream;
      const existingIds = Array.from(
        document.querySelectorAll(".videoContainer>video")
      ).map((video) => video.id);

      if (existingIds.includes(call.peer)) {
        return;
      }
      if (ct.current % 2 !== 0) {
        const newVideo = document.createElement("video");
        newVideo.setAttribute("autoplay", "true");
        newVideo.setAttribute("id", rmId);
        newVideo.setAttribute("class", `rmVideo`);
        newVideo.srcObject = stream;
        document.querySelector(".videoContainer").appendChild(newVideo);
      }
      ct.current++;
    });
  }

  const errorCallback = function (e) {
    console.log("Reeeejected!", e);
  };

  function playVideo() {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(function (mediaStream) {
          const video = videoRef1.current;
          video.srcObject = mediaStream;
          console.log(mediaStream);
        })
        .catch(errorCallback);
    } else {
      console.log("getUserMedia is not supported in this browser.");
    }
  }

  return (
    <>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" ref={room} placeholder="Enter Room" />
        <button>Submit</button>
      </form>
      <div className="videoContainer">
        <video autoPlay ref={videoRef1} className="Myvideo"></video>
      </div>
    </>
  );
};

export default App;
