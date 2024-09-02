import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
//  This component return the no. of star acc to the rating
const StarRating = ({ rating }) => {
  // Convert rating to an integer (rating out of 5)  
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return (
            <FaStar key={index} className="text-yellow-500" />
          );
        } else if (index === fullStars && hasHalfStar) {
          return (
            <FaStarHalfAlt key={index} className="text-yellow-500" />
          );
        } else {
          return (
            <FaRegStar key={index} className="text-yellow-500" />
          );
        }
      })}
    </div>
  );
};

export default StarRating;
