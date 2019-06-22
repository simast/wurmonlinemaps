import {createBrowserHistory} from 'history'
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router'

export const routingStore = new RouterStore()

// Use HTML5 history API
const browserHistory = createBrowserHistory()

export const history = syncHistoryWithStore(browserHistory, routingStore)
