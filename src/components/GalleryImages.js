import React,{useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Box, Image } from '@chakra-ui/react';

const GalleryImages = ({ images , name}) => {
    
  
    let len = images?.length;
    const [isHovered, setIsHovered] = useState(false);
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={len}
      pagination={{ clickable: true }}
      style={{ width: '100%', height: '400px' , hover:'200px' , cursor:'pointer'}} // Adjust height as needed
    >
      {images?.map((image, index) => (
    
        <SwiperSlide key={index} >
          <Box boxShadow="md" borderRadius="md" position= 'relative'
             onMouseEnter={() => setIsHovered(true)} // Set isHovered to true when mouse enters
             onMouseLeave={() => setIsHovered(false)} // Set isHovered to false when mouse leaves
          >
            
            <Image src={image.url} // Replace 'your-image-url.jpg' with the URL of your image
              alt="Your image"
              style={{
                width: isHovered? '800px' : '200px', // Increase width on hover
                height: 'auto', // Maintain aspect ratio
                transition: 'width 0.3s ease', // Add smooth transition effect
                transform: isHovered ? 'scale(1.5)' : 'none', // Increase scale on hover
              }}
      />
            
          </Box>
          
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GalleryImages;