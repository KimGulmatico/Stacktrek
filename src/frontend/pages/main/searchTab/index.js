import React from 'react'
import { Input } from 'antd'

const { Search } = Input

const SearchTab = ({ redirectToSearch }) => (
  <div className="container">
    <Search
      placeholder="Search people by skill, jobs, location..."
      enterButton="Search"
      size="large"
      onFocus={redirectToSearch}
    />
  </div>
)

export default SearchTab
