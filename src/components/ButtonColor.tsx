export const ButtonColor = (props: {color: string, onClicked: () => void, isClicked?: boolean}) => {
 return (
 <button className={props.isClicked ? "color-button clicked" : "color-button"} style={{backgroundColor: props.color}} onClick={props.onClicked}></button>
 )
}