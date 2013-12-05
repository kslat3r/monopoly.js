exports.roll = function(req, res) {
	res.json([
		Math.floor((Math.random()*6)+1),
		Math.floor((Math.random()*6)+1)
	]);
};
