// src/app/admin/pedidos/novo/NovoPedidoForm.tsx

"use client";

import Link from "next/link";

import {
    useMemo,
    useState,
} from "react";

import {
    Box,
    Button,
    Chip,
    Divider,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    createManualOrder,
} from "./actions";

type Variant = {
    id: number;
    size: string;
    stock: number;
};

type Product = {
    id: number;
    name: string;
    price: number;
    image: string | null;
    active: boolean;
    product_variants: Variant[];
};

type OrderItem = {
    key: string;
    product_id: number;
    variant_id: number;
    name: string;
    size: string;
    quantity: number;
    unit_price: number;
    stock: number;
};

type PaymentMethod =
    | "pix"
    | "card"
    | "fiado";

interface NovoPedidoFormProps {
    products: Product[];
}

export default function NovoPedidoForm({
    products,
}: NovoPedidoFormProps) {

    const [customerName, setCustomerName] =
        useState("");

    const [customerPhone, setCustomerPhone] =
        useState("");

    const [customerEmail, setCustomerEmail] =
        useState("");

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>("fiado");

    const [paymentDueDate, setPaymentDueDate] =
        useState("");

    const [paymentNotes, setPaymentNotes] =
        useState("");

    const [selectedProductId, setSelectedProductId] =
        useState("");

    const [selectedVariantId, setSelectedVariantId] =
        useState("");

    const [quantity, setQuantity] =
        useState("1");

    const [items, setItems] =
        useState<OrderItem[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const selectedProduct = useMemo(() => {
        if (!selectedProductId) {
            return null;
        }

        return products.find(
            (product) =>
                Number(product.id) ===
                Number(selectedProductId)
        ) ?? null;
    }, [products, selectedProductId]);

    const availableVariants =
        selectedProduct?.product_variants ?? [];

    const selectedVariant = useMemo(() => {
        if (!selectedVariantId) {
            return null;
        }

        return availableVariants.find(
            (variant) =>
                Number(variant.id) ===
                Number(selectedVariantId)
        ) ?? null;
    }, [availableVariants, selectedVariantId]);

    /*
     * TOTAL
     */

    const subtotal = useMemo(() => {
        return items.reduce(
            (total, item) =>
                total +
                item.unit_price *
                item.quantity,
            0
        );
    }, [items]);

    const [shippingCost, setShippingCost] =
        useState("0");

    const [discount, setDiscount] =
        useState("0");

    const shippingValue =
        Math.max(0, Number(shippingCost) || 0);

    const discountValue =
        Math.max(0, Number(discount) || 0);

    const total =
        Math.max(
            0,
            subtotal +
            shippingValue -
            discountValue
        );

    /*
     * FORMATAÇÃO
     */

    function formatCurrency(
        value: number
    ) {
        return value.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
            }
        );
    }

    /*
     * QUANDO TROCA O PRODUTO
     */

    function handleProductChange(
        value: string
    ) {
        setSelectedProductId(value);
        setSelectedVariantId("");
    }

    /*
     * ADICIONAR PRODUTO
     */

    function handleAddProduct() {

        setError("");

        if (!selectedProduct) {
            setError(
                "Selecione um produto."
            );
            return;
        }

        if (!selectedVariant) {
            setError(
                "Selecione um tamanho."
            );
            return;
        }

        const parsedQuantity =
            Number(quantity);

        if (
            !Number.isInteger(
                parsedQuantity
            ) ||
            parsedQuantity <= 0
        ) {
            setError(
                "Informe uma quantidade válida."
            );
            return;
        }

        if (
            parsedQuantity >
            selectedVariant.stock
        ) {
            setError(
                `Estoque insuficiente. Disponível: ${selectedVariant.stock}.`
            );
            return;
        }

        const key =
            `${selectedProduct.id}-${selectedVariant.id}`;

        const existingItem =
            items.find(
                (item) =>
                    item.key === key
            );

        if (existingItem) {

            const newQuantity =
                existingItem.quantity +
                parsedQuantity;

            if (
                newQuantity >
                selectedVariant.stock
            ) {
                setError(
                    `A quantidade total não pode ultrapassar o estoque disponível (${selectedVariant.stock}).`
                );
                return;
            }

            setItems(
                items.map((item) =>
                    item.key === key
                        ? {
                            ...item,
                            quantity:
                                newQuantity,
                        }
                        : item
                )
            );

        } else {

            setItems([
                ...items,
                {
                    key,
                    product_id:
                        selectedProduct.id,
                    variant_id:
                        selectedVariant.id,
                    name:
                        selectedProduct.name,
                    size:
                        selectedVariant.size,
                    quantity:
                        parsedQuantity,
                    unit_price:
                        Number(
                            selectedProduct.price
                        ),
                    stock:
                        selectedVariant.stock,
                },
            ]);

        }

        setQuantity("1");
        setSelectedProductId("");
        setSelectedVariantId("");
    }

    /*
     * REMOVER PRODUTO
     */

    function handleRemoveItem(
        key: string
    ) {
        setItems(
            items.filter(
                (item) =>
                    item.key !== key
            )
        );
    }

    /*
     * ALTERAR QUANTIDADE
     */

    function handleQuantityChange(
        key: string,
        value: number
    ) {

        if (
            value < 1 ||
            !Number.isInteger(value)
        ) {
            return;
        }

        setItems(
            items.map((item) => {

                if (
                    item.key !== key
                ) {
                    return item;
                }

                if (
                    value > item.stock
                ) {
                    return item;
                }

                return {
                    ...item,
                    quantity: value,
                };
            })
        );
    }

    /*
     * FINALIZAR
     */

    async function handleSubmit() {

        setError("");

        if (
            !customerName.trim()
        ) {
            setError(
                "Informe o nome do cliente."
            );
            return;
        }

        if (items.length === 0) {
            setError(
                "Adicione pelo menos um produto."
            );
            return;
        }

        if (shippingValue < 0) {
            setError(
                "O frete não pode ser negativo."
            );
            return;
        }

        if (discountValue < 0) {
            setError(
                "O desconto não pode ser negativo."
            );
            return;
        }

        if (
            discountValue >
            subtotal + shippingValue
        ) {
            setError(
                "O desconto não pode ser maior que o valor total do pedido."
            );
            return;
        }

        if (
            paymentMethod ===
            "fiado" &&
            !paymentDueDate
        ) {
            setError(
                "Informe a data para pagamento."
            );
            return;
        }

        setLoading(true);

        try {

            const result =
                await createManualOrder({
                    customer_name:
                        customerName.trim(),

                    customer_phone:
                        customerPhone.trim() ||
                        null,

                    customer_email:
                        customerEmail.trim() ||
                        null,

                    payment_method:
                        paymentMethod,

                    payment_due_date:
                        paymentMethod === "fiado"
                            ? paymentDueDate
                            : null,

                    payment_notes:
                        paymentMethod === "fiado"
                            ? paymentNotes.trim() || null
                            : null,

                    subtotal,

                    shipping_cost:
                        shippingValue,

                    discount:
                        discountValue,

                    total,

                    items: items.map(
                        (item) => ({
                            product_id:
                                item.product_id,

                            variant_id:
                                item.variant_id,

                            size:
                                item.size,

                            quantity:
                                item.quantity,

                            unit_price:
                                item.unit_price,

                            total_price:
                                item.unit_price *
                                item.quantity,

                            name:
                                item.name,
                        })
                    ),
                });

            if (!result.success) {
                throw new Error(
                    result.error ||
                    "Não foi possível criar o pedido."
                );
            }

            window.location.href =
                `/admin/pedidos/${result.orderId}`;

        } catch (err) {

            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Erro ao finalizar pedido."
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <Stack spacing={3}>

            {/* CLIENTE */}

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 2,
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
                    Cliente
                </Typography>

                <Stack spacing={2}>

                    <TextField
                        fullWidth
                        label="Nome do cliente"
                        placeholder="Ex.: João da Silva"
                        value={customerName}
                        onChange={(event) =>
                            setCustomerName(
                                event.target.value
                            )
                        }
                    />

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={2}
                    >

                        <TextField
                            fullWidth
                            label="Telefone"
                            placeholder="(47) 99999-9999"
                            value={customerPhone}
                            onChange={(event) =>
                                setCustomerPhone(
                                    event.target.value
                                )
                            }
                        />

                        <TextField
                            fullWidth
                            label="E-mail"
                            placeholder="cliente@email.com"
                            value={customerEmail}
                            onChange={(event) =>
                                setCustomerEmail(
                                    event.target.value
                                )
                            }
                        />

                    </Stack>

                </Stack>

            </Paper>

            {/* PRODUTOS */}

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 2,
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
                    Produtos
                </Typography>

                <Stack spacing={2}>

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={2}
                    >

                        <TextField
                            select
                            fullWidth
                            label="Produto"
                            value={
                                selectedProductId
                            }
                            onChange={(event) =>
                                handleProductChange(
                                    event.target.value
                                )
                            }
                        >

                            <MenuItem value="">
                                Selecione um produto
                            </MenuItem>

                            {products
                                .filter((product) =>
                                    product.product_variants.some(
                                        (variant) => variant.stock > 0
                                    )
                                )
                                .map((product) => (
                                    <MenuItem
                                        key={
                                            product.id
                                        }
                                        value={
                                            product.id
                                        }
                                    >
                                        {product.name}{" "}
                                        •{" "}
                                        {formatCurrency(
                                            Number(
                                                product.price
                                            )
                                        )}
                                    </MenuItem>
                                )
                                )}

                        </TextField>

                        <TextField
                            select
                            sx={{
                                minWidth: {
                                    xs: "100%",
                                    md: 180,
                                },
                            }}
                            label="Tamanho"
                            value={
                                selectedVariantId
                            }
                            disabled={
                                !selectedProduct
                            }
                            onChange={(event) =>
                                setSelectedVariantId(
                                    event.target.value
                                )
                            }
                        >

                            <MenuItem value="">
                                Selecione
                            </MenuItem>

                            {availableVariants.map(
                                (variant) => (
                                    <MenuItem
                                        key={
                                            variant.id
                                        }
                                        value={
                                            variant.id
                                        }
                                        disabled={
                                            variant.stock <=
                                            0
                                        }
                                    >
                                        {variant.size}
                                        {" • "}
                                        {variant.stock > 0
                                            ? `${variant.stock} disponíveis`
                                            : "Sem estoque"}
                                    </MenuItem>
                                )
                            )}

                        </TextField>

                        <TextField
                            type="number"
                            label="Qtd."
                            value={quantity}
                            onChange={(event) =>
                                setQuantity(
                                    event.target.value
                                )
                            }
                            slotProps={{
                                htmlInput: {
                                    min: 1,
                                },
                            }}
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: 110,
                                },
                            }}
                        />

                        <Button
                            variant="outlined"
                            onClick={
                                handleAddProduct
                            }
                            sx={{
                                minWidth: 150,
                                borderRadius: 2,
                                fontWeight: 800,
                            }}
                        >
                            Adicionar
                        </Button>

                    </Stack>

                    {error && (
                        <Typography
                            color="error"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            {error}
                        </Typography>
                    )}

                </Stack>

                {/* ITENS */}

                {items.length === 0 ? (

                    <Box
                        sx={{
                            mt: 3,
                            py: 5,
                            textAlign: "center",
                            borderRadius: 3,
                            border:
                                "1px dashed rgba(255,255,255,.15)",
                        }}
                    >

                        <Typography
                            sx={{
                                fontWeight: 800,
                            }}
                        >
                            Nenhum produto adicionado
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                mt: 1,
                                color:
                                    "text.secondary",
                            }}
                        >
                            Selecione um produto, tamanho
                            e quantidade acima.
                        </Typography>

                    </Box>

                ) : (

                    <Stack
                        spacing={1}
                        sx={{
                            mt: 3,
                        }}
                    >

                        {items.map(
                            (item) => (

                                <Paper
                                    key={
                                        item.key
                                    }
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        background:
                                            "rgba(255,255,255,.03)",
                                        border:
                                            "1px solid rgba(255,255,255,.07)",
                                    }}
                                >

                                    <Stack
                                        direction={{
                                            xs: "column",
                                            sm: "row",
                                        }}
                                        spacing={2}
                                        sx={{
                                            alignItems: {
                                                xs: "stretch",
                                                sm: "center",
                                            },
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                flex: 1,
                                            }}
                                        >

                                            <Typography
                                                sx={{
                                                    fontWeight: 900,
                                                }}
                                            >
                                                {item.name}
                                            </Typography>

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{
                                                    mt: 0.5,
                                                }}
                                            >

                                                <Chip
                                                    label={`Tamanho ${item.size}`}
                                                    size="small"
                                                />

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color:
                                                            "text.secondary",
                                                        alignSelf:
                                                            "center",
                                                    }}
                                                >
                                                    {formatCurrency(
                                                        item.unit_price
                                                    )}
                                                    {" / unidade"}
                                                </Typography>

                                            </Stack>

                                        </Box>

                                        <TextField
                                            type="number"
                                            size="small"
                                            label="Quantidade"
                                            value={
                                                item.quantity
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                handleQuantityChange(
                                                    item.key,
                                                    Number(
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                )
                                            }
                                            slotProps={{
                                                htmlInput: {
                                                    min: 1,
                                                    max: item.stock,
                                                },
                                            }}
                                            sx={{
                                                width: {
                                                    xs: "100%",
                                                    sm: 120,
                                                },
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                fontWeight: 900,
                                                minWidth: 100,
                                                textAlign: {
                                                    xs: "left",
                                                    sm: "right",
                                                },
                                            }}
                                        >
                                            {formatCurrency(
                                                item.unit_price *
                                                item.quantity
                                            )}
                                        </Typography>

                                        <Button
                                            color="error"
                                            onClick={() =>
                                                handleRemoveItem(
                                                    item.key
                                                )
                                            }
                                            sx={{
                                                fontWeight: 800,
                                            }}
                                        >
                                            Remover
                                        </Button>

                                    </Stack>

                                </Paper>

                            )
                        )}

                    </Stack>

                )}

            </Paper>

            {/* PAGAMENTO */}

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 2,
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
                    Pagamento
                </Typography>

                <Stack spacing={3}>

                    <TextField
                        select
                        fullWidth
                        label="Forma de pagamento"
                        value={
                            paymentMethod
                        }
                        onChange={(event) =>
                            setPaymentMethod(
                                event.target.value as PaymentMethod
                            )
                        }
                    >

                        <MenuItem value="pix">
                            Pix
                        </MenuItem>

                        <MenuItem value="card">
                            Cartão
                        </MenuItem>

                        <MenuItem value="fiado">
                            Fiado
                        </MenuItem>

                    </TextField>

                    {paymentMethod ===
                        "fiado" && (

                            <Stack
                                direction={{
                                    xs: "column",
                                    md: "row",
                                }}
                                spacing={2}
                            >

                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Data para pagamento"
                                    value={
                                        paymentDueDate
                                    }
                                    onChange={(event) =>
                                        setPaymentDueDate(
                                            event.target.value
                                        )
                                    }
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={1}
                                    label="Observações do pagamento"
                                    placeholder="Ex.: Vai pagar dia 15"
                                    value={
                                        paymentNotes
                                    }
                                    onChange={(event) =>
                                        setPaymentNotes(
                                            event.target.value
                                        )
                                    }
                                />

                            </Stack>
                        )}

                    {paymentMethod !==
                        "fiado" && (

                            <Typography
                                variant="body2"
                                sx={{
                                    color:
                                        "text.secondary",
                                }}
                            >
                                Este pedido será registrado
                                como pago imediatamente.
                            </Typography>
                        )}

                </Stack>

            </Paper>

            {/* VALORES ADICIONAIS */}

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 2,
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
                    Valores adicionais
                </Typography>

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                >

                    <TextField
                        fullWidth
                        type="number"
                        label="Desconto"
                        value={discount}
                        onChange={(event) =>
                            setDiscount(event.target.value)
                        }
                        slotProps={{
                            htmlInput: {
                                min: 0,
                                step: "0.01",
                            },
                            input: {
                                startAdornment: (
                                    <Typography
                                        component="span"
                                        sx={{
                                            mr: 1,
                                            color: "text.secondary",
                                        }}
                                    >
                                        R$
                                    </Typography>
                                ),
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Frete"
                        value={shippingCost}
                        onChange={(event) =>
                            setShippingCost(event.target.value)
                        }
                        slotProps={{
                            htmlInput: {
                                min: 0,
                                step: "0.01",
                            },
                            input: {
                                startAdornment: (
                                    <Typography
                                        component="span"
                                        sx={{
                                            mr: 1,
                                            color: "text.secondary",
                                        }}
                                    >
                                        R$
                                    </Typography>
                                ),
                            },
                        }}
                    />

                </Stack>

            </Paper>

            {/* RESUMO */}

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 2,
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
                    Resumo
                </Typography>

                <Stack spacing={2}>

                    <Stack
                        direction="row"
                        sx={{
                            justifyContent:
                                "space-between",
                        }}
                    >
                        <Typography
                            color="text.secondary"
                        >
                            Produtos
                        </Typography>

                        <Typography
                            sx={{
                                fontWeight: 800,
                            }}
                        >
                            {items.reduce(
                                (
                                    total,
                                    item
                                ) =>
                                    total +
                                    item.quantity,
                                0
                            )}{" "}
                            unidade(s)
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        sx={{
                            justifyContent:
                                "space-between",
                        }}
                    >
                        <Typography
                            color="text.secondary"
                        >
                            Subtotal
                        </Typography>

                        <Typography
                            sx={{
                                fontWeight: 800,
                            }}
                        >
                            {formatCurrency(
                                subtotal
                            )}
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        sx={{
                            justifyContent:
                                "space-between",
                        }}
                    >
                        <Typography
                            color="text.secondary"
                        >
                            Frete
                        </Typography>

                        <Typography
                            sx={{
                                fontWeight: 800,
                            }}
                        >
                            {formatCurrency(
                                shippingValue
                            )}
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        sx={{
                            justifyContent:
                                "space-between",
                        }}
                    >
                        <Typography
                            color="text.secondary"
                        >
                            Desconto
                        </Typography>

                        <Typography
                            sx={{
                                fontWeight: 800,
                                color:
                                    discountValue > 0
                                        ? "success.main"
                                        : "text.primary",
                            }}
                        >
                            {discountValue > 0
                                ? `- ${formatCurrency(discountValue)}`
                                : formatCurrency(0)}
                        </Typography>
                    </Stack>

                    <Divider />

                    <Stack
                        direction="row"
                        sx={{
                            justifyContent:
                                "space-between",
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 900,
                            }}
                        >
                            Total
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 900,
                            }}
                            color="primary.main"
                        >
                            {formatCurrency(
                                total
                            )}
                        </Typography>

                    </Stack>

                </Stack>

            </Paper>

            {/* AÇÕES */}

            <Stack
                direction={{
                    xs: "column-reverse",
                    sm: "row",
                }}
                spacing={2}
                sx={{
                    justifyContent:
                        "flex-end",
                }}
            >

                <Link
                    href="/admin/pedidos"
                    style={{
                        textDecoration: "none",
                    }}
                >
                    <Button
                        variant="outlined"
                        size="large"
                        fullWidth
                        sx={{
                            borderRadius: 2,
                            fontWeight: 800,
                        }}
                    >
                        Cancelar
                    </Button>
                </Link>

                <Button
                    variant="contained"
                    size="large"
                    disabled={
                        loading ||
                        items.length === 0
                    }
                    onClick={
                        handleSubmit
                    }
                    sx={{
                        borderRadius: 2,
                        fontWeight: 900,
                        px: 5,
                    }}
                >
                    {loading
                        ? "Finalizando..."
                        : "Finalizar pedido"}
                </Button>

            </Stack>

        </Stack>
    );
}