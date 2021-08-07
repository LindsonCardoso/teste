import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

import Button from '../button'

export default function EntryForm() {
  const [_name, setName] = useState('')
  const [_cpf, setCpf] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { id, name, cpf } = router.query

  useEffect(() => {
    if (typeof name === 'string') {
      setName(name)
    }
    if (typeof cpf === 'string') {
      setCpf(cpf)
    }
  }, [name, cpf])

  async function submitHandler(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/edit-entry', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title: _name,
          content: _cpf,
        }),
      })
      const json = await res.json()
      setSubmitting(false)
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="my-4">
        <label htmlFor="title">
          <h3 className="font-bold">Title</h3>
        </label>
        <input
          id="title"
          className="shadow border rounded w-full"
          type="text"
          name="title"
          value={_name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="content">
          <h3 className="font-bold">Content</h3>
        </label>
        <textarea
          className="shadow border resize-none focus:shadow-outline w-full h-48"
          id="content"
          name="content"
          value={_cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
      </div>
      <Button disabled={submitting} type="submit">
        {submitting ? 'Saving ...' : 'Save'}
      </Button>
    </form>
  )
}
