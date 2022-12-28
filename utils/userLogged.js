let userLogged = (name, email, picture) => {

    const options = { root: './public/index/' , headers:{ 
        'Access-Control-Expose-Headers': 'name',
        'name': name, 'email': email, 'picture': picture }
    }
    return options
}

export default userLogged