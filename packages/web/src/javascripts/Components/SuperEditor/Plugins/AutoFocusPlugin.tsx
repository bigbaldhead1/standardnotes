import { useApplication } from '@/Components/ApplicationProvider'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Platform } from '@standardnotes/snjs'
import { useEffect, useState } from 'react'

export default function AutoFocusPlugin({ isTemplateNote }: { isTemplateNote: boolean }) {
  const application = useApplication()
  const [editor] = useLexicalComposerContext()
  const [didInitialFocus, setDidInitialFocus] = useState(false)

  useEffect(() => {
    if (!isTemplateNote) {
      return
    }
    if (application.platform !== Platform.Ios) {
      editor.focus()
      return
    }
    return editor.registerUpdateListener(() => {
      if (didInitialFocus) {
        return
      }
      const rootElement = editor.getRootElement()
      if (!rootElement) {
        return
      }
      rootElement.focus()
      setDidInitialFocus(true)
    })
  }, [application.platform, didInitialFocus, editor, isTemplateNote])

  return null
}
