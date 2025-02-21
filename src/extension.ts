import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    // Command to copy selected file types
    let copySelected = vscode.commands.registerCommand('massive-copy.copySelected', async () => {
        try {
            const config = vscode.workspace.getConfiguration('massive-copy');
            const allowedExtensions = config.get('allowedExtensions', ['.py', '.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.json']);

            await copyFiles(allowedExtensions);
        } catch (error) {
            console.error('Error in copySelected:', error);
            vscode.window.showErrorMessage(`Error copying files: ${error}`);
        }
    });

    // Command to copy entire repository
    let copyRepo = vscode.commands.registerCommand('massive-copy.copyRepo', async () => {
        try {
            const config = vscode.workspace.getConfiguration('massive-copy');
            const excludeFolders = config.get('excludeFolders', ['node_modules', 'venv', '.git']);

            await copyRepository(excludeFolders);
        } catch (error) {
            console.error('Error in copyRepo:', error);
            vscode.window.showErrorMessage(`Error copying repository: ${error}`);
        }
    });

    context.subscriptions.push(copySelected, copyRepo);
}

async function copyFiles(allowedExtensions: string[]) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder is open.');
        return;
    }

    const allTabs = vscode.window.tabGroups.all.flatMap(group =>
        group.tabs.filter(tab =>
            tab.input instanceof vscode.TabInputText &&
            tab.input.uri.scheme === 'file' &&
            allowedExtensions.includes(path.extname(tab.input.uri.fsPath))
        )
    );

    if (allTabs.length === 0) {
        vscode.window.showInformationMessage('No matching files are currently open.');
        return;
    }

    let fullContent = `Total open files: ${allTabs.length}\n\n`;
    for (const tab of allTabs) {
        if (tab.input instanceof vscode.TabInputText) {
            const document = await vscode.workspace.openTextDocument(tab.input.uri);
            const relativePath = path.relative(workspaceFolder.uri.fsPath, document.uri.fsPath);
            const fileContent = document.getText();

            fullContent += `### File: ${relativePath} ###\n${fileContent}\n### End of ${relativePath} ###\n\n`;
        }
    }

    await vscode.env.clipboard.writeText(fullContent);
    vscode.window.showInformationMessage(`Copied ${allTabs.length} files to clipboard`);
}

async function copyRepository(excludeFolders: string[]) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder is open.');
        return;
    }

    let fullContent = '';
    const files = await getAllFiles(workspaceFolder.uri.fsPath, excludeFolders);

    for (const file of files) {
        const relativePath = path.relative(workspaceFolder.uri.fsPath, file);
        const content = fs.readFileSync(file, 'utf8');
        fullContent += `### File: ${relativePath} ###\n${content}\n### End of ${relativePath} ###\n\n`;
    }

    await vscode.env.clipboard.writeText(fullContent);
    vscode.window.showInformationMessage(`Copied repository contents to clipboard`);
}

async function getAllFiles(dir: string, excludeFolders: string[]): Promise<string[]> {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (!excludeFolders.includes(entry.name)) {
                files.push(...await getAllFiles(fullPath, excludeFolders));
            }
        } else {
            files.push(fullPath);
        }
    }

    return files;
}