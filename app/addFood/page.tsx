import CreateFood from '@/components/CreateFood'
import { USER } from '@/signals'
import React from 'react'

const AddFood = () => {
  return (
    <div>
      {USER.value? <p>Přihlaš se, abys mohl přidávat obash</p>:
      <CreateFood />}
   </div>
  )
}

export default AddFood