# Creating a Handoff with Conversation Extraction

Use this prompt when you need to create a handoff document that incorporates insights from an exported conversation.

## Complete Workflow Prompt

```
I need to create a handoff document with conversation extraction. I've exported the conversation as conversation.md.

Please:
1. Determine the next sequential handoff number
2. Process the conversation export using the extraction scripts:
   - First try: python handoffs/chat_history/extract_conversation.py conversation.md handoffs/<handoff-#>-chat_transcript.md
   - If that fails, try: node handoffs/chat_history/extract_conversation.js conversation.md handoffs/<handoff-#>-chat_transcript.md
3. Read and analyze the extracted content
4. Compare the extraction insights with your own conversation introspection
5. Create a comprehensive handoff document that incorporates both perspectives
```

## With Topic Focus

```
I need to create a handoff document focused on [TOPIC] with conversation extraction. I've exported the conversation as conversation.md.

Please follow the conversation extraction workflow and emphasize:
- [KEY ASPECT 1]
- [KEY ASPECT 2]
- [KEY ASPECT 3]
```

## Custom Export Location

```
I need to create a handoff document with conversation extraction. I've exported the conversation to [CUSTOM_PATH].

Please process this export and follow the handoff creation workflow.
```

## For Larger Conversations

For particularly large conversation exports:

```
I need to create a handoff document based on a large conversation export at conversation.md. Please:

1. Process the export with the extraction script
2. Focus on identifying the most important:
   - Technical decisions and their rationale
   - Problems encountered and solutions implemented
   - Discoveries and unexpected findings
   - Current work progress percentage estimates
```

## Best Practices

When creating handoffs with conversation extraction:

1. **Focus on Unique Insights**: Prioritize information that wouldn't be obvious from code or documentation alone
2. **Cross-Reference**: Combine insights from both extraction and introspection
3. **Pattern Recognition**: Identify recurring themes or issues across the conversation
4. **Quote Selectively**: Use direct quotes from the conversation only when particularly insightful
5. **Maintain Structure**: Ensure all standard handoff sections are properly completed

## Extraction Error Handling

If both extraction scripts fail:

```
I need to create a handoff document. I tried to export our conversation but the extraction failed.

Please:
1. Create a handoff based on your introspection of our conversation
2. Note in the handoff that conversation extraction was attempted but failed
3. Focus particularly on capturing the key technical decisions and progress