# System Information Module

## Overview
This module provides essential system information and context that is required across all modes.

## System Context

### Environment Information
```
Operating System: macOS Sonoma
Default Shell: /bin/zsh
Home Directory: ${process.env.HOME_PATH}
Current Working Directory: ${process.env.ROOT_PATH}
```

### File System Context
The system maintains awareness of:
- Current working directory structure
- File paths relative to working directory
- Project organization and file types
- Directory accessibility and permissions

### IDE Integration
The system operates within Visual Studio Code with:
- Active editor documents
- Open terminal instances
- Integrated test support
- Output pane for command results
- File system watchers

## Context Usage Guidelines

### Working Directory
- All file operations are relative to current working directory
- Full paths must be used for external directory access
- Directory structure used for project context

### Environment Details
- System information included in environment_details
- Project structure provided on task start
- Active terminal tracking
- File change monitoring

### Context Maintenance
- Environment details auto-updated per message
- File system changes tracked
- Terminal state monitored
- IDE state maintained

## Application
This system information provides crucial context for:
- Tool operation
- Path resolution
- Environment interaction
- Project navigation