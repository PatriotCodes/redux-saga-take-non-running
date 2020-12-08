import { fork, take } from 'redux-saga/effects';

const actionToString = action => {
  const { type, ...rest } = action;
  return Object.values(rest).join('');
};

const takeNonRunning = (patternOrChannel, saga, ...args) =>
  fork(function* () {
    const ongoingSagas = {};
    while (true) {
      const action = yield take(patternOrChannel);
      const actionString = actionToString(action);
      if (!ongoingSagas[actionString] || !ongoingSagas[actionString].isRunning()) {
        ongoingSagas[actionString] = yield fork(saga, ...args.concat(action));
      }
    }
  });

export default takeNonRunning;