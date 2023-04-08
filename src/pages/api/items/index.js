import { connectDatabase, getItems } from '@Utils/db'

const handler = async (req, res) => {
	let client
	let items

	if (req.method === 'GET') {
		try {
			client = await connectDatabase()
		} catch (error) {
			res.status(500).json({ message: 'Connecting to the database failed' })

			return
		}

		try {
			items = await getItems({ client })
		} catch (error) {
			res.status(500).json({ message: 'Loading data failed' })

			client.close()
			return
		}

		res.status(200).json({ items })
	}
	
	client.close()
}

export default handler
