import React, { Component, Fragment } from 'react';
import { updateArticle } from '../../api/articles';

import './table-item.css';

export default class TableItem extends Component {

        state = {
            isEditting: false,
            inputValues: {}
        };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    editItem = () => {
        this.setState({isEditting: true});
    };

    confirm = () => {
        const id = this.props.id;
        const inputValues = Object.assign({}, this.props, this.state);
        this.props.updateItem(id, inputValues);
        this.setState({isEditting: false});

        const { name, description, price } = this.state;

        updateArticle({id, name, description, price});
    };

    cancel = () => {
        this.setState({isEditting: false});
    };

    createInput = (initialValue, name, placeholder = "") => {
        const value = typeof this.state[name] === "undefined" ? initialValue : this.state[name];

        return (
            <input type="text"
                   className="edit-item"
                   onChange={this.handleChange}
                   placeholder={placeholder}
                   value={value}
                   name={name}/>
        );
    };

    createButton = (onClick, type) => {
        const buttonType = {
            "delete": "fa-trash-o",
            edit: "fa-pencil",
            confirm: "fa-check",
            cancel: "fa-times"
        };

        return (
            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={onClick}>
                <i className={`fa ${buttonType[type]}`}/>
            </button>
        );
    };

    render() {
        let { id, name, price, description, onDeleted } = this.props;
        let classNames = "table-item";
        let buttons = [];

        if (this.state.isEditting === true) {
            name = this.createInput(name, "name", "Product name");
            price = this.createInput(price, "price", "Price");
            description = this.createInput(description, "description", "Description");

            buttons.push(this.createButton(this.confirm, "confirm"));
            buttons.push(this.createButton(this.cancel, "cancel"));
        } else {
            buttons.push(this.createButton(onDeleted, "delete"));
            buttons.push(this.createButton(this.editItem, "edit"));
        }

        return (
            <span className={classNames}>
                    <table className="table table-bordered">
                         <tbody>
                            <tr>
                                <td className="coll">{id}</td>
                                <td className="col1">{name}</td>
                                <td className="col2">{description}</td>
                                <td className="col3">{price}</td>
                                <td className="col4">{buttons.map((button, i) => <Fragment key={i}>{button}</Fragment>)}</td>
                            </tr>
                         </tbody>
                    </table>
            </span>
        );
    };
}
