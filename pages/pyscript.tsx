import Editor, { Monaco } from "@monaco-editor/react"
import { useRef } from "react"

export default function Pyscript() {
  const editorRef = useRef(null)

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    console.log("hhh", editor, monaco)
    editorRef.current = editor
  }

  return (
    <div>
      {/* <Script defer src="https://pyscript.net/latest/pyscript.js" /> */}
      <link rel="stylesheet" href="https://pyscript.net/latest/pyscript.css" />

      {/* <pyscript-repl>print("test")</pyscript-repl> */}

      <Editor
        height="90vh"
        defaultLanguage="python"
        defaultValue="# some comment"
        onMount={handleEditorDidMount}
      />
    </div>
  )
}
