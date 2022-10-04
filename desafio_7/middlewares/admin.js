module.exports = adminAuth = (req, res, next) => {
    req.body.admin ? next() : res.json({msg: 'Not authorized'});
}