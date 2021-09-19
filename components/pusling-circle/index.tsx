import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import theme from "@chakra-ui/theme";
import { Box, BoxProps } from "@chakra-ui/layout";

const pulseAnimation = keyframes`
  0% {
        -webkit-transform: scale(5.6);
        opacity: 0;
    }

    50% {
        -webkit-transform: scale(.6);
        opacity: 0;
    }

    60% {
        -webkit-transform: scale(.9);
        opacity: .2;
    }

    70% {
        -webkit-transform: scale(1.1);
        opacity: .35;
    }

    80% {
        -webkit-transform: scale(1.25);
        opacity: .2;
    }

    100% {
        -webkit-transform: scale(1.4);
        opacity: 0;
    }
`;

const Circle = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${theme.colors.green[400]};
`;
const Pulse = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  background: ${theme.colors.green[400]};
  top: 50%;
  left: 50%;
  margin: -12.5px 0px 0px -12.5px;
  z-index: 1;
  opacity: 0.2;
  border: 3px solid ${theme.colors.green[400]};
  animation: ${pulseAnimation} 3s linear infinite;

  border-radius: 999px;
  box-sizing: border-box;
`;

const PulsingCircle = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Circle>
        <Pulse />
      </Circle>
    </Box>
  );
};

export default PulsingCircle;
