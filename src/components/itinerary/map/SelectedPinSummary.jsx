import React from "react";

export default function SelectedPinSummary({
  title,
  description,
  address,
  rating,
  website,
  image,
}) {
  return (
    <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 lg:w-1/3 bg-white p-4 rounded-xl shadow-xl z-40">
      <div className="flex flex-row items-center">
        <div className="flex-grow">
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
          {address && <p>{address}</p>}
          {rating && <p>Rating: {rating}</p>}
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          )}
        </div>
        {image && (
          <img
            src={image}
            alt={title}
            className="w-1/3 rounded-lg object-cover ml-4"
          />
        )}
      </div>
    </div>
  );
}
