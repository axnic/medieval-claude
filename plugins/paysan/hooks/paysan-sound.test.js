#!/usr/bin/env node
// Self-check : node hooks/paysan-sound.test.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const SOUNDS_DIR = path.join(__dirname, '..', 'sounds', 'peasant_fr');
const MANIFEST_PATH = path.join(SOUNDS_DIR, 'openpeon.json');
const WIRED = ['session.start', 'task.complete', 'task.error', 'input.required', 'resource.limit', 'user.spam'];

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

for (const cat of WIRED) {
  const sounds = manifest.categories[cat] && manifest.categories[cat].sounds;
  assert(Array.isArray(sounds) && sounds.length > 0, `catégorie manquante ou vide : ${cat}`);
  for (const s of sounds) {
    assert(fs.existsSync(path.join(SOUNDS_DIR, s.file)), `fichier son manquant : ${s.file}`);
  }
}

console.log('OK — manifest et fichiers sons présents pour :', WIRED.join(', '));
