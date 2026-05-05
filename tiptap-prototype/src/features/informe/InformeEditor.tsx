import { useEffect, useReducer } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { InformeToolbar } from './InformeToolbar'
import type { InformeEditorProps } from './types'

export function InformeEditor({ onEditorReady }: InformeEditorProps) {
  // Fuerza re-render del componente cuando el cursor se mueve,
  // para que isActive() devuelva valores frescos en InformeToolbar.
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '',
    onSelectionUpdate: forceUpdate,
    editorProps: {
      attributes: {
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
    <div className="tiptap-editor">
      <InformeToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
