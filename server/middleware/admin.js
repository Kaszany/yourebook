
module.eport = function (req, res, next) {
	if (!req.user.isAdmin) return res.status(403).send('Odmowa dostępu');
	next();
}