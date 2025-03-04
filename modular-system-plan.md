# Modular System Prompt Implementation Plan

## Overview
This document outlines the plan for modularizing the system prompt files into reusable components with selective loading capabilities.

## Directory Structure

```
system/
├── core/
│   ├── essential/
│   │   ├── tool-format.md
│   │   ├── base-rules.md
│   │   └── system-info.md
│   └── optional/
│       ├── extended-rules.md
│       └── extended-capabilities.md
├── tools/
│   ├── file-ops/
│   │   ├── read.md
│   │   ├── write.md
│   │   ├── diff.md
│   │   └── insert.md
│   ├── search-ops/
│   │   ├── search-files.md
│   │   └── search-replace.md
│   └── mcp/
│       ├── tools.md
│       └── resources.md
├── modes/
│   ├── definitions/
│   │   ├── code.md
│   │   ├── architect.md
│   │   └── orchestrator.md
│   └── restrictions/
│       ├── file-patterns.md
│       └── tool-access.md
├── instructions/
│   ├── shared/
│   │   ├── language-prefs.md
│   │   └── common-guidelines.md
│   └── mode-specific/
│       ├── code-instructions.md
│       ├── architect-instructions.md
│       └── orchestrator-instructions.md
└── config/
    ├── module-registry.json
    ├── mode-modules.json
    └── hot-reload.json
```

## Module Types

### 1. Essential Core Modules
- Tool formatting rules
- Basic system rules
- System information
- Base capabilities

### 2. Optional Core Modules
- Extended rules
- Advanced capabilities
- Additional formatting guidelines

### 3. Tool Modules
- File operations tools
- Search operation tools
- MCP tools
- Task management tools

### 4. Mode Modules
- Mode definitions
- Role specifications
- Tool access controls
- File pattern restrictions

### 5. Instruction Modules
- Shared instructions
- Mode-specific instructions
- Custom user instructions

## Configuration System

### Module Registry (module-registry.json)
```json
{
  "modules": {
    "core.tool-format": {
      "path": "core/essential/tool-format.md",
      "required": true,
      "dependencies": []
    },
    "tools.file-ops.read": {
      "path": "tools/file-ops/read.md",
      "required": false,
      "dependencies": ["core.tool-format"]
    }
  }
}
```

### Mode Configuration (mode-modules.json)
```json
{
  "code": {
    "required_modules": [
      "core.tool-format",
      "core.base-rules",
      "tools.file-ops.*"
    ],
    "optional_modules": [
      "tools.mcp.*"
    ],
    "instructions": [
      "shared.language-prefs",
      "mode-specific.code-instructions"
    ]
  }
}
```

## Implementation Steps

1. Core System Setup
   - Create directory structure
   - Set up module registry
   - Implement basic module loading

2. Module Extraction
   - Split existing prompts into modules
   - Categorize and organize content
   - Create module metadata

3. Loading System
   - Implement selective module loading
   - Add dependency resolution
   - Create mode-specific loaders

4. Hot Reload System
   - Add file watchers
   - Implement reload triggers
   - Add reload validation

5. Configuration
   - Create module registry
   - Define mode configurations
   - Set up instruction mappings

6. Testing & Validation
   - Test module loading
   - Validate dependencies
   - Test hot-reload functionality

## Module Interface

```typescript
interface Module {
  id: string;
  path: string;
  content: string;
  required: boolean;
  dependencies: string[];
  metadata?: {
    description?: string;
    category?: string;
    version?: string;
  };
}

interface ModeConfig {
  required_modules: string[];
  optional_modules: string[];
  instructions: string[];
  restrictions?: {
    file_patterns?: string[];
    tool_access?: string[];
  };
}
```

## Hot-Reload Configuration

```json
{
  "watch_paths": [
    "system/core",
    "system/tools",
    "system/modes",
    "system/instructions"
  ],
  "reload_delay": 1000,
  "validate_on_reload": true
}
```

## Success Criteria
1. All existing functionality preserved
2. Selective module loading working
3. Hot-reload system functional
4. Mode-specific configurations effective
5. Clean separation of concerns
6. Improved maintainability