const user = {
    email: "user1@email.com",
    password: "!password!"
};

const URL = 'https://gentle-escarpment-19443.herokuapp.com';

export const logIn = user => {
    return fetch(`${URL}/v1/users/auth`, {
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

const logOut = () => {
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
                fetch(`${URL}/v1/users/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${data.access_token}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => res.json())
        )
};
