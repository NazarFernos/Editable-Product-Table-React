import React, {Component} from 'react';

import Table from '../table';
import TableAddRow from '../table-add-row';

import './app.css';

export default class App extends Component {

    maxId = 1;

    state = {
        tableData: []
    };

    createTableItem = (name, price, description) => {
        return {
            name,
            price,
            description,
            id: this.maxId++
        }
    };

    deleteItem = (id) => {
        this.setState(({tableData}) => {

            const idx = tableData.findIndex((el) => el.id === id);

            const newArray = [
                ...tableData.slice(0, idx),
                ...tableData.slice(idx + 1)
            ];
            return {
                tableData: newArray
            };
        });
    };

    addItem = (name, price, description) => {
        const newItem = this.createTableItem(name, price, description);

        if (!newItem) return;

        this.setState(({tableData}) => {

            const newArr = [
                ...tableData,
                newItem
            ];

            return {
                tableData: newArr
            };
        });
    };

    updateItem = (targetId, inputValues) => {
        this.setState(({tableData}) => {
            const targetIndex = tableData.findIndex((element) => element.id === targetId);
            const newTableData = [...tableData];
            Object.assign(newTableData[targetIndex], inputValues);
            return newTableData;
        });
    };

    componentDidMount() {
        let user = {
            email: "user1@email.com",
            password: "!password!"
        };

        const URL = 'https://gentle-escarpment-19443.herokuapp.com';

        const logIn = () => {
            fetch(`${URL}/v1/users/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

                .then((res) => res.json())
                .then(
                    data =>
                        fetch(`${URL}/v1/articles?page=1&updated_after=1410403761`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${data.access_token}`
                            }
                        })
                            .then((res) => res.json())
                            .then(
                                tableData => {
                                    this.setState({tableData});
                                    console.log(tableData)
                                }
                            )
                            .catch((error) => console.log(error))
                )
        };
        logIn();

    }


    render() {

        const {tableData} = this.state;

        return (
            <div className="table-app">

                <TableAddRow addItem={this.addItem}/>

                <Table
                    onDeleted={this.deleteItem}
                    updateItem={this.updateItem.bind(this)}
                    tableItems={tableData}/>
            </div>
        );
    }
};