import { useState } from 'react'
import './App.css'

type TextType = string | null

type AppProps = {
  id?: number,
  title: TextType,
  desc?: TextType,
  state?: 'open' | 'closed', /* union type */
  children?: React.ReactNode,
  // children : JSX.Element
  // arraySample : number[]
  // tupleSample : [number, number]
  // objectSample : {
  //   something1 : string,
  //   something2 : number
  // }
  // style? : React.CSSProperties
  // specificObjectStructure : Record<string, number>
  // onClick : () => void
  // doSomething : (test: string) => number
  // setCount : React.Dispatch<React.SetStateAction<number>> /* passing in setter from a useState */
  // 
}
/* allows all properties to passthrough, including adding a ref when using a component */
// type ButtonProps = ComponentProps<"button">
// type ButtonProps = ComponentPropsWithRef<"button">
// type ButtonProps = ComponentPropsWithoutRef<"button">
/* can add intersection &, interface uses 'interface name extends name' */
// type ButtonProps = ComponentPropsWithoutRef<"button"> & {
//   someProp? : 'primary' | 'secondary'
// }

/* interface is used to describe objects only */
// interface AppProps{
//   id?: number,
//   title: TextType,
//   desc?: TextType,
// }

const BUTTONSTYLES = {
  'width': '5em'
}

let letTitleOne: string = 'Dynamic';

function App({ children, title, ...props }: AppProps) {
  const [CurrentTitle, setCurrentTitle] = useState<string | null>(title)
  const setNewTitle = (title: string) => {
    setCurrentTitle(title);
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setNewTitle(`${returnSampleTitle()} : ${Math.random()}`);
  }
  const returnSampleTitle = (): string => {
    return 'Sample Title';
  }

  return (
    <>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>{letTitleOne}: {CurrentTitle}</h1>
          <h1>Props: {props.state}</h1>
          <h1>Children: {children}</h1>
          <button
            style={BUTTONSTYLES}
          >Change Title</button>
        </form>
      </div>
    </>
  )
}

export default App
