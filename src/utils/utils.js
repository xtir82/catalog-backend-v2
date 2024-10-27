//Bcrypt
import bcrypt, {hash} from 'bcrypt';

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

//hashSync -> Apply a hash process to password from a salt
//Salt -> Is a random string used in the hash proccess
//genSaltSync -> Generates a 10 char salt

const isValidPassword = (password, user) => {
    bcrypt.compareSync(password, bcrypt.genSaltSync(10), user.password);
}
//compareSync -> Compare the passwords

export {createHash, isValidPassword};