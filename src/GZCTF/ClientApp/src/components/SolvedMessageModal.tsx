import { Box, Button, Group, Modal, ModalProps, Text } from '@mantine/core'
import { useReducedMotion } from '@mantine/hooks'
import { mdiCheckDecagram } from '@mdi/js'
import { Icon } from '@mdi/react'
import React, { FC, useEffect, useRef, useState } from 'react'

export interface SolvedMessageModalProps extends ModalProps {
  /** The story message to reveal one character at a time */
  message: string
  /** Milliseconds per character (default 45) */
  speed?: number
}

/**
 * Shows a challenge's SolvedMessage with a typewriter (character-by-character) reveal.
 * Opened after a flag is Accepted, or when a solved challenge is reopened.
 */
export const SolvedMessageModal: FC<SolvedMessageModalProps> = (props) => {
  const { message, speed = 45, opened, ...modalProps } = props

  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    window.clearTimeout(timer.current)

    if (!opened) {
      setShown('')
      setDone(false)
      return
    }

    // Respect reduced-motion: show the whole message at once
    if (reduceMotion) {
      setShown(message)
      setDone(true)
      return
    }

    let i = 0
    setShown('')
    setDone(false)

    const step = () => {
      if (i >= message.length) {
        setDone(true)
        return
      }
      const ch = message[i]
      i += 1
      setShown(message.slice(0, i))
      // a short beat at line breaks for a more "spoken" feel
      timer.current = window.setTimeout(step, ch === '\n' ? speed * 6 : speed)
    }

    timer.current = window.setTimeout(step, speed * 4)

    return () => window.clearTimeout(timer.current)
  }, [opened, message, speed, reduceMotion])

  const skip = () => {
    window.clearTimeout(timer.current)
    setShown(message)
    setDone(true)
  }

  return (
    <Modal
      {...modalProps}
      opened={opened}
      centered
      size="md"
      title={
        <Group gap="xs">
          <Icon path={mdiCheckDecagram} size={1} color="var(--mantine-color-teal-5)" />
          <Text fw={700}>H의 메시지</Text>
        </Group>
      }
    >
      <Box
        style={{
          minHeight: 120,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: 'var(--mantine-font-family-monospace)',
          lineHeight: 1.75,
          fontSize: 15,
        }}
      >
        {shown}
        {!done && (
          <Box
            component="span"
            style={{
              display: 'inline-block',
              width: 9,
              height: '1.1em',
              marginLeft: 2,
              verticalAlign: 'text-bottom',
              background: 'var(--mantine-color-grape-5)',
              animation: 'solvedmsg-blink 1s steps(1) infinite',
            }}
          />
        )}
      </Box>

      <style>{`@keyframes solvedmsg-blink { 50% { opacity: 0; } }`}</style>

      <Group justify="flex-end" mt="md">
        {!done && (
          <Button variant="default" size="xs" onClick={skip}>
            전체 보기
          </Button>
        )}
        <Button size="xs" onClick={() => modalProps.onClose()}>
          닫기
        </Button>
      </Group>
    </Modal>
  )
}

export default SolvedMessageModal
