import React from 'react'
import { Box, Typography } from '@mui/material'

function Card({onAnswer,data}) {

    const bordeVerde = '2px solid green'
    const bordeRojo = '2px solid red'
    const bordeGris = '2px solid gray'
    const bordePintado = data.key==data.right ? bordeVerde : bordeRojo



    const handleButtonClick = () => {
        onAnswer(data.key); 
      };

  return (

   
    <Box
    onClick={handleButtonClick}
    fontFamily='Oswald'
    height={5}
    width='50vw'
    borderRadius= '16px' 
    my={1}
    display="flex"
    flexDirection='row'
    justifyContent="center"
    alignItems="center"
    gap={1}
    p={2}
    sx={{ border: (data.isPressed && ((data.key===data.selected) || (data.key===data.right)) )  ? bordePintado:bordeGris }}
    >
    

    <Typography    fontFamily='Oswald' color="#E2DFD0"> {data.texto}</Typography>
    </Box>
 
  )
}

export default Card