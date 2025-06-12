import {
  Box,
  DialogContent,
  Dialog,
  DialogContentText,
  Typography,
  TextField,
  Divider,
  Button as MuiButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEffect, useState, type FC } from "react";
import Button from "./Button";
import { Phantom } from "./Phantom";

type PhantomProvider = {
  isPhantom: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
};

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const GetStarted: FC = () => {
  const [open, setOpen] = useState(false);
  const provider = window.solana;
  const [walletConnected, setWalletConnected] = useState(false);
  const [code, setCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (provider?.isPhantom) {
      try {
        const response = await provider.connect();
        console.log(response);
        setWalletAddress(response.publicKey.toString());
        setWalletConnected(true);
      } catch (err) {
        console.error("Connection to Phantom failed", err);
      }
    } else {
      if (isMobile) {
        const baseUrl = window.location.origin;
        console.log(baseUrl);

        window.location.href = `https://phantom.app/ul/browse/${baseUrl}`;
      } else {
        alert("Phantom wallet not found. Please install it.");
      }
    }
  };

  const disconnectWallet = async () => {
    if (provider?.isPhantom) {
      try {
        await provider.disconnect();
        setWalletAddress(null);
        setWalletConnected(false);
      } catch (err) {
        console.error("Failed to disconnect wallet", err);
      }
    }
  };

  const onClose = async () => {
    setOpen(false);

    await disconnectWallet();
  };

  useEffect(() => {
    setTimeout(() => {
      const cursor = document.getElementById("custom-cursor");

      const hoverTarget5 = document.getElementById("hover5");
      const hoverTarget6 = document.getElementById("hover6");
      const hoverTarget7 = document.getElementById("hover7");
      const hoverTarget8 = document.getElementById("hover8");

      [hoverTarget5, hoverTarget6, hoverTarget7, hoverTarget8].forEach(
        (target) => {
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
        }
      );
    }, 100);
  }, [open, walletConnected]);

  return (
    <Box>
      <Button
        sx={{
          cursor: "none",
        }}
        id='hover4'
        onClick={() => setOpen(true)}
      >
        Get Started
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='sm'
        slotProps={{
          paper: {
            sx: { borderRadius: 0 },
          },
        }}
      >
        <Box bgcolor='transparent' border={5} borderColor='rgb(48, 71, 0)'>
          <Box
            display='flex'
            padding={2}
            bgcolor='rgb(201, 238, 106)'
            justifyContent='end'
          >
            <Box
              onClick={onClose}
              sx={{
                cursor: "none",
                ":hover": {
                  cursor: "none",
                },
              }}
              id='hover5'
            >
              <Close />
            </Box>
          </Box>
          <Box textAlign='center' bgcolor='rgb(201, 238, 106)'>
            <Typography variant='h3' color='rgb(48, 71, 0)'>
              Sign in / Connect
            </Typography>
            <DialogContent>
              {walletConnected ? (
                <>
                  <DialogContentText sx={{ wordBreak: "break-all" }}>
                    Wallet connected: <strong>{walletAddress}</strong>
                  </DialogContentText>
                  <Typography color='red'>You are not eligible</Typography>
                  <Typography variant='h4' mt={3} mb={2}>
                    Do you have a code to enter the app?
                  </Typography>
                  <Box>
                    <TextField
                      onChange={(e) => {
                        setCode(e.target.value);
                        setIsError(false);
                      }}
                      helperText={
                        isError && (
                          <Typography color='red'>Code is invalid</Typography>
                        )
                      }
                    />
                  </Box>

                  <Button
                    onClick={() => {
                      if (code) {
                        setIsError(true);
                      }
                    }}
                    sx={{
                      cursor: "none",
                      mt: 4,
                      backgroundColor: "rgb(235, 255, 183)",
                      ":hover": {
                        backgroundColor: "rgb(235, 255, 183)",
                      },
                    }}
                    id='hover8'
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <>
                  <DialogContentText>
                    <Typography variant='body2'>
                      Choose your preffered method to join the fun!
                    </Typography>
                  </DialogContentText>
                  <Divider
                    sx={{
                      my: 3,
                      borderWidth: 1.5,
                      borderColor: "rgb(48,71, 0)",
                      opacity: 0.3,
                    }}
                  />
                  <Button
                    id='hover6'
                    onClick={connectWallet}
                    sx={{
                      cursor: "none",
                      backgroundColor: "rgb(235, 255, 183)",
                      ":hover": {
                        backgroundColor: "rgb(235, 255, 183)",
                      },
                    }}
                    startIcon={<Phantom />}
                  >
                    Connect Phantom Wallet
                  </Button>
                  <Divider
                    sx={{
                      my: 3,
                      borderWidth: 1.5,
                      borderColor: "rgb(48,71, 0)",
                      opacity: 0.3,
                    }}
                  />
                  <Typography mb={2}>Don't have a solana wallet?</Typography>
                  <MuiButton
                    component='a'
                    startIcon={<Phantom />}
                    sx={{ color: "#000", cursor: "none" }}
                    href='https://phantom.com/'
                    target='_blank'
                    id='hover7'
                  >
                    Install Phantom
                  </MuiButton>
                </>
              )}
            </DialogContent>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default GetStarted;
