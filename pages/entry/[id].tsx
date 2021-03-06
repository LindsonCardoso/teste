import { useRouter } from 'next/router'

import { useEntry } from '@/lib/swr-hooks'
import Container from '@/components/container'
import Nav from '@/components/nav'

export default function EditEntryPage() {
  const router = useRouter()
  const id = router.query.id?.toString()
  const { data } = useEntry(id)

  if (data) {
    return (
      <>
        <Nav name="View" />
        <Container>
          <h1 className="font-bold text-3xl my-2">{data.name}</h1>
          <p>{data.cpf}</p>
        </Container>
      </>
    )
  } else {
    return (
      <>
        <Nav name="View" />
        <Container>
          <h1 className="font-bold text-3xl my-2">...</h1>
          <p>...</p>
        </Container>
      </>
    )
  }
}
