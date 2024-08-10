import React from 'react'

export default function TriviaCard(trivia) {
  return (
    <Box
    key={trivia.id}
    sx={{
      border: "2px solid grey",
      borderColor: "transparent",
      height: 150,
      width: 150,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 1,
    }}
  >
    <Typography
      variant="body1"
      sx={{
        mb: 1,
        fontFamily: "Oswald",
        color: "#E2DFD0",
        fontSize: 30,
        fontWeight: 100,
      }}
    >
      {trivia.trivia}
    </Typography>
    <Link to={`/trivia/${trivia.id}`}>
      <Box
        component="img"
        sx={{
          border: 3,
          borderColor: " #cd7f32",
          borderRadius: "50%",
          height: 150,
          width: 150,
          objectFit: "contain",
          objectPosition: "center",
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        alt={trivia.trivia}
        src={trivia.imagen}
      />
    </Link>
  </Box>
  )
}
