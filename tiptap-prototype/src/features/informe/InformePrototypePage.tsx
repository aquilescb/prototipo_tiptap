import { useCallback, useState } from 'react'
import type { Editor } from '@tiptap/react'
import { Save, Trash2, FileText } from 'lucide-react'
import { InformeEditor } from './InformeEditor'

function countWords(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

export function InformePrototypePage() {
  const [editor, setEditor] = useState<Editor | null>(null)
  const [wordCount, setWordCount] = useState(0)

  const handleEditorReady = useCallback((editorInstance: Editor) => {
    setEditor(editorInstance)

    editorInstance.on('update', () => {
      const text = editorInstance.getText()
      setWordCount(countWords(text))
    })
  }, [])

  const handleSave = () => {
    if (!editor) return
    const json = editor.getJSON()
    console.log('[Informe] Contenido guardado:', json)
  }

  const handleClear = () => {
    if (!editor) return
    editor.commands.clearContent(true)
    setWordCount(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-600 rounded-lg">
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-gray-900 leading-tight">Editor de Informes</h1>
              <p className="text-xs text-gray-500">Prototipo TipTap</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 mr-2">
              {wordCount} {wordCount === 1 ? 'palabra' : 'palabras'}
            </span>
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-150"
            >
              <Trash2 size={14} />
              Limpiar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-150 shadow-sm"
            >
              <Save size={14} />
              Guardar
            </button>
          </div>
        </div>
      </header>

      {/* Editor area */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <InformeEditor onEditorReady={handleEditorReady} />
        </div>

        {/* Footer info */}
        <div className="mt-3 flex justify-between items-center px-1">
          <p className="text-xs text-gray-400">
            Tip: Usá <kbd className="px-1 py-0.5 text-xs font-mono bg-gray-100 border border-gray-300 rounded">Ctrl+B</kbd> negrita,{' '}
            <kbd className="px-1 py-0.5 text-xs font-mono bg-gray-100 border border-gray-300 rounded">Ctrl+I</kbd> cursiva,{' '}
            <kbd className="px-1 py-0.5 text-xs font-mono bg-gray-100 border border-gray-300 rounded">Ctrl+U</kbd> subrayado
          </p>
          <p className="text-xs text-gray-400">{wordCount} {wordCount === 1 ? 'palabra' : 'palabras'}</p>
        </div>
      </main>
    </div>
  )
}
