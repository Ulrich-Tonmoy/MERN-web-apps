import styled from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";
import { publicRequest } from "../axios";

const Container = styled.div`
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export default function Products({ category, filters, sort }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(
                    category ? `/product?category=${category}` : `/product`
                );
                setProducts(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, [category]);

    useEffect(() => {
        category &&
            setFilteredProducts(
                products.filter((item) =>
                    Object.entries(filters).every(([key, value]) => item[key].includes(value))
                )
            );
    }, [category, products, filters]);

    useEffect(() => {
        if (sort === "newest")
            setFilteredProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt));
        else if (sort === "asc")
            setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
        else setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }, [sort]);

    return (
        <Container>
            {(category ? filteredProducts : products.slice(0, 10)).map((item) => (
                <Product item={item} key={item._id} />
            ))}
        </Container>
    );
}
