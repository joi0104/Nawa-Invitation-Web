/* External dependencies */
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'

/* Internal dependencies */
import LoadingAnimation from 'components/LoadingAnimation'
import Invitation from 'components/Invitation'
import * as invitationAction from 'redux/reducers/invitationReducer'
import * as invitationSelector from 'redux/selectors/invitationSelector'

interface InvitationContainerProps {
  invitationId: string
}

function InvitationContainer({ invitationId }: InvitationContainerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const LOADING_TIME = 3000
  const dispatch = useDispatch()
  const history = useHistory()
  const invitation = useSelector(invitationSelector.getInvitation)

  const loadInvitatoin = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, LOADING_TIME)
  }

  const fetchInvitation = useCallback(async () => {
    try {
      await dispatch(invitationAction.getInvitation({ invitationId }))
    } catch (error) {
      const errorStatusCode = _.get(error, ['response', 'status'])
      history.replace(history.location.pathname, { errorStatusCode })
    } finally {
      setIsFetching(false)
    }
  }, [invitationId, history, dispatch])

  useEffect(() => {
    loadInvitatoin()
    fetchInvitation()
  }, [fetchInvitation])

  return isLoading || isFetching ? <LoadingAnimation /> : <Invitation invitation={invitation} />
}

export default InvitationContainer
