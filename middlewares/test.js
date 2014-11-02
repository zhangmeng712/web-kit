/**
 * self-Defined connect middleware
 * Demo below shows how to add self defined ajax io for your project
 * which can be useful when you mock your server data
 */
var apis ={
	'/data/ok': {
		"code": "200",
		"msg": "It's ok"
	},
	'/data/err': {
		"code": "600",
		"msg": "something wrong"
	}
};
var midFunction = function (req, res, next) {
	var url = req.url;
	if (apis[url]) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		var content = JSON.stringify(apis[url]);
		res.write(content); 
	}
	res.end();     
	next();
}
module.exports = midFunction;