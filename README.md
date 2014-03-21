rocon_storytelling
==================

Software for our storytelling tool

### Meteor launch

First, install the meteor

```
> curl https://install.meteor.com/ | sh

```

And then, launch the story telling authoring server

```
> cd <rocon_storytelling package>/storytelling
> meteor
```
you can see follow message,


```
[[[[[ ~/rocon/src/rocon_storytelling/storytelling ]]]]]

=> Meteor 0.7.2 is available. Update this project with 'meteor update'.
=> Meteor server running on: http://localhost:3000/
I20140321-14:28:49.159(9)? make execution page: prototype.html
I20140321-14:28:49.221(9)? make execution page: delivery.html
I20140321-14:28:49.221(9)? make execution page: cleaning.html
I20140321-14:28:49.221(9)? make execution page: patrol.html
```
Now, open the web browser(recommended chrome) and connect ``` http://localhost:3000/main ```

If you want test of motion retargeting api, connect here. It is simple execution page.
```
http://localhost:3000/export/example/test.html
```

If you want see the web debug message, push the ```F12``` and go to the console tab.
