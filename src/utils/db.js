import { MongoClient, ObjectId } from 'mongodb'

const connectionURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.vlusofg.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

export const getBaseURL = () => {
	const baseURL = process.env.NODE_ENV !== 'production' ? process.env.DEV_URL : process.env.PROD_URL

	return baseURL
}

export const connectDatabase = async () => {
	const client = await MongoClient.connect(connectionURL)

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
