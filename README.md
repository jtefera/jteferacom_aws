My personal webpage
===================
Used:
* Backend: Node.js(Express) in AWS EC2
* Front-End: Bootstrap and ES6
* Webpack Babel 

# Instructions

Download this repository into your local machine or server and install all modules:

    git clone https://github.com/jtefera/jteferacom_aws.git .
    npm install

Install webpack and forever globally

    npm install -g webpack forever

If this is a fresh installation, the folders recipes_app_react and 1out will be empty. They have their own git repositories:

+ For `recipes_app_react`:

        //From main folder 
        cd src/projects/recipes_app_react
        git pull
        webpack


+ For `1out`:

        //From main folder
        cd src/projects/1out
        git pull


Also, due to sensitive information, the mail configuration file is not included in this repositiory. The name of that file is `config.json` and should be included in the folder `src/server/mail/`. A sample of that file is:

    {
        "accessKeyId": "your amazon ses access key",
        "secretAccessKey": "your amazon ses secccret access key",
        "region": "your amazon ses region (Eg. us-west-2)"
    }


Once both projects are already in place, run webpack in the main folder:

    webpack

To run webpack continuosly:

    webpack --watch

or

    npm run build

## Run the server:

###In a local enviroment:

+ Simple run:

        // From the main folder
        node server/server.js

+ Run continuosly resetting for changes in the server file:

        // From the main folder
        npm run server

### In the server

+ To run once:

        // From the main folder
        node server/server.js

+ To run forever even when you are disconnected:

        // From the main folder
        forever start server/server.js

In case there was already another forever task running in the same port:

    // From the main folder
    forever list
    // Will output the list of forever instances. Get the pid number of the one running 
    forever stop pid_number_of_the_instance
    forever start server/server.js

The Node server will be listening to the port 8080. If you want to deliver from the port 80, use this command:

    sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080

## How to connect to the server
Go to www.aws.amazon.com, login with your account. Go to EC2 and select the instance where the server is hosted.

From there, get your username(Eg. ubuntu) and hostname.

You will need your `.pem` key and transform it into `.ppk` with PuttyGen (if you already have the `.ppk` file, you don´t need the `.pem`.)

Open Putty. As hostname use:

    ubuntu@hostname_from_before`

From `Connection > SSH > Auth`, browse and open the `.ppk` file.

Press open. You are in!

More Instructions: https://www.youtube.com/watch?v=V6JKLQj50ro





Configuration of www.jtefera.com