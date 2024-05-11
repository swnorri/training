export default function Tabs({ children, buttons, Wrapper = "menu" }) {
    return (
        <>
            <Wrapper>
                {buttons}
            </Wrapper>
            {children}
        </>
    )
}