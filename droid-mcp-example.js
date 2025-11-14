/**
 * Example: Using droid-mcp to call droidExec
 * 
 * This script demonstrates how to use the droid-mcp MCP server
 * to call the droidExec tool with a prompt asking about the meaning of life.
 * 
 * Based on the droid-mcp documentation, the droidExec tool accepts:
 * - prompt (required): The task or question for Droid to execute
 * - model (optional): AI model to use (defaults to claude-sonnet-4-5-20250929)
 * - cwd (optional): Working directory where Droid will execute
 */

const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

async function callDroidExec() {
  console.log('🤖 Initializing droid-mcp client...\n');

  try {
    // Create a new MCP client
    const client = new Client({
      name: 'droid-mcp-example',
      version: '1.0.0',
    });

    // Connect to the droid-mcp server
    // In a real scenario, you would start the droid-mcp server separately
    // For example: npx @factory-ai/droid-mcp
    const transport = new StdioClientTransport({
      command: 'npx',
      args: ['@factory-ai/droid-mcp'],
    });

    await client.connect(transport);
    console.log('✅ Connected to droid-mcp server\n');

    // Call the droidExec tool with a prompt about the meaning of life
    console.log('📝 Calling droidExec with prompt: "What is the meaning of life?"\n');
    
    const result = await client.callTool({
      name: 'droidExec',
      arguments: {
        prompt: 'What is the meaning of life?',
        // Optional: specify a model
        // model: 'claude-sonnet-4-5-20250929',
        // Optional: specify working directory
        // cwd: '/path/to/project'
      }
    });

    // Display the result
    console.log('🎯 Response from Droid:\n');
    console.log('─'.repeat(80));
    
    if (result.content && result.content.length > 0) {
      result.content.forEach((item) => {
        if (item.type === 'text') {
          console.log(item.text);
        }
      });
    }
    
    console.log('─'.repeat(80));
    console.log('\n✨ droidExec call completed successfully!\n');

    // Check if there was an error
    if (result.isError) {
      console.error('❌ Error occurred during execution');
    }

    // Close the connection
    await client.close();

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nMake sure:');
    console.error('1. You have the @factory-ai/droid-mcp package installed');
    console.error('2. You have set the FACTORY_API_KEY environment variable');
    console.error('3. The droid-mcp server is accessible');
    process.exit(1);
  }
}

// Run the example
if (require.main === module) {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  Droid MCP Example: Calling droidExec                      ║');
  console.log('║  Prompt: "What is the meaning of life?"                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  callDroidExec().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { callDroidExec };
