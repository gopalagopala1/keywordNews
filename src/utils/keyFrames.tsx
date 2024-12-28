import { keyframes } from "@emotion/react";

export const ping = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(1.25);
    opacity: 0;
  }
`;

export const rotateAnimation = keyframes`
  from {
    transform: scale(1) rotate(50deg);
  }  
  25% {
    transform: rotate(-90deg);
  }  
  75% {
    transform:scale(1.5)  rotate(-90deg);
    
  }
  to {
    transform: scale(1)  rotate(-90deg);

  }
`;

export const scrollLeftAnimation = keyframes`
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(-10px);
    }
    100% {
        transform: translateX(0);
    }
`;

export const scrollRightAnimation = keyframes`
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(10px);
    }
    100% {
        transform: translateX(0);
    }
`;

export const slideInAnimation = keyframes`
    from {
        opacity: 0;
    }
  50% {
    transform: translateY(70%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const slideLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

export const slideRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;
