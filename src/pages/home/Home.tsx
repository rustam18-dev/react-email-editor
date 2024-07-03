import {EmailEditor} from "../../components/email-editor/EmailEditor.tsx";
import {EmailList} from "../../components/email-list/EmailList.tsx";
import styles from "./Home.module.css"


export function Home() {
  return (
    <div className={styles.main}>
      <EmailEditor/>
      <EmailList />
    </div>
  )
}