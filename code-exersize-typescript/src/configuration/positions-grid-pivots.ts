export type T_POSITIONDATA = {
    id: string,
    dataset: []
} | undefined;

// There is an expectation that the data from onGridReady will be 
// returned in a list of lists format, errors to be handled. Each list
// item contains id and dataset keys. This will flatten it to one object
// with key values of id and dataset
export const handleFlattenPositionData = (data: T_POSITIONDATA[] = []) => {
    const dataroot: any = {};

    data.map((item) => {
        // if the item does not exist as a root key in the 
        // new dataroot, add it. This should be the base calls 
        // to fetch data seen in onGridReady
        if (item?.id && !dataroot[item?.id]) {
            // add new key, add object reference
            dataroot[item.id] = {};
            // if the corresponding item.dataset has length, lets 
            // move this data to the new object reference, by id 
            // as the root key. There should be no overlapping id
            // keys with the nature of the data fetched from onGridReady
            if (item.dataset.length) {
                item.dataset.map((dataitem: { id: string }) => {
                    // add new id key and object values as copy to 
                    // avoid mutating the original data in case we
                    // want to store it for reference
                    dataroot[item.id][dataitem.id] = { ...dataitem };
                });
            }
        }
    });
    return dataroot;
}
// Structure the flattened dataset by symbol and corresponding 
// transactions that make up the total quantities for a giving
// symbol
export const handleFormatDataBySymbol = (data: any) => {
    const bySymbol: any = {};
    const newData = [];
    // Quick check to see if we have transactions, else throw an
    // error as there is no data to work with
    if (!data.transactions) {
        throw new Error('No transactions to work with.')
    }
    // Iterate the transactions to build the data structure
    // by symbol
    for (let i in data.transactions) {
        let dTrans = data.transactions[i];
        let symbol = data.instruments[dTrans.instrument_id].symbol;
        // In the bySymbol map, add new symbol key to store relevant
        // data
        if (!bySymbol[symbol]) {
            bySymbol[symbol] = {
                symbol,
                quantity: 0,
                name: data.instruments[dTrans.instrument_id].name,
                country: data.instruments[dTrans.instrument_id].country,
                description: data.instruments[dTrans.instrument_id].description,
                details: []
            }
        }
        // Now that the symbol map has (or already had) the symbol
        // to store the initial object, add details and update qty
        bySymbol[symbol].details.push({
            price: dTrans.price,
            quantity: dTrans.quantity,
            deskname: data.desks[dTrans.desk_id].name,
            account: data.accounts[dTrans.account_id].accountNumber
        });
        bySymbol[symbol].quantity += dTrans.quantity;
    }
    // Push the stored object of data per symbol into the newData
    // array for use by the grid.
    for (let i in bySymbol) {
        newData.push(bySymbol[i]);
    }

    return newData;
}