import supabase from "@/config/supabase";
import React, { useState, useEffect } from "react";

const customIcons = {
  1: {
    icon: "😞",
    label: "Very Dissatisfied",
  },
  2: {
    icon: "😟",
    label: "Dissatisfied",
  },
  3: {
    icon: "😐",
    label: "Neutral",
  },
  4: {
    icon: "😊",
    label: "Satisfied",
  },
  5: {
    icon: "😁",
    label: "Very Satisfied",
  },
};

function CustomRating({ order_id, user_id, restaurant_id, table_id }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [text, setText] = useState(null);
  const [isRated, setIsRated] = useState(false);

  useEffect(() => {
    const checkRating = () => {
      const storedRating = localStorage.getItem("isRated");
      if (storedRating) {
        const isRated = JSON.parse(storedRating);
        if (isRated.order_id === order_id && isRated.user_id === user_id) {
          setIsRated(true);
          setRating(isRated.star);
          setText(customIcons[isRated.star].label);
        }
      }
    };

    checkRating();
  }, [order_id, user_id]);

  const handleRating = async (value) => {
    const ratingValue = Number(value);
    const ratingLabel = customIcons[ratingValue].label;

    setRating(ratingValue);
    setText(ratingLabel);

    const { data, error } = await supabase
      .from("ratings")
      .insert({
        rating_star: ratingValue,
        rating_label: ratingLabel,
        user_id,
        restaurant_id,
        order_id,
        table_id,
      })
      .select("*");

    if (error) {
      console.error(error);
    } else {
      setIsRated(true);
      localStorage.setItem(
        "isRated",
        JSON.stringify({ order_id, user_id, star: ratingValue })
      );
    }
  };

  return (
    <section id="custom_rating" className="px-5 mt-5">
      <div className="w-full flex flex-col justify-center gap-6 items-center py-5 mb-20 px-3 bg-default-100 rounded-large">
        {isRated ? (
          <>
            <h2 className="text-center font-medium text-medium">{`Thank You for share your experience!`}</h2>

            <div className="flex justify-center items-center">
              {Object.keys(customIcons).map((value) => (
                <span
                  key={value}
                  className={`text-3xl cursor-pointer transition-transform transform mx-1 ${
                    value == (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-400 grayscale"
                  } ${hover === value ? "scale-150" : ""}`}
                  title={customIcons[value].label}
                >
                  {customIcons[value].icon}
                </span>
              ))}
            </div>
            <h4 className="text-small font-normal text-default-600">{text}</h4>
          </>
        ) : (
          <>
            <h2 className="text-center font-medium text-medium">{`Enjoy your meal. Don't forget to share your experience!`}</h2>

            <div className="flex justify-center items-center">
              {Object.keys(customIcons).map((value) => (
                <span
                  key={value}
                  className={`text-3xl cursor-pointer transition-transform transform mx-1 ${
                    value == (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-400 grayscale"
                  } ${hover === value ? "scale-150" : ""}`}
                  onClick={() => {
                    handleRating(value);
                  }}
                  onMouseEnter={() => {
                    setHover(Number(value));
                  }}
                  onMouseLeave={() => setHover(null)}
                  title={customIcons[value].label}
                >
                  {customIcons[value].icon}
                </span>
              ))}
            </div>
            <h4 className="text-small font-normal text-default-600">{text}</h4>
          </>
        )}
      </div>
    </section>
  );
}

export default CustomRating;
