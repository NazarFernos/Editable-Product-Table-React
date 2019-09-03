import React from 'react';

import TableItem from '../table-item/table-item';
import './table.css';

const Table = ({tableItems, onDeleted, updateItem}) => {

    const elements = tableItems.map((item) => {
        const {id, ...itemProps} = item;

        return (
            <div key={id}>
                <TableItem {...itemProps}
                           id={id}
                           onDeleted={() => onDeleted(id)}
                           updateItem={updateItem}/>
            </div>

        );
    });

    return (

        <div>
            <table className="table table-bordered">
                <thead className="table">
                <tr>
                    <th className="coll" scope="col">#</th>
                    <th className="col1" scope="col">Name</th>
                    <th className="col2" scope="col">Description</th>
                    <th className="col3" scope="col">Price</th>
                    <th className="col4">Action</th>
                </tr>
                </thead>
            </table>
            {elements}
        </div>
    );
};

export default Table;