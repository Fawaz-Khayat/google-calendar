#Wellacre School Website
[Instructions](https://github.com/edprince/google-calendar) on usage for the Google Calendar module
##Making the project Google Calendar-ready
**Step 1**
Sign into your Google Account and go to the [Developer Console](https://console.developers.google.com). Create a new project (this may take a few seconds).
![Create Project](http://i.imgur.com/gtfLDLr.png)

**Step 2**
Enable the Google Calendar API by going to the 'API's', under 'API's&auth'. Then click on 'Google Calendar', and then 'Enable API'.
![Enable API](http://i.imgur.com/0iXdGWq.png)

**Step 3**
Click add credentials, and choose 'API Key', and then 'Server Key'. Ignore the textbox, you can add to that later. Click 'Create'. This gives you your application's **API Key**.
![Add credentials](http://i.imgur.com/CUX742X.png)

**Step 4**
Under the 'credentials' tab, click 'Add Credentials', and choose 'OAuth2 client id'. 
![Click OAuth2](http://i.imgur.com/NImk4MV.png)

You need to click 'Configure consent screen' before you can choose a platform. 
![Consent button](http://i.imgur.com/KAmLCUD.png)

At the consent screen, type in a **name** for your project, and click 'save' at the bottom.
![Consent screen configuration](http://i.imgur.com/1yNWsxN.png)

Now you can select 'Web Application' when you choose 'OAuth2 client id'.


**Step 5**
Under the 'Authorized JavaScript Origins' heading which should now have appeared, type the domain of the server hosting the application, for example: `http://myserver.com`.

**Step 6**
Under the 'Authorized Redirect URI's' heading, type the domain again, but add '/oauth2callback' afterwards, for example: `http://myserver.com/oauth2callback`. Then click 'Create'.
![Adding a domain](http://i.imgur.com/VsKzzug.png)

**Step 7**
Now you need to add your **client id** and **API Key** to the code. Within the folder *gc/* in the google calendar folder, change the key in 'developer_key.php' to your **API Key**. Then go to 'add.js', and change the CLIENT_ID on line 70 to your **client ID**.
