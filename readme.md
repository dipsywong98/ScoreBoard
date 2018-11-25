# ScoreBoard

> Score board for Robot Design Contest 2018

Developed in Vue, hosted live on firebase

- [scoreboard](https://scoreboard-d.firebaseapp.com/)
- [scoreboard panel](https://scoreboard-d.firebaseapp.com/panel)
- [brackets](https://scoreboard-d.firebaseapp.com/brackets)
- [brackets panel](https://scoreboard-d.firebaseapp.com/brackets_panel)
- [timer](https://scoreboard-d.firebaseapp.com/timer)

### Getting Started
```
npm i
```

### Start Development Server
```
npm run serve
```

### Build a Static Site
```
npm run build
```

### Linting
```
npm run lint
```

### Deploy
First you need to ensure you have installed firebase cli.
To install run 

```
npm i firebase-tools -g
```

Then run firebase deploy function
```
firebase deploy
```

To add people to have write access, first access one of the panels, allow pop up, 
login with github, go to firebase console, copy the uid of the new user, update `database.rules.json`
and then deploy to firebase