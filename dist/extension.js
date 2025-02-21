(()=>{"use strict";var e={398:e=>{e.exports=require("vscode")},896:e=>{e.exports=require("fs")},928:e=>{e.exports=require("path")}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,o),s.exports}var r={};(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0}),e.activate=function(e){let o=t.commands.registerCommand("file-list-saver.saveFileList",(async()=>{try{const e=t.workspace.workspaceFolders?.[0];if(!e)return void t.window.showErrorMessage("No workspace folder is open.");const o=t.window.tabGroups.all.flatMap((e=>e.tabs.filter((e=>e.input instanceof t.TabInputText&&"file"===e.input.uri.scheme))));if(0===o.length)return void t.window.showInformationMessage("No files are currently open.");let r=`Total open files: ${o.length}\n\n`;for(const s of o)try{if(s.input instanceof t.TabInputText){const o=await t.workspace.openTextDocument(s.input.uri),i=o.uri.fsPath,a=n.relative(e.uri.fsPath,i),c=o.getText();console.log(`Processing file: ${a}`),r+=`### File: ${a} ###\n`,r+=`${c}\n`,r+=`### End of ${a} ###\n\n`}}catch(e){console.error(`Error processing tab ${s.label}:`,e)}const i=n.join(e.uri.fsPath,"content.txt");s.writeFileSync(i,r),await t.env.clipboard.writeText(r),t.window.showInformationMessage(`Saved ${o.length} files to content.txt and copied to clipboard`)}catch(e){console.error("Error in saveFileList:",e),t.window.showErrorMessage(`Error saving file contents: ${e}`)}}));e.subscriptions.push(o)},e.deactivate=function(){};const t=o(398),n=o(928),s=o(896)})(),module.exports=r})();