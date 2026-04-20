import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const SEGMENTS_SCORE_BAR = [0, 1, 2, 3, 4];
export const SIGNAL_BAR_COLOR = "bg-accent";

export const getScoreColorClass = (score: number) => {
  if (score >= 80) return "bg-trendUp";
  if (score >= 70) return "bg-[#FDE047]";
  if (score >= 50) return "bg-[#ffa45a]";
  return "bg-trendDown";
};

export const calculateSegmentFill = (score: number, segmentIndex: number): number => {
  const pointsPerSegment = 20;
  const segmentStart = segmentIndex * pointsPerSegment;
  const segmentEnd = segmentStart + pointsPerSegment;

  if (score >= segmentEnd) return 100;
  if (score <= segmentStart) return 0;

  return ((score - segmentStart) / pointsPerSegment) * 100;
};

export const trendConfigIcons = {
  up: { color: "text-trendUp", Icon: TrendingUp },
  down: { color: "text-trendDown", Icon: TrendingDown },
  neutral: { color: "text-trendNeutral", Icon: Minus },
};

export const normalizeScore = (rawScore: number): number => {
  let score = rawScore;
  if (score <= 1.5) score = score * 100;
  return Math.min(Math.round(score), 100);
};