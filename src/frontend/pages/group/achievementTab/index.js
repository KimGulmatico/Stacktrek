import React, { Component } from 'react'
import {Layout} from 'antd'
import Achievement from './Achievement'
const styles = {
    container: {
      width: '100%',
      padding: '16px',
   },
};

const GroupAchievement = ({ achievements }) => {
 return(
  <Layout style={styles.container}>
    <Achievement achievements={achievements} />
  </Layout>
 )
}

export default GroupAchievement
