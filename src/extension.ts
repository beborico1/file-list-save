import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    // Command to copy selected file types
    let copySelected = vscode.commands.registerCommand('massive-copy.copySelected', async () => {
        try {
            const config = vscode.workspace.getConfiguration('massive-copy');
            const allowedExtensions = config.get('allowedExtensions', ['.py', '.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.json', '.prisma']);

            await copyFiles(allowedExtensions);
        } catch (error) {
            console.error('Error in copySelected:', error);
            showTemporaryError(`Error copying files: ${error}`);
        }
    });

    // Command to copy entire repository
    let copyRepo = vscode.commands.registerCommand('massive-copy.copyRepo', async () => {
        try {
            const config = vscode.workspace.getConfiguration('massive-copy');
            const excludeFolders = config.get('excludeFolders', ['node_modules', 'venv', '.git']);
            const allowedExtensions = config.get('allowedExtensions', ['.py', '.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.json', '.prisma']);

            await copyRepository(excludeFolders, allowedExtensions);
        } catch (error) {
            console.error('Error in copyRepo:', error);
            showTemporaryError(`Error copying repository: ${error}`);
        }
    });

    context.subscriptions.push(copySelected, copyRepo);
}

// Helper function to show temporary notifications
function showTemporaryMessage(message: string, isError: boolean = false, duration: number = 3000) {
    const notification = isError
        ? vscode.window.showErrorMessage(message)
        : vscode.window.showInformationMessage(message);

    setTimeout(() => {
        notification.then(item => {
            if (item) {
                // @ts-ignore - Close method exists but isn't in typings
                item.close?.();
            }
        });
    }, duration);
}

function showTemporaryError(message: string) {
    showTemporaryMessage(message, true);
}

async function copyFiles(allowedExtensions: string[]) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        showTemporaryError('No workspace folder is open.');
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
        showTemporaryMessage('No matching files are currently open.');
        return;
    }

    let fullContent = '';
    for (const tab of allTabs) {
        if (tab.input instanceof vscode.TabInputText) {
            const document = await vscode.workspace.openTextDocument(tab.input.uri);
            const relativePath = path.relative(workspaceFolder.uri.fsPath, document.uri.fsPath);
            const fileContent = document.getText();

            fullContent += `### File: ${relativePath} ###\n${fileContent}\n### End of ${relativePath} ###\n\n`;
        }
    }

    await vscode.env.clipboard.writeText(fullContent);
    showTemporaryMessage(`Copied ${allTabs.length} files to clipboard`);
}

async function copyRepository(excludeFolders: string[], allowedExtensions: string[]) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        showTemporaryError('No workspace folder is open.');
        return;
    }

    let fullContent = '';
    const files = await getAllFiles(workspaceFolder.uri.fsPath, excludeFolders, allowedExtensions);

    if (files.length === 0) {
        showTemporaryMessage('No matching files found in repository.');
        return;
    }

    for (const file of files) {
        const relativePath = path.relative(workspaceFolder.uri.fsPath, file);
        const content = fs.readFileSync(file, 'utf8');
        fullContent += `### File: ${relativePath} ###\n${content}\n### End of ${relativePath} ###\n\n`;
    }

    await vscode.env.clipboard.writeText(fullContent);
    showTemporaryMessage(`Copied ${files.length} repository files to clipboard`);
}

async function getAllFiles(dir: string, excludeFolders: string[], allowedExtensions: string[]): Promise<string[]> {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (!excludeFolders.includes(entry.name)) {
                files.push(...await getAllFiles(fullPath, excludeFolders, allowedExtensions));
            }
        } else {
            // Only include files with allowed extensions
            if (allowedExtensions.includes(path.extname(fullPath))) {
                files.push(fullPath);
            }
        }
    }

    return files;
}