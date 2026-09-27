#!/usr/bin/env node
// claudefroy-de-montmirail — UserPromptSubmit hook: reads /claudefroy commands
// and the "stop claudefroy" / "mode normal" phrase, and updates the écu.

const {
  normalizeMode,
  isDeactivationCommand,
  isPonytailActive,
  setMode,
  clearMode,
  writeHookOutput,
} = require('./claudefroy-lib');

let input = '';
let done = false;

function finish() {
  if (done) return;
  done = true;
  try {
    const data = JSON.parse(input.replace(/^﻿/, ''));
    const prompt = (data.prompt || '').trim().toLowerCase();

    if (/^[/@$]claudefroy\b/.test(prompt)) {
      const arg = prompt.split(/\s+/)[1] || '';
      const mode = normalizeMode(arg);
      if (!isPonytailActive()) {
        clearMode();
        writeHookOutput('CLAUDEFROY SE TAIT — ponytail doit être en armes pour que ce chevalier parle. `/ponytail full` d\'abord.');
        return;
      }
      if (mode === 'off') {
        clearMode();
        writeHookOutput('VOIX ÉTEINTE — Claudefroy se tait, retour au parler présent.');
      } else if (mode) {
        setMode(mode);
        writeHookOutput('ÉCHO CHANGÉ — Claudefroy parle désormais en mode : ' + mode + '.');
      } else {
        writeHookOutput('CLAUDEFROY EST EN VOIX.');
      }
      return;
    }

    if (isDeactivationCommand(prompt)) {
      clearMode();
      writeHookOutput('VOIX ÉTEINTE — Claudefroy se tait, retour au parler présent.');
    }
  } catch (e) {
    // silence, comme il sied à un chevalier discret
  }
}

process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', finish);

// Never hang the session — mirrors the never-block contract of other hooks.
process.stdin.on('error', () => { finish(); process.exit(0); });
setTimeout(() => { finish(); process.exit(0); }, 1000).unref();
