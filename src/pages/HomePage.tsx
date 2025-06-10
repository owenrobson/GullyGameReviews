import React from 'react';
import LatestReview from '../components/LatestReview';
import ReviewGrid from '../components/ReviewGrid';
import { useReviews } from '../hooks/useReviews';

const HomePage: React.FC = () => {
  const { reviews } = useReviews();

  // Get the latest review (first in the array)
  const latestReview = reviews[0];

  return (
    <>
      {latestReview && <LatestReview review={latestReview} />}
      <ReviewGrid />
    </>
  );
};

export default HomePage;