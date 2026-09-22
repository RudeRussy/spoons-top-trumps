# Swear Pack Revert Instructions

If you want to revert the swear pack wiring:

## Quick revert (main branch)
```bash
git checkout -f main
git revert HEAD  # undo the swear-wiring commit
# or hard reset to checkpoint:
git reset --hard pre-swear-main
git push origin main --force-with-lease
```

## Quick revert (test branch)
```bash
git checkout -f addictive-v1
git reset --hard pre-swear-test
git push test addictive-v1:main --force-with-lease
```

## Checkpoint tags (pushed to origin)
- `pre-swear-main` = 40f3c27 = toast-fade-74-r79 (main, before swear wiring)
- `pre-swear-test` = 76f5ebf = whacka-drunk-r82 (addictive-v1, before swear wiring)

## What the swear wiring commit will contain
- index.html: SHOUT_FILES array gains 237 entries pointing to sfx/swear/rage-*.mp3
- No file deletions, no code changes — purely additive to the sound pool
- Reverting = removing those 237 lines from the array (or resetting to the tags above)

## The swear pack itself
- Lives on branch: swear-pack-v1 (commit 3614683)
- 237 clips in sfx/swear/, all CC0, all receipted in sfx/swear/SOURCES.txt
- This branch is NEVER merged directly — the wiring commit cherry-picks the file paths only

Created: 2026-09-21 by parent agent
