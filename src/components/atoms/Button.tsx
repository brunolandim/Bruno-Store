import React from 'react'

type ButtonValues = {
    text:string
    css:string
}

export default function Button({text, css }:ButtonValues) {
  return (
    <button 
        type='button'
        className={css}
        >{text}
     </button>
  )
}
