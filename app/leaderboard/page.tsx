import Leaderboard from '@/components/Leaderboard'
import React from 'react'
import { FoodsProvider, useFood } from '../foodContext'

const LeaderboardPage = () => {
    const {Foods} = useFood()
    if (!Foods.value ){
        return <p>počkejte na načtení jídel</p>
    }
  return (
<>
    <Leaderboard Foods={Foods.value}/>
  </>
  )
}

export default LeaderboardPage