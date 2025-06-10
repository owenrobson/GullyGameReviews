import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameReview, gameReviews as initialReviews } from '../../data/gameReviews';

interface ReviewsState {
  reviews: GameReview[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  isLoading: true,
  error: null,
};

const STORAGE_KEY = 'gameReviews';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    initializeReviews: (state) => {
      try {
        const savedReviews = localStorage.getItem(STORAGE_KEY);
        if (savedReviews) {
          state.reviews = JSON.parse(savedReviews);
        } else {
          state.reviews = initialReviews;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialReviews));
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
        state.reviews = initialReviews;
      }
      state.isLoading = false;
    },

    addReview: (state, action: PayloadAction<Omit<GameReview, 'id'>>) => {
      const newReview = {
        ...action.payload,
        id: Math.max(...state.reviews.map(r => r.id), 0) + 1,
      };

      // Add to the end of the array instead of the beginning
      // The sorting will be handled in the useReviews hook
      state.reviews.push(newReview);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.reviews));
      } catch (error) {
        console.error('Error saving reviews:', error);
      }
    },

    updateReview: (state, action: PayloadAction<{ id: number; review: Omit<GameReview, 'id'> }>) => {
      const { id, review } = action.payload;
      const index = state.reviews.findIndex(r => r.id === id);
      if (index !== -1) {
        state.reviews[index] = { ...review, id };

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state.reviews));
        } catch (error) {
          console.error('Error saving reviews:', error);
        }
      }
    },

    deleteReview: (state, action: PayloadAction<number>) => {
      state.reviews = state.reviews.filter(review => review.id !== action.payload);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.reviews));
      } catch (error) {
        console.error('Error saving reviews:', error);
      }
    },
  },
});

export const {
  initializeReviews,
  addReview,
  updateReview,
  deleteReview,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;