import styles from './Hero.module.css'

const HERO_DATA = [
	{
		src: 'https://lh3.googleusercontent.com/p3RstY0klewDCFQPdhJfP_G67nqWaFcfF47jzjwzeMIIqU7Pnt-owUd1GheBd5UnKFRO0XpSV1RlQ_-6uahCvTXAeV3SsbryrQPrwc8LW7kDJqRTvAOjCvd7vANLf_cYy2RSS9SWjWZgw-ng6iNZCn2wtwAM58a5xszmC6MwzI916kGEpB5S7NAM-0ya9aL6',
		alt: 'Interior Design',
	},
	{
		src: 'https://cdn.autonomous.ai/static/upload/images/common/upload/20210209/MacBook-Desk-Setup-A-Complete-Guide-for-Apple-Lovers_27e2fe6dd0d.jpg',
		alt: 'MacBook Desk Setup',
	},
	{
		src: 'http://www.bigc.co.th/blog/wp-content/uploads/2021/03/skin-care-cosmetology-products-UJ5MP5C.jpg',
		alt: 'Hydrating Milky Toner',
	},
	{
		src: 'https://static.onecms.io/wp-content/uploads/sites/34/2022/03/02/new-clothes-clothing-rack-getty-0222-2000.jpg',
		alt: 'Clothes on rack',
	},
]

const Hero = () => {
	return (
		<section className={styles.hero}>
			{HERO_DATA.map(({ src, alt }) => (
				<img className={styles.image} key={alt} src={src} alt={alt} />
			))}
		</section>
	)
}

export default Hero
