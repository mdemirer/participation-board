# Participation Board

A touch-friendly board for grading class participation. Students appear as photo tiles grouped by table; drag a rubric marker onto a student (or tap a marker, then tap students) to record points and reasons. Exports to Excel.

## Privacy

This repository contains only the app. It has no student, course or grading data, and the app never uploads anything:

- the class list, photos, grades and settings are stored only on the device that uses the app;
- backups and Excel files are saved wherever the user chooses.

## Install

Open the GitHub Pages address on the device:

- **iPad / iPhone:** Safari → Share → Add to Home Screen
- **Android:** Chrome → ⋮ → Install app (or Add to Home screen)
- **Computer:** Chrome or Edge → install icon in the address bar

After the first visit it works offline.

## Boards

Tap the board name at the top to switch boards or create a new one. Each board (a course, section or semester) has its own students, grades, photos, settings and backups. A new board can copy the rubric, weeks and topics from the current one.

## First use on each device

1. **Settings (gear):** board name, number of weeks, week topics, rubric levels and reasons. Or load a settings file.
2. **Roster → Import CSV:** one student per row: `ID, Name Surname, Table, Group, Photo`.
   Leave Table empty for students without a table; they appear under *Unassigned*.
3. **Photos → Choose photos:** select all photos at once; they are matched by file name, ID or name.
4. **Export:** Excel per week or for all weeks (with a summary), and backups.

## Updating

Edit the files, change `VERSION` in `sw.js`, and push. Installed apps pick up the new version after being opened once or twice.

Uses [ExcelJS](https://github.com/exceljs/exceljs) (MIT) and the Atkinson Hyperlegible and Kalam fonts (SIL Open Font License).
