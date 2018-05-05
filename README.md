# Bee-Queue service mixin for weave.

## Installation
```
$ npm install weave-bee-queue
```

## Usage

```js
const Weave = require('weave-core');
const BeeQueueMixin = require('weave-bee-queue')

const broker = Weave({
    logLevel: 'debug'
});

broker.createService({
    name: 'math',
    mixins: [BeeQueueMixin()]
    actions: {
        add(ctx) {
            return Number(ctx.params.a) + Number(ctx.params.b);
        }
    }
});

broker.start();

// Call service
broker.call('math.add', { a: 5, b: 3 })
    .then(result => console.log('5 + 3 =', result))
    .catch(error => console.error(`Something went wrong! ${error.message}`));
```

## License
The weave framework is available under the [MIT license](https://tldrlegal.com/license/mit-license).

## Contact
Copyright (c) 2018 by Fachwerk
