import Matches from './api/Matches';
import Teams from './api/Teams';
import Users from './api/Users';

export default Object.freeze({
    matches: new Matches(),
    teams: new Teams(),
    users: new Users(),
});