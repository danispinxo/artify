import React, {useEffect, useState} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';

export const Gallery = () => {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    axios
      .get("/gallery")
      .then((res) => res.data)
      .then((data) => setBackendData(data));
  }, []);

  console.log(backendData);

  return (
    <div className='gallery'>
      <h1>Sample Art Gallery</h1>
      <ImageList sx={{ width: 700, height: 450 }}>
        {backendData && backendData.map((artwork) => (
          <ImageListItem key={artwork.img}>
            <img
              src={`${artwork.image}`}
              alt={artwork.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={artwork.name}
              subtitle={artwork.price_cents / 100.00}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${artwork.name}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      
    </div>

  )
}
