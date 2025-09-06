const api = {
     BgColor: 'dark',
     TextColor: 'white',
     ButtonColor: '#FFED05'
}
const Bg_Color = localStorage.getItem("bgColor")
const Text_Color = localStorage.getItem("TextColor")
const Button_Color = localStorage.getItem("ButtonColor")

export const BgColor = Bg_Color ? Bg_Color : api.BgColor;
export const TextColor = Text_Color ? Text_Color : api.TextColor;
export const ButtonColor = Button_Color ? Button_Color : api.ButtonColor;

