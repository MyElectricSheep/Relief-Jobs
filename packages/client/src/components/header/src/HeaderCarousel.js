import React from "react";

// Carousel imports
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const HeaderCarousel = () => {
  return (
    <div>
      <CarouselProvider
        naturalSlideWidth={2000}
        naturalSlideHeight={220}
        interval={8000}
        isPlaying
        totalSlides={3}
        style={{ marginTop: "-1.35em" }}
      >
        <Slider>
          <Slide index={0}>
            <img src="https://via.placeholder.com/2000x220.png" alt="" />
          </Slide>
          <Slide index={1}>
            <img src="https://via.placeholder.com/2001x220.png" alt="" />
          </Slide>
          <Slide index={2}>
            <img src="https://via.placeholder.com/2002x220.png" alt="" />
          </Slide>
        </Slider>
      </CarouselProvider>
    </div>
  );
};

export default HeaderCarousel;
