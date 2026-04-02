'use client'

import Image from 'next/image'
import styles from './ProjectSection.module.css'
import { codeSnippets, type Project } from '../data/portfolio'

interface ProjectSectionProps {
  project: Project
  index: number
  variant: 'desktop' | 'mobile'
}

const fileNames: Record<string, string> = {
  victron: 'victron_monitor.py',
  react: 'useRealtimeData.js',
  lua: 'framework.lua',
}

export default function ProjectSection({ project, index, variant }: ProjectSectionProps) {
  const isMobile = variant === 'mobile'
  const slug = project.title.toLowerCase().replace(/\s+/g, '-')
  const fileName = fileNames[project.codeExample]

  return (
    <div className={`${styles.section} ${isMobile ? styles.mobile : styles.desktop}`}>
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <div className={styles.dots}>
            <span></span><span></span><span></span>
          </div>
          <span className={styles.terminalPath}>projects/{slug}</span>
        </div>

        <div className={styles.terminalBody}>
          {/* Command */}
          <div className={styles.commandLine}>
            <span className={styles.prompt}>$</span> cat projects/{slug}
          </div>

          {/* Project title + year */}
          {index === 0 ? (
            <div className={styles.logoTitleRow}>
              <div className={styles.logos}>
                <Image
                  src="/alchemy_logo_allwhite.png"
                  alt="Alchemy Industrial"
                  width={300}
                  height={75}
                  className={styles.alchemyLogo}
                />
                <span className={styles.logoSep}>×</span>
                <Image
                  src="/integrator-program.png"
                  alt="Victron Energy"
                  width={400}
                  height={143}
                  className={styles.victronLogo}
                />
              </div>
              <span className={styles.year}>{project.year}</span>
            </div>
          ) : (
            <div className={styles.titleRow}>
              <span className={styles.title}>{project.title.toUpperCase()}</span>
              <span className={styles.year}>{project.year}</span>
            </div>
          )}

          {/* Divider */}
          <div className={styles.divider}></div>

          {/* Description */}
          <div className={styles.description}>{project.description}</div>

          {/* Tech */}
          <div className={styles.meta}>{project.tech.join(' / ')}</div>

          {/* Links */}
          {project.links && (
            <div className={styles.links}>
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  onClick={(e) => e.stopPropagation()}
                >
                  → {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Credential label */}
          {index === 0 && (
            <div className={styles.credentialLabel}>Victron Energy Recommended Software Integrator</div>
          )}

          {/* Code section */}
          <div className={styles.codeDivider}>
            <span className={styles.codeFileName}>── {fileName} ──</span>
          </div>
          <pre className={styles.codeBlock}>
            <code>{codeSnippets[project.codeExample]}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
