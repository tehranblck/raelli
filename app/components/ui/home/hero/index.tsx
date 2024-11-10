"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
import BalansImage from "../../../../../public/assets/images/balans.png";
import SecureImage from "../../../../../public/assets/images/secure-post.png";

const Hero = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://api.example.com/slider-images"); // Replace with actual API endpoint
        const data = await response.json();

        // Assuming the API response is an array of objects with an `imageUrl` field
        setSliderImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="py-6 pt-12 lg:h-full">
      <div className="flex h-full px-4 bg-[#1f1f1f] flex-row items-center lg:justify-between max-w-[1280px] mx-auto text-[#fff] lg:py-2 lg:px-2 space-x-1 md:space-x-2">

        {/* Slider Section with Fixed Dimensions */}
        <div className="w-[900px] h-full text-[#000] overflow-hidden rounded-md">
          <Slider {...sliderSettings}>
            {sliderImages.map((image, index) => (
              <div key={index}>
                <Image
                  src={image.imageUrl} // Assuming each object has `imageUrl`
                  alt={`Slide ${index + 1}`}
                  width={900}
                  height={240}
                  className="object-cover w-[900px] h-full"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Right Section with Balans and Secure Images */}
        <div>
          <div className="flex flex-col justify-between space-y-1 md:space-y-2 h-full">
            <Link href={"/balance"} className="hover">
              <Image
                src={BalansImage}
                alt="Balance"
                className="w-[440px] h-auto rounded-md object-cover"
              />
            </Link>
            <div>
              <Image
                src={SecureImage}
                alt="Secure"
                className="w-[440px] h-auto rounded-md object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
