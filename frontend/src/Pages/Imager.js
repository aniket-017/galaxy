import React, { useEffect, useState } from "react";
import "./Imager.css";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import Loading from "../components/Loading";

const Imager = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCarouselSlides();
  }, []);

  const fetchCarouselSlides = async () => {
    try {
      const response = await axios.get("/aak/l1/carousel");
      if (response.data.success) {
        setSlides(response.data.slides);
      }
    } catch (error) {
      console.error("Error fetching carousel slides:", error);
      setError("Failed to load carousel slides");
      // Fallback to default slide if API fails
      setSlides([
        {
          _id: "default",
          imageUrl: "https://res.cloudinary.com/dzmn9lnk5/image/upload/v1720713270/Progressive/carousel/0_fhxtqk.jpg",
          title: "Design Build Project",
          subtitle: "Shiv Samarth Smarak, Uran",
          order: 1,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading carousel slides..." fullScreen={false} />;
  }

  if (error && slides.length === 0) {
    return (
      <div className="carousel-error">
        <p>Unable to load carousel. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <Carousel interval={2600} pause={false}>
        {slides.map((slide) => (
          <Carousel.Item key={slide._id}>
            <img
              className="d-block w-100 carousel-image"
              src={slide.imageUrl}
              alt={slide.title}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/1200x600/cccccc/666666?text=Image+Not+Available";
              }}
            />
            <Carousel.Caption className="carousel-caption">
              <div className="carousel-content">
                <h3>{slide.title}</h3>
                <h5>{slide.subtitle}</h5>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Imager;
