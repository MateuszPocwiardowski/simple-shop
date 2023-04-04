import { connectDatabase, getItem, getRecommendedItems } from '@Utils/db'

const handler = async (req, res) => {
	let client
	let item
	let recommendedItems

	if (req.method === 'GET') {
		try {
			client = await connectDatabase()
		} catch (error) {
			res.status(500).json({ message: 'Connecting to the database failed' })

			return
		}

		try {
			item = await getItem({ client, id: req.query.id })
			recommendedItems = await getRecommendedItems({ client, category: item.category })
		} catch (error) {
			res.status(500).json({ message: 'Loading data failed' })

			return
		}

		res.status(200).json({ item, recommendedItems })
	}

	await client.close()
}

export default handler
