# Cavalcader.js
## Interactive editor
https://cavalcader-js.vercel.app

## Syntax:

Node defineition:
```
(source1)
<source2>
[source3]
```

Create relationship:
```
(source) => <Operator> => [sink]
(PersonA) <=> (PersonB)
(PersonA) === (PersonC)
```

Example graph syntax:
```
LR:
(source) => <operator1> => [sink1];
(source) => <operator2> => [sink2];
(source) => <operator3> => [sink2];
[sink1] => (database);
[sink2] => (database);
```

Output:

<img width="653" alt="Result output" src="https://github.com/zikunw/Cavalcader.js/assets/68682076/781e57db-9351-4a00-a807-b134e1e016d0">


## Development

Download the git repo and install the dependencies using `npm i`.

Start local development by
```
cd example
npm install
npm run dev
```

