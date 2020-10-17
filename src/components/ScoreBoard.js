import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, TextField, Grid } from '@material-ui/core';
import Timer from './Timer';
import Smiley from './Smiley';

const useStyles = makeStyles((theme) => ({
    cardScore: {
        height: 130,
       
    },
    timer: {
        marginTop: '-20px',
        marginLeft: '40px'
    },
    scorecard: {
        padding: 0,
        paddingLeft: '20%',
        fontSize: '50px',
        fontWeight: 'bold',
        fontFamily: 'helvetica',
        color: '#8181F7',
        width: '60px',
        height: '80px',
        border: 'none',
       // marginTop: '-15px',
       
        backgroundColor: '#1C1C1C',
    },
    scorecardparent: {
        //marginLeft: '5%',
        marginTop: '-20px',
        backgroundColor: '#1C1C1C'
    },
}));
const timer = {
    marginTop: '-100px',
    marginLeft: '70%',
    backgroundColor: 'white',
    width:60
};
export default function ScoreBoard(props) {
   
    const classes = useStyles();
    
    return (
        <Card className={classes.cardScore}>
             <CardContent>
                  <Typography variant="h5" component="h2">
                      Score Board
                  </Typography>
                <Grid container className={classes.root} spacing={2}>
                    <Grid className={classes.scorecardparent} item xs={3}>
                        <input className={classes.scorecard} type="text" readOnly="true" value={props.scoreCount}/>
                        
                    </Grid>
                    <Grid item xs={6}>
                        <Smiley value={props.smiley}/>
                    </Grid>
                    <Grid style={timer} className={classes.timer} item xs={3}>
                        <Timer gameStopped={props.gameStopped} setGameStopped={props.setGameStopped} scoreCount={props.scoreCount} setSmiley={props.setSmiley} />
                    </Grid>
                </Grid>
                
             </CardContent>
        </Card>

    );
}
