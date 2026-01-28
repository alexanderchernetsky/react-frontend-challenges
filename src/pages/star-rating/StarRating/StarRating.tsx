import React, {useRef, useState} from 'react';
import StarIcon from "../StarIcon/StarIcon";

interface StarRatingProps {
  max?: number; // the maximum number of stars
  value?: number; // the number of currently filled stars
  onChange: (value: number) => void;
}

// Notes:
// Use [hoveredValue, setHoveredValue] to store hover state. Do not create extra state for selected stars - this can be derived from props. State should represent facts, not pictures of facts!
// To improve accessibility - use buttons as stars, add the 'sr-only' description of star rating, add arrow keys navigation
const StarRating: React.FC<StarRatingProps> = ({
  max = 5,
  value = 0,
  onChange,
}) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]); // Store refs to buttons for keyboard navigation

  // Decide what value should be displayed
  const displayValue = hoveredValue ?? value;

  const handleStarClick = (index: number) => {
    onChange(index + 1);
  }

  const handleMouseEnter = (index: number) => {
    setHoveredValue(index + 1);
  }

  const handleMouseLeave = () => {
    setHoveredValue(null);
  }

  // Handle keyboard navigation for improved accessibility
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' && index < max - 1) {
      e.preventDefault();
      buttonRefs.current[index + 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      buttonRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(index + 1);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center" aria-describedby="star-rating-description">
      {Array.from({ length: max}, (_, index) => {

        return (
            <button
                ref={(el) => { buttonRefs.current[index] = el; }}
                aria-label={`Star rating ${index + 1}`}
                className="cursor-pointer"
                key={index}
                onClick={() => handleStarClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onKeyDown={(e) => handleKeyDown(e, index)}
            >
                  <StarIcon filled={displayValue > index} />
            </button>
        )
      })}

      <p id="star-rating-description" className="sr-only" aria-live="polite">
        Current rating: ${value} out of ${max}. Click on button to change star-rating.
      </p>
    </div>
  );
};

export default StarRating;
