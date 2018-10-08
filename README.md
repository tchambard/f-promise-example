# async/await + bluebird VS f-promise


## async/await + bluebird
### Les +
- partie async/await standard dans Node.JS avec ES6
- compatible avec les développements front
- compatibilité transparente avec les middlewares (express...)
- (bluebird n'ajoute pas de dépendance supplémentaire)

### Les -
- Contaminant sur toute la stack
- stacktraces incomplètes
- promisify difficile à appliquer lorsque l'on veut utiliser des fonction avec callback
- bluebird non standard dans Node.js
- ne peut pas traiter des problématiques simples sans bluebird
- @types/bluebird pas forcément correct
- API chai spécifique pour les promesses (chai-as-promise)

### Communauté
- stars bluebird: ~17000

## f-promise
### Les +
- facilite la lisibilité et la maintenance du code
- stacktraces completes et significatives sans surcharge.
- possibilité d'appeler des fonctions nécessitant des callback de façon très simple.
- permet de maitriser les parties asynchrones avec une surface d'erreur beaucoup plus faible (un seul wait)
- fonctionne parfaitement avec les boucles standard et lodash
- possibilité de détruire la fibre (et de stopper toute exécution. eg: annulation de requête...)
- les goodies: funnels, queues, handshakes, continuation local storage...
- API chai standard suffisante pour tout les scénarios

### Les -
- la fibre doit être créée (run) et maintenue sur toute la stack (pas de promesse ou await au milieu)
- Non standard dans Node.Js/typescript
- Peu de contributeurs
- besoin de f-mocha pour simplifier les tests
- performances dégradées de manière infime (par rapport aux temps réseaux et accès data, ...)

### Communauté
- stars f-promise: 12
- stars fibers: ~3000
- stars streamlinejs: ~900
utilisé par Microsoft pour [azure-cli](https://github.com/Azure/azure-xplat-cli/blob/dev/package.json#L103) et pour le premier port de [vim](http://coolwanglu.github.io/vim.js/streamlinejs/vim.html) sur browser 
- SAGE: 17 personnes (14 plateforme, 3 applicatifs)  sur le projet etna. (A terme + de 100 personnes).  
Nombre de clients X3 (Enterprise Management), c'est de l'ordre de 5000, avec des entreprises comme Michelin et Vinci en France
