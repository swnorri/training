import { BASE_PATH } from './basePath.ts';

export const FETCHPATHS: {
    [key: string]: string
} = {
    ACCOUNTS: 'accounts',
    DESKS: 'desks',
    INSTRUMENTS: 'instruments',
    TRANSACTIONS: 'transactions'
};

export async function fetchData(path: string) {
    switch (path) {
        case 'accounts': {
            const resp = await fetch(`${BASE_PATH}/accounts.json`);
            const data = await resp.json();
            if (!resp.ok) {
                throw new Error('Failed to fetch accounts');
            }
            return {
                id: 'accounts',
                body: data
            };
        }
        case 'desks': {
            const resp = await fetch(`${BASE_PATH}/desks.json`);
            const data = await resp.json();
            if (!resp.ok) {
                throw new Error('Failed to fetch desks');
            }
            return {
                id: 'desks',
                body: data
            };
        }
        case 'instruments': {
            const resp = await fetch(`${BASE_PATH}/instruments.json`);
            const data = await resp.json();
            if (!resp.ok) {
                throw new Error('Failed to fetch instruments');
            }
            return {
                id: 'instruments',
                body: data
            }
        }
        case 'transactions': {
            const resp = await fetch(`/transactions.json`);
            const data = await resp.json();
            if (!resp.ok) {
                throw new Error('Failed to fetch transactions');
            }
            return {
                id: 'transactions',
                body: data
            }
        }
    }
}