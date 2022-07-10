import React from "react";

interface IFilterComponentProps {
    filterText: string;
    onFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterComponent = (props: IFilterComponentProps) => (
    <div>
        <input type={'text'}
            placeholder={'Search'}
            value={props.filterText}
            onChange={props.onFilter} />
    </div>
);

export default FilterComponent;
