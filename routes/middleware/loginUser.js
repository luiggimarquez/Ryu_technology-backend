export function loginUser(req, res, next) {
    if (req.session?.name) {
        next()
    } else {
        res.redirect('/login')
    }
}