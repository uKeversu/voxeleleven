"use client";

import {
    Autocomplete,
    Avatar,
    Box,
    TextField,
    Typography,
} from "@mui/material";

import { products } from "@/data/products";
import { useMemo } from "react";


interface SearchBoxProps {

    search: string;

    setSearch: (
        value: string
    ) => void;

    onSelect: (
        product: any
    ) => void;

    onEnter: () => void;

}

export default function SearchBox({
    search,
    setSearch,
    onSelect,
    onEnter,
}: SearchBoxProps) {


    const options = useMemo(() => {

        const value =
            search.trim().toLowerCase();


        if (!value)
            return [];


        return products
            .filter(product => {

                const text = [
                    product.name,
                    product.team,
                    product.category,
                    product.description,
                    product.season,
                    product.badge
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                return text.includes(value);

            })
            .slice(0, 8);


    }, [search]);



    return (

        <Autocomplete

            freeSolo

            options={options}

            filterOptions={(x) => x}

            inputValue={search}

            onInputChange={(_, value) => {
                setSearch(value);
            }}


            getOptionLabel={(option) => {

                if (typeof option === "string")
                    return option;

                return option.name;

            }}



            onChange={(_, value) => {

                if (
                    value &&
                    typeof value !== "string"
                ) {
                    onSelect(value);
                }

            }}


            renderOption={(props, option) => (

                <Box
                    component="li"
                    {...props}
                    sx={{
                        display: "flex",
                        gap: 2,
                        py: 1.5
                    }}
                >

                    <Avatar
                        src={option.image}
                        variant="rounded"
                        sx={{
                            width: 50,
                            height: 50
                        }}
                    />


                    <Box sx={{ flex: 1 }}>

                        <Typography sx={{ fontWeight: 700 }}>
                            {option.name}
                        </Typography>


                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {option.team}
                        </Typography>


                    </Box>

                    <Typography sx={{ color: "primary.main", fontWeight: 800 }}
                    >
                        R$ {option.price.toFixed(2)}
                    </Typography>


                </Box>

            )}



            renderInput={(params) => (
                <TextField
                    {...params}
                    autoFocus
                    placeholder="Buscar camisa, time ou jogador..."
                    onKeyDown={(e) => {

                        if (e.key === "Enter")
                            onEnter();
                    }}
                />
            )}

            sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                    height: 48,
                    borderRadius: 999,
                    background:
                        "rgba(255,255,255,.04)",
                    "&.Mui-focused": {
                        boxShadow:
                            "0 0 0 2px rgba(0,255,64,.25)"
                    }
                }
            }}
        />
    );
}