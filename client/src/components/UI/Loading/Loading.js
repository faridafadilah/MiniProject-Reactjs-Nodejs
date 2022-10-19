import React from "react";
import Gif from "../../../assets/img/IniGif.gif";
function Loading() {
  return (
    <div>
      <div
        className="lol"
        style={{
          position: "fixed",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          zIndex: "102",
          backgroundColor: "rgb(37, 44, 77)",
        }}
      >
        <div class="position-absolute top-50 start-50 translate-middle">
          <center>
            <img src={Gif} alt="" style={{ width: "50%" }} />
          </center>
        </div>
      </div>
    </div>
  );
}

export default Loading;
