import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        label: "",
        price: "",
        description: ""
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
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
        this.props.addItem(this.state.label, this.state.price, this.state.description);
        this.setState({
            label: "",
            price: "",
            description: ""
        });
    };

    render() {
        return (
            <form className="item-add-form d-flex"
                onSubmit={this.onSubmit}>

                <input type="text"
                       className="form-control"
                       onChange={this.onLabelChange}
                       placeholder="Product name"
                       value={this.state.label}/>
                <input type="text"
                       className="form-control"
                       onChange={this.onPriceChange}
                       placeholder="Price"
                       value={this.state.price}/>
                <input type="text"
                       className="form-control"
                       onChange={this.onDescriptionChange}
                       placeholder="Description"
                       value={this.state.description}/>

                <button
                    className="btn btn-outline-secondary">
                    Add Product
                </button>
            </form>
        )
    }
}