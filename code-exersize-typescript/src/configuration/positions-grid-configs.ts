import { ColDef } from "ag-grid-community";

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
export const POSITIONCOLDEFDETAIL: ColDef[] = [
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
        valueFormatter: p => '$' + p.value.toFixed(2),
        type: 'numericColumn',
        flex: 1
    },
];

/* Master position grid column and row data configuration */
export type T_ROWDATAMASTER = {
    symbol: T_STRING,
    quantity: T_NUMBER,
    name: T_STRING,
    country: T_STRING,
    description:T_STRING,
    details: T_ROWDATADETAIL[]
}
const fieldMapping1 = (name: keyof T_ROWDATAMASTER) => name;
export const POSITIONCOLDEFMASTER: ColDef[] = [
    {
        field: fieldMapping1('symbol'),
        headerName: 'Symbol',
        cellRenderer: 'agGroupCellRenderer',
        pinned : true,
        sort : 'asc',
        width : 120
    }, {
        field: fieldMapping1('quantity'),
        headerName: 'Quantity',
        type: 'numericColumn',
        pinned : true,
        width : 120
    }, {
        field: fieldMapping1('name'),
        headerName: 'Name',
        flex: 1
    }, {
        field: fieldMapping1('country'),
        headerName: 'Country',
        flex: 1
    }, {
        field: fieldMapping1('description'),
        headerName: 'Description',
        flex: 4
    }
];
