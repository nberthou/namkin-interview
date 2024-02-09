# namkin-interview

- Démarrer le front : `yarn dev` dans le dossier `namkin-ui`
- Démarrer le back-end : `yarn start` ou `yarn start:dev` dans le dossier `namkin-api`

- Les permissions sont présentées sous la syntaxe `{ACTION}_${SUBJECT}`

Les actions possible : 
- MANAGE
- CREATE
- READ
- UPDATE
- DELETE

Les différents sujets : 
- PERMISSION
- USER
- PRODUCT
- ROLE
- ALL

Lors du sign up d'un utilisateur, il a par défaut le rôle "User" qui a la permission "READ_PRODUCT".
Pour ajouter des rôles et permissions, il faut passer par la BDD.
