//Bcrypt
import {genSaltSync, hashSync, compareSync} from 'bcrypt';

const createHash = (password) => {
    return hashSync(password, genSaltSync(10), null);
}

//hashSync -> Apply a hash process to password from a salt
//Salt -> Is a random string used in the hash proccess
//genSaltSync -> Generates a 10 char salt

const isValidPassword = (password, user) => {
    return compareSync(password, user.password);
}
//compareSync -> Compare the passwords

export {createHash, isValidPassword};