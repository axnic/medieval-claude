#!/usr/bin/env node
// paysan — joue un son du pack peasant_fr (PeonPing/og-packs) pour un
// événement de hook Claude Code. La catégorie arrive en argv[2] (fixée par
// hooks.json) ; user.spam est la seule qui a besoin du JSON stdin, pour lire
// session_id et compter les prompts rapprochés.

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync, spawn } = require('child_process');

const SOUNDS_DIR = path.join(__dirname, '..', 'sounds', 'peasant_fr');
const MANIFEST_PATH = path.join(SOUNDS_DIR, 'openpeon.json');

const SPAM_THRESHOLD = 3;
const SPAM_WINDOW_MS = 10000;

function getConfigDir() {
  return process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
}

function isMuted() {
  return fs.existsSync(path.join(getConfigDir(), '.paysan-sound-muted'));
}

function getDisabledCategories() {
  try {
    return fs.readFileSync(path.join(getConfigDir(), '.paysan-sound-disabled'), 'utf8')
      .split('\n').map((s) => s.trim()).filter(Boolean);
  } catch (e) { return []; }
}

function getVolume() {
  try {
    const n = parseInt(fs.readFileSync(path.join(getConfigDir(), '.paysan-sound-volume'), 'utf8'), 10);
    if (Number.isFinite(n)) return Math.max(0, Math.min(100, n));
  } catch (e) {}
  return 100;
}

function readStdin(callback) {
  let input = '';
  process.stdin.on('data', (chunk) => { input += chunk; });
  process.stdin.on('end', () => callback(input));
  process.stdin.on('error', () => callback(input));
  setTimeout(() => callback(input), 1000).unref();
}

// ponytail: une entrée par session_id, jamais purgée entre sessions — fichier
// d'état minuscule et sans TTL ; si ça grossit un jour, ajouter un sweep.
function isSpam(sessionId) {
  const statePath = path.join(getConfigDir(), '.paysan-sound-state.json');
  let state = {};
  try { state = JSON.parse(fs.readFileSync(statePath, 'utf8')); } catch (e) {}
  const now = Date.now();
  const timestamps = (state[sessionId] || []).filter((t) => now - t < SPAM_WINDOW_MS);
  timestamps.push(now);
  state[sessionId] = timestamps;
  try { fs.writeFileSync(statePath, JSON.stringify(state)); } catch (e) {}
  return timestamps.length >= SPAM_THRESHOLD;
}

function hasCommand(cmd) {
  try { execFileSync('which', [cmd], { stdio: 'ignore' }); return true; }
  catch (e) { return false; }
}

function play(category) {
  let sounds;
  try {
    sounds = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')).categories[category].sounds;
  } catch (e) { return; }
  if (!sounds || !sounds.length) return;

  const file = path.join(SOUNDS_DIR, sounds[Math.floor(Math.random() * sounds.length)].file);

  const volume = getVolume();

  let player, args;
  if (process.platform === 'darwin') {
    player = 'afplay'; args = ['-v', String(volume / 100), file];
  } else if (hasCommand('paplay')) {
    player = 'paplay'; args = [`--volume=${Math.round(volume / 100 * 65536)}`, file];
  } else if (hasCommand('aplay')) {
    // ponytail: aplay n'a pas de réglage de volume simple en ligne de commande, ignoré.
    player = 'aplay'; args = ['-q', file];
  } else {
    return;
  }

  try {
    spawn(player, args, { detached: true, stdio: 'ignore' }).unref();
  } catch (e) {
    // best-effort — un backend audio absent ou cassé ne doit jamais faire échouer le hook
  }
}

function main() {
  if (isMuted()) process.exit(0);

  const category = process.argv[2];
  if (!category) process.exit(0);
  if (getDisabledCategories().includes(category)) process.exit(0);

  if (category === 'user.spam') {
    readStdin((input) => {
      let sessionId = 'default';
      try { sessionId = JSON.parse(input).session_id || sessionId; } catch (e) {}
      if (isSpam(sessionId)) play('user.spam');
      process.exit(0);
    });
  } else {
    play(category);
  }
}

if (require.main === module) main();

module.exports = { isMuted, getVolume, getDisabledCategories, isSpam };
