import Section from './Section'
import styles from './AboutClean.module.css'

export default function AboutClean() {
  return (
    <Section id="about" title="About">
      <div className={styles.content}>
        <p className={styles.text}>
          I build software that works. Started with Python and Lua, moved into web development 
          with React and Next.js. Built everything from game server frameworks to modern web applications.
        </p>
        <p className={styles.text}>
          Self-taught. No formal CS degree. Just years of building, breaking, fixing, and learning.
        </p>
        
        <div className={styles.stack}>
          <h3 className={styles.stackTitle}>Current Stack</h3>
          <div className={styles.stackGrid}>
            <span>Python</span>
            <span>Lua</span>
            <span>JavaScript/TypeScript</span>
            <span>React</span>
            <span>Next.js</span>
            <span>Firebase</span>
            <span>Node.js</span>
            <span>Dart/Flutter</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
