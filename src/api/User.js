import Entity from './Entity';

export default class User extends Entity {

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