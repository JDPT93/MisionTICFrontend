import Match from './api/Match';
import Team from './api/Team';
import User from './api/User';

export default Object.freeze({
    match: new Match(),
    team: new Team(),
    user: new User(),
});