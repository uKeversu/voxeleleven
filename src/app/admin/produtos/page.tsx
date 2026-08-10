// src/app/admin/produtos/page.tsx

import Image from "next/image";

import {
    Box,
    Chip,
    Container,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import { getProducts } from "@/lib/products";

function getTotalStock(stock: Record<string, number>) {
    return Object.values(stock).reduce(
        (total, quantity) => total + quantity,
        0
    );
}

export default async function AdminProdutosPage() {
    const products = await getProducts();

    const totalProducts = products.length;

    const totalStock = products.reduce(
        (total, product) =>
            total + getTotalStock(product.stock),
        0
    );

    const outOfStock = products.filter(
        (product) => getTotalStock(product.stock) === 0
    ).length;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                pt: {
                    xs: 14,
                    md: 18,
                },
                pb: 10,
            }}
        >
            <Container maxWidth="xl">

                {/* CABEÇALHO */}
                <Stack spacing={1} sx={{ mb: 5 }}>
                    <Typography
                        variant="overline"
                        sx={{
                            color: "primary.main",
                            fontWeight: 900,
                            letterSpacing: 2,
                        }}
                    >
                        PRODUTOS
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 900,
                            letterSpacing: "-1px",
                        }}
                    >
                        Gerenciamento de produtos
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                        }}
                    >
                        Visualize e gerencie o catálogo da Voxel Eleven.
                    </Typography>
                </Stack>

                {/* RESUMO */}
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                    sx={{ mb: 4 }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            flex: 1,
                            p: 3,
                            borderRadius: 3,
                            background:
                                "rgba(255,255,255,.025)",
                            border:
                                "1px solid rgba(255,255,255,.07)",
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                            }}
                        >
                            Produtos ativos
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                mt: 1,
                                fontWeight: 900,
                            }}
                        >
                            {totalProducts}
                        </Typography>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            flex: 1,
                            p: 3,
                            borderRadius: 3,
                            background:
                                "rgba(255,255,255,.025)",
                            border:
                                "1px solid rgba(255,255,255,.07)",
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                            }}
                        >
                            Unidades em estoque
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                mt: 1,
                                fontWeight: 900,
                            }}
                        >
                            {totalStock}
                        </Typography>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            flex: 1,
                            p: 3,
                            borderRadius: 3,
                            background:
                                "rgba(255,255,255,.025)",
                            border:
                                "1px solid rgba(255,255,255,.07)",
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                            }}
                        >
                            Sem estoque
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                mt: 1,
                                fontWeight: 900,
                            }}
                        >
                            {outOfStock}
                        </Typography>
                    </Paper>
                </Stack>

                {/* TABELA */}
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        background:
                            "rgba(255,255,255,.025)",
                        border:
                            "1px solid rgba(255,255,255,.07)",
                    }}
                >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Produto
                                    </TableCell>

                                    <TableCell>
                                        Categoria
                                    </TableCell>

                                    <TableCell>
                                        Temporada
                                    </TableCell>

                                    <TableCell align="right">
                                        Preço
                                    </TableCell>

                                    <TableCell align="center">
                                        Estoque
                                    </TableCell>

                                    <TableCell align="center">
                                        Status
                                    </TableCell>

                                    <TableCell align="center">
                                        Destaque
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {products.map((product) => {
                                    const stock =
                                        getTotalStock(
                                            product.stock
                                        );

                                    const isOutOfStock =
                                        stock === 0;

                                    return (
                                        <TableRow
                                            key={product.id}
                                            hover
                                        >
                                            {/* PRODUTO */}
                                            <TableCell>
                                                <Stack
                                                    spacing={2}
                                                    sx={{ flexDirection: 'row', alignItems: 'center' }}
                                                >
                                                    <Box
                                                        sx={{
                                                            position:
                                                                "relative",
                                                            width: 56,
                                                            height: 70,
                                                            flexShrink: 0,
                                                            borderRadius: 2,
                                                            overflow:
                                                                "hidden",
                                                            background:
                                                                "rgba(255,255,255,.04)",
                                                        }}
                                                    >
                                                        <Image
                                                            src={
                                                                product.image
                                                            }
                                                            alt={
                                                                product.name
                                                            }
                                                            fill
                                                            sizes="56px"
                                                            style={{
                                                                objectFit:
                                                                    "cover",
                                                            }}
                                                        />
                                                    </Box>

                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: 800,
                                                            }}
                                                        >
                                                            {
                                                                product.name
                                                            }
                                                        </Typography>

                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color:
                                                                    "text.secondary",
                                                            }}
                                                        >
                                                            {
                                                                product.team
                                                            }
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </TableCell>

                                            {/* CATEGORIA */}
                                            <TableCell>
                                                {
                                                    product.category
                                                }
                                            </TableCell>

                                            {/* TEMPORADA */}
                                            <TableCell>
                                                {
                                                    product.season
                                                }
                                            </TableCell>

                                            {/* PREÇO */}
                                            <TableCell align="right">
                                                R${" "}
                                                {product.price
                                                    .toFixed(2)
                                                    .replace(
                                                        ".",
                                                        ","
                                                    )}
                                            </TableCell>

                                            {/* ESTOQUE */}
                                            <TableCell align="center">
                                                <Typography
                                                    sx={{
                                                        fontWeight: 800,
                                                    }}
                                                >
                                                    {stock}
                                                </Typography>
                                            </TableCell>

                                            {/* STATUS */}
                                            <TableCell align="center">
                                                <Chip
                                                    label={
                                                        isOutOfStock
                                                            ? "SEM ESTOQUE"
                                                            : "ATIVO"
                                                    }
                                                    size="small"
                                                    color={
                                                        isOutOfStock
                                                            ? "default"
                                                            : "success"
                                                    }
                                                    sx={{
                                                        fontWeight: 800,
                                                    }}
                                                />
                                            </TableCell>

                                            {/* DESTAQUE */}
                                            <TableCell align="center">
                                                {product.featured ? (
                                                    <Chip
                                                        label="DESTAQUE"
                                                        size="small"
                                                        color="primary"
                                                        sx={{
                                                            fontWeight: 800,
                                                        }}
                                                    />
                                                ) : (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color:
                                                                "text.secondary",
                                                        }}
                                                    >
                                                        Não
                                                    </Typography>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

            </Container>
        </Box>
    );
}