import React, { Component } from 'react'
import { Card, Button } from 'antd';

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
    },
    bigText: {
        fontSize: '40px',
    },
    subText:{
        fontSize: '20px',
    }
}

export default class Events extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.mainText}>EVENTS</h1>
        <div style={styles.cardsBody}>
            <div style={styles.cards}>
                <Card>
                    <p style={styles.bigText}>WELCOME TO STACKLEAGUE</p>
                    <p style={styles.subText}>The World's Largest E-Competition for Coders</p>
                    <p>Cupidatat magna ullamco irure ullamco ut. Reprehenderit non sit laboris velit. Dolore cupidatat cupidatat laborum duis fugiat ipsum Lorem laborum proident ipsum est duis enim. Occaecat quis ipsum laborum id sit ad elit.</p>              
                    <Button size="large" type="primary">Learn More</Button>                                                  
                    <Button size="large" type="primary">Sign Up</Button>                                                  
                    
                </Card>
            </div>
            <div style={styles.cards}>
                <div style={{display:'flex'}}>
                    <Card 
                        bordered={false}
                        style={{width:'50%'}}           
                        cover={<img alt="example" src="https://steamcdn-a.akamaihd.net/steam/apps/252950/header.jpg?t=1522783996" />}
                    >            
                    </Card>
                    <Card 
                        bordered={false}           
                        style={{width:'50%'}}           
                        cover={<img alt="example" src="https://steamcdn-a.akamaihd.net/steam/apps/252950/header.jpg?t=1522783996" />}
                    >            
                    </Card>
                </div>
                <div style={{display:'flex'}}>
                    <Card 
                        bordered={false}
                        style={{width:'50%'}}           
                        cover={<img alt="example" src="https://steamcdn-a.akamaihd.net/steam/apps/252950/header.jpg?t=1522783996" />}
                    >            
                    </Card>
                    <Card 
                        bordered={false}           
                        style={{width:'50%'}}           
                        cover={<img alt="example" src="https://steamcdn-a.akamaihd.net/steam/apps/252950/header.jpg?t=1522783996" />}
                    >            
                    </Card>
                </div>
                <div style={{display:'flex'}}>
                    <Card 
                        bordered={false}
                        style={{width:'50%'}}           
                        cover={<img alt="example" src="https://steamcdn-a.akamaihd.net/steam/apps/252950/header.jpg?t=1522783996" />}
                    >            
                    </Card>
                    <Card 
                        bordered={false}           
                        style={{width:'50%'}}           
                        cover={<img alt="example" src="https://steamcdn-a.akamaihd.net/steam/apps/252950/header.jpg?t=1522783996" />}
                    >            
                    </Card>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
