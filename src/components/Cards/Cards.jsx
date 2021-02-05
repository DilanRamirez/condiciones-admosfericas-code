import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardActionArea,
    CardActions,
    CardMedia,
    Button,
    Grid
} from '@material-ui/core';
import CountUp from 'react-countup';

import styles from './Cards.module.css';


function Cards(data) {
    const dataParsed = data.data;
    
    const content = [];

    if (Object.keys(dataParsed).length > 0) {
        console.log(dataParsed.name.length)
        for (var i = 0; i < dataParsed.name.length; i++) {
            content.push({
                name: dataParsed.name[i],
                state: dataParsed.state[i],
                probabilityofprecip: dataParsed.probabilityofprecip[i],
                skydescriptionlong: dataParsed.skydescriptionlong[i],
                tempc: dataParsed.tempc[i]

            });
        }

        console.log(content.length)
    }

    const cards = (
        content.map((item, i) =>
            <Grid item component={Card} className={styles.MuiPaper} key={i}>
                <CardContent className={styles.MuiPaper}>
                    <Typography className={styles.colorTextSecondary} gutterBottom>{item.name}</Typography>
                    <Typography variant="h5">
                        <CountUp
                            start={0}
                            end={Number(item.tempc)}
                            duration={5}
                        />°C
                    </Typography>
                    <Typography className={styles.colorTextSecondary}>
                    <CountUp
                            start={0}
                            end={Number(item.probabilityofprecip)}
                            duration={5}
                        />%
                    </Typography>
                    <Typography className={styles.colorTextSecondary}>{item.skydescriptionlong}</Typography>
                    <Typography variant="body2">{item.state}</Typography>
                </CardContent>
            </Grid>
        )
    )



    if (Object.keys(dataParsed).length === 0) {
        return 'loading...'
    }
    return (
        <div className={styles.cardsContainer}>
            <Grid container spacing={ 2 } justify="center"> 
                {cards}
            </Grid>
        </div>
    );
}

export default Cards;
