export const titleProductListSerializer = (data: any) => {
    const products = data.products;

    return products.map((product: any) => ({ ...product, price: product.price }));
};
