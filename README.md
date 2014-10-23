web-kit
=======

Web-kit is used for web development of  front-end developers. It packaged the grunt workflow.

Once installed Run everwhere.

It contains a server, when you save your html/js/css/less files it will compile and auto loaded in your browser,
It much more helper when you have two computer screens, because you'll have no need to change between code editor and browser and press F5(cmd + R in mac) to reload your page.

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
```


```bash
web-server --help //list all the params you can you
```


comming soon
===

Allow your to set middleware files to control your Host and Routes
and provide self-defined interface data for ajax debugger
