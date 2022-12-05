import React from 'react'
import {SiPokemon} from 'react-icons/si';
interface Props {
    text: string;
}

export const Header: React.FC<Props> = ({text}) => {
  return (
    <div className=' border border-transparent'>
        <SiPokemon className='text-8xl fill-yellow-500 mx-3'/>
    </div>
  )
}
