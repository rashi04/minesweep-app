import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {Table, TableBody, TableCell, TableRow} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    
    paperGame: {
        height: 500,
        width: '100%',
        paddingTop: '1%',
        paddingLeft: '3%'

    },
    table: {
        width: '80 %',
        height: '100 %',
       
    },
    tableCell: {
        border: '2px groove white',
        backgroundColor: '#5DADE2',
        height: 20,
        width:30
    },
    tableRow: {
        height: 20,
        width: 30
    }
}));

export default function GameBoard(props) {
   
    const classes = useStyles();
    const row = 9;
    const col = 13;
    const buttonsCollection = [];
    var scoreCount = props.scoreCount;
    
    const rows = [];
    for (var j = 0; j < col; j++) {
        buttonsCollection.push(<TableCell key={j} className={classes.tableCell}  size="medium" align="center"></TableCell>);
    }
    for (let i = 0; i < row; i++) {        
        rows.push(<TableRow className={classes.tablerow} key={i}>{buttonsCollection}</TableRow>)
    }
    
    React.useEffect(() => {
        var randoms = [];
        const makeARandomNumber = function () {
           return Math.floor(Math.random() * 80);
        }
        const generateRandomArray = () => {
             randoms = Array(22).fill(0).map(makeARandomNumber);
        }
        const disableClickForcells = () => {
            var tabRows = document.getElementById('board').rows;
            var scoreIncrease = false;
            for (var i = 0; i < tabRows.length; i++) {
                var cells = tabRows[i].cells;
                for (var j = 0; j < cells.length; j++) {
                    cells[j].style.pointerEvents = "none";
                }
            }
        }
        const checkMinesNearby = (row,col) => {
            var tabRows = document.getElementById('board').rows;
            var mineCount = 0;
            if (tabRows) {
                var cellsSameRow = tabRows[row].cells;
                if (cellsSameRow) {
                    var leftCell = cellsSameRow[parseInt(col) - 1];
                    if (leftCell) {
                        var ele = leftCell.childNodes[0];
                        if (ele && ele.tagName == "IMG") {
                            mineCount++;
                        }
                    }
                    var rightCell = cellsSameRow[parseInt(col) + 1];
                    if (rightCell) {
                        var ele = rightCell.childNodes[0];
                        if (ele && ele.tagName == "IMG") {
                            mineCount++;
                        }
                    }
                }
                var r = parseInt(row) - 1;
                if (tabRows[parseInt(r)]) {
                    var cells = tabRows[parseInt(r)].cells;
                    if (cells) {
                        for (var j = 0; j < 3; j++) {
                             var c = parseInt(col) - (1 - parseInt(j));
                             if (cells[c]) {
                                 var ele = cells[c].childNodes[0];
                                 if (ele && ele.tagName == "IMG") {
                                     mineCount++;
                                 }
                             }
                         }
                            
                    }
                }
                var r = parseInt(row) + 1;
                if (tabRows[parseInt(r)]) {
                    var cells = tabRows[parseInt(r)].cells;
                    if (cells) {
                        for (var j = 0; j < 3; j++) {
                            var c = parseInt(col) - (1 - j);
                            if (cells[c]) {
                                var ele = cells[c].childNodes[0];
                                if (ele && ele.tagName == "IMG") {
                                    mineCount++;
                                }
                            }

                        }

                    }
                }
            }
            return mineCount;
        }
        if (props.gameStopped) {
            disableClickForcells();
        }
        generateRandomArray();
        var tabRows = document.getElementById('board').rows;
        var scoreIncrease = false;
        for (var i = 0; i < tabRows.length; i++) {
            var cells = tabRows[i].cells;
            for (var j = 0; j < cells.length;j++) {
                var bombInd = ((i + 1) * (j + 1));
                cells[j].setAttribute("row", i);
                cells[j].setAttribute("col", j);
                cells[j].onclick = function (i,j) {
                    scoreIncrease = true;
                    var expElements = document.getElementsByClassName('mine');
                    for (var i = 0; i < expElements.length; i++) {
                        if (this.contains(expElements[i])) {
                            for (var j = 0; j < expElements.length; j++) {
                                expElements[j].style.display = 'block';
                            }
                            scoreIncrease = false;
                        } 
                    }
                    if (scoreIncrease) {
                        var mineCount = checkMinesNearby(this.getAttribute("row"), this.getAttribute("col"));
                        this.innerHTML = '<span style="font-weight:bold;">'+mineCount+'</span>';
                        scoreCount = scoreCount + 1;
                    } else {
                        props.setSmiley("sad");
                        disableClickForcells();
                        props.setGameStopped(true);
                    }     
                    props.setScoreCount(scoreCount);
                    this.style.backgroundColor = "#D3D3D3";
                    this.style.pointerEvents = "none";
                }
                for (var k = 0; k < randoms.length; k++) {
                    if (bombInd == randoms[k]) {
                        cells[j].innerHTML = '<img style="display:none;height:16px;width:16px" class="mine" src="explosion.png"/>';
                    }
                }
            }
            
            
        }
    },[])
    return (
        
            <Table id="board" className={classes.table}>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
           
        
    );
}
