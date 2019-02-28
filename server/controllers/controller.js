const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        try{
            const { username, password } = req.body;
            const {session} = req
            const db = req.app.get('db');
            let takenUsername = await
            db.auth.check_username({ username });
            takenUsername = +takenUsername[0].count;
            if (takenUsername !== 0) {
            return res.sendStatus(409)
            }
        
            let salt = bcrypt.genSaltSync(13);
            let hash = bcrypt.hashSync(password, salt);
            let user = await db.auth.register(
                {username, password: hash});
                user = user[0]
            session.user = user
            
            res.status(200).send(session.user)
        }catch(err){
        }
        


    },

    login: async (req, res) => {
        const {username, password} = req.body
        const{session} = req
        const db = req.app.get('db')
        let user = await db.auth.login({username})
        user = user[0]
            if (!user) {
                return res.sendStatus(404)
            }
        let authenticated = bcrypt.compareSync(password, user.password)
        if (authenticated) {
            delete user.password
            session.user = user
            res.status(200).send(session.user)

        } else {
            res.sendStatus(401)
        }
    },
    getUser: (req, res) => {
        const {user}= req.session
        if (user) {
            res.status(200).send(user)
        } else {
            res.sendStatus(401)
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200
            )
    }

}