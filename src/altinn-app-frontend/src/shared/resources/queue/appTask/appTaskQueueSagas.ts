import { SagaIterator } from 'redux-saga';
import { call, put, take} from 'redux-saga/effects';
import {
  startInitialAppTaskQueue,
  startInitialAppTaskQueueFulfilled,
} from '../queueSlice';
import ApplicationMetadataActions from '../../applicationMetadata/actions';
import { ApplicationSettingsActions } from '../../applicationSettings/applicationSettingsSlice';

import TextResourcesActions from '../../textResources/textResourcesActions';
import LanguageActions from '../../language/languageActions';

export function* startInitialAppTaskQueueSaga(): SagaIterator {
  yield put(ApplicationSettingsActions.fetchApplicationSettings());
  yield call(TextResourcesActions.fetchTextResources);
  yield call(LanguageActions.fetchLanguage);
  yield call(ApplicationMetadataActions.getApplicationMetadata);
  yield put(startInitialAppTaskQueueFulfilled());
}

export function* watchStartInitialAppTaskQueueSaga(): SagaIterator {
  yield take(startInitialAppTaskQueue);
  yield call(startInitialAppTaskQueueSaga);
}
