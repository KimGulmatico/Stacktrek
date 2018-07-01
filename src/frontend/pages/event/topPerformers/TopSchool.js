import React from 'react'
import userPlaceholder from '../../../../../public/img/default-human.svg'

const TopSchool = (props) => {
  const { school } = props
  return (
    <div className="top-performers-container">
      <span className="top-performers-header">TOP SCHOOL</span>
      <p className="top-performers-sub">HIGHEST WINNINGS</p>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div className="top-performers-thumbnail"style={{ width: '32%', padding: '8px' }}>
          <div >
            <img style={{ width: '80%' }} src={userPlaceholder} alt={school.name} />
          </div>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.9em' }}>{school.name.toUpperCase()}</span>
            <p style={{ fontSize: '0.2em' }}>{school.event.toUpperCase()}</p>
            <span style={{
              fontSize: '0.7em',
              color: '#115192',
            }}
            >
              {`$ ${school.winnings.toLocaleString()} WON`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopSchool
