
type T_NUMBER = number | null;
type T_STRING = string | null;

/* Detail position grid column and row data configuration */
export type T_ROWDATADETAIL = {
    quantity: T_NUMBER,
    deskname: T_STRING,
    account: T_NUMBER,
    price: T_NUMBER
}
const fieldMapping2 = (name: keyof T_ROWDATADETAIL) => name;
export const POSITIONCOLDEFDETAIL = [
    {
        field: fieldMapping2('deskname'),
        headerName: 'Desk Name',
        flex: 2,
        sort: 'asc'
    }, {
        field: fieldMapping2('account'),
        headerName: 'Account',
        type: 'numericColumn',
        flex: 1
    }, {
        field: fieldMapping2('quantity'),
        headerName: 'Quantity',
        type: 'numericColumn',
        flex: 1
    }, {
        field: fieldMapping2('price'),
        headerName: 'Price',
        valueFormatter: 'CurrencyFormatter',
        type: 'numericColumn',
        flex: 1
    },
];

/* Master position grid column and row data configuration */
export type T_ROWDATAMASTER = {
    symbol: T_STRING,
    quantity: T_NUMBER,
    details: T_ROWDATADETAIL[]
}
const fieldMapping1 = (name: keyof T_ROWDATAMASTER) => name;
export const POSITIONCOLDEFMASTER = [
    {
        field: fieldMapping1('symbol'),
        headerName: 'Symbol',
        cellRenderer: 'agGroupCellRenderer',
        flex: 2,
        //sort: 'asc',
    }, {
        field: fieldMapping1('quantity'),
        headerName: 'Quantity',
        type: 'numericColumn',
        flex: 1
    }
];


