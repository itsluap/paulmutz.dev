import styles from './FooterClean.module.css'

export default function FooterClean() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.cta}>Let's build something.</p>
          <div className={styles.links}>
            <a href="https://github.com/itsluap" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/paul-mutz-494859275" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:paulmutzjr@icloud.com">Email</a>
          </div>
        </div>
        <p className={styles.copyright}>© {new Date().getFullYear()} Paul Mutz</p>
      </div>
    </footer>
  )
}
