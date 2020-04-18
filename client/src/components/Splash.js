import React from 'react'
import splashImg from '../media/splash.jpeg'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    splash: {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        backgroundImage: `url(${splashImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    card: {
        maxWidth: 275,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttons: {
        justifyContent: 'center'
    }
})

const Splash = ({ onSubmit, name, setName }) => {
    const classes = useStyles();
    return (<div className={classes.splash}>
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Hello and welcome to Ben's Poker
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Enter your name to join game:
                </Typography>
                <TextField id="name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
            </CardContent>
            <CardActions className={classes.buttons}>
                <Button variant="contained" color="primary" size="medium" onClick={onSubmit}>Join The Game</Button>
            </CardActions>
        </Card>
    </div>)
}

export default Splash