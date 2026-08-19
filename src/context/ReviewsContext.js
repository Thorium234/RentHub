import React, { createContext, useContext, useState } from 'react';

const ReviewsContext = createContext({});

export function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState([
    { id: 'r1', ownerId: 'user-1', ownerName: 'Alice', reviewerName: 'Jane', rating: 5, text: 'Great sofa, very comfortable!', date: '2026-08-10' },
    { id: 'r2', ownerId: 'user-2', ownerName: 'Bob', reviewerName: 'Charlie', rating: 4, text: 'MacBook was in excellent condition.', date: '2026-08-12' },
    { id: 'r3', ownerId: 'user-3', ownerName: 'Charlie', reviewerName: 'Demo User', rating: 5, text: 'Bike was perfect for the weekend trip.', date: '2026-08-14' },
  ]);

  const addReview = (review) => {
    setReviews((prev) => [...prev, { ...review, id: 'r' + Date.now(), date: new Date().toISOString().split('T')[0] }]);
  };

  const getReviewsForOwner = (ownerId) => reviews.filter((r) => r.ownerId === ownerId);

  const getAvgRating = (ownerId) => {
    const ownerReviews = getReviewsForOwner(ownerId);
    if (ownerReviews.length === 0) return 0;
    return (ownerReviews.reduce((sum, r) => sum + r.rating, 0) / ownerReviews.length).toFixed(1);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getReviewsForOwner, getAvgRating }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export const useReviews = () => useContext(ReviewsContext);
