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

## Motus (mute sélectif)

```
/paysan-motus              # bascule le silence complet (~/.claude/.paysan-sound-muted)
/paysan-motus user.spam    # coupe/réactive une seule catégorie (~/.claude/.paysan-sound-disabled)
/paysan-motus liste        # affiche l'état du motus général et de chaque catégorie
```

Catégories valides : `session.start`, `task.complete`, `task.error`,
`input.required`, `resource.limit`, `user.spam` — voir le tableau ci-dessus.
Le motus général (sans argument) prime sur tout ; une catégorie coupée
individuellement ne coupe qu'elle-même, notamment `user.spam` qui ne touche
jamais aux autres sons.

Un script POSIX `sh` équivalent (`paysan-son.sh`) existe aussi pour basculer
le motus général sans passer par Claude (0 token), à lancer directement dans
un terminal — utile si `/paysan-motus` est trop coûteux pour un simple toggle.

## Clameur (volume)

```
/paysan-clameur 40
```

Règle la clameur (0-100, défaut 70 si l'argument est omis) dans
`~/.claude/.paysan-sound-volume`. Prise en charge via `afplay -v` (mac) et
`paplay --volume` (linux) ; `aplay` n'a pas d'équivalent simple et ignore ce
réglage.

## Licence des sons

Le pack `peasant_fr` est sous licence CC-BY-NC-4.0 (usage non commercial) —
voir `sounds/peasant_fr/openpeon.json` pour l'attribution complète.
