import { expect, test, vi } from 'vitest'

vi.mock('next/font/google', () => ({
    Lato: vi.fn().mockImplementation(() => ({
        style: { fontFamily: 'Lato' },
    })),
}));

test('should pass', () => {
    expect(true).toBe(true)
})

test('should fail', () => {
    expect(true).toBe(false)
})