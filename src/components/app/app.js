import React, { Component } from 'react';

import Table from '../table';
import TableAddRow from '../table-add-row';


import './app.css';
Kmport {createArticle} from "../../api/articles";
import {getArticleById} from "../../api/articles";
import {updateArticle} from "../../api/articles";



export default class App extends Component {

    maxId = 100;

    state = {
        tableData: [
            {
                id: 1,
                name: "",
                price: "",
                description: ""
            }
        ]
    };

    createTableItem = (name, price, description) => {
        let tableData = this.state.tableData;
        let lastId = tableData[tableData.length-1].id;
        if (lastId < this.maxId)
            return {
                name,
                price,
                description,
                id: ++lastId
            };

        return false;
    };

    deleteItem = (id) => {
        this.setState(({ tableData }) => {

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

        this.setState(({ tableData }) => {

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

    async componentDidMount() {
        let user = {
            email: "user1@email.com",
            password: "!password!"
        };

        let row = {
            id: 1,
            name: "Nazar",
            description: "Fernos",
            price: 12.50,
            status: 10
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
                        localStorage.setItem('accessToken', `Bearer ${data.access_token}`)
                )
        };
        logIn();
        this.getArticlesList();
        this.createArticle();
        this.getArticleById();
        this.updateArticle();
    }
    getArticlesList = async () => {
        const articles = await getArticlesList();
        this.setState({tableData:articles})
    };

    createArticle = async () => {
        const articles = await createArticle();
        this.setState({tableData:articles})
    };

    getArticleById = async () => {
        const articles = await getArticleById();
        this.setState({tableData:articles})
    };

    updateArticle = async () => {
        const articles = await updateArticle();
        this.setState({tableData:articles})
    };



    render() {

        const { tableData } = this.state;


        return (
            <div className="table-app">
                <TableAddRow addItem = {this.addItem} />

                <Table
                    onDeleted = { this.deleteItem }
                    updateItem = { this.updateItem.bind(this) }
                    tableItems={tableData}
                />
            </div>
        );
    }
};