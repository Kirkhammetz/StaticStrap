#StaticStrap

####Kickstart your static website develop!

Tired of setting up everything for a simple straight forward code and deploy static website?

Tired of wasting time setting up your develop environment?

Tired of setting up a simple mailer php class?

Here we come, it's already done, you just have to change some variables.

##Tools & Framework
    Gulp
    LESS to process CSS
    PUG (ex Jade) to process HTML
    jQuery (if needed)
    Babel
    Foundation
    Composer
    PHPMailer

##Installation dev env
    git clone https://github.com/Kirkhammetz/StaticStrap.git
    npm install # or yarn install
    npm run init # first setup

## On deploy
Deploy/Push whole folder but point your webroot to `public/`, run composer install on server if you need the email.

    npm run composer install

##File Structure
- _source/_ Source Container
    + _source/pug_ PUG templates files
    + _source/js_ JS main module, you can expand it on your own
    + _source/less_ LESS container, main.less gets compiled and minified in root/css/main.min.css
    + _source/bin_ Server Scripts to be copied in public
- _source/statics_
    + static/images: images that get copied in the public/images
    + static/fonts: place your fonts to have it copied in public/fonts
- _public/_ Compiled website
- _bin/_ Composer vendors + dotenv for php not exposed to public


## PHP Scripts & PHPMailer
__You can always directly use your SMTP from your service API and avoid using PHP at all, you choose__

The `bin/` folder in the root it's not exposed in the webroot, it contains composer modules and `.env` variables to use with PHPMailer regarding your SMTP credentials

Put server scripts in `source/bin` to have it copied to `public/bin`, there is an `index.php` to start from, it load the  `main.class.php`

Main Class load variable from .env in /bin/.env and load PHPMailer and do it's setup using ENV variables.
Main expose only one single public method `send_email($Request)`, request is an array with mail data (name, email, message), return a JSON response and set HTTP_STATUS accordingly.

use index.php to post data from your scripts a and get a JSON response from the Main class.


##HELPERS
In the root DIR there is `env.json`, here you can declare you variables that get passed to compiled PUG template, so you can easily add common data to all views and change it faster if you customers ask for it! (We know that this will happen...).

__.htaccess__ `source/.htaccess` gets copied in `public/`

__Vendors__: Add vendors (scripts/styles) in `gulpfile.js`, there are two array for them.

__BEWARE!__ WRITE SCRIPTs IN THE RIGHT ORDER!

#####You are now ready to create something awesome!
