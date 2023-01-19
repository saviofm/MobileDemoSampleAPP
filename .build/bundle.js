(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/MobileDemoSampleApp/i18n/i18n.properties":
/*!********************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/i18n/i18n.properties ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Rules/AppUpdateFailure.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Rules/AppUpdateFailure.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/MobileDemoSampleApp/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Rules/AppUpdateSuccess.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Rules/AppUpdateSuccess.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MobileDemoSampleApp/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MobileDemoSampleApp/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
  context.count('/MobileDemoSampleApp/Services/SampleServiceV2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/MobileDemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Rules/OnWillUpdate.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Rules/OnWillUpdate.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  return clientAPI.executeAction('/MobileDemoSampleApp/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MobileDemoSampleApp/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Rules/ResetAppSettingsAndLogout.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Rules/ResetAppSettingsAndLogout.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
  let logger = context.getLogger();
  let platform = context.nativescript.platformModule;
  let appSettings = context.nativescript.appSettingsModule;
  var appId;
  if (platform && (platform.isIOS || platform.isAndroid)) {
    appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
  } else {
    appId = 'WindowsClient';
  }
  try {
    // Remove any other app specific settings
    appSettings.getAllKeys().forEach(key => {
      if (key.substring(0, appId.length) === appId) {
        appSettings.remove(key);
      }
    });
  } catch (err) {
    logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
  } finally {
    // Logout 
    return context.getPageProxy().executeAction('/MobileDemoSampleApp/Actions/Logout.action');
  }
}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Styles/Styles.css":
/*!*****************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Styles/Styles.css ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MobileDemoSampleApp/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Styles/Styles.less":
/*!******************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Styles/Styles.less ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MobileDemoSampleApp/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Styles/Styles.nss":
/*!*****************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Styles/Styles.nss ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js ***!
  \*******************************************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!**************************************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \**************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Pages/Customer_List.page":
/*!************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Pages/Customer_List.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","Target":{"Service":"/MobileDemoSampleApp/Services/SampleServiceV2.service","EntitySet":"Customers","QueryOptions":"$orderby=LastName"},"_Name":"SectionContactCell0","Visible":true,"EmptySection":{"FooterVisible":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"ContactCell":{"ContextMenu":{"PerformFirstActionWithFullSwipe":true,"Items":[]},"DetailImage":"","Headline":"{FirstName}","Subheadline":"{LastName}","Description":"{City}","OnPress":"/MobileDemoSampleApp/Actions/NavToCustomers_Detail.action","ActivityItems":[{"_Name":"SectionContactCell0ActivityItems0","ActivityType":"Phone","ActivityValue":"{PhoneNumber}"},{"_Name":"SectionContactCell0ActivityItems1","ActivityType":"Email","ActivityValue":"{EmailAddress}"}]},"Search":{"Enabled":true,"BarcodeScanner":true}}]}],"_Type":"Page","_Name":"Customer_List","Caption":"Customer","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Pages/Customers_Detail.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Pages/Customers_Detail.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"Subhead":"{LastName}","Footnote":"{EmailAddress}","Description":"{CustomerId}","StatusText":"{PhoneNumber}","BodyText":"{DateOfBirth}","HeadlineText":"{FirstName}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"KeyAndValues":[{"Value":"{Street}, {HouseNumber}","_Name":"KeyValue2","KeyName":"Endereço","Visible":true},{"Value":"{City}","_Name":"KeyValue3","KeyName":"Cidade","Visible":true},{"Value":"{PostalCode}","_Name":"KeyValue1","KeyName":"CEP","Visible":true},{"Value":"{Country}","_Name":"KeyValue0","KeyName":"País","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}}]}],"_Type":"Page","_Name":"Customers_Detail","Caption":"Detalhes","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Edit","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/MobileDemoSampleApp/Actions/NavToCustomers_Edit.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Pages/Customers_Edit.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Pages/Customers_Edit.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.FormCellContainer","_Name":"FormCellContainer0","Sections":[{"Controls":[{"Value":"{FirstName}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCFirstName","IsEditable":true,"IsVisible":true,"Caption":"Nome","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"{LastName}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCLastName","IsEditable":true,"IsVisible":true,"Caption":"Sobrenome","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"{PhoneNumber}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCPhone","IsEditable":true,"IsVisible":true,"Caption":"Tel.","PlaceHolder":"PlaceHolder","KeyboardType":"Phone","Enabled":true},{"Value":"{EmailAddress}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCEmail","IsEditable":true,"IsVisible":true,"Caption":"Email","PlaceHolder":"PlaceHolder","KeyboardType":"Email","Enabled":true},{"Value":"{Street}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCStreet","IsEditable":true,"IsVisible":true,"Caption":"Endereço","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"{HouseNumber}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCHouseNumber","IsEditable":true,"IsVisible":true,"Caption":"Número","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"{City}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCCity","IsEditable":true,"IsVisible":true,"Caption":"Cidade","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":"{PostalCode}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCPostalCode","IsEditable":true,"IsVisible":true,"Caption":"CEP","PlaceHolder":"PlaceHolder","Enabled":true},{"Value":["{Country}"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FCCountry","IsEditable":true,"IsVisible":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"País","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Please select one single item","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":[{"DisplayValue":"Brasil","ReturnValue":"BR"},{"DisplayValue":"EUA","ReturnValue":"USA"},{"DisplayValue":"Alemanha","ReturnValue":"GER"}]}],"Visible":true}]}],"_Type":"Page","_Name":"Customers_Edit","Caption":"Alterar Clientes","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/MobileDemoSampleApp/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/MobileDemoSampleApp/Actions/Customers_UpdateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MobileDemoSampleApp/Services/SampleServiceV2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/MobileDemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Pages/Main.page":
/*!***************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Pages/Main.page ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton0","Title":"Clientes","TextAlignment":"Center","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://customer","ImagePosition":"Leading","FullWidth":false,"Visible":true,"OnPress":"/MobileDemoSampleApp/Actions/NavToCustomers_List.action"}]}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/MobileDemoSampleApp/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MobileDemoSampleApp/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/MobileDemoSampleApp/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MobileDemoSampleApp","Version":"/MobileDemoSampleApp/Globals/AppDefinition_Version.global","MainPage":"/MobileDemoSampleApp/Pages/Main.page","OnLaunch":["/MobileDemoSampleApp/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/MobileDemoSampleApp/Rules/OnWillUpdate.js","OnDidUpdate":"/MobileDemoSampleApp/Actions/Service/InitializeOffline.action","Styles":"/MobileDemoSampleApp/Styles/Styles.less","Localization":"/MobileDemoSampleApp/i18n/i18n.properties","_SchemaVersion":"6.3","StyleSheets":{"Styles":{"css":"/MobileDemoSampleApp/Styles/Styles.css","ios":"/MobileDemoSampleApp/Styles/Styles.nss","android":"/MobileDemoSampleApp/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/AppUpdate.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/AppUpdate.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MobileDemoSampleApp/Rules/AppUpdateFailure.js","OnSuccess":"/MobileDemoSampleApp/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/AppUpdateFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/AppUpdateFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/AppUpdateProgressBanner.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/AppUpdateProgressBanner.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MobileDemoSampleApp/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/AppUpdateSuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/AppUpdateSuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/CloseModalPage_Cancel.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/CloseModalPage_Cancel.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Cancel"},"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/CloseModalPage_Complete.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/CloseModalPage_Complete.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Complete"},"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/ClosePage.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/ClosePage.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Customers_UpdateEntity.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Customers_UpdateEntity.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"Customers_UpdateEntity"},"OnFailure":"/MobileDemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action","OnSuccess":"/MobileDemoSampleApp/Actions/CloseModalPage_Complete.action","Target":{"Service":"/MobileDemoSampleApp/Services/SampleServiceV2.service","EntitySet":"Customers","ReadLink":"{@odata.readLink}"},"Properties":{"City":"#Page:Customers_Edit/#Control:FCCity/#Value","Country":"#Page:Customers_Edit/#Control:FCCountry/#SelectedValue","EmailAddress":"#Page:Customers_Edit/#Control:FCEmail/#Value","FirstName":"#Page:Customers_Edit/#Control:FCFirstName/#Value","HouseNumber":"#Page:Customers_Edit/#Control:FCHouseNumber/#Value","LastName":"#Page:Customers_Edit/#Control:FCLastName/#Value","PhoneNumber":"#Page:Customers_Edit/#Control:FCPhone/#Value","PostalCode":"#Page:Customers_Edit/#Control:FCPostalCode/#Value","Street":"#Page:Customers_Edit/#Control:FCStreet/#Value"}}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/MobileDemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MobileDemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MobileDemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Logout.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Logout.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/LogoutMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/LogoutMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MobileDemoSampleApp/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/NavToCustomers_Detail.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/NavToCustomers_Detail.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Detail"},"PageToOpen":"/MobileDemoSampleApp/Pages/Customers_Detail.page"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/NavToCustomers_Edit.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/NavToCustomers_Edit.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Edit"},"PageToOpen":"/MobileDemoSampleApp/Pages/Customers_Edit.page","ModalPage":true}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/NavToCustomers_List.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/NavToCustomers_List.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_List"},"PageToOpen":"/MobileDemoSampleApp/Pages/Customer_List.page"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/OnWillUpdate.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/OnWillUpdate.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Service/CloseOffline.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Service/CloseOffline.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MobileDemoSampleApp/Services/SampleServiceV2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MobileDemoSampleApp/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MobileDemoSampleApp/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Service/CloseOfflineFailureMessage.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Service/CloseOfflineFailureMessage.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Service/CloseOfflineSuccessMessage.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Service/DownloadOffline.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Service/DownloadOffline.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MobileDemoSampleApp/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MobileDemoSampleApp/Actions/Service/SyncFailureMessage.action","OnSuccess":"/MobileDemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Service/DownloadStartedMessage.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Service/DownloadStartedMessage.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MobileDemoSampleApp/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Service/InitializeOffline.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Service/InitializeOffline.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MobileDemoSampleApp/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/MobileDemoSampleApp/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/MobileDemoSampleApp/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Service/InitializeOfflineFailureMessage.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Service/InitializeOfflineSuccessMessage.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Service/SyncFailureMessage.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Service/SyncFailureMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Service/SyncStartedMessage.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Service/SyncStartedMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MobileDemoSampleApp/Actions/Service/UploadOffline.action","OnFailure":"/MobileDemoSampleApp/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Service/SyncSuccessMessage.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Service/SyncSuccessMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/Service/UploadOffline.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/Service/UploadOffline.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MobileDemoSampleApp/Services/SampleServiceV2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MobileDemoSampleApp/Actions/Service/DownloadStartedMessage.action","OnFailure":"/MobileDemoSampleApp/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"UpdateCustomerEntityFailureMessage"},"Message":"Falha ao salvar atualização de clientes - {#ActionResults:update/error}","Title":"Editar cliente","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Globals/AppDefinition_Version.global":
/*!************************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Globals/AppDefinition_Version.global ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Services/SampleServiceV2.service":
/*!********************************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Services/SampleServiceV2.service ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SampleServiceV2","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/Styles/Styles.json":
/*!******************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/Styles/Styles.json ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MobileDemoSampleApp/jsconfig.json":
/*!*************************************************************!*\
  !*** ./build.definitions/MobileDemoSampleApp/jsconfig.json ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let mobiledemosampleapp_actions_appupdate_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/AppUpdate.action */ "./build.definitions/MobileDemoSampleApp/Actions/AppUpdate.action")
let mobiledemosampleapp_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/AppUpdateFailureMessage.action */ "./build.definitions/MobileDemoSampleApp/Actions/AppUpdateFailureMessage.action")
let mobiledemosampleapp_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/AppUpdateProgressBanner.action */ "./build.definitions/MobileDemoSampleApp/Actions/AppUpdateProgressBanner.action")
let mobiledemosampleapp_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/MobileDemoSampleApp/Actions/AppUpdateSuccessMessage.action")
let mobiledemosampleapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MobileDemoSampleApp/Actions/CloseModalPage_Cancel.action")
let mobiledemosampleapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/CloseModalPage_Complete.action */ "./build.definitions/MobileDemoSampleApp/Actions/CloseModalPage_Complete.action")
let mobiledemosampleapp_actions_closepage_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/ClosePage.action */ "./build.definitions/MobileDemoSampleApp/Actions/ClosePage.action")
let mobiledemosampleapp_actions_customers_updateentity_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Customers_UpdateEntity.action */ "./build.definitions/MobileDemoSampleApp/Actions/Customers_UpdateEntity.action")
let mobiledemosampleapp_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/MobileDemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let mobiledemosampleapp_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/MobileDemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let mobiledemosampleapp_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/MobileDemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action")
let mobiledemosampleapp_actions_logout_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Logout.action */ "./build.definitions/MobileDemoSampleApp/Actions/Logout.action")
let mobiledemosampleapp_actions_logoutmessage_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/LogoutMessage.action */ "./build.definitions/MobileDemoSampleApp/Actions/LogoutMessage.action")
let mobiledemosampleapp_actions_navtocustomers_detail_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/NavToCustomers_Detail.action */ "./build.definitions/MobileDemoSampleApp/Actions/NavToCustomers_Detail.action")
let mobiledemosampleapp_actions_navtocustomers_edit_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/NavToCustomers_Edit.action */ "./build.definitions/MobileDemoSampleApp/Actions/NavToCustomers_Edit.action")
let mobiledemosampleapp_actions_navtocustomers_list_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/NavToCustomers_List.action */ "./build.definitions/MobileDemoSampleApp/Actions/NavToCustomers_List.action")
let mobiledemosampleapp_actions_onwillupdate_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/OnWillUpdate.action */ "./build.definitions/MobileDemoSampleApp/Actions/OnWillUpdate.action")
let mobiledemosampleapp_actions_service_closeoffline_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Service/CloseOffline.action */ "./build.definitions/MobileDemoSampleApp/Actions/Service/CloseOffline.action")
let mobiledemosampleapp_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Service/CloseOfflineFailureMessage.action */ "./build.definitions/MobileDemoSampleApp/Actions/Service/CloseOfflineFailureMessage.action")
let mobiledemosampleapp_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/MobileDemoSampleApp/Actions/Service/CloseOfflineSuccessMessage.action")
let mobiledemosampleapp_actions_service_downloadoffline_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Service/DownloadOffline.action */ "./build.definitions/MobileDemoSampleApp/Actions/Service/DownloadOffline.action")
let mobiledemosampleapp_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Service/DownloadStartedMessage.action */ "./build.definitions/MobileDemoSampleApp/Actions/Service/DownloadStartedMessage.action")
let mobiledemosampleapp_actions_service_initializeoffline_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Service/InitializeOffline.action */ "./build.definitions/MobileDemoSampleApp/Actions/Service/InitializeOffline.action")
let mobiledemosampleapp_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/MobileDemoSampleApp/Actions/Service/InitializeOfflineFailureMessage.action")
let mobiledemosampleapp_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Service/InitializeOfflineSuccessMessage.action */ "./build.definitions/MobileDemoSampleApp/Actions/Service/InitializeOfflineSuccessMessage.action")
let mobiledemosampleapp_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Service/SyncFailureMessage.action */ "./build.definitions/MobileDemoSampleApp/Actions/Service/SyncFailureMessage.action")
let mobiledemosampleapp_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Service/SyncStartedMessage.action */ "./build.definitions/MobileDemoSampleApp/Actions/Service/SyncStartedMessage.action")
let mobiledemosampleapp_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Service/SyncSuccessMessage.action */ "./build.definitions/MobileDemoSampleApp/Actions/Service/SyncSuccessMessage.action")
let mobiledemosampleapp_actions_service_uploadoffline_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/Service/UploadOffline.action */ "./build.definitions/MobileDemoSampleApp/Actions/Service/UploadOffline.action")
let mobiledemosampleapp_actions_updatecustomerentityfailuremessage_action = __webpack_require__(/*! ./MobileDemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action */ "./build.definitions/MobileDemoSampleApp/Actions/UpdateCustomerEntityFailureMessage.action")
let mobiledemosampleapp_globals_appdefinition_version_global = __webpack_require__(/*! ./MobileDemoSampleApp/Globals/AppDefinition_Version.global */ "./build.definitions/MobileDemoSampleApp/Globals/AppDefinition_Version.global")
let mobiledemosampleapp_i18n_i18n_properties = __webpack_require__(/*! ./MobileDemoSampleApp/i18n/i18n.properties */ "./build.definitions/MobileDemoSampleApp/i18n/i18n.properties")
let mobiledemosampleapp_jsconfig_json = __webpack_require__(/*! ./MobileDemoSampleApp/jsconfig.json */ "./build.definitions/MobileDemoSampleApp/jsconfig.json")
let mobiledemosampleapp_pages_customer_list_page = __webpack_require__(/*! ./MobileDemoSampleApp/Pages/Customer_List.page */ "./build.definitions/MobileDemoSampleApp/Pages/Customer_List.page")
let mobiledemosampleapp_pages_customers_detail_page = __webpack_require__(/*! ./MobileDemoSampleApp/Pages/Customers_Detail.page */ "./build.definitions/MobileDemoSampleApp/Pages/Customers_Detail.page")
let mobiledemosampleapp_pages_customers_edit_page = __webpack_require__(/*! ./MobileDemoSampleApp/Pages/Customers_Edit.page */ "./build.definitions/MobileDemoSampleApp/Pages/Customers_Edit.page")
let mobiledemosampleapp_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./MobileDemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/MobileDemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page")
let mobiledemosampleapp_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./MobileDemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/MobileDemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page")
let mobiledemosampleapp_pages_main_page = __webpack_require__(/*! ./MobileDemoSampleApp/Pages/Main.page */ "./build.definitions/MobileDemoSampleApp/Pages/Main.page")
let mobiledemosampleapp_rules_appupdatefailure_js = __webpack_require__(/*! ./MobileDemoSampleApp/Rules/AppUpdateFailure.js */ "./build.definitions/MobileDemoSampleApp/Rules/AppUpdateFailure.js")
let mobiledemosampleapp_rules_appupdatesuccess_js = __webpack_require__(/*! ./MobileDemoSampleApp/Rules/AppUpdateSuccess.js */ "./build.definitions/MobileDemoSampleApp/Rules/AppUpdateSuccess.js")
let mobiledemosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MobileDemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/MobileDemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let mobiledemosampleapp_rules_onwillupdate_js = __webpack_require__(/*! ./MobileDemoSampleApp/Rules/OnWillUpdate.js */ "./build.definitions/MobileDemoSampleApp/Rules/OnWillUpdate.js")
let mobiledemosampleapp_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MobileDemoSampleApp/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/MobileDemoSampleApp/Rules/ResetAppSettingsAndLogout.js")
let mobiledemosampleapp_services_sampleservicev2_service = __webpack_require__(/*! ./MobileDemoSampleApp/Services/SampleServiceV2.service */ "./build.definitions/MobileDemoSampleApp/Services/SampleServiceV2.service")
let mobiledemosampleapp_styles_styles_css = __webpack_require__(/*! ./MobileDemoSampleApp/Styles/Styles.css */ "./build.definitions/MobileDemoSampleApp/Styles/Styles.css")
let mobiledemosampleapp_styles_styles_json = __webpack_require__(/*! ./MobileDemoSampleApp/Styles/Styles.json */ "./build.definitions/MobileDemoSampleApp/Styles/Styles.json")
let mobiledemosampleapp_styles_styles_less = __webpack_require__(/*! ./MobileDemoSampleApp/Styles/Styles.less */ "./build.definitions/MobileDemoSampleApp/Styles/Styles.less")
let mobiledemosampleapp_styles_styles_nss = __webpack_require__(/*! ./MobileDemoSampleApp/Styles/Styles.nss */ "./build.definitions/MobileDemoSampleApp/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	mobiledemosampleapp_actions_appupdate_action : mobiledemosampleapp_actions_appupdate_action,
	mobiledemosampleapp_actions_appupdatefailuremessage_action : mobiledemosampleapp_actions_appupdatefailuremessage_action,
	mobiledemosampleapp_actions_appupdateprogressbanner_action : mobiledemosampleapp_actions_appupdateprogressbanner_action,
	mobiledemosampleapp_actions_appupdatesuccessmessage_action : mobiledemosampleapp_actions_appupdatesuccessmessage_action,
	mobiledemosampleapp_actions_closemodalpage_cancel_action : mobiledemosampleapp_actions_closemodalpage_cancel_action,
	mobiledemosampleapp_actions_closemodalpage_complete_action : mobiledemosampleapp_actions_closemodalpage_complete_action,
	mobiledemosampleapp_actions_closepage_action : mobiledemosampleapp_actions_closepage_action,
	mobiledemosampleapp_actions_customers_updateentity_action : mobiledemosampleapp_actions_customers_updateentity_action,
	mobiledemosampleapp_actions_errorarchive_errorarchive_syncfailure_action : mobiledemosampleapp_actions_errorarchive_errorarchive_syncfailure_action,
	mobiledemosampleapp_actions_errorarchive_navtoerrorarchive_detail_action : mobiledemosampleapp_actions_errorarchive_navtoerrorarchive_detail_action,
	mobiledemosampleapp_actions_errorarchive_navtoerrorarchive_list_action : mobiledemosampleapp_actions_errorarchive_navtoerrorarchive_list_action,
	mobiledemosampleapp_actions_logout_action : mobiledemosampleapp_actions_logout_action,
	mobiledemosampleapp_actions_logoutmessage_action : mobiledemosampleapp_actions_logoutmessage_action,
	mobiledemosampleapp_actions_navtocustomers_detail_action : mobiledemosampleapp_actions_navtocustomers_detail_action,
	mobiledemosampleapp_actions_navtocustomers_edit_action : mobiledemosampleapp_actions_navtocustomers_edit_action,
	mobiledemosampleapp_actions_navtocustomers_list_action : mobiledemosampleapp_actions_navtocustomers_list_action,
	mobiledemosampleapp_actions_onwillupdate_action : mobiledemosampleapp_actions_onwillupdate_action,
	mobiledemosampleapp_actions_service_closeoffline_action : mobiledemosampleapp_actions_service_closeoffline_action,
	mobiledemosampleapp_actions_service_closeofflinefailuremessage_action : mobiledemosampleapp_actions_service_closeofflinefailuremessage_action,
	mobiledemosampleapp_actions_service_closeofflinesuccessmessage_action : mobiledemosampleapp_actions_service_closeofflinesuccessmessage_action,
	mobiledemosampleapp_actions_service_downloadoffline_action : mobiledemosampleapp_actions_service_downloadoffline_action,
	mobiledemosampleapp_actions_service_downloadstartedmessage_action : mobiledemosampleapp_actions_service_downloadstartedmessage_action,
	mobiledemosampleapp_actions_service_initializeoffline_action : mobiledemosampleapp_actions_service_initializeoffline_action,
	mobiledemosampleapp_actions_service_initializeofflinefailuremessage_action : mobiledemosampleapp_actions_service_initializeofflinefailuremessage_action,
	mobiledemosampleapp_actions_service_initializeofflinesuccessmessage_action : mobiledemosampleapp_actions_service_initializeofflinesuccessmessage_action,
	mobiledemosampleapp_actions_service_syncfailuremessage_action : mobiledemosampleapp_actions_service_syncfailuremessage_action,
	mobiledemosampleapp_actions_service_syncstartedmessage_action : mobiledemosampleapp_actions_service_syncstartedmessage_action,
	mobiledemosampleapp_actions_service_syncsuccessmessage_action : mobiledemosampleapp_actions_service_syncsuccessmessage_action,
	mobiledemosampleapp_actions_service_uploadoffline_action : mobiledemosampleapp_actions_service_uploadoffline_action,
	mobiledemosampleapp_actions_updatecustomerentityfailuremessage_action : mobiledemosampleapp_actions_updatecustomerentityfailuremessage_action,
	mobiledemosampleapp_globals_appdefinition_version_global : mobiledemosampleapp_globals_appdefinition_version_global,
	mobiledemosampleapp_i18n_i18n_properties : mobiledemosampleapp_i18n_i18n_properties,
	mobiledemosampleapp_jsconfig_json : mobiledemosampleapp_jsconfig_json,
	mobiledemosampleapp_pages_customer_list_page : mobiledemosampleapp_pages_customer_list_page,
	mobiledemosampleapp_pages_customers_detail_page : mobiledemosampleapp_pages_customers_detail_page,
	mobiledemosampleapp_pages_customers_edit_page : mobiledemosampleapp_pages_customers_edit_page,
	mobiledemosampleapp_pages_errorarchive_errorarchive_detail_page : mobiledemosampleapp_pages_errorarchive_errorarchive_detail_page,
	mobiledemosampleapp_pages_errorarchive_errorarchive_list_page : mobiledemosampleapp_pages_errorarchive_errorarchive_list_page,
	mobiledemosampleapp_pages_main_page : mobiledemosampleapp_pages_main_page,
	mobiledemosampleapp_rules_appupdatefailure_js : mobiledemosampleapp_rules_appupdatefailure_js,
	mobiledemosampleapp_rules_appupdatesuccess_js : mobiledemosampleapp_rules_appupdatesuccess_js,
	mobiledemosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js : mobiledemosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js,
	mobiledemosampleapp_rules_onwillupdate_js : mobiledemosampleapp_rules_onwillupdate_js,
	mobiledemosampleapp_rules_resetappsettingsandlogout_js : mobiledemosampleapp_rules_resetappsettingsandlogout_js,
	mobiledemosampleapp_services_sampleservicev2_service : mobiledemosampleapp_services_sampleservicev2_service,
	mobiledemosampleapp_styles_styles_css : mobiledemosampleapp_styles_styles_css,
	mobiledemosampleapp_styles_styles_json : mobiledemosampleapp_styles_styles_json,
	mobiledemosampleapp_styles_styles_less : mobiledemosampleapp_styles_styles_less,
	mobiledemosampleapp_styles_styles_nss : mobiledemosampleapp_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map