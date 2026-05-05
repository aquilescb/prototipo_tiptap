import { Bold, Italic, Underline, List, Heading2 } from "lucide-react";
import type { InformeToolbarProps } from "./types";
import { useEditorState } from "@tiptap/react";
interface ToolbarButtonProps {
   onClick: () => void;
   isActive?: boolean;
   title: string;
   children: React.ReactNode;
}

function ToolbarButton({
   onClick,
   isActive = false,
   title,
   children,
}: ToolbarButtonProps) {
   return (
      <button
         type="button"
         onClick={onClick}
         title={title}
         className={[
            "p-2 rounded-md transition-all duration-150 flex items-center justify-center",
            isActive
               ? "bg-indigo-100 text-indigo-700"
               : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
         ].join(" ")}
      >
         {children}
      </button>
   );
}

function Divider() {
   return <div className="w-px h-6 bg-gray-200 mx-1" />;
}

export function InformeToolbar({ editor }: InformeToolbarProps) {
   useEditorState({
      editor,
      selector: ({ editor }) => ({
         isBold: editor.isActive("bold"),
         isItalic: editor.isActive("italic"),
         isUnderline: editor.isActive("underline"),
         isH2: editor.isActive("heading", { level: 2 }),
         isBullet: editor.isActive("bulletList"),
      }),
   });

   return (
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-200 bg-gray-50">
         {/* Formato de texto */}
         <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Negrita (Ctrl+B)"
         >
            <Bold size={16} />
         </ToolbarButton>

         <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Cursiva (Ctrl+I)"
         >
            <Italic size={16} />
         </ToolbarButton>

         <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Subrayado (Ctrl+U)"
         >
            <Underline size={16} />
         </ToolbarButton>

         <Divider />

         {/* Encabezados */}

         <ToolbarButton
            onClick={() =>
               editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            title="Título 2"
         >
            <Heading2 size={16} />
         </ToolbarButton>

         <Divider />

         {/* Listas */}
         <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Lista con viñetas"
         >
            <List size={16} />
         </ToolbarButton>
      </div>
   );
}
