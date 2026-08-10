// src/app/admin/produtos/[id]/page.tsx

import { redirect, notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import ProductEditor from "./ProductEditor";
import StockEditor from "./StockEditor";

import {
    Box,
    Container,
    Typography,
    Paper,
    Stack,
    Divider,
    Chip,
    Button,
} from "@mui/material";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AdminProductPage({
    params,
}: ProductPageProps) {
    const { id } = await params;

    const productId = Number(id);

    if (!Number.isInteger(productId)) {
        notFound();
    }

    const supabase = await createClient();

    /*
        AUTENTICAÇÃO
     */

    const {
        data: {
            user,
        },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    /*
        VERIFICAÇÃO DE ADMIN
     */

    const {
        data: profile,
        error: profileError,
    } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (
        profileError ||
        !profile ||
        profile.role !== "admin"
    ) {
        redirect("/");
    }

    /*
        PRODUTO
     */

    const {
        data: product,
        error: productError,
    } = await supabase
        .from("products")
        .select(`
            id,
            name,
            slug,
            team,
            category,
            season,
            price,
            badge,
            image,
            description,
            featured,
            active
        `)
        .eq("id", productId)
        .single();

    if (productError || !product) {
        notFound();
    }

    /*
        ESTOQUE
     */

    const {
        data: variants,
        error: variantsError,
    } = await supabase
        .from("product_variants")
        .select(`
            id,
            size,
            stock
        `)
        .eq("product_id", productId)
        .order("size", {
            ascending: true,
        });

    if (variantsError) {
        console.error(
            "Erro ao carregar variantes:",
            variantsError
        );
    }

    const totalStock =
        variants?.reduce(
            (total, variant) =>
                total + Number(variant.stock || 0),
            0
        ) ?? 0;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                pt: {
                    xs: 12,
                    md: 14,
                },
                pb: 10,
            }}
        >
            <Container maxWidth="lg">

                {/* =================================================
                    CABEÇALHO
                ================================================= */}

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: {
                            xs: "flex-start",
                            sm: "center",
                        },
                        mb: 5,
                    }}
                >

                    <Box>

                        <Typography
                            variant="overline"
                            sx={{
                                color: "primary.main",
                                fontWeight: 900,
                                letterSpacing: 2,
                            }}
                        >
                            PRODUTO
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                mt: 0.5,
                                fontWeight: 900,
                                letterSpacing: "-1px",
                            }}
                        >
                            {product.name}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                color: "text.secondary",
                            }}
                        >
                            Visualização e informações do produto.
                        </Typography>

                    </Box>

                    <Button
                        component="a"
                        href="/admin/produtos"
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            fontWeight: 800,
                        }}
                    >
                        Voltar para produtos
                    </Button>

                </Stack>

                {/* =================================================
                    STATUS
                ================================================= */}

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        mb: 3,
                        flexWrap: "wrap",
                        gap: 1,
                    }}
                >

                    <Chip
                        label={
                            product.active
                                ? "ATIVO"
                                : "INATIVO"
                        }
                        color={
                            product.active
                                ? "success"
                                : "default"
                        }
                        sx={{
                            fontWeight: 800,
                        }}
                    />

                    <Chip
                        label={
                            product.featured
                                ? "DESTAQUE"
                                : "NÃO É DESTAQUE"
                        }
                        color={
                            product.featured
                                ? "primary"
                                : "default"
                        }
                        sx={{
                            fontWeight: 800,
                        }}
                    />

                    <Chip
                        label={
                            totalStock > 0
                                ? `${totalStock} unidades`
                                : "SEM ESTOQUE"
                        }
                        color={
                            totalStock > 0
                                ? "success"
                                : "error"
                        }
                        sx={{
                            fontWeight: 800,
                        }}
                    />

                </Stack>

                {/* =================================================
                    INFORMAÇÕES
                ================================================= */}

                <Paper
                    elevation={0}
                    sx={{
                        p: {
                            xs: 3,
                            md: 4,
                        },
                        borderRadius: 4,
                        background:
                            "rgba(255,255,255,.025)",
                        border:
                            "1px solid rgba(255,255,255,.07)",
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 900,
                            mb: 3,
                        }}
                    >
                        Informações do produto
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                            },
                            gap: 3,
                        }}
                    >

                        <InfoItem
                            label="Nome"
                            value={product.name}
                        />

                        <InfoItem
                            label="Time"
                            value={product.team}
                        />

                        <InfoItem
                            label="Categoria"
                            value={product.category}
                        />

                        <InfoItem
                            label="Temporada"
                            value={product.season}
                        />

                        <InfoItem
                            label="Preço"
                            value={Number(
                                product.price
                            ).toLocaleString(
                                "pt-BR",
                                {
                                    style: "currency",
                                    currency: "BRL",
                                }
                            )}
                        />

                        <InfoItem
                            label="Badge"
                            value={
                                product.badge || "Nenhuma"
                            }
                        />

                        <InfoItem
                            label="Slug"
                            value={product.slug}
                        />

                        <InfoItem
                            label="ID"
                            value={String(product.id)}
                        />

                    </Box>

                    <Divider
                        sx={{
                            my: 4,
                        }}
                    />

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 900,
                            mb: 2,
                        }}
                    >
                        Descrição
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                            lineHeight: 1.8,
                        }}
                    >
                        {product.description ||
                            "Nenhuma descrição cadastrada."}
                    </Typography>

                </Paper>

                <ProductEditor
                    productId={product.id}
                    name={product.name}
                    slug={product.slug}
                    team={product.team}
                    category={product.category}
                    season={product.season}
                    price={Number(product.price)}
                    badge={product.badge}
                    image={product.image}
                    description={product.description}
                    featured={Boolean(product.featured)}
                    active={Boolean(product.active)}
                />

                {/* =================================================
                    IMAGEM + ESTOQUE
                ================================================= */}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 1fr",
                        },
                        gap: 3,
                        mt: 3,
                    }}
                >

                    {/* IMAGEM */}

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            background:
                                "rgba(255,255,255,.025)",
                            border:
                                "1px solid rgba(255,255,255,.07)",
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 900,
                                mb: 3,
                            }}
                        >
                            Imagem
                        </Typography>

                        <Box
                            component="img"
                            src={product.image}
                            alt={product.name}
                            sx={{
                                width: "100%",
                                maxHeight: 420,
                                objectFit: "contain",
                                borderRadius: 3,
                                background:
                                    "rgba(0,0,0,.3)",
                            }}
                        />

                    </Paper>

                    {/* ESTOQUE */}

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            background:
                                "rgba(255,255,255,.025)",
                            border:
                                "1px solid rgba(255,255,255,.07)",
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 900,
                                mb: 3,
                            }}
                        >
                            Estoque por tamanho
                        </Typography>

                        <Stack spacing={1.5}>

                            {variants &&
                                variants.length > 0 ? (
                                variants.map(
                                    (variant) => (
                                        <Box
                                            key={
                                                variant.id
                                            }
                                            sx={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "space-between",
                                                px: 2,
                                                py: 1.5,
                                                borderRadius: 2,
                                                background:
                                                    "rgba(255,255,255,.03)",
                                                border:
                                                    "1px solid rgba(255,255,255,.05)",
                                            }}
                                        >

                                            <Typography
                                                sx={{
                                                    fontWeight: 800,
                                                }}
                                            >
                                                {variant.size}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: 900,
                                                    color:
                                                        Number(
                                                            variant.stock
                                                        ) >
                                                            0
                                                            ? "primary.main"
                                                            : "error.main",
                                                }}
                                            >
                                                {
                                                    variant.stock
                                                }{" "}
                                                un.
                                            </Typography>

                                        </Box>
                                    )
                                )
                            ) : (
                                <Typography
                                    sx={{
                                        color:
                                            "text.secondary",
                                    }}
                                >
                                    Nenhuma variante
                                    cadastrada.
                                </Typography>
                            )}

                        </Stack>

                        <Divider
                            sx={{
                                my: 3,
                            }}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems: "center",
                            }}
                        >

                            <Typography
                                sx={{
                                    color:
                                        "text.secondary",
                                }}
                            >
                                Total em estoque
                            </Typography>

                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 900,
                                }}
                            >
                                {totalStock} un.
                            </Typography>

                        </Box>

                    </Paper>

                </Box>

                <StockEditor
                    productId={product.id}
                    variants={variants ?? []}
                />

            </Container>
        </Box>
    );
}

/*
    COMPONENTE AUXILIAR
 */

function InfoItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <Box>

            <Typography
                variant="caption"
                sx={{
                    color: "text.secondary",
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    mt: 0.5,
                    fontWeight: 700,
                    wordBreak: "break-word",
                }}
            >
                {value}
            </Typography>

        </Box>
    );
}