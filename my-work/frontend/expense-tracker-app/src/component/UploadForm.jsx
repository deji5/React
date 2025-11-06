import React, { useState } from 'react'

export default function UploadForm({onUploaded}){
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  async function handle(e){
    e.preventDefault()
    if(!file) return alert('Select a file')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('caption', caption)
    try{
      await uploadPhoto(fd)
      setFile(null); setCaption('')
      onUploaded?.()
    }catch(err){ alert('Upload failed') }
  }
  return (
    <form onSubmit={handle} style={{display:'grid', gap:8}}>
      <input type='file' accept='image/*' onChange={e=>setFile(e.target.files[0])} />
      <input value={caption} onChange={e=>setCaption(e.target.value)} placeholder='caption' />
      <button type='submit'>Upload</button>
    </form>
  )
}