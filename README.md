# redux-saga-take-non-running
A variation of redux saga takeEvery effect that will not call saga simultaneously for the same params passed

### Use Case:
This effect can be used as a takeEvery but in situations when you don't want to spawn saga with same 
params twice in the same time. Example scenario: multiple components make calls to api to get data by id.
takeEvery will spawn multiple times causing a lot of unnecessary requests while takeNonRunning will spawn
only once for each id. takeNonRunning spawning saga can take any number of params.

### Usage
This is as simple as the following:
```js
import takeNonRunning from 'redux-saga-take-non-running';

function* fetchRecordByIdSaga({ id }) {
  // fetching logic (saga will not be spawned if is already running for the same id param)
}

export function* mainSaga() {
  yield takeNonRunning('ACTION_GET_RECORD_BY_ID', fetchRecordByIdSaga);
}
```