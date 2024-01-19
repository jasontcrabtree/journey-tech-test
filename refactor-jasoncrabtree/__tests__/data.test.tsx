import { expect, vi, test } from 'vitest';
import { getDBProducts } from './../src/utils/data-loading';

// @ts-expect-error
global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([{
            id: 1,
            name: "Product 1",
            price: 10,
            currency: "NZD",
            type: 'T-Shirt'
        },
        {
            id: 2,
            name: "Product 2",
            price: 30,
            currency: "NZD",
            type: 'Lawnmower'
        },
        {
            id: 3,
            name: "Product 3",
            price: 5,
            currency: "NZD",
            type: 'Phonecase'
        }]),
    })
);

test('getDBProducts returns combined data repositories', () => {
    const result = getDBProducts();

    expect(result.products.length).toBe(8);
    expect(result.products[0].price).toBe(3000);
    expect(result.products[7].name).toBe('Disney Sleeping Beauty T-Shirt');
})