//verification of the role of the user
function roleMiddleware (allowedRoles) {
    return function (req, res, next) {
        if (allowedRoles.includes(req.user?.role)) {
            return next()
        }
        return res.status(403).send()
    }
}

module.exports = {
    roleMiddleware
}