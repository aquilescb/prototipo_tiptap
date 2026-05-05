import type { Editor } from '@tiptap/react'

export type TextAlignment = 'left' | 'center' | 'right' | 'justify'

export interface InformeToolbarProps {
  editor: Editor
}

export interface InformeEditorProps {
  onEditorReady: (editor: Editor) => void
}
