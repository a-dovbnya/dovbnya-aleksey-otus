import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'
import {
    Link
} from '@material-ui/core';

class NoMatch extends React.Component {
    render () {
        return (
            <>
                <div class="not-found">
                    <div>Not Found</div>
                    <p><Link to="/" component={RouterLink}>На главную</Link></p>
                </div>
            </>
        )
    }
}

export default withRouter(NoMatch)