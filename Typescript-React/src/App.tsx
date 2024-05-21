import { useState } from 'react'
import './App.css'

type SampleProps = {
  id?: number,
  title: string | null,
  desc?: string,
  state? : 'open' | 'closed',
  children : React.ReactNode
}

const BUTTONSTYLES = {
  'width': '5em'
}

function App({ children, title, ...props }: SampleProps) {
  const [CurrentTitle, setCurrentTitle] = useState<string | null>(title)

  const setNewTitle = (title: string) => {
    setCurrentTitle(title);
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setNewTitle(`Random Title ${Math.random()}`);
  }

  return (
    <>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>{CurrentTitle}</h1>
          <h1>{props.state}</h1>
          <h1>{children}</h1>
          <button
            style={BUTTONSTYLES}
          >Change Title</button>
        </form>
      </div>
    </>
  )
}

export default App
