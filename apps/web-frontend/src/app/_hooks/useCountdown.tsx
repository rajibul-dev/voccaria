import { useState, useEffect } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState<Countdown>(() =>
    calculateTimeLeft(targetDate),
  );
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(updatedTimeLeft);

      if (isCountdownComplete(updatedTimeLeft)) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return { timeLeft, isComplete };
};

const calculateTimeLeft = (targetDate: Date): Countdown => {
  const now = new Date().getTime();
  const difference = targetDate.getTime() - now;

  return {
    days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
    hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
    minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
    seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
  };
};

const isCountdownComplete = (timeLeft: Countdown): boolean => {
  return (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  );
};
