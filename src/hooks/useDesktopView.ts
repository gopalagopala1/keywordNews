import { NewsDataType } from "@/types/news";
import { useEffect, useState } from "react";

interface DesktopViewType {
    currentIndex: number;
    data: NewsDataType[] | undefined;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    onLoadMore: () => void;
}


const useDesktopView = ({currentIndex, data, setCurrentIndex, onLoadMore}: DesktopViewType) => {
     const [cardsPerView, setCardsPerView] = useState(3);
      const [cardWidth, setCardWidth] = useState(0);
    
      useEffect(() => {
        const handleResize = () => {
          const containerWidth = document.querySelector(".carousel-container")?.clientWidth || 0;
          const availableWidth = containerWidth - 128; // 8rem padding
          const gapWidth = 32 * (cardsPerView - 1); // 2rem gap
          const width = (availableWidth - gapWidth) / cardsPerView;
          setCardWidth(width);
    
          if (window.innerWidth < 1200) {
            setCardsPerView(2);
          } else {
            setCardsPerView(3);
          }
        };
    
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, [cardsPerView]);
    
      const handlePrevious = () => {
        setCurrentIndex(Math.max(0, currentIndex - 1));
      };
    
      const handleNext = () => {
        if (!data) return;
        const nextIndex = currentIndex + 1;
        if (nextIndex + cardsPerView >= data.length) {
          onLoadMore();
        }
        setCurrentIndex(Math.min(data.length - cardsPerView, nextIndex));
      };

      return {
        currentIndex,
        cardsPerView, 
        cardWidth,
        setCardsPerView,
        handlePrevious,
        handleNext
      }
      
}

export default useDesktopView;