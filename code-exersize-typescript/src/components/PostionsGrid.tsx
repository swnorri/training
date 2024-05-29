import {
    useCallback,
    useState,
    useMemo
} from 'react';
import {
    AgGridReact
} from 'ag-grid-react';
import 'ag-grid-enterprise';
import {
    POSITIONCOLDEFMASTER,
    POSITIONCOLDEFDETAIL,
    T_ROWDATAMASTER
} from '../configuration/positions-grid-configs';
import {
    handleFlattenPositionData,
    handleFormatDataBySymbol
} from '../configuration/positions-grid-pivots';
import {
    fetchData as fetch
} from '../requests/fetchData';

import 'ag-grid-community/styles/ag-grid.css';
import "ag-grid-community/styles/ag-theme-balham.css";


function PositionsGrid() {
    // store the grids position data, based on format by symbol
    const [positionData, setPositionData] = useState<T_ROWDATAMASTER[]>([]);

    // specific grid styles as memo
    const positionsGridStyle = useMemo(() => ({
        width: '100%',
        height: '600px',
    }), []);

    // sub grid memo, used to pull in details grid and data. Data is 
    // already structured in the master dataset see type ROWDATADETAIL
    // in positions-grid-configs.ts
    const positionGridRowDetail = useMemo(() => {
        return {
            detailGridOptions: {
                columnDefs: POSITIONCOLDEFDETAIL,
                rowHeight: 26,
                headerHeight : 26
            },
            getDetailRowData: (params: any) => {
                params.successCallback(params.data.details);
            }
        }
    }, []);

    // handler to set the position master and details, pre structured data
    // see type ROWDATADETAIL in positions-grid-configs.ts
    const handleSetPositionDataBySymbol = (data: T_ROWDATAMASTER[]) => {
        setPositionData(data);
    }
    // handler for fetch errors
    const handleFetchError = (error: {}) => {



    }
    // Fetch our data, in a promise, after the grids ready state is ready
    // to be modified with data (or other needs)
    const onGridReady = useCallback(() => {
        Promise.all([
            fetch('accounts'),
            fetch('desks'),
            fetch('instruments'),
            fetch('transactions')
        ]).then((values) => {
            const d1 = handleFlattenPositionData(values);
            const d2 = handleFormatDataBySymbol(d1);

            if (d2) { handleSetPositionDataBySymbol(d2); }

        }).catch((error) => {
            handleFetchError({ error: error.message });
        });
    }, []);

    // Paging parameters
    const pagination = true;
    const paginationPageSize = 50;
    const paginationPageSizeSelector = [50, 100, 200];

    return (
        <>
            <div
                className="ag-theme-balham"
                style={positionsGridStyle}
            >
                <AgGridReact
                    rowData={positionData}
                    columnDefs={POSITIONCOLDEFMASTER}
                    masterDetail={true}
                    detailCellRendererParams={positionGridRowDetail}
                    onGridReady={onGridReady}
                    rowHeight={26}
                    headerHeight={26}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </>
    )

}

export default PositionsGrid;







/*
accounts ====
    
    accountNumber: "65248205"
    id: "171652fd-ca53-44e7-b45b-ac4ba6f66f62"

instrument====

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

*/