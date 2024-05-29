import {
    useCallback,
    useState,
    useMemo,
    useRef,
    useEffect
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
    handlePromiseAllExtraction,
    handlePivotBySymbol,
    T_PROMISEDATA
} from '../configuration/positions-grid-pivots';
import {
    fetchData as fetch,
    FETCHPATHS as fetchPaths
} from '../requests/fetchData';
import {
    CustomLoadingOverlay
} from "./GridCustomOverlay";
import 'ag-grid-community/styles/ag-grid.css';
import "ag-grid-community/styles/ag-theme-quartz.css";


export default function PositionsGrid() {
    /**
     * store the grids position data, based on format by symbol
     * store error message as string
     */
    const [positionData, setPositionData] = useState<T_ROWDATAMASTER[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    /**
     * specific grid ref
     */
    const gridRef = useRef<AgGridReact>(null);
    /**
     * specific grid styles memo
     */
    const positionsGridStyle = useMemo(() => ({
        width: '100%',
        height: '100%'
    }), []);
    /**
     * Sub-grid memo, used to pull in details grid and data. Data is 
     * already structured in the master dataset see type ROWDATADETAIL
     * in positions-grid-configs.ts
     */
    const positionGridRowDetail = useMemo(() => {
        return {
            detailGridOptions: {
                suppressCellFocus: true,
                columnDefs: POSITIONCOLDEFDETAIL,
                rowHeight: 26,
                headerHeight: 26
            },
            getDetailRowData: (params: any) => {
                params.successCallback(params.data.details);
            }
        }
    }, []);
    /**
     * handler to set the position master and details, pre structured data
     * 
     * @param data
     *  see type ROWDATADETAIL in positions-grid-configs.ts
     */
    const handleSetPosition = (data: T_ROWDATAMASTER[]) => {
        setPositionData(data);
    }
    /**
     * handler for errors, uses string message
     * 
     * @param data
     *  message
     */
    const handleErrormMessage = (message: string) => {
        setErrorMessage(`Error: ${message}`);
    }
    /**
     * Fetch our data, in a promise, after the grids ready state is ready
     * to be modified with data (or other needs)
     * 
     */
    const onGridReady = useCallback(() => {
        Promise.all([
            fetch(fetchPaths.ACCOUNTS),
            fetch(fetchPaths.DESKS),
            fetch(fetchPaths.INSTRUMENTS),
            fetch(fetchPaths.TRANSACTIONS)
        ]).then((values: T_PROMISEDATA[]) => {
            const flat = handlePromiseAllExtraction(values);
            const data = handlePivotBySymbol(flat);

            if (data && Array.isArray(data))
                handleSetPosition(data);
            else
                handleErrormMessage('Data error in Promise, onGridReady');

        }).catch((error) => {
            handleErrormMessage(error.message);
        });
    }, []);
    /**
     * Show our error message when we set it
     */
    useEffect(() => {
        if (errorMessage) {
            gridRef?.current?.api.showLoadingOverlay()
        }
    }, [errorMessage]);


    return (
        <div
            className="ag-theme-quartz"
            style={positionsGridStyle}
        >
            <AgGridReact
                ref={gridRef}
                rowData={positionData}
                columnDefs={POSITIONCOLDEFMASTER}
                masterDetail={true}
                detailCellRendererParams={positionGridRowDetail}
                onGridReady={onGridReady}
                rowHeight={26}
                headerHeight={26}
                floatingFiltersHeight={42}
                pagination={true}
                suppressCellFocus={true}
                paginationPageSize={50}
                paginationPageSizeSelector={[50, 100, 200]}
                loadingOverlayComponent={CustomLoadingOverlay}
                loadingOverlayComponentParams={{ message: errorMessage }}
                detailRowAutoHeight={true}
            />
        </div>
    )
}
