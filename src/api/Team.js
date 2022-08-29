import Entity from './Entity';

export default class Team extends Entity {

    constructor() {
        super('teams');
    }

    findAll() {
        return this.get(null, { 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    }

    save(team) {
        this.post(team, null, { 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    }

}