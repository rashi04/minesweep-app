import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
export default function Smiley(props) {
    var src = 'smile.png';
    if (props.value == 'sad') {
        src = 'sad.png';
    }
    return (<img src={src} />);
}