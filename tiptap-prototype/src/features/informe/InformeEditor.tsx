import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { InformeToolbar } from './InformeToolbar'
import type { InformeEditorProps } from './types'

export function InformeEditor({ onEditorReady }: InformeEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
        'data-placeholder': 'Escribí el informe aquí...',
      },
    },
  })

  useEffect(() => {
    if (editor) {
      onEditorReady(editor)
    }
  }, [editor, onEditorReady])

  if (!editor) return null

  return (
    <div className="tiptap-editor flex flex-col flex-1">
      <InformeToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="flex-1 overflow-y-auto"
      />
    </div>
  )
}
