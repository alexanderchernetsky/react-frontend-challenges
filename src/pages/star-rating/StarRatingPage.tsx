import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating/StarRating';

const StarRatingPage = () => {
  const [rating1, setRating1] = useState(3);
  const [rating2, setRating2] = useState(0);

  return (
    <main className="flex flex-col items-center justify-center w-full p-[32px]">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Star Rating</h1>

      <section className="w-full max-w-3xl mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Create a Star Rating Widget</h2>
        <div className="space-y-4 text-blue-800">
          <p>
            Implement a reusable star rating widget that accepts a maximum number of stars and the current rating.
          </p>
          <div className="space-y-2">
            <p className="font-medium text-blue-900">Requirements:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>The widget accepts two parameters: <strong>max stars</strong> and <strong>current rating</strong>.</li>
              <li>Clicking a star fills it and all stars to its left.</li>
              <li>Hovering over a star fills it and all stars to its left, taking priority over the current rating.</li>
              <li>Reverts to the original rating when the cursor leaves the widget.</li>
              <li>Reusable such that multiple instances can be rendered on the same page.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="space-y-8 w-full max-w-3xl">
        <section className="w-full flex flex-col items-center p-10 border-2 border-dashed border-gray-300 rounded-xl bg-white">
          <h3 className="text-lg font-medium mb-4 text-gray-700">Standard 5-star rating (Initial: 3)</h3>
          <StarRating max={5} value={rating1} onChange={setRating1} />
          <p className="mt-4 text-gray-600">Current Rating: {rating1}</p>
        </section>

        <section className="w-full flex flex-col items-center p-10 border-2 border-dashed border-gray-300 rounded-xl bg-white">
          <h3 className="text-lg font-medium mb-4 text-gray-700">Custom 10-star rating (Initial: 0)</h3>
          <StarRating max={10} value={rating2} onChange={setRating2} />
          <p className="mt-4 text-gray-600">Current Rating: {rating2}</p>
        </section>
      </div>

      <Link to="/" className="mt-8 text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2">
        ← Back to Home
      </Link>
    </main>
  );
};

export default StarRatingPage;
