import Base from './Base';

export default class Users extends Base {

    constructor() {
        super('users');
    }

    signUp(user) {
        return this.fetch('POST', 'signup', user);
    }

    signIn(credentials) {
        return this.fetch('POST', 'signin', credentials);
    }

}