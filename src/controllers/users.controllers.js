import userModel from "../models";
import bcrpt from "bcrypt";


/**
   * Find user 
   *
   * @param {Object} attribut
   * @param {Object} params
   * 
*/
function findUser(attribut,params) {
    const data = userModel.User.findOne({
        attributes: attribut,
        where: params
    });
    return data;
}

/**
   * Check if login
   *
   * @param {String} req
   * @param {String} res
*/

export async function login(req, res){
    // Params
    const { email, password } = req.body;

    if (email == null ||  password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    const params = { 'email': email };
    const userData = await findUser(['id', 'email', 'password'], params);
    if(userData) {            
        const rep = await pwd(password, userData.password);
        if(rep){
            return res.status(201).json({
                'userId': userData.id,
            });
        } else {
            return res.status(403).json({ 'error': 'invalid password' });
        }
    } else {
        return res.status(403).json({ 'error': 'invalid email' });
    }
}

/**
   * Check if password is good
   *
   * @param {String} pwd
   * @param {String} userHash
*/
async function pwd(pwd, userHash) {
    if (!(await bcrpt.compareSync(pwd, userHash))) return false;
    return true;
}