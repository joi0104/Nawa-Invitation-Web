/* External dependencies */
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

/* Internal dependencies */
import { HomePage, ErrorPage, InvitationPage, PreviewPage } from 'pages'
import ErrorHandler from 'components/ErrorHandler'
import { GlobalStyle } from 'styles/global-styles'
import 'app.scss'

function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - Nawa Invitation" defaultTitle="Nawa-Invitation">
        <meta name="description" content="Nawa invitation" />
      </Helmet>
      <ErrorHandler>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/preview/:templateId" component={PreviewPage} />
          <Route exact path="/:invitationId" component={InvitationPage} />
          <Route component={ErrorPage} />
        </Switch>
      </ErrorHandler>
      <GlobalStyle />
    </BrowserRouter>
  )
}

export default App
