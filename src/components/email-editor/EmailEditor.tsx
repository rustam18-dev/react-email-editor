import styles from './EmailEditor.module.scss'
import {Bold, Eraser, Italic, Underline} from "lucide-react";
import parse from 'html-react-parser'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {emailService} from "../../services/email.service";
import {useEditor} from "./useEditor";

export function EmailEditor() {
  const {text, textRef, setText, applyFormat, updateSelection} = useEditor()

  const queryClient = useQueryClient()

  const {mutate, isPending} = useMutation({
    mutationKey: ['create email'],
    mutationFn: () => emailService.sendEmail(text),
    onSuccess: () => {
      setText('')
      queryClient.refetchQueries({queryKey: ['email list']})
    }
  })

  return (
    <>
      <div>
        <h1>Email editor</h1>
        {text && <div className={styles.preview}>{parse(text)}</div>}
        <div className={styles.card}>
        <textarea
          ref={textRef}
          className={styles.editor}
          spellCheck={false}
          onSelect={updateSelection}
          value={text}
          onChange={e => {
            setText(e.target.value)
          }}
        >
          {text}
        </textarea>
          <div className={styles.actions}>
            <div className={styles.tools}>
              <button><Eraser size={16} onClick={() => {
                setText('')
              }}/></button>
              <button><Bold size={16} onClick={() => applyFormat('bold')}/></button>
              <button><Italic size={16} onClick={() => applyFormat('italic')}/></button>
              <button><Underline size={16} onClick={() => applyFormat('underline')}/></button>
            </div>
            <button disabled={isPending} onClick={() => mutate()}>Send now</button>
          </div>
        </div>
      </div>
    </>
  )
}
