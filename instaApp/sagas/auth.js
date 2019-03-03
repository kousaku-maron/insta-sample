import { take, put, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { auth } from '../modules/firebase'

const data = (type ,payload) => {
  const _data = {
    type: type,
    payload: payload,
  }

  return _data
}

const authChannel = () => {
  const channel = eventChannel(emit => {
    const unsubscribe = auth.onAuthStateChanged(
      user => emit({ user }),
      error => emit({ error })
    )
    return unsubscribe
  })
  return channel
}

function* checkUserStateSaga() {
  const channel = yield call(authChannel)
  while (true) {
    const { user, error } = yield take(channel)

    if ( user && !error ) {
      yield put(data('SET_USER_UID', user.uid))
    }
    else {
      yield put(data('SET_USER_UID', null))
    }
  }
}

const sagas = [
  checkUserStateSaga(),
]

export default sagas
