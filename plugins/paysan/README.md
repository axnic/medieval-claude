<p align="center">
  <img src="assets/peasant.png" width="163" alt="Le paysan humain (Warcraft III)">
</p>

# paysan

Sons du pack **peasant_fr** ([PeonPing/og-packs](https://github.com/PeonPing/og-packs/tree/main/peasant_fr),
CC-BY-NC-4.0, © thomasKn) joués sur les événements Claude Code, via les outils
natifs `afplay` (mac) ou `paplay`/`aplay` (linux). Aucune dépendance ajoutée.

N'a aucun lien avec `claudefroy-de-montmirail` : ce plugin ne touche ni au ton
du clavardage ni au code, il ajoute juste du son.

## Événements → sons

| Hook Claude Code | Catégorie peasant_fr |
|---|---|
| `SessionStart` | `session.start` |
| `Stop` | `task.complete` |
| `PostToolUseFailure` (Bash) | `task.error` |
| `Notification` | `input.required` |
| `PreCompact` | `resource.limit` |
| `UserPromptSubmit` (3+ prompts en 10s) | `user.spam` |

`task.acknowledge` (un son à chaque prompt) n'est pas câblé — trop bruyant.

## Mute / démute

```
/mute
```

Bascule un simple fichier flag (`~/.claude/.paysan-sound-muted`).

Un script POSIX `sh` équivalent (`paysan-son.sh`) existe aussi pour basculer
le même flag sans passer par Claude (0 token), à lancer directement dans un
terminal — utile si `/mute` est trop coûteux pour un simple toggle.

## Volume

```
/volume 40
```

Règle le volume (0-100, défaut 70 si l'argument est omis) dans
`~/.claude/.paysan-sound-volume`. Pris en charge via `afplay -v` (mac) et
`paplay --volume` (linux) ; `aplay` n'a pas d'équivalent simple et ignore ce
réglage.

## Licence des sons

Le pack `peasant_fr` est sous licence CC-BY-NC-4.0 (usage non commercial) —
voir `sounds/peasant_fr/openpeon.json` pour l'attribution complète.
