import React from 'react'
import Channels from '../components/channels'
import Teams from '../components/teams'
import Messages from '../components/messages'
import Input from '../components/input'
import Header from '../components/header'
import AppLayout from '../components/appLayout'

export default () => (
  <AppLayout>
    <Teams>Teams</Teams>
    <Channels>Channels</Channels>
    <Header>Header</Header>
    <Messages>
      <ul className="message-list">
        <li></li>
        <li></li>
      </ul>
    </Messages>
    <Input>
      <input type="text" placeholder=""/>
    </Input>
  </AppLayout>
)
