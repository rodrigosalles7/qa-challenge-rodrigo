import { test, expect } from '@playwright/test';

const URL = 'https://www.saucedemo.com/';

async function login(page, username, password) {
    await page.goto(URL);
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', password);
    await page.click('[data-test="login-button"]');
}

async function countCart(page, carts) {
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(carts);
}

test.describe('Teste de UI - Swag Labs Demo', () => {
    test('Login com as credenciais corretas', async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');
        await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    });

    test('Login com as credenciais incorretas', async ({ page }) => {
        await login(page, 'fake_user', 'fake_password');
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    })

    test('Adicionar e remover produtos ao carrinho', async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');
        await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await countCart(page, '1');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        await countCart(page, '2');
        await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
        await countCart(page, '3');

        await page.click('[data-test="remove-sauce-labs-backpack"]');
        await countCart(page, '2');
        await page.click('[data-test="remove-sauce-labs-bike-light"]');
        await countCart(page, '1');

        await page.click('[data-test="shopping-cart-link"]');
        await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Bolt T-Shirt')

    })

    test('Simulação de erro na finalização da compra', async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');
        await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await countCart(page, '1');

        await page.click('[data-test="shopping-cart-link"]');
        await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack')

        await page.click('[data-test="checkout"]');
        await page.click('[data-test="continue"]')
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    })
})