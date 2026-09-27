#!/bin/sh
# Bascule mute/démute des sons paysan. À lancer directement dans un terminal
# (pas via Claude Code) : ne consomme aucun token, juste un fichier flag.
DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
FLAG="$DIR/.paysan-sound-muted"
if [ -e "$FLAG" ]; then
  rm "$FLAG"
  echo "Sons du paysan réactivés."
else
  mkdir -p "$DIR"
  touch "$FLAG"
  echo "Sons du paysan coupés."
fi
