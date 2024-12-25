import { useEffect, useState } from "react"

const useAnimate = (animateTime: number = 3000) => {
    const [animate, setAnimate] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(false), animateTime); // Stop animation after 3 seconds
        return () => clearTimeout(timer);

    }) 

    return { animate }
}

export default useAnimate