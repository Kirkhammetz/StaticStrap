#StaticStrap

####Bootstrap your static website develop!

Tired of setting up you develop enviroment?
Tired of setting everytime your gulp/grunt folders and scripts?

Here we come, it's already done, you just have to change some path here and there if you want!

##Tools & Framework
    Gulp
    LESS to process CSS
    JADE to process HTML
    jQuery
    Foundation

##Installation
    git clone https://github.com/Kirkhammetz/StaticStrap.git
    npm install
    gulp


##Filesystem
- _src/_ Source Container
    + _src/jade_ jade templates files
    + _src/js_ JS main module, you can expand it on your own
    + _src/less_ LESS container, main.less gets compiled and minified in root/css/main.min.css
- _src/statics_
    + static/images: images that get copyed in the root/images
    + static/fonts: place your fonts here
- _dist/_ Compiled website distribuition


##HELPERS
In the root DIR there is _env.json_, here you can declare you variables that get passed to compiled JADE template, so you can easily add common data to all views and change it faster if you customers ask for it! (We know that this will happen...).

__Vendors__: You can add your vendors paths here in this file, there is an array for it, they'll be concatenated and uglified and added in js/vendors.min.js or css/vendords.min.css

__BEWARE!__ WRITE SCRIPTs IN THE RIGHT ORDER!

#####You are now ready to create something awesome!
