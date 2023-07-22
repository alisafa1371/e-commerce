// import { StarIcon } from "@heroicons/react/24/solid";
// import { StarIcon as EmptyStar } from "@heroicons/react/24/outline";
import React from "react";
import { toast } from "react-hot-toast";

function Rating({ startsAmount, id }) {
  const ratingHandler = (e) => {
    e.preventDefault();
    const userRate = e.target.dataset.rate;
    //here we can send the userRate to backend
    toast.success("Thanks your rate is received");
  };
  return (
    <div className="rating" onClick={ratingHandler}>
      <input
        type="radio"
        name={`rating-${id}`}
        className="mask mask-star bg-yellow-400"
        defaultChecked={startsAmount >= 1}
        data-rate="1"
      />
      <input
        type="radio"
        name={`rating-${id}`}
        className="mask mask-star bg-yellow-400 "
        defaultChecked={startsAmount >= 2}
        data-rate="2"
      />
      <input
        type="radio"
        name={`rating-${id}`}
        className="mask mask-star bg-yellow-400 "
        defaultChecked={startsAmount >= 3}
        data-rate="3"
      />
      <input
        type="radio"
        name={`rating-${id}`}
        className="mask mask-star bg-yellow-400 "
        defaultChecked={startsAmount >= 4}
        data-rate="4"
      />
      <input
        type="radio"
        name={`rating-${id}`}
        className="mask mask-star bg-yellow-400 "
        defaultChecked={startsAmount >= 5}
        data-rate="5"
      />
    </div>
  );
}

export default Rating;
