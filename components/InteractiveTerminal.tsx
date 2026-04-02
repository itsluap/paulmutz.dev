'use client'

import { useEffect, useRef, useState, useCallback, type ReactNode, type KeyboardEvent } from 'react'
import styles from './InteractiveTerminal.module.css'
import { projects, terminalContent, siteLinks } from '../data/portfolio'

interface TerminalLine {
  type: 'command' | 'output'
  content: string
}

interface InteractiveTerminalProps {
  variant: 'desktop' | 'mobile'
  headshotSlot?: ReactNode
}

const COMMANDS: Record<string, { description: string }> = {
  help:     { description: 'Show available commands' },
  whoami:   { description: 'Who am I?' },
  neofetch: { description: 'System info, developer style' },
  ls:       { description: 'List files' },
  'cat about.txt':     { description: 'About me' },
  'cat education.txt': { description: 'My education' },
  'ls projects/':      { description: 'List projects' },
  'sudo hire paul':    { description: '???' },
  clear:    { description: 'Clear terminal' },
}

function processCommand(input: string): string {
  const trimmed = input.trim()
  const lower = trimmed.toLowerCase()

  if (lower === 'help') {
    const lines = ['Available commands:', '']
    for (const [cmd, { description }] of Object.entries(COMMANDS)) {
      lines.push(`  ${cmd.padEnd(22)} ${description}`)
    }
    lines.push('')
    lines.push("Try typing any command. I won't judge... much.")
    return lines.join('\n')
  }

  if (lower === 'whoami') {
    return 'Paul Mutz — Developer & Systems Integrator\nAlchemy Industrial'
  }

  if (lower === 'neofetch') {
    return terminalContent.neofetch
  }

  if (lower === 'ls' || lower === 'ls .') {
    return 'about.txt  education.txt  projects/  resume.pdf'
  }

  if (lower === 'ls projects/' || lower === 'ls projects') {
    const lines = projects.map((p) =>
      `drwxr-xr-x  ${p.year.padEnd(14)} ${p.title}`
    )
    return lines.join('\n')
  }

  if (lower === 'cat about.txt') {
    return terminalContent.aboutTxt
  }

  if (lower === 'cat education.txt') {
    return terminalContent.educationTxt
  }

  if (lower === 'cat resume.pdf') {
    return "It's a PDF, not a text file. Nice try though.\nEmail me at paulmutzjr@icloud.com and I'll send it over."
  }

  if (lower.startsWith('cat /etc/passwd') || lower.startsWith('cat /etc/shadow')) {
    return "Nice try. Here's my email instead: paulmutzjr@icloud.com"
  }

  if (lower.startsWith('cat ')) {
    const file = trimmed.slice(4)
    return `cat: ${file}: No such file or directory`
  }

  if (lower === 'sudo hire paul') {
    return terminalContent.hireResponse
  }

  if (lower.startsWith('sudo ')) {
    return `${trimmed.slice(5)}: permission denied. Try 'sudo hire paul' instead.`
  }

  if (lower === 'rm -rf /' || lower === 'rm -rf /*' || lower === 'rm -rf / --no-preserve-root') {
    return "Nice try. I too like to live dangerously."
  }

  if (lower.startsWith('rm ')) {
    return "I'm not deleting anything. This is a portfolio, not a sandbox."
  }

  if (lower === 'clear') {
    return '__CLEAR__'
  }

  if (lower === 'pwd') {
    return '/home/visitor/paulmutz.dev'
  }

  if (lower.startsWith('cd ')) {
    return "There's nowhere to go. You're already where you need to be."
  }

  if (lower.startsWith('echo ')) {
    return trimmed.slice(5)
  }

  if (lower === 'exit' || lower === 'quit') {
    return "You can check out any time you like, but you can never leave.\n\n...kidding. Just close the tab."
  }

  if (lower === 'vim' || lower === 'nano' || lower === 'emacs') {
    return `${trimmed}: not installed. This is a read-only portfolio.\nBut if you want to argue about editors, email me.`
  }

  if (lower === 'git status') {
    return `On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, portfolio is clean`
  }

  if (lower === 'git log') {
    return `commit abc1234 (HEAD -> main)
Author: Paul Mutz
Date:   Today

    Made the terminal actually interactive

commit def5678
Author: Paul Mutz
Date:   A while ago

    Built the whole portfolio, it was a journey`
  }

  if (lower === 'node' || lower === 'python' || lower === 'python3') {
    return `${trimmed}: interactive mode not supported.\nBut I write plenty of ${lower === 'node' ? 'JavaScript' : 'Python'}. Check out my projects.`
  }

  if (lower === 'curl' || lower.startsWith('curl ') || lower.startsWith('wget ')) {
    return "No internet access from here. Try 'ls projects/' instead."
  }

  if (lower === 'man' || lower.startsWith('man ')) {
    return "No manual available. Try 'help' for available commands."
  }

  if (lower === 'history') {
    return "Your command history is local to this session. I'm not tracking you."
  }

  if (lower === 'date') {
    return new Date().toString()
  }

  if (lower === 'uptime') {
    return '5+ years and counting. No plans to reboot.'
  }

  if (lower === '') {
    return ''
  }

  const responses = terminalContent.notFound
  const idx = Math.floor(Math.random() * responses.length)
  return `bash: ${trimmed}: ${responses[idx]}`
}

export default function InteractiveTerminal({ variant, headshotSlot }: InteractiveTerminalProps) {
  const [history, setHistory] = useState<TerminalLine[]>([])
  const [inputValue, setInputValue] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [introComplete, setIntroComplete] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [typewriterStarted, setTypewriterStarted] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const terminalBodyRef = useRef<HTMLDivElement>(null)

  const isMobile = variant === 'mobile'

  // Scroll to bottom when history changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history, typedText])

  // Start typewriter after CSS animations finish (phase 3 delay + animation duration)
  // Phase 3 starts at 2.4s delay, so typewriter kicks in around then
  useEffect(() => {
    const timer = setTimeout(() => setTypewriterStarted(true), 2600)
    return () => clearTimeout(timer)
  }, [])

  // Typewriter — the only JS-driven animation
  const missionText = 'I build software that solves problems.'
  useEffect(() => {
    if (!typewriterStarted) return

    let index = 0
    const interval = setInterval(() => {
      if (index <= missionText.length) {
        setTypedText(missionText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
        setTimeout(() => setIntroComplete(true), 500)
      }
    }, 55)

    return () => clearInterval(interval)
  }, [typewriterStarted])

  // Focus input when intro completes
  useEffect(() => {
    if (introComplete && inputRef.current) {
      inputRef.current.focus()
    }
  }, [introComplete])

  const handleCommand = useCallback((cmd: string) => {
    const result = processCommand(cmd)

    if (result === '__CLEAR__') {
      setHistory([])
      return
    }

    const newLines: TerminalLine[] = [
      { type: 'command', content: cmd }
    ]

    if (result !== '') {
      newLines.push({ type: 'output', content: result })
    }

    setHistory(prev => [...prev, ...newLines])

    if (cmd.trim()) {
      setCommandHistory(prev => [cmd, ...prev])
    }
    setHistoryIndex(-1)
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue)
      setInputValue('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[newIndex])
      } else {
        setHistoryIndex(-1)
        setInputValue('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const partial = inputValue.toLowerCase()
      if (partial) {
        const match = Object.keys(COMMANDS).find(cmd => cmd.startsWith(partial))
        if (match) setInputValue(match)
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      setInputValue('')
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setHistory([])
    }
  }

  const handleTerminalClick = () => {
    if (introComplete && inputRef.current) {
      inputRef.current.focus()
    }
  }

  const renderOutput = (content: string) => {
    const lines = content.split('\n')
    return lines.map((line, i) => {
      const cleaned = line.replace(/\x1b\[\d+m/g, '')
      const isCyan = line.includes('\x1b[36m')

      if (isCyan || (i < 6 && content.includes('____'))) {
        return <div key={i} className={styles.cyanText}>{cleaned}</div>
      }

      if (cleaned.includes(':') && cleaned.startsWith('  ')) {
        const colonIndex = cleaned.indexOf(':')
        const label = cleaned.slice(0, colonIndex + 1)
        const value = cleaned.slice(colonIndex + 1)
        return (
          <div key={i}>
            <span className={styles.cyanText}>{label}</span>
            <span>{value}</span>
          </div>
        )
      }

      return <div key={i}>{cleaned || '\u00A0'}</div>
    })
  }

  return (
    <div
      className={`${styles.terminal} ${isMobile ? styles.mobile : styles.desktop}`}
      onClick={handleTerminalClick}
    >
      <div className={styles.terminalHeader}>
        <div className={styles.terminalDots}>
          <span></span><span></span><span></span>
        </div>
        <span className={styles.terminalTitle}>
          ~/portfolio {introComplete ? '— interactive' : ''}
        </span>
      </div>

      <div className={styles.terminalBody} ref={terminalBodyRef}>
        {/* All intro elements rendered on mount — CSS handles staggered reveal */}
        <div className={`${styles.introBlock} ${styles.phase1}`}>
          <div className={styles.introLine}>
            <span className={styles.prompt}>$</span> whoami
          </div>
          <div className={styles.introOutput}>
            <div className={styles.whoamiRow}>
              {headshotSlot}
              <span className={styles.nameText}>Paul Mutz</span>
            </div>
          </div>
        </div>

        <div className={`${styles.introBlock} ${styles.phase2}`}>
          <div className={styles.introLine}>
            <span className={styles.prompt}>$</span> cat role.txt
          </div>
          <div className={styles.introOutput}>
            <div className={styles.roleText}>Developer & Systems Integrator</div>
          </div>
        </div>

        <div className={`${styles.introBlock} ${styles.phase3}`}>
          <div className={styles.introLine}>
            <span className={styles.prompt}>$</span> echo $MISSION
          </div>
          <div className={styles.introOutput}>
            <span className={styles.missionText}>
              {typedText}
              {!introComplete && typewriterStarted && <span className={styles.cursor}>_</span>}
            </span>
          </div>
        </div>

        {/* Interactive history */}
        {history.map((line, i) => (
          <div key={i} className={line.type === 'command' ? styles.historyCommand : styles.historyOutput}>
            {line.type === 'command' ? (
              <>
                <span className={styles.prompt}>visitor@paul:~$</span> {line.content}
              </>
            ) : (
              <pre className={styles.outputPre}>{renderOutput(line.content)}</pre>
            )}
          </div>
        ))}

        {/* Input line */}
        {introComplete && (
          <div className={styles.inputLine}>
            <span className={styles.prompt}>visitor@paul:~$</span>
            <div className={styles.inputWrapper}>
              <span className={styles.inputMirror}>{inputValue}</span>
              <span className={styles.cursor}>_</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.hiddenInput}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          </div>
        )}

        {/* Hint after intro */}
        {introComplete && history.length === 0 && (
          <div className={styles.hintText}>
            Type &apos;help&apos; to see what I can do
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
