/* External dependencies */
import { takeLatest } from 'redux-saga/effects'

/* Internal dependencies */
import Invitation from 'models/Invitation'
import * as invitationAPI from 'api/invitationAPI'
import { AsyncActionTypes, actionCreator, createAsyncActionsAndSaga } from 'utils/reduxUtils'

type Action = AsyncActionTypes<typeof getInvitationAsyncActions>

type State = {
  invitation: Invitation
  getInvitationFetching: boolean
  getInvitationSuccess: boolean
  getInvitationError: boolean
}

export interface getInvitationPayload {
  invitationId: string
}

const GET_INVITATION = 'invitation/GET_INVITATION' as const
const GET_INVITATION_FETCHING = 'invitation/GET_INVITATION_FETCHING' as const
const GET_INVITATION_SUCCESS = 'invitation/GET_INVITATION_SUCCESS' as const
const GET_INVITATION_ERROR = 'invitation/GET_INVITATION_ERROR' as const

export const getInvitation = actionCreator<getInvitationPayload>(GET_INVITATION, { usePromise: true })

const { asyncActions: getInvitationAsyncActions, asyncSaga: getInvitationSaga } = createAsyncActionsAndSaga(
  GET_INVITATION_FETCHING,
  GET_INVITATION_SUCCESS,
  GET_INVITATION_ERROR,
)<ReturnType<typeof getInvitation>, invitationAPI.getInvitationResponseType, any>(invitationAPI.getInvitation)

export function* invitationSaga() {
  yield takeLatest(GET_INVITATION, getInvitationSaga)
}

const initialState: State = {
  invitation: new Invitation(),
  getInvitationFetching: false,
  getInvitationSuccess: false,
  getInvitationError: false,
}

function invitationReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case GET_INVITATION_FETCHING:
      return {
        ...state,
        getInvitationFetching: true,
        getInvitationSuccess: false,
        getInvitationError: false,
      }
    case GET_INVITATION_SUCCESS:
      return {
        ...state,
        invitation: new Invitation(action.payload),
        getInvitationFetching: false,
        getInvitationSuccess: true,
        getInvitationError: false,
      }
    case GET_INVITATION_ERROR:
      return {
        ...state,
        getInvitationFetching: false,
        getInvitationSuccess: false,
        getInvitationError: true,
      }
    default:
      return state
  }
}

export default invitationReducer
