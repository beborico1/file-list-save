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

## Why Use Massive Copy?

### Streamlined LLM Integration

Massive Copy is specifically designed to enhance your workflow with Large Language Models (LLMs) like ChatGPT, Claude, or GitHub Copilot. It helps you:

- Quickly provide relevant context to LLMs by copying multiple files at once
- Share only the files you're actively working on using the open tabs feature
- Maintain code structure and file relationships when sharing with LLMs
- Efficiently get project-wide suggestions by sharing entire repositories
- Exclude irrelevant files and folders (like node_modules) to focus on what matters

Whether you need help debugging, want architecture suggestions, or are looking for code improvements, Massive Copy makes it easy to give LLMs the context they need to assist you effectively.

## Usage

### Copy Selected File Types

1. Open the files you want to copy
2. Press `Cmd+M` followed by `C` (Mac) or `Ctrl+M` followed by `C` (Windows/Linux)
   - Note: Press these keys in sequence, not simultaneously
3. Contents of all open files with allowed extensions will be copied to your clipboard

### Copy Entire Repository

1. Open your repository in VS Code
2. Press `Cmd+M` followed by `R` (Mac) or `Ctrl+M` followed by `R` (Windows/Linux)
   - Note: Press these keys in sequence, not simultaneously
3. All repository files (excluding specified folders) will be copied to your clipboard

### Common Workflows

1. **Getting Code Reviews**
   - Open the relevant files in tabs
   - Use `Cmd+M, C` to copy them
   - Paste into your preferred LLM for review

2. **Architecture Analysis**
   - Use `Cmd+M, R` to copy your entire codebase
   - Ask the LLM to analyze your project structure

3. **Debugging Sessions**
   - Open the files related to the bug
   - Copy them with `Cmd+M, C`
   - Get debugging suggestions from your LLM

## Extension Settings

This extension contributes the following settings:

- `massive-copy.allowedExtensions`: Array of file extensions to include when copying selected files
  - Default: [".py", ".js", ".ts", ".jsx", ".tsx", ".html", ".css", ".json", ".prisma"]
- `massive-copy.excludeFolders`: Array of folders to exclude when copying repository
  - Default: ["node_modules", "venv", ".git"]

## Requirements

- VS Code 1.80.0 or higher

## Known Issues

None

## Release Notes

### 0.1.3 (2025-02-22)

- Updated Release Notes in readme.md

### 0.1.2 (2025-02-22)

- Fixed GitHub URL in package.json

### 0.1.1 (2025-02-22)

Key improvements:

- New keyboard shortcut system: sequential `Cmd+M, C` and `Cmd+M, R`
- Auto-dismissing notifications
- Enhanced LLM integration documentation
- Improved repository copy with better file filtering
- New extension icon
- Fixed various notification and error handling issues

### 0.1.0 (2025-02-22)

Initial release:

- Copy selected file types functionality
- Copy entire repository functionality
- Configurable settings
- Keyboard shortcuts

## About

This extension is designed to make it easy to copy multiple files or entire repositories to your clipboard, perfect for sharing code snippets, documenting your work, or getting assistance from AI tools.

Follow me on [LinkedIn](https://www.linkedin.com/in/beborico/) for updates and more developer tools!
