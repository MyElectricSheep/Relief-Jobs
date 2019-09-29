import React from "react";

// Pictures imports
import pic1 from "../../../pics/images/slider_pic_1.jpg";
import pic2 from "../../../pics/images/slider_pic_2.jpg";
import pic3 from "../../../pics/images/slider_pic_3.jpg";

// Carousel imports
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  blur: {
    filter: "brightness(0.6) grayscale(40%)",
    maxWidth: "2000px",
    maxHeight: "220px"
  }
}));

const HeaderCarousel = () => {
  const classes = useStyles();
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
            <img src={pic1} alt="Slider picture 1" className={classes.blur} />
          </Slide>
          <Slide index={1}>
            <img src={pic2} alt="Slider picture 2" className={classes.blur} />
          </Slide>
          <Slide index={2}>
            <img src={pic3} alt="Slider picture 3" className={classes.blur} />
          </Slide>
        </Slider>
      </CarouselProvider>
    </div>
  );
};

export default HeaderCarousel;
