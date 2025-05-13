import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
    const [reviews, setReviews] = useState([
        { id: 1, doctorName: 'Dr. John Doe', speciality: 'Cardiology', reviewGiven: false, review: '', rating: 0 },
        { id: 2, doctorName: 'Dr. Jane Smith', speciality: 'Dermatology', reviewGiven: false, review: '', rating: 0 },
    ]);
    const [showForm, setShowForm] = useState(null);
    const [currentReview, setCurrentReview] = useState({ name: '', review: '', rating: 0 });

    const handleFeedbackClick = (id) => {
        setShowForm(id);
    };

    const handleReviewSubmit = (id) => {
        const updatedReviews = reviews.map(review => {
            if (review.id === id) {
                return { ...review, reviewGiven: true, review: currentReview.review, rating: currentReview.rating };
            }
            return review;
        });
        setReviews(updatedReviews);
        setShowForm(null);
    };

    return (
        <div className="review-form-container">
            <div className="review-form-content">
                <h2>Reviews</h2>
                <table className="review-table">
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Doctor Name</th>
                            <th>Doctor Speciality</th>
                            <th>Provide feedback</th>
                            <th>Review Given</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={review.id}>
                                <td>{index + 1}</td>
                                <td>{review.doctorName}</td>
                                <td>{review.speciality}</td>
                                <td>
                                    <button
                                        className="feedback-btn"
                                        onClick={() => handleFeedbackClick(review.id)}
                                        disabled={review.reviewGiven}
                                    >
                                        {review.reviewGiven ? 'Feedback Given' : 'Click Here'}
                                    </button>
                                </td>
                                <td>{review.reviewGiven ? `${review.review} (Rating: ${review.rating})` : ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showForm !== null && (
                    <div className="review-form-popup">
                        <h3>Give Your Review</h3>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={currentReview.name}
                                onChange={(e) => setCurrentReview({ ...currentReview, name: e.target.value })}
                            />
                        </label>
                        <label>
                            Review:
                            <textarea
                                value={currentReview.review}
                                onChange={(e) => setCurrentReview({ ...currentReview, review: e.target.value })}
                            ></textarea>
                        </label>
                        <label>
                            Rating:
                            <select
                                value={currentReview.rating}
                                onChange={(e) => setCurrentReview({ ...currentReview, rating: parseInt(e.target.value) })}
                            >
                                <option value={0}>Select Rating</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </label>
                        <button onClick={() => handleReviewSubmit(showForm)}>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewForm;
