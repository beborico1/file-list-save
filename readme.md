# Massive Copy

A VS Code extension that makes it easy to copy multiple files or entire repositories to your clipboard.

![Massive Copy Icon](images/icon.png)

## Features

- Copy content of specific file types (default: .py, .js, .ts, .jsx)
- Copy entire repository content (excluding specified folders)
- Configurable file extensions and exclusion folders
- Convenient keyboard shortcuts
- Maintains file structure with clear separation between files
- Shows relative paths for each file

## Usage

### Copy Selected File Types

1. Open the files you want to copy
2. Press `Cmd+M C` (Mac) or `Ctrl+M C` (Windows/Linux)
3. Contents of all open files with allowed extensions will be copied to your clipboard

### Copy Entire Repository

1. Open your repository in VS Code
2. Press `Cmd+M R` (Mac) or `Ctrl+M R` (Windows/Linux)
3. All repository files (excluding specified folders) will be copied to your clipboard

## Extension Settings

This extension contributes the following settings:

- `massive-copy.allowedExtensions`: Array of file extensions to include when copying selected files
  - Default: [".py", ".js", ".ts", ".jsx"]
- `massive-copy.excludeFolders`: Array of folders to exclude when copying repository
  - Default: ["node_modules", "venv", ".git"]

## Requirements

- VS Code 1.80.0 or higher

## Known Issues

None

## Release Notes

### 0.1.0

Initial release:

- Copy selected file types functionality
- Copy entire repository functionality
- Configurable settings
- Keyboard shortcuts

## About

This extension is designed to make it easy to copy multiple files or entire repositories to your clipboard, perfect for sharing code snippets or documenting your work.

Follow me on [LinkedIn](https://www.linkedin.com/in/beborico/) for updates and more developer tools!
