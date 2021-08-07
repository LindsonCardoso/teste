import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { name, cpf } = req.body
  try {
    if (!name || !cpf) {
      return res
        .status(400)
        .json({ message: '`title` and `content` are both required' })
    }

    const results = await query(
      `
      INSERT INTO cad_empresa 
      (
       cli_nome, 
       cli_documento
       )
      VALUES (?, ?)
      `,
      [filter.clean(name), filter.clean(cpf)]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
