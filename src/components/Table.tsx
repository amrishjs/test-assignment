import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";

interface ITableData {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export default function Table() {
    const [tableData, setTableData] = useState<ITableData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filterText, setFilterText] = useState<string>("");

    useEffect(() => {
        fetchTableData();
    }, []);

    const filteredItems = tableData.filter((item: ITableData) => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1);

    const columns = [
        {
            id: 1,
            name: "Name",
            selector: (row: ITableData) => row.name,
            sortable: true,
            reorder: true,
        },
        {
            id: 2,
            name: "Email",
            selector: (row: ITableData) => row.email,
            sortable: true,
            reorder: true,
        },
        {
            id: 3,
            name: "Body",
            selector: (row: ITableData) => row.body,
            sortable: true,
            reorder: true,
        },
    ];

    const fetchTableData = () => {
        let url = "https://jsonplaceholder.typicode.com/comments";

        axios
            .get(url)
            .then((response) => {
                setTableData(response.data);
                setLoading(false);
            })
            .catch((error: any) => {
                setLoading(false);
            });
    };

    const subHeaderComponent = useMemo(() => {
        return (
            <FilterComponent
                onFilter={(event: { target: { value: React.SetStateAction<string>; }; }) => setFilterText(event.target.value)}
                filterText={filterText}
            />
        );
    }, [filterText]);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
            }}
        >
            <DataTable
                progressPending={loading}
                columns={columns}
                data={filteredItems}
                pagination
                striped subHeader
                subHeaderComponent={subHeaderComponent}
                defaultSortFieldId={1}
            />
        </div>
    );
}
