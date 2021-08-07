import Entry from './entry'

function Entries({ entries }) {
  if (entries) {
    return (
      <div>
        {entries.map((e) => (
          <div key={e.id} className="py-2">
            <Entry id={e.id} name={e.titlename} cpf={e.cpf} />
          </div>
        ))}
      </div>


    )
  } else {
    return null
  }
}

export default Entries
