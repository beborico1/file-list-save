import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('file-list-saver.saveFileList', async () => {
        try {
            // Get workspace folder
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                vscode.window.showErrorMessage('No workspace folder is open.');
                return;
            }

            // Get all tabs from all tab groups
            const allTabs = vscode.window.tabGroups.all.flatMap(group =>
                group.tabs.filter(tab =>
                    tab.input instanceof vscode.TabInputText &&
                    tab.input.uri.scheme === 'file'
                )
            );

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
                } catch (err) {
                    console.error(`Error processing tab ${tab.label}:`, err);
                }
            }

            // Save to content.txt in workspace root
            const contentPath = path.join(workspaceFolder.uri.fsPath, 'content.txt');
            fs.writeFileSync(contentPath, fullContent);

            // Copy to clipboard
            await vscode.env.clipboard.writeText(fullContent);

            vscode.window.showInformationMessage(
                `Saved ${allTabs.length} files to content.txt and copied to clipboard`
            );
        } catch (error) {
            console.error('Error in saveFileList:', error);
            vscode.window.showErrorMessage(`Error saving file contents: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }
