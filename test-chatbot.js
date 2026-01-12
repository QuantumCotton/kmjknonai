/**
 * Atlas Chatbot Live Test Runner
 * Tests 4 different conversation scenarios with the actual chatbot service
 * Run with: node test-chatbot.js
 */

import { startKmjkConversation, sendKmjkMessage } from './src/services/kmjkChatService.js'

// ANSI color codes for pretty output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
}

// Test scenarios
const scenarios = [
  {
    name: 'Frustrated Kitchen Owner',
    persona: 'Sarah - Overwhelmed homeowner with outdated kitchen',
    messages: [
      "I'm so frustrated with my old kitchen, I don't even know where to start",
      "Sarah. The cabinets are falling apart and the countertops are stained",
      "Modern I think, but I'm not sure what that means exactly",
      "White cabinets sound nice. What about the island?",
      "info@sarahjones.com, and text is best. When could Chris come by?"
    ],
  },
  {
    name: 'Excited Bathroom Remodeler',
    persona: 'Mike - Excited about spa bathroom transformation',
    messages: [
      "Hey! I'm Mike and I'm SO excited about redoing my master bathroom into a spa retreat!",
      "I love the idea of a walk-in shower, maybe rainfall head, heated floors",
      "Budget is around $40-50k. I want it done right!",
      "772-555-1234, call me anytime. Port St. Lucie area",
    ],
  },
  {
    name: 'Budget-Conscious Handyman Client',
    persona: 'Linda - Needs multiple small fixes, price sensitive',
    messages: [
      "Hi, I'm Linda. I need some handyman work done but I'm on a tight budget",
      "Leaky faucet, some drywall patches, maybe install a ceiling fan",
      "Jensen Beach, 34957. How much does something like this usually cost?",
      "linda.martinez@email.com, email works. I'm flexible on timing",
    ],
  },
  {
    name: 'Vague Vision Explorer',
    persona: 'Tom - Unclear about what he wants, needs guidance',
    messages: [
      "I want to do something with my kitchen but I dunno",
      "Tom. It just feels... old? Dark? I don't know the right words",
      "Yeah maybe modern. What does that look like?",
      "I like those ideas! Do you have examples I could see?",
      "772-555-9876, text is good. Stuart area. What's the next step?",
    ],
  },
]

// Helper to delay between messages
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Format conversation for display
function formatMessage(role, content, metadata = {}) {
  const roleColor = role === 'user' ? colors.cyan : colors.green
  const roleName = role === 'user' ? 'USER' : 'ATLAS'
  const prefix = `${roleColor}${colors.bright}[${roleName}]${colors.reset}`
  
  console.log(`\n${prefix} ${content}`)
  
  if (metadata.stage) {
    console.log(`${colors.yellow}  Stage: ${metadata.stage} | Turn: ${metadata.stageTurnCount} | Score: ${metadata.qualificationScore}${colors.reset}`)
  }
  if (metadata.emotion) {
    console.log(`${colors.magenta}  Emotion detected: ${metadata.emotion}${colors.reset}`)
  }
}

// Run a single conversation scenario
async function runScenario(scenario) {
  console.log(`\n${colors.bright}${colors.blue}${'═'.repeat(80)}${colors.reset}`)
  console.log(`${colors.bright}${colors.blue}SCENARIO: ${scenario.name}${colors.reset}`)
  console.log(`${colors.yellow}Persona: ${scenario.persona}${colors.reset}`)
  console.log(`${colors.blue}${'═'.repeat(80)}${colors.reset}\n`)

  try {
    // Start conversation
    let conversation = await startKmjkConversation()
    
    // Show initial greeting
    const initialMessage = conversation.messages[0]
    formatMessage('assistant', initialMessage.content)
    
    // Send each user message
    for (let i = 0; i < scenario.messages.length; i++) {
      const userMessage = scenario.messages[i]
      
      await delay(500) // Small delay for readability
      
      // Show user message
      formatMessage('user', userMessage)
      
      // Send to chatbot and get response
      const result = await sendKmjkMessage(conversation, userMessage)
      conversation = result.conversation
      
      // Show assistant response
      const assistantMessage = result.message
      formatMessage('assistant', assistantMessage.content, {
        stage: conversation.stage,
        stageTurnCount: conversation.stageTurnCount,
        qualificationScore: conversation.qualificationScore,
      })
    }
    
    // Final summary
    console.log(`\n${colors.bright}${colors.green}✓ Conversation Complete${colors.reset}`)
    console.log(`${colors.yellow}Final Stats:${colors.reset}`)
    console.log(`  - Stage: ${conversation.stage}`)
    console.log(`  - Total turns: ${conversation.turnCount}`)
    console.log(`  - Qualification score: ${conversation.qualificationScore}/100`)
    console.log(`  - Lead captured: ${conversation.leadNotificationSent ? 'YES' : 'NO'}`)
    console.log(`  - Contact: ${conversation.leadData.email || conversation.leadData.phone || 'N/A'}`)
    console.log(`  - Project: ${conversation.leadData.projectType || 'Unknown'}`)
    
    return {
      success: true,
      scenario: scenario.name,
      score: conversation.qualificationScore,
      stage: conversation.stage,
      leadCaptured: conversation.leadNotificationSent,
    }
  } catch (error) {
    console.error(`\n${colors.red}✗ Error in scenario: ${error.message}${colors.reset}`)
    console.error(error)
    return {
      success: false,
      scenario: scenario.name,
      error: error.message,
    }
  }
}

// Main test runner
async function runAllTests() {
  console.log(`${colors.bright}${colors.magenta}`)
  console.log('╔════════════════════════════════════════════════════════════════════════════╗')
  console.log('║                   ATLAS CHATBOT LIVE TEST SUITE                            ║')
  console.log('║                   Testing with GPT-5-mini                                  ║')
  console.log('╚════════════════════════════════════════════════════════════════════════════╝')
  console.log(colors.reset)
  
  const results = []
  
  for (let i = 0; i < scenarios.length; i++) {
    const result = await runScenario(scenarios[i])
    results.push(result)
    
    if (i < scenarios.length - 1) {
      await delay(1000) // Pause between scenarios
    }
  }
  
  // Final summary
  console.log(`\n\n${colors.bright}${colors.magenta}`)
  console.log('╔════════════════════════════════════════════════════════════════════════════╗')
  console.log('║                          TEST RESULTS SUMMARY                              ║')
  console.log('╚════════════════════════════════════════════════════════════════════════════╝')
  console.log(colors.reset)
  
  const successful = results.filter(r => r.success)
  const avgScore = successful.reduce((sum, r) => sum + (r.score || 0), 0) / successful.length
  const leadsCaptured = results.filter(r => r.leadCaptured).length
  
  console.log(`\n${colors.green}${colors.bright}✓ ${successful.length}/${results.length} scenarios completed successfully${colors.reset}`)
  console.log(`${colors.yellow}  Average qualification score: ${avgScore.toFixed(1)}/100${colors.reset}`)
  console.log(`${colors.cyan}  Leads captured: ${leadsCaptured}/${results.length}${colors.reset}`)
  
  console.log(`\n${colors.bright}Individual Results:${colors.reset}`)
  results.forEach((result, i) => {
    const status = result.success ? `${colors.green}✓` : `${colors.red}✗`
    const scoreText = result.score ? ` (${result.score}/100)` : ''
    const stageText = result.stage ? ` [${result.stage}]` : ''
    console.log(`  ${status} ${scenarios[i].name}${scoreText}${stageText}${colors.reset}`)
  })
  
  console.log(`\n${colors.bright}Key Observations:${colors.reset}`)
  
  // Analyze results
  const dreamingPhase = results.filter(r => r.stage === 'dreaming' || r.stage === 'logistics')
  const wrapUpPhase = results.filter(r => r.stage === 'wrap_up')
  
  if (dreamingPhase.length > 0) {
    console.log(`  • ${dreamingPhase.length} conversations still in exploration phase (good depth!)`)
  }
  if (wrapUpPhase.length > 0) {
    console.log(`  • ${wrapUpPhase.length} conversations reached wrap-up with scheduling CTA`)
  }
  if (avgScore >= 70) {
    console.log(`  ${colors.green}• Strong qualification scores - excellent info gathering!${colors.reset}`)
  }
  if (leadsCaptured === results.length) {
    console.log(`  ${colors.green}• Perfect lead capture rate!${colors.reset}`)
  }
  
  console.log(`\n${colors.cyan}${colors.bright}✨ Testing complete! Model: gpt-5-mini${colors.reset}\n`)
}

// Run tests
runAllTests().catch((error) => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`)
  console.error(error)
  process.exit(1)
})
