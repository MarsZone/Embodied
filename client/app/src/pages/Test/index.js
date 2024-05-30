import React from 'react'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { request } from '@/utils'
import { previewFileApi, uploadFileApi } from '@/apis/file'
import { Image, Uploader, Cell } from 'react-vant'
import FileUpload from '@/components/fileUpload'

const Test = () => {

  return (
    <Uploader defaultValue={demoData} upload={upload} />

  )
}


export default Test