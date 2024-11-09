import MenuGrid from "@/components/cards/Menu-Grid";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SpecialMenu = ({
  specialMenuData,
  onCartChange,
  cartItems,
  onCustomizedOpen,
  setSelecetedFoodItem,
}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <section id="special_food_menu" className="overflow-hidden">
      <div className="flex flex-col w-full my-4 px-5 gap-3 overflow-hidden">
        <h2 className="text-large font-medium">Special Food Items</h2>
        <div className="relative w-full">
          <Slider {...settings}>
            {specialMenuData &&
              specialMenuData.map((menuItem, index) => (
                <MenuGrid
                  key={index}
                  menuItem={menuItem}
                  onCartChange={onCartChange}
                  cartItems={cartItems}
                  onCustomizedOpen={onCustomizedOpen}
                  setSelecetedFoodItem={setSelecetedFoodItem}
                />
              ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default SpecialMenu;
