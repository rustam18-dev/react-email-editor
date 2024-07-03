import {useRef, useState} from "react";
import {applyStyle, TStyle} from "./apply-style";

export function useEditor() {
  const [text, setText] = useState('Enter text')
  const textRef = useRef<HTMLTextAreaElement | null>(null)

  const [seletectionStart, setSelectionStart] = useState(0)
  const [seletectionEnd, setSelectionEnd] = useState(0)

  const updateSelection = () => {
    if (!textRef.current) return
    setSelectionStart(textRef.current.selectionStart)
    setSelectionEnd(textRef.current.selectionEnd)
  }

  const applyFormat = (type: TStyle) => {
    const selectedText = text.substring(seletectionStart, seletectionEnd)
    if (!selectedText) return

    const before = text.substring(0, seletectionStart)
    const after = text.substring(seletectionEnd)

    setText(before + applyStyle(type, selectedText) + after)
  }

  return {
    text,
    textRef,
    setText,
    applyFormat,
    updateSelection
  }
}