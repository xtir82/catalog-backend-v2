
class SessionController {

    renderRegister (req, res) {
        if (req.session.login) {
            res.redirect('/profile');
        } else {
            res.render('register');
        }
    }

    renderLogin (req, res){
        if (req.session.login) {
            res.redirect('/profile');
        } else {
            res.render('login');
        }
    }

    renderProfile (req, res) {
        if (!req.session.login) {
            res.redirect('/login');
        } else {
            res.render('profile', {user: req.session.user});
        }
    }
}

export const sessionController = new SessionController();