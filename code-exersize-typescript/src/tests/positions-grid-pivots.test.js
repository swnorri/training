import {
    handlePromiseAllExtraction,
    handlePivotBySymbol
} from '../configuration/positions-grid-pivots';

test('Extract promise all data, return object', () => {
    expect(handlePromiseAllExtraction([{
        id: 'testid',
        body: [{
            accountNumber: "00000000000",
            id: "12345678-abcd-1234-abcd-123456789011"
        }]
    }])).toEqual({
        testid: {
            "12345678-abcd-1234-abcd-123456789011": {
                accountNumber: "00000000000",
                id: "12345678-abcd-1234-abcd-123456789011"
            }
        }
    });
});


test('Pivot extracted data to symbol, return array', () => {
    expect(handlePivotBySymbol({
        accounts: {
            "12345678-abcd-1234-abcd-123456789011": {
                accountNumber: "00000000000",
                id: "12345678-abcd-1234-abcd-123456789011"
            }
        },
        desks: {
            "12345678-abcd-1234-abcd-123456789012": {
                id: "12345678-abcd-1234-abcd-123456789012",
                market: "Fake Market",
                name: "FAMA"
            }
        },
        instruments: {
            "12345678-abcd-1234-abcd-123456789013": {
                country: "United States of America",
                description: "Has 50 states",
                id: "12345678-abcd-1234-abcd-123456789013",
                name: "Fake Instrument Name",
                symbol: "AAAA"
            }
        },
        transactions: {
            "12345678-abcd-1234-abcd-123456789014": {
                account_id: "12345678-abcd-1234-abcd-123456789011",
                desk_id: "12345678-abcd-1234-abcd-123456789012",
                id: "12345678-abcd-1234-abcd-123456789014",
                instrument_id: "12345678-abcd-1234-abcd-123456789013",
                price: 999.99,
                quantity: -200,
                time: "2024-05-24T20:02:55.097Z"
            }
        }
    })).toEqual([{
        country: "United States of America",
        description: "Has 50 states",
        details: [{
            account: "00000000000",
            deskname: "FAMA",
            id: "12345678-abcd-1234-abcd-123456789014",
            market: "Fake Market",
            price: 999.99,
            quantity: -200,
            time: "2024-05-24T20:02:55.097Z",
        }],
        name: "Fake Instrument Name",
        quantity: -200,
        symbol: "AAAA",
    }]);
});