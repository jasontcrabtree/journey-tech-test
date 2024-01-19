import { expect, test, vi, beforeEach, afterEach, describe, it } from 'vitest'
import fetch from 'node-fetch';
import { getByRole, render, screen, waitFor, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IndexPage from '@/pages/index'
import { calculateExchangeRate } from '@/utils/currency'
import ProductCard from '@/components/ProductCard'
import ProductList from '@/components/ProductList'
import FilterList from '@/components/FilterList'
import { getDBProducts } from '@/utils/data-loading';

afterEach(() => {
    cleanup();
});

// Mock functions
vi.mock('next/font/google', () => ({
    Lato: vi.fn().mockImplementation(() => ({
        style: { fontFamily: 'Lato' },
    })),
}));

// vi.mock('../../refactor-jasoncrabtree/src/pages/api/products', async (getProducts) => {
//     getProducts: vi.fn(),
//     return {
//         getProducts: vi.fn(),
//     }
// });

const mockProductList = [
    {
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
    },
]

const mockCurrencies = ['NZD', 'USD', 'EURO'];

// Tests
test('test file set correctly validation', () => {
    expect(true).toBe(true)
})

test('home/index page renders with h1', () => {
    render(
        <IndexPage productByType={[]} products={[]} />
    )

    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
})

test('product list renders correct number of items', () => {
    const { container } = render(<ProductList products={mockProductList} filterByCategory='all' />)

    const renderedItems = container.querySelectorAll('li');
    expect(renderedItems).toHaveLength(mockProductList.length);
})

test('product card shows name, price, currency, type, with correct currency value', () => {
    const mockProductCard = {
        name: "Product Card 1",
        price: 15,
        currency: "NZD",
        type: 'T-Shirt'
    }

    const mockCurrencyRates = {
        NZD: 1,
        USD: 0.76,
        EURO: 0.67
    }

    render(
        <ProductCard
            name={mockProductCard.name} price={mockProductCard.price} type={mockProductCard.type}
        />
    )

    expect(screen.getAllByText(mockProductCard.name)).toBeDefined();
    expect(screen.getAllByText(mockProductCard.price, { exact: false })).toBeDefined();
    expect(screen.getAllByText(mockProductCard.currency, { exact: false })).toBeDefined();
    expect(screen.getAllByText(mockProductCard.type)).toBeDefined();

    const priceElement = screen.getByText(mockProductCard.price, { exact: false }).textContent;

    expect(priceElement).toEqual(`$${mockProductCard.price}.00 ${mockProductCard.currency}`);

    const priceNumberValue = priceElement ? parseFloat(priceElement.replace(/[^\d.]/g, '')) : 0;
    expect(priceNumberValue).toEqual(mockProductCard.price);

    expect(priceNumberValue).toEqual(mockProductCard.price * mockCurrencyRates.NZD);
    expect(priceNumberValue).not.toEqual(mockProductCard.price * mockCurrencyRates.USD);
    expect(priceNumberValue).not.toEqual(mockProductCard.price * mockCurrencyRates.EURO);
})

test('changing currency changes prices', () => {

    render(
        <IndexPage productByType={"all"} products={mockProductList} />
    )

    expect(screen.getAllByText(mockCurrencies[0])).toBeDefined();
    expect(screen.getAllByText(mockProductList[0].price, { exact: false })).toBeDefined();

    expect(screen.getAllByText(mockProductList[0].price, { exact: false })).not.toEqual(
        mockProductList[0].price * calculateExchangeRate(mockProductList[1].price)
    );

    userEvent.click(screen.getByText(mockCurrencies[1]));

    waitFor(() => {
        expect(screen.getAllByText(mockProductList[0].price, { exact: false })).not.toBeDefined();
        expect(screen.getAllByText(mockProductList[1].price, { exact: false })).toBeDefined();

        expect(screen.getAllByText(mockCurrencies[1], { exact: false })).toBeDefined();
        expect(screen.getAllByText(mockProductList[1].price, { exact: false })).toBeDefined();

        expect(screen.getAllByText(mockCurrencies[1], { exact: false })).not.toBeDefined();

        expect(screen.getAllByText(mockProductList[1].price, { exact: false })).toEqual(
            mockProductList[1].price * calculateExchangeRate(mockCurrencies[1])
        );
    })
})

test('changing type filter shows/hides relevant products', () => {
    render(
        <IndexPage productByType={"all"} products={mockProductList} />
    )

    expect(screen.queryAllByText(mockCurrencies[0])).toBeDefined();
    expect(screen.getAllByText('Product 1')).toBeDefined();
    expect(screen.getAllByText('Product 2')).toBeDefined();
    expect(screen.getAllByText('Product 3')).toBeDefined();

    const filterButton = screen.getByRole('button', { name: 'Lawnmower' });

    userEvent.click(filterButton);

    waitFor(() => {
        expect(screen.queryAllByText('Product 1')).toHaveLength(0);
        expect(screen.getAllByText('Product 2')).toBeDefined();
        expect(screen.queryAllByText('Product 3')).toHaveLength(0);
    })
})

test('currency util returns correct value', () => {
    const mockCurrencyRates = {
        NZD: 1,
        USD: 0.76,
        EURO: 0.67
    }

    expect(calculateExchangeRate('NZD')).toEqual(mockCurrencyRates.NZD);
    expect(calculateExchangeRate('USD')).toEqual(mockCurrencyRates.USD);
    expect(calculateExchangeRate('EURO')).toEqual(mockCurrencyRates.EURO);

    const mockFailingCurrencyRates = {
        NZD: 1.2,
        USD: 0.66,
        EURO: 0.57
    }

    expect(calculateExchangeRate('NZD')).not.toEqual(mockFailingCurrencyRates.NZD);
    expect(calculateExchangeRate('USD')).not.toEqual(mockFailingCurrencyRates.USD);
    expect(calculateExchangeRate('EURO')).not.toEqual(mockFailingCurrencyRates.EURO);
})


// test('Product API call returns products', async () => {
//     afterEach(() => {
//         vi.resetAllMocks();
//     })

//     const mockApiProducts = getProducts.
//      mockResolvedValue([{
//         name: "Product 1",
//         price: 10,
//         currency: "NZD",
//         type: 'T-Shirt'
//     }]);

//     // vi.mocked(ProductsApi.getProducts).mockResolvedValue([{ name: "Product 1", price: 10, currency: "NZD", type: 'T-Shirt' }]);

//     // const mockApiProducts = vi.mocked(getProducts).mockResolvedValue([{ name: "Product 1", price: 10, currency: "NZD", type: 'T-Shirt' }]);

//     // console.log('mockApiProduct', mockApiProducts);

//     render(<ProductList products={mockApiProducts} />)

//     waitFor(() => {
//         const renderedList = screen.getByRole('list');
//         expect(renderedList).toHaveLength(mockApiProducts.length);
//         expect(screen.getByText(mockApiProducts.name)).toBeDefined();
//     })
// })

// Mock getDBProducts if needed
vi.mock('@/utils/data-loading', () => ({
    getDBProducts: vi.fn(() => {
        return [{
            name: "Product 1",
            price: 10,
            currency: "NZD",
            type: 'T-Shirt'
        }]
    }),
}));

describe('API Route - Products', () => {
    it('should return products successfully', async () => {
        const response = await fetch('/api/products'); // Use the actual route
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toHaveProperty('message', 'Products successfully loaded');
        expect(data).toHaveProperty('products');
    });

    it('should handle errors correctly', async () => {
        // Mock getDBProducts to throw an error
        vi.mocked(getDBProducts).mockImplementationOnce(() => {
            throw new Error();
        });

        const response = await fetch('/api/products'); // Use the actual route
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data).toHaveProperty('error', 'Failed to load products');
    });
});