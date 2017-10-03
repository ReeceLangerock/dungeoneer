import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, find, render, simulate } from 'enzyme'
import enzymeSerializer from 'enzyme-to-json/serializer'

import { Dungeon } from './../components/Dungeon'
import { DungeonTile } from './../components/DungeonTile'

expect.addSnapshotSerializer(enzymeSerializer)
describe('Dungeon', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Dungeon />, div)
  })

  let component
  let props

  beforeEach(() => {
    props = {}
    component = shallow(<Dungeon {...props} />)
  })

  it('renders correct number of cells', () => {
    expect(component.find(DungeonTile).length).toBe()
  })

  it('matches snapshot', () => {
    const comp = shallow(<Dungeon {...props} />)
    expect(comp).toMatchSnapshot()
  })
})
