import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  initializeReviews,
  addReview as addReviewAction,
  updateReview as updateReviewAction,
  deleteReview as deleteReviewAction,
} from '../store/slices/reviewsSlice';
import { GameReview } from '../data/gameReviews';

export const useReviews = () => {
  const dispatch = useAppDispatch();
  const { reviews: rawReviews, isLoading, error } = useAppSelector((state) => state.reviews);

  // Sort reviews to put featured ones first, then by date (newest first)
  const reviews = [...rawReviews].sort((a, b) => {
    // Featured reviews come first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // If both are featured or both are not featured, sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Initialize reviews on mount
  useEffect(() => {
    dispatch(initializeReviews());
  }, [dispatch]);

  const addReview = (review: Omit<GameReview, 'id'>) => {
    dispatch(addReviewAction(review));
  };

  const updateReview = (id: number, review: Omit<GameReview, 'id'>) => {
    dispatch(updateReviewAction({ id, review }));
  };

  const deleteReview = (id: number) => {
    dispatch(deleteReviewAction(id));
  };

  return {
    reviews,
    isLoading,
    error,
    addReview,
    updateReview,
    deleteReview,
  };
};