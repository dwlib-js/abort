# Abort API

## Abstract
The module for implementing of aborting in asynchronous operations.

## Install
`npm i --save @dwlib/abort`

## Usage
```javascript
// CJS
const Abort = require('@dwlib/abort');
const AbortController = require('@dwlib/abort/AbortController');
const AbortControllerAbort = require('@dwlib/abort/AbortControllerAbort');
const AbortControllerSignal = require('@dwlib/abort/AbortControllerSignal');
const AbortError = require('@dwlib/abort/AbortError');
const AbortSignal = require('@dwlib/abort/AbortSignal');
const AbortSignalAbort = require('@dwlib/abort/AbortSignalAbort');
const AbortSignalAborted = require('@dwlib/abort/AbortSignalAborted');
const AbortSignalOn = require('@dwlib/abort/AbortSignalOn');
const AbortSignalReason = require('@dwlib/abort/AbortSignalReason');
const AbortSignalThrowIfAborted = require('@dwlib/abort/AbortSignalThrowIfAborted');
const AbortSignalTimeout = require('@dwlib/abort/AbortSignalTimeout');
const IsAbortController = require('@dwlib/abort/IsAbortController');
const IsAbortError = require('@dwlib/abort/IsAbortError');
const IsAbortSignal = require('@dwlib/abort/IsAbortSignal');
// ESM
import Abort, {
  AbortController,
  AbortControllerAbort,
  AbortControllerSignal,
  AbortError,
  AbortSignal,
  AbortSignalAbort,
  AbortSignalAborted,
  AbortSignalOn,
  AbortSignalReason,
  AbortSignalThrowIfAborted,
  AbortSignalTimeout,
  IsAbortController,
  IsAbortError,
  IsAbortSignal
} from '@dwlib/abort';
import AbortController from '@dwlib/abort/AbortController';
import AbortControllerAbort from '@dwlib/abort/AbortControllerAbort';
import AbortControllerSignal from '@dwlib/abort/AbortControllerSignal';
import AbortError from '@dwlib/abort/AbortError';
import AbortSignal from '@dwlib/abort/AbortSignal';
import AbortSignalAbort from '@dwlib/abort/AbortSignalAbort';
import AbortSignalAborted from '@dwlib/abort/AbortSignalAborted';
import AbortSignalOn from '@dwlib/abort/AbortSignalOn';
import AbortSignalReason from '@dwlib/abort/AbortSignalReason';
import AbortSignalThrowIfAborted from '@dwlib/abort/AbortSignalThrowIfAborted';
import AbortSignalTimeout from '@dwlib/abort/AbortSignalTimeout';
import IsAbortController from '@dwlib/abort/IsAbortController';
import IsAbortError from '@dwlib/abort/IsAbortError';
import IsAbortSignal from '@dwlib/abort/IsAbortSignal';
```

## API
- *static class* Abort
  - *static* Controller
  - *static* Error
  - *static* Signal
- *class* AbortController
  - constructor()
  - *get* signal
  - abort([reason])
- *class* AbortError
  - constructor([message])
- *class* AbortSignal
  - *static* abort([reason])
  - *static* timeout(delay)
  - constructor()
  - *get* aborted
  - *get* reason
  - on(event, listener[, options])
  - throwIfAborted()

### Builtins
- new AbortController()
- AbortControllerAbort(abortController[, reason])
- AbortControllerSignal(abortController)
- new AbortError([message])
- new AbortSignal()
- AbortSignalAbort([reason])
- AbortSignalAborted(abortSignal)
- AbortSignalOn(abortSignal, event, listener[, options])
- AbortSignalReason(abortSignal)
- AbortSignalThrowIfAborted(abortSignal)
- AbortSignalTimeout(delay)
- IsAbortController(argument)
- IsAbortError(argument)
- IsAbortSignal(argument)
