import React, { useEffect } from 'react'
import tableImg from '../media/table.png'
import clubsTen from '../media/cards/100w/clubsten.png'
import clubsJack from '../media/cards/100w/clubsjack.png'
import clubsQueen from '../media/cards/100w/clubsqueen.png'
import clubsKing from '../media/cards/100w/clubsking.png'
import clubsAce from '../media/cards/100w/clubsace.png'
import cardBack from '../media/cards/100w/cardbackred.png'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    tableContainer: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    table: {
        width: '100vw',
        height: '56vh',
        // position: 'fixed',
        backgroundImage: `url(${tableImg})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat'
    },
    card: {
        maxWidth: 275,
        marginLeft: 'auto',
        marginRight: 'auto',
        zIndex: 50
    },
    buttons: {
        justifyContent: 'center'
    },
    communitycards: {
        width: '27%',
        minWidth: '30vh',
        height: '13%',
        maxHeight: '7.4vw',
        // backgroundColor: 'rgba(255,0,0,0.5)',
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',

    },
    communitycardcontainer: {
        width: 70
    },
    communitycard: {
        height: '100%',
        objectFit: 'contain'
    },
    playercards: {
        width: '100vw',
        height: '56vh',
        position: 'absolute'
    },
    playerseat1: {
        width: 200,
        height: 200,
        position: 'absolute',
        left: '50%',
        top: '50%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        transform: 'translate(calc(-100px - 500px), -100px)'
    },
    playerseat2: {
        width: 200,
        height: 200,
        position: 'absolute',
        left: '50%',
        top: '50%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        transform: 'translate(calc(-100px - 250px), calc(-100px - 240px))'
    },
    playerseat3: {
        width: 200,
        height: 200,
        position: 'absolute',
        left: '50%',
        top: '50%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        transform: 'translate(calc(-100px + 250px), calc(-100px - 240px))'
    },
    playerseat4: {
        width: 200,
        height: 200,
        position: 'absolute',
        left: '50%',
        top: '50%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        transform: 'translate(calc(-100px + 500px), -100px)'
    },
    playerseat5: {
        width: 200,
        height: 200,
        position: 'absolute',
        left: '50%',
        top: '50%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        transform: 'translate(calc(-100px - 250px), calc(-100px + 240px))'
    },
    playerseat6: {
        width: 200,
        height: 200,
        position: 'absolute',
        left: '50%',
        top: '50%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        transform: 'translate(calc(-100px + 250px), calc(-100px + 240px))'
    },
    leftPlayerCard: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50px, -50px) rotate(-15deg)',
        width: 70,
        objectFit: 'contain',
        height: 100
    },
    rightPlayerCard: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-20px, -50px) rotate(15deg)',
        width: 70,
        objectFit: 'contain',
        height: 100
    },
    playerName: {
        color: 'yellow'
    }
})

const StartGameCard = ({ players, onStartGame }) => {
    const classes = useStyles();
    return (<Card className={classes.card}>
        <CardContent>
            <Typography variant="h5" component="h2">
                Players:
            </Typography>
            {players && players.map(player => (<Typography className={classes.title} color="textSecondary" gutterBottom>{player}</Typography>))}
        </CardContent>
        <CardActions className={classes.buttons}>
            <Button variant="contained" color="primary" size="medium" onClick={onStartGame}>Start The Game</Button>
        </CardActions>
    </Card>)
}

const CommunityCards = ({ communitycards }) => {
    const classes = useStyles();
    return <div className={classes.communitycards} >
        {communitycards && communitycards.map(card => {
            return (<div class={classes.communitycardcontainer}><img className={classes.communitycard} src={card} /></div>)
        })}
    </div>
}

const PlayerSeat = ({ name, hand }) => {
    const classes = useStyles();
    return (<>
        <div className={classes.leftPlayerCard}><img className={classes.communitycard} src={cardBack} /></div>
        <div className={classes.rightPlayerCard}><img className={classes.communitycard} src={cardBack} /></div>
        <div className={classes.playerName}><p>{name}</p></div>
    </>)
}

const PlayerSeats = ({ seating }) => {
    const classes = useStyles();
    return (<div className={classes.playercards}>
        {seating && seating.map((seat, i) => {
            return seat && (<div className={classes[`playerseat${i + 1}`]}>
                {seat.name && <PlayerSeat name={seat.name} hand={seat.hand} />}
            </div>)
        })}
    </div>)
}

const Table = ({ players, message, started, socket, onStartGame, communitycards }) => {
    const classes = useStyles();
    let [seating, setSeating] = React.useState([])

    useEffect(() => {
        socket.on('seating', (data) => {
            setSeating(data)
        })

        socket.on()
    })

    return (<div className={classes.tableContainer}>
        <div className={classes.table}>
            {!started && <StartGameCard players={players} onStartGame={onStartGame} />}
            <CommunityCards cards={communitycards} />
            <PlayerSeats seating={seating} />
        </div>
        <p>{message}</p>
    </div>)
}

export default Table