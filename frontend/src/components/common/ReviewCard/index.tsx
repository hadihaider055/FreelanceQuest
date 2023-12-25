import React, { useState } from "react";

// React Icons
import { FaStar } from "react-icons/fa";

// Styled
import { ReviewCardStyled } from "./styled";

const ReviewCard = () => {
  const [lineClamp, setLineClamp] = useState(5);
  return (
    <ReviewCardStyled className="border-b-2 border-stone-300 last:border-b-0">
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-4">
          <div className="w-[60px] h-[60px] rounded-[50%] overflow-hidden flex items-center justify-center bg-slate-200 shadow-profile-image">
            <img
              src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
              alt="Dummy"
              className="w-[50px] h-[50px] object-cover rounded-[50%]"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-montserrat text-xl font-bold text-slate-600">
              John Doe
            </h3>
            <p className="font-montserrat text-lg text-gray-500">3 hours ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <i className="text-green-500" key={i}>
                  <FaStar />
                </i>
              ))}
          </div>
          <p className="font-poppins text-lg text-gray-500  font-bold">(5)</p>
        </div>
      </div>

      <div className="my-4">
        <h1 className="font-poppins text-xl font-bold text-slate-600 pb-2">
          Fullstack Developer Needed
        </h1>
        <p
          className={`font-montserrat text-lg text-slate-600 line-clamp-[${lineClamp}]`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, repellendus. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, repellendus. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, repellendus. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, repellendus. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam, Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, repellendus. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, repellendus. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, repellendus. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, repellendus. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam, Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, repellendus. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, repellendus. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, repellendus. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, repellendus. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam, Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, repellendus. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, repellendus. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, repellendus. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, repellendus. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        </p>
        {lineClamp === 0 ? (
          <span
            className="cursor-pointer font-montserrat text-lg font-medium text-green-500 underline"
            onClick={() => setLineClamp(5)}
          >
            less
          </span>
        ) : (
          <span
            className="cursor-pointer font-montserrat text-lg font-medium text-green-500 underline"
            onClick={() => setLineClamp(0)}
          >
            See more
          </span>
        )}
      </div>
    </ReviewCardStyled>
  );
};

export default ReviewCard;
