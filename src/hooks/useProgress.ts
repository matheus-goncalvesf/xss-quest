import { useState, useEffect } from 'react';
import { UserProgress } from '@/types/challenge';

const STORAGE_KEY = 'xss-lab-progress';

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>({
    completedChallenges: [],
    hintsUsed: {},
    solutionsViewed: []
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const completeChallenge = (challengeId: number) => {
    const newProgress = {
      ...progress,
      completedChallenges: [...new Set([...progress.completedChallenges, challengeId])]
    };
    saveProgress(newProgress);
  };

  const useHint = (challengeId: number) => {
    const hintsUsed = progress.hintsUsed[challengeId] || 0;
    const newProgress = {
      ...progress,
      hintsUsed: {
        ...progress.hintsUsed,
        [challengeId]: hintsUsed + 1
      }
    };
    saveProgress(newProgress);
  };

  const viewSolution = (challengeId: number) => {
    const newProgress = {
      ...progress,
      solutionsViewed: [...new Set([...progress.solutionsViewed, challengeId])]
    };
    saveProgress(newProgress);
  };

  const resetProgress = () => {
    const emptyProgress: UserProgress = {
      completedChallenges: [],
      hintsUsed: {},
      solutionsViewed: []
    };
    saveProgress(emptyProgress);
  };

  return {
    progress,
    completeChallenge,
    useHint,
    viewSolution,
    resetProgress
  };
};