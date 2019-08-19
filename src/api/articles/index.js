import {URL} from "../../constans";

// todo input user from application
const user = {
    email: "user1@email.com",
    password: "!password!"
};

// todo input user from application
const row = {
    id: 1,
    name: "Nazar",
    description: "Fernos",
    price: 12.50,
    status: 10
};

// todo input userData from application
export const logIn = (userData) => {
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
//todo name to fetch
export const getArticlesList = () =>
    fetch(`${URL}/v1/articles?page=1&updated_after=1410403761`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('accessToken')
        }
    })
        .then((res) => res.json());
        /*.then(
            tableData => { this.setState({tableData});
                console.log(tableData)
            }
        )
        .catch((error) => console.log(error))*/

getArticlesList();


export const createArticle = () =>

    fetch(`${URL}/v1/articles`, {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(row)
    })
        .then((res) => res.json());
        /*.then(
            tableData => { this.setState({tableData});
                console.log(tableData)
            }
        )
        .catch((error) => console.log(error))*/

createArticle();


export const getArticleById = () =>

    fetch(`${URL}/v1/articles/10`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('accessToken')
        }
    })
        .then((res) => res.json());
        /*.then(
            tableData => { this.setState({tableData:[tableData]});
                console.log(tableData)
            }
        )
        .catch((error) => console.log(error))*/

getArticleById();


export const updateArticle = () =>

    fetch(`${URL}/v1/articles/98`, {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(row)
    })
        .then((res) => res.json());
        /*.then(
            tableData => { this.setState({tableData:[tableData]});
                console.log(tableData)
            }
        )
        .catch((error) => console.log(error))*/

updateArticle();