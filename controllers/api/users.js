exports.get = function(req, res, callback) {
    if (req.params.id == 'me') {
        res.send(req.user);
    }
    else {
        res.send({});
    }
};