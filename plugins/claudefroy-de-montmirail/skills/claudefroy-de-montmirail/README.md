<p align="center">
  <img src="assets/godefroy.png" width="220" alt="Godefroy de Montmirail">
</p>

<h1 align="center">Claudefroy de Montmirail</h1>

<p align="center">
  <em>Il ne dit rien du fond. Il dit tout en vieux françois.</em>
</p>

---

Compagnon de [ponytail](https://github.com/DietrichGebert/ponytail) pour
Claude Code, dans la voix de Godefroy de Montmirail, chevalier égaré dans
notre siècle de machines. Ponytail décide QUOI bâtir (l'échelle YAGNI, ce
qu'on laisse de côté, les commentaires `ponytail:`). Claudefroy décide
seulement COMMENT en parler dans le clavardage : vieux françois, images
chevaleresques. Il ne touche jamais au code, aux commentaires, aux noms de
fichiers, aux messages de commit ou d'erreur.

## Installer

```
/plugin marketplace add axnic/medieval-claude
/plugin install claudefroy-de-montmirail@medieval-claude
```

Se lance UNIQUEMENT si ponytail est déjà en armes : le hook `SessionStart`
de claudefroy lit le fichier d'état de ponytail (`.ponytail-active` dans
`$CLAUDE_CONFIG_DIR` ou `~/.claude`) et reste muet, sans écrire son propre
état, si ponytail est absent ou éteint. Même garde sur `/claudefroy` : la
commande refuse de s'activer et le dit en une ligne si ponytail n'est pas
actif.

## Usage

Actif par défaut dès l'installation (écho **chevalier**). Changer d'écho :

```
/claudefroy ecuyer      # un mot ancien de temps à autre
/claudefroy chevalier   # voix pleine et constante (défaut)
/claudefroy croisade    # déclamation totale, sans jamais rallonger la réponse
/claudefroy off
```

Cesser sans passer par la commande : dire "stop claudefroy" ou "mode
normal".

## Structure

Chemins relatifs à la racine du dépôt :

- `skills/claudefroy-de-montmirail/SKILL.md` — la persona, le lexique
  résumé et la frontière explicite face à ponytail
- `skills/claudefroy-de-montmirail/references/lexique.md` — le lexique
  dense (vocabulaire attesté + règles de forge de mots plausibles) qui
  nourrit l'écho, jamais chargé dans le code ou les commits
- `hooks/` — SessionStart (active l'écho, gardé par l'état de ponytail) +
  UserPromptSubmit (suit les changements d'écho et la phrase de
  désactivation)
- `commands/claudefroy.toml` — `/claudefroy [ecuyer|chevalier|croisade|off]`

Non repris (hors périmètre d'un plugin de ton) : toute logique de
fainéantise du code — ça reste l'office de ponytail, pas de claudefroy.
Non repris non plus (hors périmètre d'un plugin Claude Code) : le support
multi-outils (Codex/Copilot/Qoder/opencode/…), la statusline, et la
persistance du défaut entre sessions — à ajouter si le besoin se présente.
