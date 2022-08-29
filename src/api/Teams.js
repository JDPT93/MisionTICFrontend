import Base from './Base';

export default class Teams extends Base {

    constructor() {
        super('teams');
    }

    findAll() {
        return this.get(null, { 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    }

    save(team) {
        return this.post(team, null, { 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    }

}