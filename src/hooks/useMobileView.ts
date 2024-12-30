import { NewsDataType } from "@/types/news";
import { useState } from "react";

interface MobileViewType {
  currentIndex: number;
  data: NewsDataType[] | undefined;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  onLoadMore: () => void;
}

const useMobileView = ({
  currentIndex,
  data,
  setCurrentIndex,
  onLoadMore,
}: MobileViewType) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchMove, setTouchMove] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchMove(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      setTouchMove(e.targetTouches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || !data) return;

    const swipeDistance = touchStart - touchMove;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      // Swipe left
      if (currentIndex < data.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (currentIndex === data.length - 1) {
        onLoadMore();
      }
    } else if (swipeDistance < -minSwipeDistance) {
      // Swipe right
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }

    setIsDragging(false);
  };

  const getDragOffset = () => {
    if (!isDragging || !data) return 0;
    const offset = touchMove - touchStart;
    // Add more resistance at the edges
    if (currentIndex === 0 && offset > 0) return Math.min(offset * 0.1, 50);
    if (currentIndex === data.length - 1 && offset < 0) return Math.max(offset * 0.1, -50);
    return offset * 0.5; // Add some resistance during dragging
  };

  return {
    currentIndex,
    isDragging,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    getDragOffset,
  }
};

export default useMobileView;
