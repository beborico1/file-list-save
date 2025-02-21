/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");

/***/ })
/******/ 	]);
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
/******/ 			// no module.id needed
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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
// src/extension.ts
const vscode = __webpack_require__(1);
const path = __webpack_require__(2);
const fs = __webpack_require__(3);
function activate(context) {
    let disposable = vscode.commands.registerCommand('file-list-saver.saveFileList', async () => {
        try {
            // Get workspace folder
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                vscode.window.showErrorMessage('No workspace folder is open.');
                return;
            }
            // Get all tabs from all tab groups
            const allTabs = vscode.window.tabGroups.all.flatMap(group => group.tabs.filter(tab => tab.input instanceof vscode.TabInputText &&
                tab.input.uri.scheme === 'file'));
            if (allTabs.length === 0) {
                vscode.window.showInformationMessage('No files are currently open.');
                return;
            }
            // Create content with relative paths and file contents
            let fullContent = `Total open files: ${allTabs.length}\n\n`;
            for (const tab of allTabs) {
                try {
                    if (tab.input instanceof vscode.TabInputText) {
                        const document = await vscode.workspace.openTextDocument(tab.input.uri);
                        const filePath = document.uri.fsPath;
                        const relativePath = path.relative(workspaceFolder.uri.fsPath, filePath);
                        const fileContent = document.getText();
                        console.log(`Processing file: ${relativePath}`); // Debug log
                        fullContent += `### File: ${relativePath} ###\n`;
                        fullContent += `${fileContent}\n`;
                        fullContent += `### End of ${relativePath} ###\n\n`;
                    }
                }
                catch (err) {
                    console.error(`Error processing tab ${tab.label}:`, err);
                }
            }
            // Save to content.txt in workspace root
            const contentPath = path.join(workspaceFolder.uri.fsPath, 'content.txt');
            fs.writeFileSync(contentPath, fullContent);
            // Copy to clipboard
            await vscode.env.clipboard.writeText(fullContent);
            vscode.window.showInformationMessage(`Saved ${allTabs.length} files to content.txt and copied to clipboard`);
        }
        catch (error) {
            console.error('Error in saveFileList:', error);
            vscode.window.showErrorMessage(`Error saving file contents: ${error}`);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }

})();

module.exports = __webpack_exports__;
/******/ })()
;