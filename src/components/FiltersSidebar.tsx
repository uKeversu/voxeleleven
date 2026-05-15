// src/components/catalog/FiltersSidebar.tsx

"use client";

import {
    Box,
    Typography,
    Divider,
    TextField,
    InputAdornment,
    Chip,
    Stack,
    Slider,
    Select,
    MenuItem,
    FormControl,
    Switch,
    FormControlLabel,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const categories = [
    "Todos",
    "Brasileiros",
    "Europeus",
    "Seleções",
    "Retrô",
];

const teams = [
    "Todos",
    "Corinthians",
    "Flamengo",
    "Palmeiras",
    "São Paulo",
    "Vasco da Gama",
    "Atlético Mineiro",
    "Milan",
    "PSG",
    "Manchester City",
    "Roma",
    "Argentina",
    "Brasil",
];

type Props = {
    search: string;

    setSearch: (
        value: string
    ) => void;

    selectedCategory: string;

    setSelectedCategory: (
        value: string
    ) => void;

    selectedTeam: string;

    setSelectedTeam: (
        value: string
    ) => void;

    sortBy: string;

    setSortBy: (
        value: string
    ) => void;

    priceRange: number[];

    setPriceRange: (
        value: number[]
    ) => void;

    onlyFeatured: boolean;

    setOnlyFeatured: (
        value: boolean
    ) => void;
};

export default function FiltersSidebar({
    search,
    setSearch,

    selectedCategory,
    setSelectedCategory,

    selectedTeam,
    setSelectedTeam,

    sortBy,
    setSortBy,

    priceRange,
    setPriceRange,

    onlyFeatured,
    setOnlyFeatured,
}: Props) {
    return (
        <Box
            sx={{
                p: 3,

                borderRadius: 3,

                backgroundColor:
                    "background.paper",

                border: "1px solid",

                borderColor:
                    "divider",

                backdropFilter:
                    "blur(12px)",
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    mb: 3,

                    fontWeight: 800,
                }}
            >
                Filtros
            </Typography>

            <Divider
                sx={{
                    mb: 3,
                }}
            />

            {/* SEARCH */}
            <TextField
                fullWidth
                placeholder="Buscar..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{
                    mb: 4,

                    "& .MuiOutlinedInput-root":
                    {
                        borderRadius: 4,

                        backgroundColor:
                            "rgba(255,255,255,0.02)",
                    },
                }}
            />

            {/* CATEGORY */}
            <Typography
                sx={{
                    mb: 2,

                    fontWeight: 700,
                }}
            >
                Categorias
            </Typography>

            <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{
                    flexWrap: "wrap",

                    mb: 4,
                }}
            >
                {categories.map(
                    (category) => {
                        const active =
                            selectedCategory ===
                            category;

                        return (
                            <Chip
                                key={category}
                                label={
                                    category
                                }
                                clickable
                                onClick={() =>
                                    setSelectedCategory(
                                        category
                                    )
                                }
                                sx={{
                                    borderRadius: 999,

                                    backgroundColor:
                                        active
                                            ? "primary.main"
                                            : "rgba(255,255,255,0.03)",

                                    color:
                                        active
                                            ? "primary.contrastText"
                                            : "text.primary",

                                    fontWeight: 700,
                                }}
                            />
                        );
                    }
                )}
            </Stack>

            {/* TEAM */}
            <Typography
                sx={{
                    mb: 2,

                    fontWeight: 700,
                }}
            >
                Time
            </Typography>

            <FormControl
                fullWidth
                sx={{
                    mb: 4,
                }}
            >
                <Select
                    value={
                        selectedTeam
                    }
                    onChange={(e) =>
                        setSelectedTeam(
                            e.target.value
                        )
                    }
                    sx={{
                        borderRadius: 4,
                    }}
                >
                    {teams.map((team) => (
                        <MenuItem
                            key={team}
                            value={team}
                        >
                            {team}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* PRICE */}
            <Typography
                sx={{
                    mb: 2,

                    fontWeight: 700,
                }}
            >
                Preço
            </Typography>

            <Slider
                value={priceRange}
                onChange={(_, value) =>
                    setPriceRange(
                        value as number[]
                    )
                }
                valueLabelDisplay="auto"
                min={0}
                max={300}
                sx={{
                    mb: 1,
                }}
            />

            <Typography
                sx={{
                    color:
                        "text.secondary",

                    mb: 4,
                }}
            >
                R$ {priceRange[0]} — R${" "}
                {priceRange[1]}
            </Typography>

            {/* SORT */}
            <Typography
                sx={{
                    mb: 2,

                    fontWeight: 700,
                }}
            >
                Ordenar por
            </Typography>

            <FormControl
                fullWidth
                sx={{
                    mb: 4,
                }}
            >
                <Select
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(
                            e.target.value
                        )
                    }
                    sx={{
                        borderRadius: 4,
                    }}
                >
                    <MenuItem value="recentes">
                        Mais recentes
                    </MenuItem>

                    <MenuItem value="menor-preco">
                        Menor preço
                    </MenuItem>

                    <MenuItem value="maior-preco">
                        Maior preço
                    </MenuItem>

                    <MenuItem value="az">
                        A → Z
                    </MenuItem>
                </Select>
            </FormControl>

            {/* FEATURED */}
            <FormControlLabel
                control={
                    <Switch
                        checked={
                            onlyFeatured
                        }
                        onChange={(e) =>
                            setOnlyFeatured(
                                e.target
                                    .checked
                            )
                        }
                    />
                }
                label="Somente destaques"
            />
        </Box>
    );
}