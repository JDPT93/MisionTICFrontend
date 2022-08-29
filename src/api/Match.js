import Entity from './Entity';

export default class Match extends Entity {

    constructor() {
        super('matches');
    }

    findAll() {
        return this.get(null, { 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    }

    save(match) {
        this.post(match, null, { 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    }

}