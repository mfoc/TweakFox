/*
Name:   	tweakfox.js
Version: 	1.3
Author:  	Martin Francis O'Connor
Date: 		07-May-2012

Description:

The purpose of this Firefox extension is to customise a vanilla installation
of the Firefox browser (or FirefoxPortable) according to a user-specified 
set of preferences.  

A new version of Firefox is released on a frequent basis.  For security, 
performance and stability reasons, it is preferable to use the latest stable
release of the Firefox browser. 

This results in a cycle of duplicated effort every time to tweak the many 
Firefox preferences, customise the Firefox navigation bar and install a set
of favourite addons so as to have an efficent and effective browser.

TweakFox performs the specified tweaks and customisations and consequently,
saves a lot of time, while guaranteeing the user has a browser customised 
and tweaked according to their preferences.

*/

 var tweakfox = {
 	// The Init Function is run only once - when the addon is first installed.
	Init : function()
	{	
		// Access the Firefox Preferences Service
		tweakfox.prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
		// Retrive the branch of preferences for the tweakfox extension.
		tweakfox.prefs = tweakfox.prefs.getBranch("extensions.tweakfox.");
		// Determine if tweakfox has just been installed.
		var isFirstRun = tweakfox.prefs.getBoolPref("firstRun");
		
		if (isFirstRun == true)
		{
			// Retrieve the remaining preferences.
			var enableDownloadPrefs = tweakfox.prefs.getBoolPref("enableDownloadPreferences");
			var enableCustomNavBar = tweakfox.prefs.getBoolPref("enableCustomNavBar");
			var cleanHistoryOnExit = tweakfox.prefs.getBoolPref("cleanHistoryOnExit");
			
			// Check if the browser download preferences should be set.
			if (enableDownloadPrefs == true) {
				// Obtain the user-specified download folder.
				var downloadFolder = tweakfox.prefs.getCharPref("downloadFolder");
				// Set the browser download preferences
				tweakfox.setBrowserDownLoadPreferences(downloadFolder);			
			}

			// Check if the brower navigation bar should be customised.
			if (enableCustomNavBar == true) {
				// Obtain the user specified custom navigation bar arrangement
				var customNavBar = tweakfox.prefs.getCharPref("customNavBar");
				// Customise the Firefox Navigation bar.
				tweakfox.customiseFirefoxNavBar(customNavBar);		
			}			

			// Check if the brower history should be cleaned when closing browser.
			if (cleanHistoryOnExit == true) {
				tweakfox.cleanHistoryOnExit();	
			}
			
			// New versions of Firefox may introduce new UI features.
			// Consequently, the user may want to further customise the
			// settings.  Therefore, disable this script from running 
			// again so as to ensure any new customisations are not 
			// lost or overwritten.
 			tweakfox.prefs.setBoolPref("firstRun", false);
			
		} 
	},
	
	//Method to Set the browser download preferences
	setBrowserDownLoadPreferences : function(downloadFolder) 
	{		
		// Access the browser preferences.
		var browserPrefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
				
		// Configure the download preferences	
		browserPrefs.setCharPref('browser.download.dir', downloadFolder);
		browserPrefs.setCharPref('browser.download.defaultFolder', downloadFolder);
		browserPrefs.setCharPref('browser.download.downloadDir', downloadFolder);			
		browserPrefs.setBoolPref('browser.download.useDownloadDir',true);
		browserPrefs.setCharPref('browser.download.lastDir', downloadFolder);
		// 2=Use the last folder specified for a download; 1=default folder; 0=desktop
		browserPrefs.setIntPref('browser.download.folderList', 2);
		browserPrefs.setBoolPref('browser.download.manager.showWhenStarting',false);
		// 1=Remove entries from download manager when exiting browser;
		// 0=Upon successful download; 2=Manually (default)
		browserPrefs.setIntPref('browser.download.manager.retention', 1);
	},

	
	//Method to customise the browser navigation bar
	customiseFirefoxNavBar : function(navBar) 
	{
		// Customise the Firefox navigation bar according to my preferences
		var firefoxNavBar = document.getElementById("nav-bar");
		// To retrieve the current navigation bar settings:
		//var currentset = firefoxNavBar.currentSet;
		
		// Update the arrangement of the navigation bar to new settings.	
		firefoxNavBar.currentSet = navBar;
		
		// Finally save the new navigation bar arrangement. 
		// (As of Firefox version 12, the navigation bar customisations are
		// stored in the file localstore.rdf located in the Firefox user 
		// profile folder).
		firefoxNavBar.setAttribute("currentset", navBar);
		document.persist("nav-bar","currentset");
	},	


	//Method to customise the browser navigation bar
	cleanHistoryOnExit : function() 
	{
		// Access the browser preferences.
		var browserPrefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
		browserPrefs.setBoolPref('privacy.sanitize.sanitizeOnShutdown',true);
		browserPrefs.setBoolPref('places.history.enabled',false);
	},
}	

// Run the Init Function as soon as the browser loads.
window.addEventListener("load", tweakfox.Init, false);