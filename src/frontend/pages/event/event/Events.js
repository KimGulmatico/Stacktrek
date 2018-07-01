import React, { Component } from 'react'
import { Card } from 'antd';

const { Meta } = Card;

const styles = {
    mainText: {
        width: '100%',
        textAlign: 'center'
    },
    cardsBody:{
        width: '80%',
        display: 'flex'
    },
    cards: {
        width: '50%',
        height: '50%',
        margin: '1%',
        textAlign: 'center',
    },
    container:{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: '64px',
    }
}

export default class Events extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.mainText}>EVENTS</h1>
        <div style={styles.cardsBody}>
            <div style={styles.cards}>
            <Card 
                bordered={false}           
                actions={<div>MORE INFO</div>}
                cover={<img alt="example" src="https://steamcdn-a.akamaihd.net/steam/apps/252950/header.jpg?t=1522783996" />}
            >
                <p>ROCKET LEAGUE</p>
                <p>QUALIFIERS 2120</p>
                <p>APR 26 - 30, 2018</p>
                <p>Tabuc Suba City, Iloilo</p>
                <p>XXX participants registered</p>                
            </Card>
            </div>
            <div style={styles.cards}>
            <Card>
                <p>More Tournaments</p>
                <p>UPCOMING</p>
                <p>More To Come</p>
                <p>CONCLUDED EVENTS</p>
                <p>Stack League Iloilo</p>
                <p>Stack League Iloilo 2</p>                
            </Card>
            </div>
        </div>
      </div>
    )
  }
}
