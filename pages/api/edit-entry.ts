import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { id, name, cpf } = req.body
  try {
    if (!id || !name || !cpf) {
      return res
        .status(400)
        .json({ message: '`id`,`title`, and `content` are all required' })
    }

    const results = await query(
      `
      UPDATE cad_empresa
      SET cli_nome = ?, cpf = ?
      WHERE cli_id = ?
      `,
      [filter.clean(name), filter.clean(cpf), id]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
