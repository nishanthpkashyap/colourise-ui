import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import colour_abe from './coloured_images/abe.jpg'
import abe from "./black&white_images/abe.jpg"

import colour_scenary from './coloured_images/scenary.jpg'
import scenary from "./black&white_images/scenary.jpg"

import colour_lion from './coloured_images/lion.jpg'
import lion from "./black&white_images/lion.jpg"

import colour_old_car from './coloured_images/old_car.jpg'
import old_car from "./black&white_images/old_car.jpg"

import colour_old_house from './coloured_images/old_house.jpg'
import old_house from "./black&white_images/old_house.jpg"

import colour_old_plane from './coloured_images/old_plane.jpg'
import old_plane from "./black&white_images/old_plane.jpg"

import colour_barn from './coloured_images/barn.jpg'
import barn from "./black&white_images/barn.jpg"

const images = [
  { src: abe, caption: 'Greyscale' },
  { src: colour_abe, caption: 'Colour' },

  { src: scenary, caption: 'Greyscale' },
  { src: colour_scenary, caption: 'Colour' },

  { src: lion, caption: 'Greyscale' },
  { src: colour_lion, caption: 'Colour' },

  { src: old_car, caption: 'Greyscale' },
  { src: colour_old_car, caption: 'Colour' },

  { src: old_house, caption: 'Greyscale' },
  { src: colour_old_house, caption: 'Colour' },

  { src: old_plane, caption: 'Greyscale' },
  { src: colour_old_plane, caption: 'Colour' },

  { src: barn, caption: 'Greyscale' },
  { src: colour_barn, caption: 'Colour' },
];

const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    // centerMode: true,
    // centerPadding: "60px",
};

export function Carousel() {
  return (
    <div id="carousel">
      <h1>Our Work</h1>
        <Slider {...settings} id="Slider">
            {images.map(image => (
            <div style={{alignItems: "Center"}} key={image.src}>
              <img src={image.src} alt={image.caption} style={{marginLeft: "5rem", marginTop: "2rem", height:'300px',width:'400px'}}/>
            <h3>{image.caption}</h3>
            </div>
            ))}
        </Slider>
    </div>
  );
}

