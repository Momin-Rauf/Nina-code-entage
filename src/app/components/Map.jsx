'use client'
import React from 'react'
import {GoogleMap,InfoWindowF,MarkerF,useJsApiLoader} from '@react-google-maps/api'
import LocationSearch from './LocationSearch';

const Map = () => {
  return (
    <div className='min-h-screen bg-white'>
      <LocationSearch />
    </div>
  )
}

export default Map
