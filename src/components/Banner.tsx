import { Box, Container } from "@mui/material";
import GetStarted from "./GetStarted";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <Box
      minHeight='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundImage: "url(/landingbg.png)", backgroundSize: "cover" }}
      paddingTop='40px'
      paddingBottom='150px'
    >
      <Container>
        <Box
          display='flex'
          flexDirection={{ xs: "column", md: "row" }}
          gap={{ xs: 2, md: 25 }}
          alignItems='center'
          justifyContent='center'
        >
          <Box
            display='flex'
            flexDirection='column'
            sx={{
              img: {
                transition: "filter 0.3s",
              },
              "img:hover": {
                filter: "hue-rotate(45deg)",
              },
            }}
          >
            <img height={150} src='/typelogo.svg' alt='logo' />
            <Box
              mt={4}
              padding={1.5}
              bgcolor='transparent'
              border={1}
              borderColor='rgb(48, 71, 0)'
            >
              <Box display='flex' bgcolor='rgb(48, 71, 0)' mb={1} gap={0.5}>
                <Box height={12} width={12} bgcolor='rgb(235, 255, 183)'></Box>
                <Box height={12} width={12} bgcolor='rgb(235, 255, 183)'></Box>
                <Box height={12} width={12} bgcolor='rgb(235, 255, 183)'></Box>
              </Box>
              <Box
                maxWidth={350}
                textAlign='center'
                padding={1}
                bgcolor='rgb(235, 255, 183)'
              >
                <TypeAnimation
                  sequence={[
                    "GOCHI is an AI pet game that combines nostalgic Tamagotchi-style gameplay with crypto rewards. Players care for digital cat to earn SOLANA.",
                  ]}
                  wrapper='span'
                  speed={55}
                  style={{
                    color: "rgb(48, 71, 0)",
                    fontSize: "1.25rem",
                    display: "inline-block",
                  }}
                />
              </Box>
            </Box>
            <Box display='flex' justifyContent='center' mt={4}>
              <GetStarted />
            </Box>
            <Box display='flex' justifyContent='center' mt={4}>
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                gap={2}
                padding='0.5rem'
                sx={{
                  backgroundColor: "rgba(48,71,0, 0.1)",

                  borderRadius: 0.5,
                  a: {
                    cursor: "none",
                    transition: "0.3s",
                  },
                  "a:hover": {
                    cursor: "none",
                    transform: "scale(1.2)",
                  },
                }}
              >
                <a href='x' target='_blank' id='hover1'>
                  <img src='/x.png' width={24} height={24} />
                </a>
                <a href='x' target='_blank' id='hover2'>
                  <img src='/tg.png' width={24} height={24} />
                </a>
                <a href='x' target='_blank' id='hover3'>
                  <img src='/doc.png' width={24} height={24} />
                </a>
              </Box>
            </Box>
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            gap={2}
            alignItems='center'
          >
            <img height={300} src='/cat.gif' alt='logo' />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
