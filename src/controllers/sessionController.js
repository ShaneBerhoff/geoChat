const Session = require('../models/sessionModel')

const findUser = async (sessionToken) => {
    let session;
    try {
        session = await Session.findOne({token: sessionToken});
    } catch (error){
        console.error("Error finding username for session:", error);
    }
    if (session === null){
        //TODO
        return null;
    } else {
        return session.username;
    }
    
}

module.exports = {
    findUser
};