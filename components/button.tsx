export default function Button({onClick}:React.ButtonHTMLAttributes<HTMLButtonElement>){
    return (
        <div>
            <button onClick={onClick}></button>
        </div>
    )
}