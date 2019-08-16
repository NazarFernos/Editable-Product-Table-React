import React, { Component } from 'react';

import './table-add-row.css';

export default class TableAddRow extends Component {

    state = {
        name: "",
        price: "",
        description: ""
    };

    onLabelChange = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    onPriceChange = (e) => {
        this.setState({
            price: e.target.value
        });
    };

    onDescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        });
    };


    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.name, this.state.price, this.state.description);
        this.setState({
            name: "",
            price: "",
            description: ""
        });
    };

        render() {
        return (
            <form className="table-add-row d-flex"
                onSubmit={this.onSubmit}>

                <input type="text"
                       className="form-control"
                       onChange={this.onLabelChange}
                       placeholder="Product name"
                       value={this.state.name}/>
                <input type="text"
                       className="form-control"
                       onChange={this.onDescriptionChange}
                       placeholder="Description"
                       value={this.state.description}/>
                <input type="text"
                       className="form-control"
                       onChange={this.onPriceChange}
                       placeholder="Price"
                       value={this.state.price}/>

                <button
                    className="btn btn-primary">
                    Add product
                </button>
            </form>
        )
    }
}