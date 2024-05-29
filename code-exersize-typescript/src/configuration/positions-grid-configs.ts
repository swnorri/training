import { ColDef } from "ag-grid-community";

type T_NUMBER = number;
type T_STRING = string;

/**
 * Detail position grid column and row data configuration
 */
export type T_ROWDATADETAIL = {
    quantity: T_NUMBER,
    deskname: T_STRING,
    account: T_NUMBER,
    price: T_NUMBER,
    market: T_STRING,
    time: Date,
    id: T_STRING
}
const fieldMapping2 = (name: keyof T_ROWDATADETAIL) => name;
export const POSITIONCOLDEFDETAIL: ColDef[] = [
    {
        field: fieldMapping2('account'),
        headerName: 'Account',
        type: 'numericColumn',
        pinned: true,
        width: 110
    }, {
        field: fieldMapping2('deskname'),
        headerName: 'Desk Name',
        pinned: true,
        width: 140
    }, {
        field: fieldMapping2('quantity'),
        headerName: 'Quantity',
        type: 'numericColumn',
        valueFormatter:p => Number(p.value).toLocaleString(),
        pinned: true,
        width: 120,
        cellStyle: p => {
            if (p.value < 0) {
                return { color: 'red' };
            }
            return { color: 'green' };
        }
    }, {
        field: fieldMapping2('price'),
        headerName: 'Price',
        valueFormatter: p => '$' + p.value.toFixed(2),
        type: 'numericColumn',
        width: 120
    }, {
        field: fieldMapping2('market'),
        headerName: 'Market',
        flex: 1
    }, {
        field: fieldMapping2('time'),
        headerName: 'Time',
        valueFormatter: p => new Date(p.value).toLocaleString(),
        flex: 1,
        sort: 'asc'
    }, {
        field: fieldMapping2('id'),
        headerName: 'ID',
        flex: 1,
        hide: true
    }
];

/**
 * Master position grid column and row data configuration
 */
export type T_ROWDATAMASTER = {
    symbol: T_STRING,
    quantity: T_NUMBER,
    name: T_STRING,
    country: T_STRING,
    description: T_STRING,
    details: T_ROWDATADETAIL[]
}
const fieldMapping1 = (name: keyof T_ROWDATAMASTER) => name;
export const POSITIONCOLDEFMASTER: ColDef[] = [
    {
        field: fieldMapping1('symbol'),
        headerName: 'Symbol',
        cellRenderer: 'agGroupCellRenderer',
        pinned: true,
        sort: 'asc',
        width: 200,
        filter: true,
        floatingFilter: true
    }, {
        field: fieldMapping1('quantity'),
        headerName: 'Quantity',
        type: 'numericColumn',
        valueFormatter:p => Number(p.value).toLocaleString(),
        pinned: true,
        width: 120,
        cellStyle: p => {
            if (p.value < 0) {
                return { color: 'red' };
            }
            return { color: 'green' };
        }
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


/* ** Sample data set from all 4 sources

accounts ====
    
    accountNumber: "65248205"
    id: "171652fd-ca53-44e7-b45b-ac4ba6f66f62"

instrument ====

    country:"Uganda"
    description: "Voluptas fuga totam perferendis ut"
    id: "6c1cd158-7838-40cc-b7f5-d2991015d894"
    name: "Kovacek - Upton"
    symbol: "ZWLC"

desks ====

    id: "7aaeb460-fd1e-4589-b8b9-c4238b1be68c"
    market: "Equity"
    name: "Esse"

transactions ====

    account_id: "a81b10f1-4eee-44d0-8722-a74c5e203347"
    desk_id: "7aaeb460-fd1e-4589-b8b9-c4238b1be68c"
    id: "170d8e0e-b7ac-422b-adf5-3ff868be4f72"
    instrument_id: "0d0a448e-dd57-4c6c-9428-35289932bb82"
    price: 174.18
    quantity: -102
    time: "2024-05-24T02:17:05.808Z"

** */