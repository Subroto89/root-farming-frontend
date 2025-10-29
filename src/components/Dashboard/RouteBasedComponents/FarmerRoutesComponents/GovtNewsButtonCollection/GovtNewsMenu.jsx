import React from 'react'
import { NavLink } from 'react-router'

const GovtNewsMenu = (linkSetter) => {
  return (
    <div>
        <NavLink
            label="Krishi Biponon Licence"
            onClick={linkSetter}
        />
        <NavLink
            label="Ajker Bazar Offer"
            onClick={linkSetter}
        />
       
    </div>
  )
}

export default GovtNewsMenu