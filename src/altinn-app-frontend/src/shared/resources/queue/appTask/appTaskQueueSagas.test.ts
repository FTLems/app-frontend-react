import { expectSaga } from 'redux-saga-test-plan';

import { startInitialAppTaskQueueSaga } from 'src/shared/resources/queue/appTask/appTaskQueueSagas';
import {startInitialAppTaskQueueFulfilled} from 'src/shared/resources/queue/queueSlice';
import TextResourcesActions from 'src/shared/resources/textResources/textResourcesActions';
import LanguageActions from 'src/shared/resources/language/languageActions';
import ApplicationMetadataActionDispatcher from 'src/shared/resources/applicationMetadata/actions';
import {startInitialUserTaskQueueSaga} from 'src/shared/resources/queue/userTask/userTaskQueueSagas';

describe('appTaskQueueSagas', () => {
  it('startInitialAppTaskQueueSaga, app queue is started', () => {
    expectSaga(startInitialUserTaskQueueSaga).run()
    return expectSaga(startInitialAppTaskQueueSaga)
      .call(TextResourcesActions.fetchTextResources)
      .call(LanguageActions.fetchLanguage)
      .call(ApplicationMetadataActionDispatcher.getApplicationMetadata)
      .put(startInitialAppTaskQueueFulfilled())
      .run();
  });
});
