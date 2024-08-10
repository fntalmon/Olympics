import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const MedallaContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 100,
  width: 100,
  borderRadius: '50%',
  border: '3px solid black',
  overflow: 'hidden',
  transition: 'transform 0.3s ease',
  '&:hover img': {
    filter: 'none', // Imagen a color cuando se hace hover
  },
}));

const MedallaImage = styled('img')(({ theme }) => ({
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  filter: 'grayscale(100%)', // Imagen en blanco y negro por defecto
  transition: 'filter 0.3s ease',
}));

function Medalla({ src, alt }) {
  return (
    <MedallaContainer>
      <MedallaImage src={src} alt={alt} />
    </MedallaContainer>
  );
}

export default Medalla;
