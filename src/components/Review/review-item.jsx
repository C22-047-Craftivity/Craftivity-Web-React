import StarWidget from "../Star";

function ReviewItem({review}) {
    return (
        <div className="card-review mb-4">
            <div className="row p-3">
                <div className="col-1">
                    <img className="image-review" src={review.image} alt={review.name} />
                </div>
                <div className="col">
                    <h4>{review.name}</h4>
                    <StarWidget lengthStar={review.star}/>
                </div>
            </div>
            <p>{review.review}</p>
        </div>
    );
}

export default ReviewItem;