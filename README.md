# Test for Full-stack developer role

This project is a repository with the solution to the technical test (Step 3 of 3) for the position of Full-stack developer

## Online Use (Available on Github Pages)

Access <https://jailtoncruz.github.io/all-tax-platform_test-step3/>

## How to use locally? (Self-hosted)

You need to clone this repository

```sh
git clone https://github.com/jailtoncruz/all-tax-platform_test-step3.git
```

Open the [index.html](./index.html) with your browser.

## How this project works?

The repository is splited in some folders to organize functions and your reponsabilities, between constants, use cases (factories) and functions to randomize data.

The data is generated dynamically with the factory functions which generate an object from an array of names, for exemple the following code:

```js
categoryFacotory("Electronics", "Clothes", "Cars")
```

Results

```json
[
    {
        "id": 43607,
        "name": "Electronics"
    },
    {
        "id": 22053,
        "name": "Clothes"
    },
    {
        "id": 54799,
        "name": "Cars"
    }
]
```

The object models were created wondering how it would work in an SQL database, An object to Category, Product, Brand and Sale.

## Models

### Category

```ts
interface Category {
    id: number,
    name: string
}
```

### Product

```ts
interface Category {
    id: number,
    name: string,
    category_id: number
}
```

### Product

```ts
interface Brand {
    id: number,
    name: string,
    product_id: number
}
```

### Sale
This object represents the total sales in one month.

```ts
type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
interface Sale {
    id: number,
    product_id: number,
    brand_id: number,
    reference: Month,
    total: number
}
```
