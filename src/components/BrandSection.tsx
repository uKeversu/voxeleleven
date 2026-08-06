// src/components/BrandSection.tsx

"use client";

import { Box, Container, Grid, Typography } from "@mui/material";

const stats = [
  {
    value: "50+",
    label: "Modelos",
  },
  {
    value: "30+",
    label: "Clubes",
  },
  {
    value: "Premium",
    label: "Qualidade",
  },
  {
    value: "Brasil",
    label: "Entrega",
  },
];

export default function BrandSection() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 10, md: 16 },
        background: `
          radial-gradient(circle at top, rgba(0,255,64,0.08), transparent 45%),
          linear-gradient(180deg, #050505 0%, #0a0a0a 100%)
        `,
        borderTop: "1px solid rgba(255,255,255,.05)",
        borderBottom: "1px solid rgba(255,255,255,.05)",
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",
          top: -150,
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "primary.main",
          opacity: 0.06,
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "text.secondary",
              fontWeight: 700,
              fontSize: ".8rem",
            }}
          >
            Voxel Eleven
          </Typography>

          <Typography
            sx={{
              mt: 3,
              fontWeight: 900,
              lineHeight: 1,
              fontSize: {
                xs: "2.2rem",
                md: "4rem",
              },
            }}
          >
            NÃO VENDEMOS
            <br />
            CAMISAS.
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontWeight: 900,
              lineHeight: 1,
              color: "primary.main",
              fontSize: {
                xs: "2.2rem",
                md: "4rem",
              },
            }}
          >
            VENDEMOS IDENTIDADE.
          </Typography>

          <Typography
            sx={{
              mt: 4,
              maxWidth: 760,
              mx: "auto",
              color: "text.secondary",
              fontSize: {
                xs: "1rem",
                md: "1.15rem",
              },
              lineHeight: 1.8,
            }}
          >
            Algumas partidas terminam aos 90 minutos.
            <br />
            Algumas camisas atravessam gerações.
            <br />
            Cada peça representa história, cultura e paixão pelo futebol.
          </Typography>
        </Box>

        <Box
          sx={{
            width: 80,
            height: 2,
            bgcolor: "primary.main",
            mx: "auto",
            my: 8,
            borderRadius: 999,
          }}
        />

        <Grid container spacing={4}>
          {stats.map((item) => (
            <Grid size={{ xs: 6, md: 3 }} key={item.label}>
              <Box
                sx={{
                  textAlign: "center",
                  py: 3,
                  border: "1px solid rgba(255,255,255,.06)",
                  borderRadius: 3,
                  background: "rgba(255,255,255,.02)",
                  backdropFilter: "blur(8px)",
                  transition: ".25s",
                  "&:hover": {
                    borderColor: "primary.main",
                    transform: "translateY(-4px)",
                    background: "rgba(255,255,255,.04)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,
                    color: "primary.main",
                    fontSize: {
                      xs: "1.8rem",
                      md: "2.3rem",
                    },
                  }}
                >
                  {item.value}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    fontSize: ".85rem",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}