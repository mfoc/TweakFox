TweakFox
--------

Name: 		TweakFox.xpi

Version: 	1.3

Date: 		07-May-2012

Author: 	Martin Francis O'Connor

HomePage:	http://www.computing.dcu.ie/~moconnor

--------

What is TweakFox?
-----------------
This project contains the source code for my first Firefox Browser addon or
extension called TweakFox.


What does TweakFox do?
----------------------
The purpose of the Tweakfox Firefox extension is twofold:

1) To automatically customise the navigation bar in Firefox according to a 
   user specified custom arrangement. 
   
2) To automatically configure virtually any Firefox preferences according 
   to a given set of user-specified preferences.
   
   Note:  Firefox preferences may be accessed and modified at any time 
   by entering "about:config" into the URL bar.
   

What is the motivation behind TweakFox?
---------------------------------------
For stability, performance and security reasons, It is recommended to use the 
latest stable release of the Firefox browser.

However, there is a significant time investment required each time to manually 
configure the browser according to my preferences.  More specifically I have
to manually:

1) configure all of the Firefox options according to my needs and preferences.

2) customise the navigation bar according to my preferences.

3) Individually download and install several addons that I find essential 
   such as: quickdrag, adblock plus; close tab by double click; 
   all-in-one sidebar, site launcher and so on.

   4) Individually configure each addon according to my preferences.

Tweakfox automates completely steps 1 and 2 above.  I subsequently created a 
new container addon which I call firefoxKeyAddons.xpi containing all of my 
favourite addons preconfigured according to my preferences plus my Tweakfox 
addon.  Consequently, I can take a clean installation of a new stable release
of the Firefox browser and by installing just one addon - namely 
firefoxKeyAddons.xpi, the Firefox browser is instantly configured with all
of my favourite addons, customisations and preferences with no extra work
required.


How to adapt and modify TweakFox!
---------------------------------
There are only two javascript files in TweakFox:

* TweakFox/chrome/content/tweakfox.js
* TweakFox/defaults/preferences/tweakfoxprefs.js
  
tweakfox.js contains all of the functionality of TweakFox.
The code is well documented and quite easy to follow. This script is only run 
once, when the addon is initially installed.  By running the script only once, 
any future customisations made by the user will be saved and not overwritten.

tweakfoxprefs.js contains the user specified preferences.  You may modify 
these preferences or enter new ones according to your needs.

TweakFox adds six new custom preferences:  They are:

* pref("extensions.tweakfox.firstRun", true);
* pref("extensions.tweakfox.enableDownloadPreferences", true);
* pref("extensions.tweakfox.downloadFolder", "c:\\downloads");
* pref("extensions.tweakfox.enableCustomNavBar", true);
* pref("extensions.tweakfox.customNavBar", "bookmarks-menu-button-container,sync-button,separator,unified-back-forward-button,separator,home-button,separator,reload-button,stop-button,navigator-throbber,urlbar-container,search-container,fullscreenflex,window-controls");
* pref("extensions.tweakfox.cleanHistoryOnExit", true);
  
