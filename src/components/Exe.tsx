import { Box, Typography } from "@mui/material";
import type { FC } from "react";

const Exe: FC = () => {
  return (
    <Box
      sx={{
        paddingBottom: "1.5rem",
        border: 8,
        borderColor: "rgb(48, 71, 0)",
        bgcolor: "rgba(235, 255, 183, 0.4)",
        borderRadius: 1,
      }}
    >
      <Box
        display='flex'
        alignItems='center'
        paddingX='0.25rem'
        bgcolor='rgb(48, 71, 0)'
        gap={0.5}
      >
        <Box
          bgcolor='rgb(235, 255, 183)'
          width='8px'
          height='8px'
          borderRadius='50%'
        />
        <Typography variant='body1' color='rgb(235, 255, 183)'>
          GOCHI.EXE
        </Typography>
      </Box>
    </Box>
  );
};

export default Exe;
