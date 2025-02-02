import { test, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in/api';

test.describe('Teste de API - Reqres', () => {
    test('Listar usuários e validar dados', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/users?page=2`);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.data).toBeInstanceOf(Array);
        body.data.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('first_name');
            expect(user).toHaveProperty('last_name');
            expect(user).toHaveProperty('email');
            expect(user.email).toMatch(/.+@.+\..+/);
        });
    });

    test('Criar um usuário', async ({request}) => {
        const newUser = {
            name: "Rodrigo Oliveira",
            job: "QA Engineer"
        };

        const response = await request.post(`${BASE_URL}/users`, {data: newUser});
        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body).toMatchObject(newUser);
    });

    test('Atualizar um usuário', async ({request}) => {
        const newUser = {
            name: "Rodrigo Salles",
            job: "QA Lead"
        };

        const response = await request.put(`${BASE_URL}/users/2`, {data: newUser});
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toMatchObject(newUser);
    });

    test('Validação se os tempos de resposta da API estão aceitáveis', async ({request}) => {
        const starTime = Date.now();
        const response = await request.get(`${BASE_URL}/users?page=2`);
        const endTime = Date.now();
        const responseTime = endTime - starTime;

        expect(response.status()).toBe(200);
        expect(responseTime).toBeLessThan(1000);
    });

    test('Deletar usuário', async ({request}) => {
        const response = await request.delete(`${BASE_URL}/users/999`);
        expect(response.status()).toBe(204);
    });

    test('Simular falha de rede', async ({page}) => {
        await page.route(`${BASE_URL}/users?page=2`, route => route.abort());

        try{
            await page.request.get(`${BASE_URL}/users?page=2`);
        } catch (error) {
            expect(error.message).toContain('net::ERR_FAILED');
        }
    });

    test('Simular timeout ao listar usuários', async ({request}) => {
        try{
            await request.get(`${BASE_URL}/users?page=2`, {timeout: 10});
            throw new Error('Não houve timeout');
        } catch (error) {
            expect(error.name).toBe('Error');
        }
    });
})