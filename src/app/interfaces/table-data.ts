import { RowData } from "./row-data";

export interface TableData {
    holes: RowData;
    yards: RowData;
    pars: RowData;
    handicaps: RowData;
    players: RowData[];
}
