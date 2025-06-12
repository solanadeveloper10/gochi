import {
  Box,
  DialogContent,
  Dialog,
  DialogContentText,
  Typography,
  TextField,
} from "@mui/material";
import { useState, type FC } from "react";
import Button from "./Button";

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

  return (
    <Box>
      <Button onClick={() => setOpen(true)}>Get Started</Button>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='md'
        slotProps={{
          paper: {
            sx: { borderRadius: 0 },
          },
        }}
      >
        <Box bgcolor='transparent' border={1} borderColor='rgb(48, 71, 0)'>
          <Box display='flex' bgcolor='rgb(48, 71, 0)' padding={1}>
            <Box
              onClick={onClose}
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
              height={12}
              width={12}
              bgcolor='rgb(239, 68, 68)'
              borderRadius='50%'
            ></Box>
          </Box>
          <Box textAlign='center' padding={1} bgcolor='rgb(235, 255, 183)'>
            <Typography
              variant='body1'
              color='rgb(48, 71, 0)'
              fontSize='1.25rem'
            >
              Connect your wallet to get started
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
                    sx={{ mt: 4 }}
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <>
                  <DialogContentText>
                    To continue, please connect your Phantom wallet.
                  </DialogContentText>
                  <Button onClick={connectWallet} sx={{ mt: 2 }}>
                    Connect Phantom Wallet
                  </Button>
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
