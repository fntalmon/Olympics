import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Card from "./Card";
import { useParams, useLocation } from "react-router";
import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useRefresh } from '../RefreshContext';

function Container() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [puntaje, setPuntaje] = React.useState(0);
  const [iterador, setIterador] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [pressed, setPressed] = React.useState(false);
  const { id } = useParams();
  const [mostrarPantallaFinal, setMostrarPantallaFinal] = React.useState(false);
  const [inicio, setInicio] = React.useState(false);
  const {triggerRefresh } = useRefresh
  const location = useLocation();
  const triviaData = location.state?.trivia;

  const [data, setData] = React.useState(triviaData?.preguntas || []);
  const [timeoutId, setTimeoutId] = React.useState(null);

  const handleTimeUp = () => {
    setMostrarPantallaFinal(true);
  };

  const handleAction = (id) => {
    setPressed(true);
    setSelectedIndex(id);

    if (id === indiceRespuestaCorrecta) setPuntaje((prev) => prev + 1);

    if (iterador === data.length - 1) {
      setMostrarPantallaFinal(true);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setTimeout(() => {
        setPressed(false);
        setIterador((prev) => (prev + 1) % data.length);
        setSelectedIndex(null);
      }, 300);
    }
  };

  const pregunta = data[iterador] || [];
  const respuestas = pregunta.respuestas || [];
  const respuestaCorrecta = respuestas.find((respuesta) => respuesta.valor);
  const indiceRespuestaCorrecta = respuestaCorrecta
    ? respuestas.indexOf(respuestaCorrecta)
    : null;

   const saveResult = async () => {
    if (isAuthenticated) {
      try {
        console.log("enviando datos",triviaData.id)
        const response = await axios.post(
          "http://localhost:3000/api/saveResult",
          { puntaje: puntaje, triviaId: triviaData.id, email:user.email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        triggerRefresh();
      } catch (error) {console.log(error)}
    }
  };

  /*
      const response = await axios.post(
        "https://cyber-commanders-laravel.vercel.app/rest/procesarCompra",
        { entradaData: datos.apiRequestBody, mpData: mercadoPagoData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  */

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh" // Ajusta la altura a 90% de la ventana
      width="100%"
      backgroundColor={"#070F2B"} // Cambia el color de fondo según el estado
      sx={{ border: 1, borderColor: "white" }}
    >
      {!inicio ? (
        <Box
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h3"
            component="h3"
            fontFamily="Oswald"
            fontWeight="100"
            padding={5}
            color="#E2DFD0"
          >
            Listo? Presiona el boton para comenzar. Tenes 60 segundos
          </Typography>
          <Button
            onClick={() => setInicio(true)}
            variant="outlined"
          >
            Iniciar
          </Button>
        </Box>
      ) : mostrarPantallaFinal ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={4}
          p={2}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              flexWrap: "wrap",
              "@media (max-width:600px)": {
                flexDirection: "column",
                alignItems: "center",
              },
            }}
          >
            <Typography
              variant="h3"
              component="h3"
              fontFamily="Oswald"
              fontWeight="100"
              padding={5}
              color="#E2DFD0"
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              Olympic
            </Typography>
            <Box
              padding="5"
              component="img"
              sx={{
                height: 138,
                width: 300,
                display: { xs: "block", sm: "block" },
              }}
              alt="Olympic."
              src="https://vxhbrvoxntfzyholqegd.supabase.co/storage/v1/object/public/images/pngwing.com.png"
            />
            <Typography
              variant="h3"
              component="h3"
              fontFamily="Oswald"
              fontWeight="100"
              padding={5}
              color="#E2DFD0"
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              Trivia
            </Typography>
          </Box>
          <Typography
            variant="h3"
            component="h3"
            fontFamily="Oswald"
            fontWeight="100"
            padding={5}
            color="#E2DFD0"
          >
            Tu resultado es: {puntaje}
          </Typography>
          <Link to="/">
            <Button
              onClick={() => saveResult()}
              variant="outlined"
            >
              Volver
            </Button>
          </Link>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={4}
          p={2}
        >
          <Typography
            color="#E2DFD0"
            fontFamily="Oswald"
            sx={{
              fontSize: {
                xs: "1.5rem", // Tamaño para pantallas extra pequeñas
                sm: "1.8rem", // Tamaño para pantallas pequeñas
                md: "2rem", // Tamaño para pantallas medianas
                lg: "2.5rem", // Tamaño para pantallas grandes
                xl: "3rem", // Tamaño para pantallas extra grandes
              },
            }}
          >
            {pregunta.texto}
          </Typography>
          <Typography color="#E2DFD0" fontFamily="Oswald">
            {`${puntaje} / ${data.length}`}
          </Typography>
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={4}
          >
            <CountdownTimer initialSeconds={60} onTimeUp={handleTimeUp} />
            {pregunta.respuestas &&
              pregunta.respuestas.map((respuesta, index) => (
                <Card
                  onAnswer={handleAction}
                  data={{
                    key: respuesta.index,
                    right: indiceRespuestaCorrecta,
                    isPressed: pressed,
                    selected: selectedIndex,
                    texto: respuesta.texto,
                    valor: respuesta.valor,
                  }}
                />
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Container;
