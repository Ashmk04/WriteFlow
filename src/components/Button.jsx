export default function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-400',
    textColor = 'text-White',
    className = '',
    ...props
}) {
    return(
        <button className={`px-4 py-2 rounded-b-lg ${className} ${bgColor} ${textColor}`} {...props}>
            {children} 
        </button>
    )
}