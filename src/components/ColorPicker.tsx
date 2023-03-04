import { useState } from "react";
import { ButtonColor } from "./ButtonColor"

export const ColorPicker = (props: {colors: string[], onColorPicked: (color: string) => void, pickedColor: string | undefined}) => {
 const getButtons = () => {
  return props.colors.map(color => {
   return (
    <ButtonColor color={color} onClicked={() => props.onColorPicked(color)} isClicked={props.pickedColor === color}/>
   )
  })
 }
 
 return (
  <>
  {getButtons()}
  </>
 )
}