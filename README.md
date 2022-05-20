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
- `static class Abort`
  - `static Controller = AbortController`
  - `static Error = AbortError`
  - `static Signal = AbortSignal`
- `class AbortController`
  - `constructor()`
  - `get signal => AbortSignal`
  - `abort([reason: any]) => boolean`
- `class AbortError`
  - `constructor([message: string])`
- `class AbortSignal`
  - `static abort([reason: any]) => AbortSignal`
  - `static timeout(delay: number) => AbortSignal`
  - `constructor()`
  - `get aborted => boolean`
  - `get reason => any`
  - `on(event: string | symbol, listener: Function[, options: {
      once?: boolean
    }?]) => unsubscribe() => boolean`
  - `on(event = 'abort', listener: (reason: any, abortSignal: AbortSignal) => void[, options: {
      once?: boolean
    }?]) => unsubscribe() => boolean`
  - `throwIfAborted() => void`

### Builtins
- `new AbortController()`
- `AbortControllerAbort(abortController: AbortController[, reason: any]) => boolean`
- `AbortControllerSignal(abortController: AbortController) => AbortSignal`
- `new AbortError([message: string])`
- `new AbortSignal()`
- `AbortSignalAbort([reason: any]) => AbortSignal`
- `AbortSignalAborted(abortSignal: AbortSignal) => boolean`
- `AbortSignalOn(abortSignal: AbortSignal, event: string | symbol, listener: Function[, options: {
    once?: boolean
  }?]) => unsubscribe() => boolean`
- `AbortSignalOn(abortSignal: AbortSignal, event = 'abort', listener: (reason: any, abortSignal: AbortSignal) => void[, options: {
    once?: boolean
  }?]) => unsubscribe() => boolean`
- `AbortSignalReason(abortSignal: AbortSignal) => any`
- `AbortSignalThrowIfAborted(abortSignal: AbortSignal) => void`
- `AbortSignalTimeout(delay: number) => AbortSignal`
- `IsAbortController(argument: any) => boolean`
- `IsAbortError(argument: any) => boolean`
- `IsAbortSignal(argument: any) => boolean`
