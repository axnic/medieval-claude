#!/usr/bin/env node
// claudefroy-de-montmirail — SessionStart hook: raises the écho and briefs
// Claude. Only ever activates when ponytail itself is active — claudefroy
// has no reason to speak if there's no ponytail reply to dress up.

const {
  getDefaultMode,
  setMode,
  clearMode,
  isPonytailActive,
  getClaudefroyInstructions,
  writeHookOutput,
} = require('./claudefroy-lib');

if (!isPonytailActive()) {
  clearMode();
  process.exit(0);
}

const mode = getDefaultMode();

if (mode === 'off') {
  clearMode();
  process.exit(0);
}

try { setMode(mode); } catch (e) {
  // best-effort — the state file is not required for this session's briefing
}

try {
  writeHookOutput(getClaudefroyInstructions(mode));
} catch (e) {
  // stdout closed at hook exit must not surface as a hook failure
}
