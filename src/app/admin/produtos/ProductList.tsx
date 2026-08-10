// src/app/admin/produtos/ProductList.tsx

"use client";

import Link from "next/link";
import Image from "next/image";

import { useMemo, useState } from "react";

import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import type { Product } from "@/types/product";

interface ProductListProps {
    products: Product[];
}

type StatusFilter =
    | "todos"
    | "ativos"
    | "inativos"
    | "estoque"
    | "sem_estoque"
    | "destaques";

export default function ProductList({
    products,
}: ProductListProps) {
    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState<StatusFilter>("todos");

    const [categoryFilter, setCategoryFilter] =
        useState("todas");

    function getTotalStock(
        stock: Record<string, number>
    ) {
        return Object.values(stock).reduce(
            (total, quantity) =>
                total + Number(quantity || 0),
            0
        );
    }

    const categories = useMemo(() => {
        return Array.from(
            new Set(
                products
                    .map((product) => product.category)
                    .filter(Boolean)
            )
        ).sort();
    }, [products]);

    const filteredProducts = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase();

        return products.filter((product) => {
            /*
                BUSCA
            */

            const matchesSearch =
                !normalizedSearch ||
                product.name
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                product.team
                    .toLowerCase()
                    .includes(normalizedSearch);

            if (!matchesSearch) {
                return false;
            }

            /*
                CATEGORIA
            */

            const matchesCategory =
                categoryFilter === "todas" ||
                product.category === categoryFilter;

            if (!matchesCategory) {
                return false;
            }

            /*
                STATUS
            */

            const stock = getTotalStock(
                product.stock
            );

            switch (statusFilter) {
                case "ativos":
                    return product.active;

                case "inativos":
                    return !product.active;

                case "estoque":
                    return stock > 0;

                case "sem_estoque":
                    return stock === 0;

                case "destaques":
                    return product.featured;

                case "todos":
                default:
                    return true;
            }
        });
    }, [
        products,
        search,
        statusFilter,
        categoryFilter,
    ]);

    /*
        MÉTRICAS
    */

    const totalProducts = products.length;

    const activeProducts = products.filter(
        (product) => product.active
    ).length;

    const totalStock = products.reduce(
        (total, product) =>
            total + getTotalStock(product.stock),
        0
    );

    const outOfStock = products.filter(
        (product) =>
            getTotalStock(product.stock) === 0
    ).length;

    return (
        <Box>

            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                sx={{
                    justifyContent: "flex-end",
                    mb: 3,
                }}
            >
                <Button
                    component={Link}
                    href="/admin/produtos/novo"
                    variant="contained"
                    sx={{
                        borderRadius: 2,
                        fontWeight: 900,
                        px: 3,
                    }}
                >
                    + Novo produto
                </Button>
            </Stack>

            {/* =================================================
                RESUMO
            ================================================= */}

            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                spacing={2}
                sx={{ mb: 4 }}
            >

                <SummaryCard
                    label="Produtos"
                    value={totalProducts}
                />

                <SummaryCard
                    label="Produtos ativos"
                    value={activeProducts}
                />

                <SummaryCard
                    label="Unidades em estoque"
                    value={totalStock}
                />

                <SummaryCard
                    label="Sem estoque"
                    value={outOfStock}
                />

            </Stack>

            {/* =================================================
                BUSCA + FILTROS
            ================================================= */}

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 4,
                    background:
                        "rgba(255,255,255,.025)",
                    border:
                        "1px solid rgba(255,255,255,.07)",
                }}
            >

                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    spacing={2}
                >

                    <TextField
                        fullWidth
                        label="Pesquisar produto"
                        placeholder="Nome ou time..."
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                    <FormControl
                        sx={{
                            minWidth: {
                                xs: "100%",
                                md: 220,
                            },
                        }}
                    >
                        <InputLabel>
                            Status
                        </InputLabel>

                        <Select
                            value={statusFilter}
                            label="Status"
                            onChange={(event) =>
                                setStatusFilter(
                                    event.target
                                        .value as StatusFilter
                                )
                            }
                        >
                            <MenuItem value="todos">
                                Todos
                            </MenuItem>

                            <MenuItem value="ativos">
                                Ativos
                            </MenuItem>

                            <MenuItem value="inativos">
                                Inativos
                            </MenuItem>

                            <MenuItem value="estoque">
                                Com estoque
                            </MenuItem>

                            <MenuItem value="sem_estoque">
                                Sem estoque
                            </MenuItem>

                            <MenuItem value="destaques">
                                Destaques
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl
                        sx={{
                            minWidth: {
                                xs: "100%",
                                md: 220,
                            },
                        }}
                    >
                        <InputLabel>
                            Categoria
                        </InputLabel>

                        <Select
                            value={categoryFilter}
                            label="Categoria"
                            onChange={(event) =>
                                setCategoryFilter(
                                    event.target.value
                                )
                            }
                        >
                            <MenuItem value="todas">
                                Todas
                            </MenuItem>

                            {categories.map(
                                (category) => (
                                    <MenuItem
                                        key={category}
                                        value={category}
                                    >
                                        {category}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>

                </Stack>

                {(search ||
                    statusFilter !== "todos" ||
                    categoryFilter !== "todas") && (
                        <Box sx={{ mt: 2 }}>

                            <Button
                                size="small"
                                onClick={() => {
                                    setSearch("");
                                    setStatusFilter("todos");
                                    setCategoryFilter(
                                        "todas"
                                    );
                                }}
                                sx={{
                                    fontWeight: 800,
                                }}
                            >
                                Limpar filtros
                            </Button>

                        </Box>
                    )}

            </Paper>

            {/* =================================================
                RESULTADOS
            ================================================= */}

            <Stack
                direction="row"
                sx={{
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >

                <Typography
                    sx={{
                        color: "text.secondary",
                        fontWeight: 700,
                    }}
                >
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1
                        ? "produto encontrado"
                        : "produtos encontrados"}
                </Typography>

            </Stack>

            {/* =================================================
                TABELA
            ================================================= */}

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

                <TableContainer
                    sx={{
                        overflowX: "auto",
                    }}
                >

                    <Table
                        sx={{
                            minWidth: 1000,
                        }}
                    >

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

                                <TableCell align="center">
                                    Ações
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {filteredProducts.map(
                                (product) => {
                                    const stock =
                                        getTotalStock(
                                            product.stock
                                        );

                                    const isOutOfStock =
                                        stock === 0;

                                    return (
                                        <TableRow
                                            key={
                                                product.id
                                            }
                                            hover
                                        >

                                            {/* PRODUTO */}

                                            <TableCell>

                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                    sx={{
                                                        alignItems:
                                                            "center",
                                                    }}
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

                                                {Number(
                                                    product.price
                                                ).toLocaleString(
                                                    "pt-BR",
                                                    {
                                                        style:
                                                            "currency",
                                                        currency:
                                                            "BRL",
                                                    }
                                                )}

                                            </TableCell>

                                            {/* ESTOQUE */}

                                            <TableCell align="center">

                                                <Stack
                                                    spacing={0.5}
                                                    sx={{
                                                        alignItems:
                                                            "center",
                                                    }}
                                                >

                                                    <Typography
                                                        sx={{
                                                            fontWeight: 900,
                                                            color:
                                                                isOutOfStock
                                                                    ? "error.main"
                                                                    : "text.primary",
                                                        }}
                                                    >
                                                        {stock}
                                                    </Typography>

                                                    {isOutOfStock && (
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color:
                                                                    "error.main",
                                                                fontWeight:
                                                                    700,
                                                            }}
                                                        >
                                                            Sem estoque
                                                        </Typography>
                                                    )}

                                                </Stack>

                                            </TableCell>

                                            {/* STATUS */}

                                            <TableCell align="center">

                                                <Chip
                                                    label={
                                                        product.active
                                                            ? "ATIVO"
                                                            : "INATIVO"
                                                    }
                                                    size="small"
                                                    color={
                                                        product.active
                                                            ? "success"
                                                            : "default"
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

                                            {/* AÇÕES */}

                                            <TableCell align="center">

                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    sx={{
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >

                                                    <Button
                                                        component={
                                                            Link
                                                        }
                                                        href={`/admin/produtos/${product.id}`}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            borderRadius: 2,
                                                            fontWeight: 800,
                                                        }}
                                                    >
                                                        Ver
                                                    </Button>

                                                    <Button
                                                        component={
                                                            Link
                                                        }
                                                        href={`/admin/produtos/${product.id}`}
                                                        variant="contained"
                                                        size="small"
                                                        sx={{
                                                            borderRadius: 2,
                                                            fontWeight: 800,
                                                        }}
                                                    >
                                                        Editar
                                                    </Button>

                                                </Stack>

                                            </TableCell>

                                        </TableRow>
                                    );
                                }
                            )}

                            {/* NENHUM RESULTADO */}

                            {filteredProducts.length ===
                                0 && (
                                    <TableRow>

                                        <TableCell
                                            colSpan={8}
                                            align="center"
                                            sx={{
                                                py: 8,
                                            }}
                                        >

                                            <Typography
                                                sx={{
                                                    fontWeight: 800,
                                                }}
                                            >
                                                Nenhum produto
                                                encontrado.
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mt: 1,
                                                    color:
                                                        "text.secondary",
                                                }}
                                            >
                                                Tente alterar a
                                                busca ou os
                                                filtros.
                                            </Typography>

                                        </TableCell>

                                    </TableRow>
                                )}

                        </TableBody>

                    </Table>

                </TableContainer>

            </Paper>

        </Box>
    );
}

/*
    CARD DE RESUMO
*/

function SummaryCard({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
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
                {label}
            </Typography>

            <Typography
                variant="h4"
                sx={{
                    mt: 1,
                    fontWeight: 900,
                }}
            >
                {value}
            </Typography>

        </Paper>
    );
}