# A101 Bootcamp Homework - A101 Node.js & TypeScript Amazon Lambda & DynamoDB

## Instructions

### A→

- 1. Write a POST endpoint that adds products to the Products table.
     Fields that should be in the product table;

```
{
  productId: string',
  stock: number,
  productName: string,
  isDiscount: boolean,
  category: {
  categoryId: number,
  categoryName: string,
  }
}
```

- 2. Write a GET endpoint that returns all added products.

  - 2a) A filter will be created by using query params according to productId among all products.
    Enter the endpoint.
  - 2b) There is a filter among all products that will filter according to the discounted products.
    Enter the endpoint.

- 3. Write a DELETE endpoint that will delete any product with its productId (on
     Any product with isDiscount should not be deleted, an error should be returned)

- 4. Write an UPDATE service that will change the stock of any product.