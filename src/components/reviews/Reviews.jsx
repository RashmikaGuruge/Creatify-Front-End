import React, { useState } from 'react';
import './Reviews.scss';  
import Review from '../review/Review';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';

const Reviews = ( {gigId} ) => {

    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery({
        queryKey: ["reviews"],
        queryFn: () =>
          newRequest.get(`/reviews/${gigId}`).then((res) => {
            return res.data;
          }),
      });

      console.log(error)

    const [selectedRating, setSelectedRating] = useState(null);
    const [reviewDescription, setReviewDescription] = useState('');

    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    const handleStarClick = (rating) => {
        setSelectedRating(rating);
    };

    const mutation = useMutation({
        mutationFn: (review) => {
          return newRequest.post("/reviews", review);
        },
        onSuccess:()=>{
          queryClient.invalidateQueries(["reviews"])
        }
      });
    
      const handleReviewSubmit = (e) => {
        e.preventDefault();
        const desc = reviewDescription;
        const star = selectedRating;
        mutation.mutate({ gigId, desc, star });

        setSelectedRating(null);
        setReviewDescription("");
      };

    // const handleReviewSubmit = async () => {
    //     try {
    //         if (selectedRating !== null) {
    //             // Prepare the data to be sent in the request
    //             const reviewData = {
    //               star: selectedRating,
    //               desc: reviewDescription,
    //               gigId
    //             };
        
    //             // Make a POST request to your API endpoint
    //             const response = await newRequest.post('/reviews/', reviewData);
        
    //             // Handle the response if needed
    //             console.log('Review submitted successfully:', response.data);

    //             // Reset the state after submission
    //             setSelectedRating(null);
    //             setReviewDescription('');
    //   }
    //     } catch (error) {
            
    //     }
    // };

  return (
    <div className="reviews">
          <h2>Reviews</h2>
          {isLoading
              ? "loading"
              : error
                  ? "Something went wrong!"
                  : data.map((review) => <Review key={review._id} review={review} />)}

          <hr />
          <div className="product-review">
              <h2>Add a Review</h2>
              <div className="rating-container" id="rating-container">
                {stars.map((rating) => (
                    <span
                        key={rating}
                        className={`star ${selectedRating >= rating ? 'active' : ''}`}
                        onClick={() => handleStarClick(rating)}
                    >
                        &#9733;
                    </span>
                ))}
              </div>
              <input type="text" placeholder="write your opinion" onChange={(e) => setReviewDescription(e.target.value)} />
              <button id="submitBtn" onClick={handleReviewSubmit}>Send</button>
          </div>
      </div>
  )
}

export default Reviews