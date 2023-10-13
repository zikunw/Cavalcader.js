# Cavalcade.js
 
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

<img width="609" alt="Result output" src="https://github.com/zikunw/Cavalcader.js/assets/68682076/d7cae1c6-789a-47c5-84e1-fb9a73c9d466">


