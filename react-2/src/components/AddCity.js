import React from 'react'
import { Button, TextField, Grid } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'


export default class AddCity extends React.Component {
    constructor (props) {
        super(props)
        this.area = React.createRef()
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.addCity(this.area.current.value)
        this.area.current.value=''
        this.area.current.blur()
    }

    render () {
        return (
            <div className="inner-container">
                <h2>Добавить город</h2>
                <form onSubmit={this.submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <TextField
                                name="test-area"
                                label="Добавить город"
                                required
                                fullWidth
                                inputRef={this.area}
                                onFocus={() => this.props.resetError()}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >Добавить</Button>
                        </Grid>
                    </Grid>
                    <div className="error-box">
                        { this.props.hasError &&
                            <Alert severity="error" data-testid='addCityError'>Нет такого города или произошла ошибка при выполнении запроса</Alert>
                        }
                    </div>
                </form>
            </div>
        )
    }
}