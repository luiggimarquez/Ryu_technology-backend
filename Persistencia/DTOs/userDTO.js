
export default class UsersDto{

    constructor(user){

        this.id = user.author.id;
        this.user =  `${user.author.lastName} ${user.author.name}`;
    }
}