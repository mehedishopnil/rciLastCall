import { FaRegHeart, FaEdit, FaRegEdit } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ResortCard = ({ resort, role }) => {
  // Destructuring resort data for easier access
  const { _id, img, place_name, reviews_amount, location, ownerExclusive } = resort;
  
  // States for managing edit mode and updated field values
  const [isEditing, setIsEditing] = useState(false);
  const [updatedImg, setUpdatedImg] = useState(img);
  const [updatedPlaceName, setUpdatedPlaceName] = useState(place_name);
  const [updatedLocation, setUpdatedLocation] = useState(location);

  // Handler to activate edit mode for inline edits
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handler to save edited data to the backend
  const handleSave = async () => {
    // Prepare updated data object
    const updatedResortData = {
      img: updatedImg,
      place_name: updatedPlaceName,
      location: updatedLocation,
    };

    try {
      // Make PUT request to backend with updated data
      const response = await fetch(`your-backend-endpoint/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedResortData),
      });

      if (response.ok) {
        // Display success message and exit edit mode
        Swal.fire("Updated!", "Resort details updated successfully.", "success");
        setIsEditing(false);
      } else {
        throw new Error("Failed to update resort details");
      }
    } catch (error) {
      // Display error message if update fails
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="card h-full bg-white shadow-xl">
      <figure className="relative min-h-20">
        {/* Display input for image URL if in edit mode, otherwise show image */}
        {isEditing ? (
          <input
            type="text"
            value={updatedImg}
            onChange={(e) => setUpdatedImg(e.target.value)}
            className="w-full p-2"
          />
        ) : (
          <img src={img} alt="Resort" />
        )}

        <p className="absolute top-5 right-5 text-xl">
          <FaRegHeart />
        </p>

        {/* Edit icon for redirecting to ResortEdit page, visible only for admins */}
        {role === "admin" && (
          <p className="absolute top-11 right-5 text-xl">
            <Link to={`/admin-panel/resort-edit/${_id}`} state={{ resort }}>
              <FaRegEdit />
            </Link>
          </p>
        )}
      </figure>

      <div className="card-body">
        {/* Input fields for editing location and place name */}
        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedLocation}
              onChange={(e) => setUpdatedLocation(e.target.value)}
              className="w-full p-2 mb-2"
            />
            <input
              type="text"
              value={updatedPlaceName}
              onChange={(e) => setUpdatedPlaceName(e.target.value)}
              className="w-full p-2 mb-2"
            />
            <button className="btn btn-primary mt-2" onClick={handleSave}>
              Save
            </button>
          </>
        ) : (
          <>
            <p>{location}</p>
            <h2 className="card-title">{place_name}</h2>
          </>
        )}

        <div className="flex items-center gap-2">
          <h1>{ownerExclusive}</h1>
        </div>

        {/* Special label for Wyndham resorts */}
        {place_name.includes("Wyndham") && (
          <div className="flex items-center gap-2">
            <GiStarsStack />
            <h1>Wyndham owner exclusive</h1>
          </div>
        )}

        <div className="divider"></div>

        {/* Rating and review amount */}
        <div className="flex items-center gap-1">
          <img
            src="https://clubs.rci.com/static/media/gold-crown.d40b5cfc.svg"
            alt="Gold Crown"
          />
          <div className="border-l-2"></div>
          <div>
            <img
              src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/5.0-32772-5.svg"
              alt="TripAdvisor Rating"
            />
            <div>
              <p>{reviews_amount} reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortCard;
