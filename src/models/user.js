import Immutable from 'immutable';
import Storage from '../utils/storage';

const UserRecord = Immutable.Record({
    userName:null,
    passWord:null,
    userId:null,
    token:null,
    phone:null,
},'User');

class User extends UserRecord{

    save() {
        Storage.save('user', this.toJS());
    }

    async merge(user) {
        const _user = await Storage.get('user');
        const newUser = Immutable.Map(_user).merge(user);
        Storage.save('user', newUser);
    }

    delete(){
        Storage.remove('user');
    }
}

export default User;