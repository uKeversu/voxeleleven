"use client";

import { Box, Typography } from "@mui/material";

export default function BrandSection() {
  return (
    <Box sx={{ py: 12, textAlign: "center", px: 3 }}>
      <Typography
        sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" }, fontWeight: 900 }}
      >
        NÃO VENDEMOS CAMISAS.
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: "1.8rem", md: "2.5rem" },
          fontWeight: 900,
          color: "primary.main",
        }}
      >
        VENDEMOS IDENTIDADE.
      </Typography>

      <Typography sx={{ mt: 3, color: "#aaa", maxWidth: 600, mx: "auto" }}>
        Cada peça representa história, cultura e paixão pelo futebol mundial.
      </Typography>
    </Box>
  );
}