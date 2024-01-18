import { expect, test, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IndexPage from '@/pages/index'
import { getProducts } from '@/pages/api/products'
import { calculateExchangeRate } from '@/utils/currency'
import ProductCard from '@/components/ProductCard'
import ProductList from '@/components/ProductList'

// Mock functions
vi.mock('next/font/google', () => ({
    Lato: vi.fn().mockImplementation(() => ({
        style: { fontFamily: 'Lato' },
    })),
}));

vi.mock('../../refactor-jasoncrabtree/src/pages/api/products', () => ({
    getProducts: vi.fn(),
}))

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

// Tests
test('should pass', () => {
    expect(true).toBe(true)
})

test('home/index page renders with h1', () => {
    render(<IndexPage />)

    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
})

test('Product API call returns products', async () => {
    afterEach(() => {
        vi.resetAllMocks();
    })

    const mockApiProducts = getProducts.mockResolvedValue([{
        name: "Product 1",
        price: 10,
        currency: "NZD",
        type: 'T-Shirt'
    }]);

    render(<ProductList products={mockApiProducts} />)

    await waitFor(() => {
        const renderedList = screen.getByRole('list');
        expect(renderedList).toHaveLength(mockApiProducts.length);
        expect(screen.getByText(mockApiProducts.name)).toBeDefined();
    })
})

test('product list renders correct number of items', () => {

    render(<ProductList products={mockProductList} />)

    const renderedList = screen.getByRole('list');
    expect(renderedList).toHaveLength(mockProductList.length);
})

test('product card shows name, price, currency, type', () => {
    const mockProductCard = {
        name: "Product 1",
        price: 10,
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

    expect(screen.getByText(mockProductCard.name)).toBeDefined();
    expect(screen.getByText(mockProductCard.price)).toBeDefined();
    expect(screen.getByText(mockProductCard.currency)).toBeDefined();
    expect(screen.getByText(mockProductCard.type)).toBeDefined();

    expect(screen.getByText(mockProductCard.price)).toEqual(mockProductCard.price * mockCurrencyRates.NZD);

    expect(screen.getByText(mockProductCard.price)).not.toEqual(mockProductCard.price * mockCurrencyRates.EURO);

    expect(screen.getByText(mockProductCard.price)).not.toEqual(mockProductCard.price * mockCurrencyRates.USD);
})

test('changing currency changes prices', () => {
    const mockCurrencyFilters = ['NZD', 'USD', 'EURO'];

    render(<IndexPage currencies={mockCurrencyFilters} products={mockProductList} />)

    expect(screen.getByText(mockCurrencyFilters[0])).toBeDefined();

    const renderedList = screen.getByRole('list');

    expect(renderedList).toContain(mockCurrencyFilters[0]);
    expect(renderedList).not.toContain(mockCurrencyFilters[1]);

    expect(screen.getByText(mockProductList[0].price)).toEqual(
        mockProductList[0].price * calculateExchangeRate(mockCurrencyFilters[0])
    );

    userEvent.click(screen.getByText(mockCurrencyFilters[1]));

    expect(renderedList).toContain(mockCurrencyFilters[1]);
    expect(renderedList).not.toContain(mockCurrencyFilters[0]);

    expect(screen.getByText(mockProductList[1].price)).toEqual(
        mockProductList[1].price * calculateExchangeRate(mockCurrencyFilters[1])
    );
})

test('changing type filter shows/hides relevant products', () => {
    render(<IndexPage />)

    const renderedList = screen.getByRole('list');

    expect(renderedList).toContain('T-Shirt');
    expect(renderedList).toContain('Lawnmower');
    expect(renderedList).toContain('Phonecase');

    userEvent.click(screen.getByText('T-Shirt'));

    expect(renderedList).toContain('T-Shirt');
    expect(renderedList).not.toContain(['Lawnmower', 'Phonecase']);
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