import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ScoreBoard from './ScoreBoard';
import GameBoard from './GameBoard';

const useStyles = makeStyles((theme) => ({
    root: {
       //flexGrow: 1,
        width: '80%'
    },
    
    container: {
        paddingTop: '1%',
        paddingLeft: '20%'
    }
}));

export default function Layout() {
    const [scoreCount, setScoreCount] = React.useState(0);
    const [smiley, setSmiley] = React.useState("happy");
    const [gameStopped, setGameStopped] = React.useState(false);
    const classes = useStyles();
   
    return (
        <Container className={classes.container}>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <ScoreBoard gameStopped={gameStopped} setGameStopped={setGameStopped} smiley={smiley} setSmiley={setSmiley} scoreCount={scoreCount}/>
                </Grid>
                <Grid item xs={12}>
                    <GameBoard gameStopped={gameStopped} setGameStopped={setGameStopped} smiley={smiley} setSmiley={setSmiley} scoreCount={scoreCount} setScoreCount={setScoreCount} />
                </Grid>
            </Grid>
        </Container>
    );
}
