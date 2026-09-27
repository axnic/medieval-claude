#!/usr/bin/env node
// claudefroy-de-montmirail — configuration, state, and instruction sharing
// for the SessionStart / UserPromptSubmit hooks. Claude Code only.

const fs = require('fs');
const path = require('path');
const os = require('os');

const DEFAULT_MODE = 'chevalier';
const RUNTIME_MODES = ['off', 'ecuyer', 'chevalier', 'croisade'];
const STATE_FILE = '.claudefroy-active';
// ponytail writes its own flag file (see ponytail-runtime.js) with the active
// mode name, or removes it entirely when off. Reading it is how claudefroy
// checks "is ponytail actually active right now" without depending on
// ponytail's code — just its documented on-disk contract.
const PONYTAIL_STATE_FILE = '.ponytail-active';
const SKILL_PATH = path.join(__dirname, '..', 'skills', 'claudefroy-de-montmirail', 'SKILL.md');

function normalizeMode(mode) {
  if (typeof mode !== 'string') return null;
  const normalized = mode.trim().toLowerCase();
  return RUNTIME_MODES.includes(normalized) ? normalized : null;
}

// "stop claudefroy" / "mode normal" must be the whole message — matching the
// phrase anywhere would turn the écu off mid-task on an ordinary sentence
// that happens to contain those words.
function isDeactivationCommand(text) {
  const t = String(text || '').trim().toLowerCase().replace(/[.!?\s]+$/, '');
  return t === 'stop claudefroy' || t === 'mode normal' || t === 'normal mode';
}

function getClaudeDir() {
  return process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
}

function getDefaultMode() {
  return DEFAULT_MODE;
}

function getStatePath() {
  return path.join(getClaudeDir(), STATE_FILE);
}

function setMode(mode) {
  const statePath = getStatePath();
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, mode);
}

function clearMode() {
  try { fs.unlinkSync(getStatePath()); } catch (e) {}
}

// Claudefroy has no reason to exist without ponytail — it only dresses up
// ponytail's replies. Absent or empty flag file = ponytail off = stay silent.
function isPonytailActive() {
  try {
    const raw = fs.readFileSync(path.join(getClaudeDir(), PONYTAIL_STATE_FILE), 'utf8').trim();
    return raw.length > 0;
  } catch (e) {
    return false;
  }
}

// Only the écho table rows and worked examples in SKILL.md are mode-specific;
// every other line is persona/rules and must survive verbatim in every mode.
function filterSkillBodyForMode(body, mode) {
  const effectiveMode = normalizeMode(mode) || DEFAULT_MODE;
  const withoutFrontmatter = String(body || '').replace(/^---[\s\S]*?---\s*/, '');

  return withoutFrontmatter
    .split(/\r?\n/)
    .filter((line) => {
      const tableLabel = line.match(/^\|\s*\*\*(.+?)\*\*\s*\|/);
      if (tableLabel) {
        const labelMode = normalizeMode(tableLabel[1].trim());
        if (labelMode) return labelMode === effectiveMode;
      }
      const exampleLabel = line.match(/^-\s*([^:]+):\s*"/);
      if (exampleLabel) {
        const labelMode = normalizeMode(exampleLabel[1].trim());
        if (labelMode) return labelMode === effectiveMode;
      }
      return true;
    })
    .join('\n');
}

function getClaudefroyInstructions(mode) {
  const effectiveMode = normalizeMode(mode) || DEFAULT_MODE;
  return 'CLAUDEFROY EN VOIX — écho : ' + effectiveMode + '\n\n' +
    filterSkillBodyForMode(fs.readFileSync(SKILL_PATH, 'utf8'), effectiveMode);
}

// SessionStart and UserPromptSubmit both accept raw stdout as additional
// context on native Claude Code — no hookSpecificOutput wrapping needed.
function writeHookOutput(context) {
  process.stdout.write(context || '');
}

module.exports = {
  normalizeMode,
  isDeactivationCommand,
  getDefaultMode,
  setMode,
  clearMode,
  isPonytailActive,
  getClaudefroyInstructions,
  writeHookOutput,
};
