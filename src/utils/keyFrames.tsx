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

export const scrollAnimation = keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(5px);
    }
    100% {
        transform: translateY(0);
    }
`;

export const slideInAnimation = keyframes`
    from {
        opacity: 0;
    }
  80% {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
