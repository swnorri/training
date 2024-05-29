export type T_PROMISEDATA = {
    id: string,
    body: []
} | undefined;

/**
 * Pre-defined flattener for the position data.
 * 
 * @param data 
 *  [{ id : string, body : [{}] },
 *   { id : string, body : [{}] }]
 * @returns 
 *  { key(id) : { ...body  },
 *    key(id) : { ...body  } }
 * 
 */
export const handlePromiseAllExtraction = (data: T_PROMISEDATA[] = []) => {
    const dataroot: any = {};

    data.map((item) => {
        if (!dataroot[item!.id]) {
            dataroot[item!.id] = {};
            if (item!.body.length) {
                item!.body.map((dataitem: { id: string }) => {
                    dataroot[item!.id][dataitem.id] = { ...dataitem };
                });
            }
        }
    });

    return dataroot;
}


export type T_PIVOTDATA = {
    [key: string]: {
        [key: string]: {
            [key: string]: any
        }
    }
} | undefined;

/**
 * Pre-defined data pivot, symbol && quantity, subgrid on details
 * 
 * @param data 
 *  { key(id) : { ...body  },
 *    key(id) : { ...body  } }
 * @returns 
 *  
 *  [{ key : value, details : [{},{}] }]
 * 
 */
export const handlePivotBySymbol = (data: T_PIVOTDATA = {}) => {
    const dataStore: any = {};
    const dataArray: any = [];

    if (!data.transactions ||
        !data.instruments ||
        !data.desks ||
        !data.accounts
    ) {
        return;
    }

    for (let i in data.transactions) {
        let transObj = data.transactions[i];
        let symbol = data.instruments[transObj.instrument_id].symbol;

        if (!dataStore[symbol]) {
            dataStore[symbol] = {
                symbol,
                quantity: 0,
                name: data.instruments[transObj.instrument_id].name,
                country: data.instruments[transObj.instrument_id].country,
                description: data.instruments[transObj.instrument_id].description,
                details: []
            }
        }

        dataStore[symbol].details.push({
            id: transObj.id,
            time: transObj.time,
            price: transObj.price,
            quantity: transObj.quantity,
            deskname: data.desks[transObj.desk_id].name,
            market: data.desks[transObj.desk_id].market,
            account: data.accounts[transObj.account_id].accountNumber
        });

        dataStore[symbol].quantity += transObj.quantity;
    }

    for (let i in dataStore) {
        dataArray.push(dataStore[i]);
    }

    return dataArray;
}