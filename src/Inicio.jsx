import React from "react";
import axios from "axios";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { useRefresh } from './RefreshContext';

function Inicio() {
  const { refreshKey } = useRefresh();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const url = "http://localhost:3000/api/trivias";
  const urlUser = "http://localhost:3000/api/triviasUser";
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      if (isLoading) return; 
      try {
        let response;
        if (isAuthenticated && user && user.email) {
          response = await axios.get(urlUser, {
            params: { email: user.email },
          });
        } else {
          response = await axios.get(url);
        }
        setData(response.data.body);
      } catch (err) {
        setError(err);
        console.log("Error fetching data:", err);
      }
    };

    fetchData();
  }, [isAuthenticated, user, isLoading,refreshKey]); 

  return (
    <Box
      height={"100%"}
      width={"100%"}
      my={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >

      <Typography
        variant="body1"
        sx={{ mb: 1, fontFamily: "Oswald", fontSize: 50, color: "#E2DFD0" }}
      >
        Olympic Trivia
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ my: 4 }}
      >
        {data &&
          data.map((trivia) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={trivia.id}
              sx={{
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

        
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                    fontFamily: "Oswald",
                    color: "#E2DFD0",
                    fontSize: 20,
                    fontWeight: 100,
                  }}
                >
                  
                  {isAuthenticated ? (trivia.puntaje) : "Logueate para ver tus puntajes "}
                </Typography>
              

              <Link to={`/trivia/${trivia.id}`} state={{ trivia }}>
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
            </Grid>
          ))}
      </Grid>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </Box>
  );
}

export default Inicio;
