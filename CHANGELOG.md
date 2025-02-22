# Change Log

All notable changes to the "Massive Copy" extension will be documented in this file.

## [0.1.3] - 2025-02-22

### Updated

- Updated Release Notes in readme.md

## [0.1.2] - 2025-02-22

### Minor Fix

- GitHub URL in package.json

## [0.1.1] - 2025-02-22

### Added

- New keyboard shortcut system: `Cmd+M, C` for copying open files and `Cmd+M, R` for repository copy
- Auto-dismissing notifications for better UX
- Configurable settings for file extensions and excluded folders
- Enhanced README with LLM integration use cases
- New extension icon

### Changed

- Simplified file extension defaults to just `.py`, `.js`, `.ts`, `.jsx`
- Improved repository copy function to respect both excluded folders and allowed extensions
- Removed "Total files open" header from copied content
- Updated all notification messages to be more concise
- Clarified keyboard shortcut instructions in documentation

### Fixed

- Repository copy now properly filters files by extension
- Notification toasts now automatically dismiss after 3 seconds
- Improved error handling throughout the extension

### Removed

- Removed unnecessary context.txt file
- Removed redundant file extensions from defaults

## [0.1.0] - Initial Release

- Initial release of Massive Copy
- Basic file copying functionality
- Repository copying feature
- Configurable extension settings
