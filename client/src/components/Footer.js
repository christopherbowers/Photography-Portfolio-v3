import styles from './Footer.module.scss'

export default function Footer() {

  const year = new Date().getFullYear()

  return (
    <section className={styles.footer}>
      <p>Designed &amp; Built by Christopher Bowers</p>
      <p>Copyright &copy; 2005&ndash;{year}</p>
    </section>
  )
}
