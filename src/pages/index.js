import Head from 'next/head'

import Hero from '@Components/Hero/Hero'

import styles from '@Source/styles/Home.module.css'

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<Hero />
			</main>
		</>
	)
}
