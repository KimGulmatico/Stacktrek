import React, { Component } from 'react'
import { Card , Button} from 'antd';

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
    cardLeft: {
        width: '40%',
        marginRight: '0.5%',
        textAlign: 'center',
    },
    cardRight: {
        width: '60%',
        textAlign: 'center',
    },
    container:{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: '64px',
    },
    button: {
        margin: '1%',
        width: '72%',
    }
}

export default class EventDetail extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.mainText}>EVENTS</h1>
        <div style={styles.cardsBody}>
            <div style={styles.cardLeft}>
            <Card 
                bordered={false}           
                actions={<div>MORE INFO</div>}
                cover={<img alt="example" src="https://steamcdn-a.akamaihd.net/steam/apps/252950/header.jpg?t=1522783996" />}
            >
                <p>ROCKET LEAGUE</p>
                <p>Enim elit laborum quis sunt dolor laboris laboris id incididunt cillum ipsum veniam sit mollit.</p>
                <Button style={styles.button} size="large" type="primary">REGISTER NOW</Button>              
                <Button style={styles.button} size="large">PARTICIPANTS LIST</Button>                              
            </Card>
            </div>
            <div style={styles.cardRight}>
            <div style={{display:'flex'}}>
            <Card title="Reward" style={{width:'50%',marginBottom:'0.5%'}}>
                <p>Est ea laboris nisi consectetur aute veniam aliquip cillum. Consectetur velit aliqua deserunt velit aliqua voluptate. Lorem id anim commodo tempor adipisicing sint consequat.</p>            
            </Card>
            <Card title="Resources" style={{width:'50%',marginBottom:'0.5%'}}>
                <Button style={styles.button} size="large" type="primary">SAMPLE PROBLEMS</Button>              
                <Button style={styles.button} size="large" type="primary">PROBLEM SOLUTIONS</Button>              
                <Button style={styles.button} size="large" type="primary">REFERENCES</Button>              
            </Card>
            </div>
            <Card>
                <div style={{display:'flex',textAlign:'center'}}>
                    <div style={{width:'50%'}}>
                    <p>Tabuc Suba City,Iloilo</p>
                    <p>APRIL 26 - May 6</p>
                    <p>XXX Participants Registered</p>
                    <Button style={styles.button} size="large" type="primary">SCHEDULES</Button>                                                  
                    </div>              
                    <div style={{width:'50%',alignItems:'center'}}>JOIN NOW</div>
                </div>              
            </Card>
            </div>
        </div>
      </div>
    )
  }
}
