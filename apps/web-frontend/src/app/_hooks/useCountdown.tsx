"use client";

import { isAfter } from "date-fns";
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
  const isComplete = isAfter(new Date(), targetDate);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(updatedTimeLeft);

      if (isComplete) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, isComplete]);

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

export const makeCountdownString = (timeLeft: Countdown) => {
  let cookCountdownString = "";
  if (timeLeft.days > 0) cookCountdownString += `${timeLeft.days}d `;
  if (timeLeft.days > 0 || timeLeft.hours > 0)
    cookCountdownString += `${timeLeft.hours}h `;
  if (timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0)
    cookCountdownString += `${timeLeft.minutes}m `;
  cookCountdownString += `${timeLeft.seconds}s`;

  return cookCountdownString;
};
