import { MongoClient, ObjectId } from 'mongodb'

export const connectDatabase = async () => {
	const client = await MongoClient.connect(
		'mongodb+srv://mpocwiardowski:tnmLqEI56WyjzMJU@cluster0.vlusofg.mongodb.net/simpleShop?retryWrites=true&w=majority'
	)

	return client
}

export const getItem = async ({ client, id }) => {
	const db = client.db()

	const item = await db.collection('products').findOne({
		_id: new ObjectId(id),
	})

	return item
}

export const getItems = async ({ client }) => {
	const db = client.db()

	const items = await db.collection('products').find().sort({ _id: -1 }).toArray()

	return items
}

export const getRecommendedItems = async ({ client, category }) => {
	const db = client.db()

	const recommendedItems = await db.collection('products').find({ category }).toArray()

	return recommendedItems
}
