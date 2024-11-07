import Lottie from "react-lottie";
import React from "react";

const LottieAnimation = ({
  width = "auto",
  height = "auto",
  animationData,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,

    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default LottieAnimation;
