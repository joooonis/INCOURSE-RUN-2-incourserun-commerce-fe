import { ReviewType } from './types';

const reviewAnalysis = (reviews: ReviewType[]) => {
  const ratingCounts = [0, 0, 0, 0, 0];
  for (const review of reviews) {
    ratingCounts[review.rating - 1]++;
  }
  return ratingCounts;
};

export default reviewAnalysis;
