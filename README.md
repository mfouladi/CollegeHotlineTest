CollegeHotlineTest
==================

PROJECT DESCRIPTION:
---------------------
Project that will establish college counseling for schools that MAPS is affiliated through a single phone number. Volunteers will fill out a time sheet that will be used to redirect call to their phones. Redirect service will be available to transfer calls to different phone numbers depending on the information desired. Phone numbers must be registered via access code provided at school assemblies. Option available for students to call and listen to prerecorded messages regarding study skills, encouragement, referrals. Possibility of allowing students to record their own messages that other students can listen to.

INSTALLING AND SETTING UP THE APPLICATION ON UBUNTU 14.04:
-----------------------------------------------------------
_Install Mongo:_
------------------
1. First Install MongoDB using the bash script below.
2. Check your root directory for "/data/db/" and if it does not exist, create the directory and make sure to set access permissions appropriately for the yourself.
3. Type the command "mongood", and your mongo database should be running. Test this by running the command "mongo" and you should have access to the terminal interface for mongodb.

Mongo Install Script:
```
apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | tee -a /etc/apt/sources.list.d/10gen.list
apt-get update
apt-get install -y mongodb-org
```

_Install Node.js:_
--------------------
1. The following script will install curl, nodejs, bower, and grunt:
```bash
sudo apt-get install curl
curl -sl https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install nodejs
sudo apt-get install build-essential
sudo npm install -g bower
sudo npm install -g grunt-cli
```
_Downloading the Application:_
----------------------------
1. Choose a location that is best fit for the application. This is a personal choice that does not affect the app.
2. Make sure you have git installed. `sudo apt-get install git`
3. Run the following command to download the app: `git clone https://github.com/mfouladi/CollegeHotlineTest.git`

_Setting Up Plivo:_
-----------------
1. In order to have the application fully functional, you will need an account with plivo and a phone number. Set that up at plivo.com
2. Make sure to get a phone number with SMS capabilities, because this cannot be added on later and your number will have to be changed.
3. In the Plivo dashboard, go to the "Applications" tab, and add a new application. Assuming you are running it on your own system, we will use localhost. Replace local host with your server ip or your web url.
   1. Name the application whatever you would like
   2. Set the Message URL to : "localhost/api/conversation/create" and Set the Message Method to : "POST"
   3. Set the Answer URL to : "localhost/api/cloudPhone/forwardCall" and Set the Answer Method to : "GET"
   4. Leave the Fallback URL blank and Set the Fallback Method : "POST"
   5. Set the Answer URL to : "localhost/api/cloudPhone/hangUp" and Set the Answer Method to : "GET"
   6. Click "Update" and you are done!

_RUNNING THE APPLICATION:_
------------------------
1. Since the application runs on port 80, it requires sudo user privledges. If you do not have privledges, go into server.js and change the port at the end of the file from 80 to 3000. This also mean you have to change all plivo urls from "localhost" to "localhost:3000"

2. To run the app, go into the directory CollegeHotlineTest and run the following: `sudo node server`
3. The application shoudl be running! Go to "localhost" in your web browser and check out the site!

_RUNNING CONTINUOUSLY ON A SERVER:_
----------------------------------
1. You must install forever globally. Go here for more info: https://github.com/nodejitsu/forever `sudo npm install forever -g`
  




