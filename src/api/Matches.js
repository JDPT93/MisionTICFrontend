import Base from './Base';

export default class Matches extends Base {

    constructor() {
        super('matches');
    }

    findAll() {
        return this.get(null, { 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    }

    save(match) {
        return this.post(match, null, { 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    }

}