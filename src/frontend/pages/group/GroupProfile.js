import React from 'react'
import { Layout, Card } from 'antd'

const styles = {
  container: {
    width: '100%',
  },
}

const GroupProfile = ({ group }) => {
  return (
    <Layout style={styles.container}>
      <Card
        title="Group Info"
        bodyStyle={{ width: '100%' }}
      >
        <div>
          <div>{group.about}</div>
        </div>
      </Card>
      <Card
        title="Group Type"
        bodyStyle={{ width: '100%' }}
      >
        <div>
          <div>{group.type.toUpperCase()}</div>
          <div>Total Members: {group.members.length}</div>      
        </div>
      </Card>
    </Layout>
  )
}

export default GroupProfile
