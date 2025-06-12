import React, { useEffect } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { theme } from "./theme";
import Footer from "./components/Footer";
import Banner from "./components/Banner";

const App: React.FC = () => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");

    const hoverTarget1 = document.getElementById("hover1");
    const hoverTarget2 = document.getElementById("hover2");
    const hoverTarget3 = document.getElementById("hover3");
    const hoverTarget4 = document.getElementById("hover4");
    const hoverTarget5 = document.getElementById("hover5");
    const hoverTarget6 = document.getElementById("hover6");
    const hoverTarget7 = document.getElementById("hover7");

    [
      hoverTarget1,
      hoverTarget2,
      hoverTarget3,
      hoverTarget4,
      hoverTarget5,
      hoverTarget6,
      hoverTarget7,
    ].forEach((target) => {
      if (cursor && target) {
        target.addEventListener("mouseenter", () => {
          cursor.classList.add("cursor2");
        });

        target.addEventListener("mouseleave", () => {
          cursor.classList.remove("cursor2");
        });

        target.addEventListener("click", () => {
          cursor.classList.remove("cursor2");
        });
      }
    });

    const moveCursor = (e: { clientX: number; clientY: number }) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box id='custom-cursor'></Box>

      <CssBaseline />
      <Banner />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
