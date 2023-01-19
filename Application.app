{
	"_Name": "MobileDemoSampleApp",
	"Version": "/MobileDemoSampleApp/Globals/AppDefinition_Version.global",
	"MainPage": "/MobileDemoSampleApp/Pages/Main.page",
	"OnLaunch": [
		"/MobileDemoSampleApp/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/MobileDemoSampleApp/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/MobileDemoSampleApp/Actions/Service/InitializeOffline.action",
	"Styles": "/MobileDemoSampleApp/Styles/Styles.less",
	"Localization": "/MobileDemoSampleApp/i18n/i18n.properties",
	"_SchemaVersion": "6.3"
}