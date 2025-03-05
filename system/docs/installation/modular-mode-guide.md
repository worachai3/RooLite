# Guide to Applying Modular Strategy for System Prompt Modes

This document provides a comprehensive guide on creating and integrating new system prompt modes using a modular approach.

## Mode Structure Overview

A modular system prompt mode consists of several components organized in specific directories:

## Content Reference Guidelines

### Key Rules
1. No placeholders allowed in any content
2. All content must reference existing files when available
3. Use absolute paths from project root for all file references

### File Reference Format
- Use absolute paths starting from project root:
  ```
  /system/instructions/shared/language-prefs.md
  /system/core/essential/base-rules.md
  ```
- Never use relative paths or placeholders
- Avoid using full content
- Always use reference path if possible to import content instead of full content
- Reference source files directly to maintain consistency
- Keep content DRY (Don't Repeat Yourself) by referencing existing definitions

```
system/
├── config/
│   ├── mode-modules.json    # Mode module configurations
│   └── module-registry.json # Available modules registry
├── core/
│   ├── essential/          # Core functionality required by all modes
│   └── optional/           # Optional enhancements
└── instructions/
    ├── mode-specific/      # Mode-specific instructions
    └── shared/            # Shared instructions across modes
```

## Step-by-Step Integration Guide

### 1. Create Mode-Specific Instructions

1. Create a new file in `system/instructions/mode-specific/[your-mode]-instructions.md`
2. Structure the file with these sections:
   ```markdown
   # Mode Name and Structure
   
   Follow the structure from existing mode files like /system/instructions/mode-specific/debug-instructions.md:

   ## Required Sections
   1. Role Definition
   2. Capabilities
   3. Response Guidelines
   4. Restrictions

   Each section should contain concrete, specific content relevant to the mode's purpose.
   Reference existing content and patterns from other mode files for consistency.
   ```

### 2. Update Module Configuration

1. Edit `system/config/mode-modules.json` to add your mode:
   ```json
   {
     "modes": {
       "your-mode": {
         "required_modules": [
           "core.tool-format",
           "core.base-rules",
           "core.system-info",
           "tools.file-ops.*",
           "tools.search-ops.*"
         ],
         "optional_modules": [
           "tools.mcp.*",
           "core.optional.extended-capabilities"
         ],
         "instructions": [
           "shared.language-prefs",
           "mode-specific.your-mode-instructions"
         ],
         "restrictions": {
           "file_patterns": [".*"],
           "tool_access": ["read", "edit", "command", "search"]
         }
       }
     }
   }
   ```

### 3. Module Selection

Select appropriate modules based on your mode's needs:

1. **Core Essential Modules** (Required)
   - base-rules.md: Working directory rules, tool usage guidelines
   - system-info.md: Environment details, system configurations
   - tool-format.md: Tool usage syntax and formatting

2. **Optional Modules**
   - extended-capabilities.md: Additional tools and features
   - Custom modules as needed

### 4. Update System Prompt File

Update the system-prompt-<mode> file to align with modular system:
1. Structure the content according to modular system standards
2. Define capabilities and rules sections
3. Add tool usage guidelines
4. Include modular system integration notes

### 5. Define Access Controls

Configure restrictions in mode-modules.json:

1. **File Patterns**
   - Specify allowed file types using regex
   - Example: `["\\.(js|ts)$"]` for JavaScript/TypeScript files

2. **Tool Access**
   - read: File reading operations
   - edit: File modification operations
   - command: System command execution
   - search: File search operations
   - mcp: MCP server operations

## Example Implementation

Here's a complete example for a debug mode:

1. **Mode-Specific Instructions** (`debug-instructions.md`):
    ```markdown
    # Reference to actual debug mode content
    [Content imported from /system/instructions/mode-specific/debug-instructions.md]
    ```

    The actual content is maintained in the referenced file to ensure consistency and avoid duplication. Key sections include:
    - Role Definition: Expert software debugger for systematic problem diagnosis
    - Capabilities: Including log analysis, error tracing, and performance analysis
    - Response Guidelines: Structured approach to problem-solving
    - Restrictions: Safety measures and documentation requirements

2. **Module Configuration** (`mode-modules.json`):
   ```json
   {
     "modes": {
       "debug": {
         "required_modules": [
           "core.tool-format",
           "core.base-rules",
           "core.system-info",
           "tools.file-ops.*",
           "tools.search-ops.*"
         ],
         "optional_modules": [
           "tools.mcp.*",
           "core.optional.extended-capabilities"
         ],
         "instructions": [
           "shared.language-prefs",
           "mode-specific.debug-instructions"
         ],
         "restrictions": {
           "file_patterns": [".*"],
           "tool_access": ["read", "edit", "command", "search"]
         }
       }
     }
   }
   ```

## Validation Steps

1. **File Structure**
   - Verify mode-specific instructions file exists
   - Check module configuration updates
   - Validate file paths and references

2. **Configuration**
   - Test mode switching
   - Verify tool access
   - Check file restrictions

3. **Documentation**
   - Review instructions clarity
   - Validate examples
   - Check formatting

## Best Practices

1. **Module Organization**
   - Keep related functionality together
   - Use clear directory structure
   - Maintain separation of concerns

2. **Configuration**
   - Use descriptive names
   - Document restrictions clearly
   - Follow consistent formats

3. **Documentation**
   - Provide clear examples
   - Include use cases
   - Document limitations

4. **Security**
   - Review access controls
   - Validate file restrictions
   - Monitor tool usage

## Maintenance

1. **Regular Updates**
   - Review and update documentation
   - Verify module compatibility
   - Test functionality

2. **Version Control**
   - Track changes
   - Document updates
   - Maintain history
