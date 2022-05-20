import {
  RequireIntrinsic,
  UncurryThisIntrinsic
} from '#intrinsic';
import {
  IsObject,
  ToIntegerOrInfinity
} from '#type';
import {
  GetInternalSlot,
  HasInternalSlot,
  RequireInternalSlot,
  SetInternalSlot
} from '#internal-slot';
import {
  TimeoutError
} from '#timeout';
import EventEmitter, {
  EventEmitterEmit,
  EventEmitterSubscribe
} from '#event-emitter';

const Error = RequireIntrinsic('Error');
const FunctionSymbolHasInstance = UncurryThisIntrinsic(
  'Function.prototype[@@hasInstance]'
);
const GlobalThis = RequireIntrinsic('globalThis');
const ObjectCreate = RequireIntrinsic('Object.create');
const ObjectPrototype = RequireIntrinsic('Object.prototype');
const ReflectDefineProperty = RequireIntrinsic('Reflect.defineProperty');
const Symbol = RequireIntrinsic('Symbol');
const SymbolHasInstance = RequireIntrinsic('@@hasInstance');
const SymbolToStringTag = RequireIntrinsic('@@toStringTag');

const SetTimeout = GlobalThis.setTimeout;

const $Aborted = Symbol('[[Aborted]]');
const $EventEmitter = Symbol('[[EventEmitter]]');
const $Reason = Symbol('[[Reason]]');
const $Signal = Symbol('[[Signal]]');

const AbortControllerAbort = (abortController, reason) => {
  const abortSignal = AbortControllerSignal(abortController);
  const aborted = GetInternalSlot(abortSignal, $Aborted);
  if (aborted) {
    return false;
  }
  if (reason === undefined) {
    reason = new AbortError();
  }
  const eventEmitter = GetInternalSlot(abortSignal, $EventEmitter);
  SetInternalSlot(abortSignal, $Aborted, true);
  SetInternalSlot(abortSignal, $Reason, reason);
  EventEmitterEmit(eventEmitter, 'abort', reason, abortSignal);
  return true;
}

const AbortControllerSignal = abortController => RequireInternalSlot(
  abortController, $Signal
);

const AbortSignalAborted = abortSignal => RequireInternalSlot(
  abortSignal, $Aborted
);

const AbortSignalOn = (abortSignal, event, listener, options) => {
  const eventEmitter = RequireInternalSlot(abortSignal, $EventEmitter);
  return EventEmitterSubscribe(eventEmitter, event, listener, options);
}

const AbortSignalReason = abortSignal => RequireInternalSlot(
  abortSignal, $Reason
);

const AbortSignalThrowIfAborted = abortSignal => {
  const aborted = AbortSignalAborted(abortSignal);
  if (aborted) {
    const reason = GetInternalSlot(abortSignal, $Reason);
    throw reason;
  }
}

const IsAbortController = argument => (
  IsObject(argument) && HasInternalSlot(argument, $Signal)
);

const IsAbortError = argument => FunctionSymbolHasInstance(argument, AbortError);

const IsAbortSignal = argument => (
  IsObject(argument) && HasInternalSlot(argument, $Aborted)
);

class AbortError extends Error {
  constructor(message) {
    super(message);
  }
}
ReflectDefineProperty(AbortError, SymbolHasInstance, {
  value: IsAbortError
});

const AbortErrorPrototype = AbortError.prototype;
ReflectDefineProperty(AbortErrorPrototype, 'name', {
  value: 'AbortError'
});
ReflectDefineProperty(AbortErrorPrototype, SymbolToStringTag, {
  value: 'AbortError'
});

class AbortSignal {
  static abort(reason) {
    if (reason === undefined) {
      reason = new AbortError();
    }
    const eventEmitter = new EventEmitter();
    const abortSignal = ObjectCreate(AbortSignalPrototype);
    SetInternalSlot(abortSignal, $EventEmitter, eventEmitter);
    SetInternalSlot(abortSignal, $Aborted, true);
    SetInternalSlot(abortSignal, $Reason, reason);
    return abortSignal;
  }

  static timeout(delay) {
    delay = ToIntegerOrInfinity(delay);
    const eventEmitter = new EventEmitter();
    const abortSignal = ObjectCreate(AbortSignalPrototype);
    SetInternalSlot(abortSignal, $EventEmitter, eventEmitter);
    SetInternalSlot(abortSignal, $Aborted, false);
    SetInternalSlot(abortSignal, $Reason, undefined);
    SetTimeout(() => {
      const timeoutError = new TimeoutError();
      SetInternalSlot(abortSignal, $Aborted, true);
      SetInternalSlot(abortSignal, $Reason, timeoutError);
      EventEmitterEmit(eventEmitter, 'abort', timeoutError, abortSignal);
    }, delay);
    return abortSignal;
  }

  constructor() {
    const eventEmitter = new EventEmitter();
    SetInternalSlot(this, $EventEmitter, eventEmitter);
    SetInternalSlot(this, $Aborted, false);
    SetInternalSlot(this, $Reason, undefined);
  }

  get aborted() {
    return AbortSignalAborted(this);
  }

  get reason() {
    return AbortSignalReason(this);
  }

  on(event, listener, options) {
    return AbortSignalOn(this, event, listener, options);
  }

  throwIfAborted() {
    return AbortSignalThrowIfAborted(this);
  }
}
ReflectDefineProperty(AbortSignal, SymbolHasInstance, {
  value: IsAbortSignal
});

const AbortSignalAbort = AbortSignal.abort;
const AbortSignalTimeout = AbortSignal.timeout;
const AbortSignalPrototype = AbortSignal.prototype;
ReflectDefineProperty(AbortSignalPrototype, SymbolToStringTag, {
  value: 'AbortSignal'
});

class AbortController {
  constructor() {
    const abortSignal = new AbortSignal();
    SetInternalSlot(this, $Signal, abortSignal);
  }

  get signal() {
    return AbortControllerSignal(this);
  }

  abort(reason) {
    return AbortControllerAbort(this, reason);
  }
}
ReflectDefineProperty(AbortController, SymbolHasInstance, {
  value: IsAbortController
});

const AbortControllerPrototype = AbortController.prototype;
ReflectDefineProperty(AbortControllerPrototype, SymbolToStringTag, {
  value: 'AbortController'
});

const Abort = ObjectCreate(ObjectPrototype, {
  Controller: {
    value: AbortController
  },
  Error: {
    value: AbortError
  },
  Signal: {
    value: AbortSignal
  }
});
ReflectDefineProperty(Abort, SymbolToStringTag, {
  value: 'Abort'
});

export {
  Abort,
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
};
