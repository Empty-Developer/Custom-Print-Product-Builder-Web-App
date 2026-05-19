"use client"

import React from 'react'
import UploadImage from '../Sharable/UploadImage'
import SearchImages from '../Sharable/SearchImages';

function AddImageSetting() {
  return (
    <div className="w-full p-2">
      <UploadImage />
      <SearchImages />
    </div>
  )
}

export default AddImageSetting;