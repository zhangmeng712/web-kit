web-kit
=======

Web-kit is used for web development of front-end developers.
-  It contains the grunt workflow of lively reload in it self, you have no need to write Gruntfile.
-  Once installed Run everwhere.
-  It contains a server, and when you save your html/js/css/less files it will compile and auto loaded in your browser, you'll have no need to switch between code editor and browser and press F5(cmd + R in mac) to reload your page everytime.

install
=======
```bash
npm intall -g grunt-cli
npm install -g web-kit
```
use
===

run commands in your shell, it will set up an internal server to show your pages,  compile less and
auto loaded when your save you files in your_project_home.

```bash
web-server --dir your_project_home
web-server --port 3000
web-server --index other.html
web-server --middleware /opt/local/share/nginx/html/web-kit/mid.js
```

```javascript
// /opt/local/share/nginx/html/web-kit/mid.js
// It's demo for how to write middleware file
// this self defined middleware file can used for simulate mock json response data for ajax request
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
```



```bash
web-server --help //list all the params you can you
```


version
===

- v0.1.1 Basic functions
- v0.2.0 fix bug of spawn for windows and add self-defined middleware for your server
