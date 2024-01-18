import { expect, test, vi, beforeEach, afterEach } from 'vitest'
import { getByRole, render, screen, waitFor, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IndexPage from '@/pages/index'
import products, { getProducts } from '@/pages/api/products'
import { calculateExchangeRate } from '@/utils/currency'
import ProductCard from '@/components/ProductCard'
import ProductList from '@/components/ProductList'
import FilterList from '@/components/FilterList'

afterEach(() => {
    cleanup();
});

// Mock functions
vi.mock('next/font/google', () => ({
    Lato: vi.fn().mockImplementation(() => ({
        style: { fontFamily: 'Lato' },
    })),
}));

vi.mock('../../refactor-jasoncrabtree/src/pages/api/products', async (getProducts) => {
    // getProducts: vi.fn(),
    // const mod = await getProducts<typeof import('../../refactor-jasoncrabtree/src/pages/api/products')>()
    return {
        // ...mod,
        getProducts: vi.fn(),
    }
});

const mockProductList = [
    {
        name: "Product 1",
        price: 10,
        currency: "NZD",
        type: 'T-Shirt'
    },
    {
        name: "Product 2",
        price: 30,
        currency: "NZD",
        type: 'Lawnmower'
    },
    {
        name: "Product 3",
        price: 5,
        currency: "NZD",
        type: 'Phonecase'
    },
]

const mockProductTypes = [
    'T-Shirt',
    'Lawnmower',
    'Phonecase'
]

const mockCurrencies = ['NZD', 'USD', 'EURO'];

// Tests
test('test file set correctly validation', () => {
    expect(true).toBe(true)
})

test('home/index page renders with h1', () => {
    render(
        <IndexPage currencies={[]} productTypes={[]} products={[]} />
    )

    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
})

test('product list renders correct number of items', () => {
    const { container } = render(<ProductList products={mockProductList} />)

    const renderedItems = container.querySelectorAll('li');
    expect(renderedItems).toHaveLength(mockProductList.length);
})

test('product card shows name, price, currency, type', () => {
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
            name={mockProductCard.name} price={mockProductCard.price} currency={mockProductCard.currency} type={mockProductCard.type}
        />
    )

    expect(screen.getAllByText(mockProductCard.name)).toBeDefined();
    expect(screen.getAllByText(mockProductCard.price)).toBeDefined();
    expect(screen.getAllByText(mockProductCard.currency)).toBeDefined();
    expect(screen.getAllByText(mockProductCard.type)).toBeDefined();

    const priceElement = screen.getByText(mockProductCard.price.toString());
    const priceText = priceElement.textContent || "";

    expect(priceText).toEqual(mockProductCard.price.toString());
    const priceNumber = parseFloat(priceText);

    expect(priceNumber).toEqual(mockProductCard.price * mockCurrencyRates.NZD);
    expect(priceNumber).not.toEqual(mockProductCard.price * mockCurrencyRates.USD);
    expect(priceNumber).not.toEqual(mockProductCard.price * mockCurrencyRates.EURO);
})

test('changing currency changes prices', () => {

    render(
        <IndexPage currencies={mockCurrencies} productTypes={mockProductTypes} products={mockProductList} />
    )

    expect(screen.getAllByText(mockCurrencies[0])).toBeDefined();
    expect(screen.getAllByText(mockProductList[0].price)).toBeDefined();

    expect(screen.getAllByText(mockProductList[0].price)).not.toEqual(
        mockProductList[0].price * calculateExchangeRate(mockProductList[1].price)
    );

    userEvent.click(screen.getByText(mockCurrencies[1]));

    expect(screen.getAllByText(mockProductList[0].price)).not.toBeDefined();
    expect(screen.getAllByText(mockProductList[1].price)).toBeDefined();

    expect(screen.getAllByText(mockCurrencies[1])).toBeDefined();
    expect(screen.getAllByText(mockProductList[1].price)).toBeDefined();

    expect(screen.getAllByText(mockCurrencies[1])).not.toBeDefined();

    expect(screen.getAllByText(mockProductList[1].price)).toEqual(
        mockProductList[1].price * calculateExchangeRate(mockCurrencies[1])
    );
})

test('changing type filter shows/hides relevant products', () => {
    render(
        <IndexPage currencies={mockCurrencies} productTypes={mockProductTypes} products={mockProductList} />
    )

    expect(screen.getAllByText(mockCurrencies[0])).toBeDefined();
    expect(screen.getAllByText('T-Shirt')).toBeDefined();
    expect(screen.getAllByText('Lawnmower')).toBeDefined();
    expect(screen.getAllByText('Phonecase')).toBeDefined();

    const filterButton = screen.getByRole('button', { name: 'T-Shirt' });
    userEvent.click(filterButton);

    expect(screen.getAllByText('T-Shirt')).toBeDefined();
    expect(screen.getAllByText('Lawnmower')).not.toBeDefined();
    expect(screen.getAllByText('Phonecase')).not.toBeDefined();
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

//     // const mockApiProducts = getProducts.mockResolvedValue([{
//     //     name: "Product 1",
//     //     price: 10,
//     //     currency: "NZD",
//     //     type: 'T-Shirt'
//     // }]);

//     // vi.mocked(ProductsApi.getProducts).mockResolvedValue([{ name: "Product 1", price: 10, currency: "NZD", type: 'T-Shirt' }]);

//     const mockApiProducts = vi.mocked(getProducts).mockResolvedValue([{ name: "Product 1", price: 10, currency: "NZD", type: 'T-Shirt' }]);

//     // console.log('mockApiProduct', mockApiProducts);

//     render(<ProductList products={mockApiProducts} />)

//     await waitFor(() => {
//         const renderedList = screen.getByRole('list');
//         expect(renderedList).toHaveLength(mockApiProducts.length);
//         expect(screen.getByText(mockApiProducts.name)).toBeDefined();
//     })
// })