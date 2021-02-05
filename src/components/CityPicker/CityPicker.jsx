import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardActionArea,
    CardActions,
    CardMedia,
    Button,
    Grid,
    NativeSelect,
    FormControl
} from '@material-ui/core';
import CountUp from 'react-countup';

import styles from './CityPicker.module.css';


function CityPicker(data) {
    const [selectCity, setSelectCity] = useState('');


    const handleChange = (city) => {
        setSelectCity(city);
        console.log(contentCard.tempc)
    }

    const dataParsed = data.data;

    const contentCard = [];
    var sun = require('../../img/sun.png')
    var cloud = require('../../img/cloud.png');
    var img;

    if (selectCity !== '') {
        if (Object.keys(dataParsed).length > 0) {
            for (var i = 0; i < dataParsed.name.length; i++) {
                if (dataParsed.name[i] === selectCity) {
                    contentCard.push({
                        name: dataParsed.name[i],
                        state: dataParsed.state[i],
                        probabilityofprecip: dataParsed.probabilityofprecip[i],
                        skydescriptionlong: dataParsed.skydescriptionlong[i],
                        tempc: dataParsed.tempc[i]

                    });
                }
            }
        }
        console.log(contentCard)
        contentCard[0].skydescriptionlong === 'Soleado' ? img = sun : img = cloud;
    }

    const content = [];

    if (Object.keys(dataParsed).length > 0) {
        for (var i = 0; i < dataParsed.name.length; i++) {
            content.push({
                name: dataParsed.name[i]
            });
        }
    }

    console.log(selectCity);

    

    const card = (
        contentCard.length > 0 ? (
            <Grid item component={Card} className={styles.MuiPaper} key={i}>
                <CardContent className={styles.MuiPaper}>
                    <CardMedia
                        className={styles.media}
                        image={img}
                        title="Contemplative Reptile"
                    />
                    <Typography className={styles.colorTextSecondary} gutterBottom>{contentCard[0].name}</Typography>
                    <Typography variant="h5">
                        <CountUp
                            start={0}
                            end={Number(contentCard[0].tempc)}
                            duration={5}
                        />°C
                    </Typography>
                    <Typography className={styles.colorTextSecondary}>
                        <CountUp
                            start={0}
                            end={Number(contentCard[0].probabilityofprecip)}
                            duration={5}
                        />%
                    </Typography>
                    <Typography className={styles.colorTextSecondary}>{contentCard[0].skydescriptionlong}</Typography>
                    <Typography variant="body2">{contentCard[0].state}</Typography>
                </CardContent>
            </Grid>
        ) : null
    )



    if (Object.keys(dataParsed).length === 0) {
        return 'loading...'
    }
    return (
        <div className={styles.container}>
            <FormControl className={styles.box}>
                <NativeSelect defaultValue="" onChange={(e) => handleChange(e.target.value)} className={styles.options} >
                    <option className={styles.options} value="global">Search</option>
                    {content.map((item, i) => <option key={i} className={styles.optionsSelect} value={item.name}>{item.name}</option>)}
                </NativeSelect>
            </FormControl>
            {card}
        </div>
    );
}

export default CityPicker;
