# Monaco Editor to CRUD file/folder from an uploaded Zip file

### Install Dependencies
```
yarn install
```

### Develop
To develop all the app, run the following command:

```
yarn dev
```
# See the local UI
Open the application in your browser at http://localhost:3000

### Feature

- File/Folder Manipulation
  - Add file
  - Add folder
  - Upload file Zip
  - Download file Zip
  - Delete File
  - Delete Folder
  - Save File Changes (Sync File): by pressing the key combination Ctrl + S or Sync Button on the File/Folder Manipulation bar
  - Undo changes to a file by pressing the key combination Ctrl + Z, and redo changes by press Shift + Ctrl + Z
  

- Click file and show it content to the monaco editor
  - Click file, then a new tab is opened and the file's content is displayed on the Monaco Editor.

- Close the current opening file without saving will trigger the popup which askes to save the changes.
