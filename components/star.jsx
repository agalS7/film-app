export default function Star({
    filled = false,
    size = 24,
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className={`${filled ? "text-yellow-500" : "text-gray-400"} transition-all duration-300`}
        >
            <path
                d="M12 2.5 L14.9 9.2 L22 10.1 L16.5 15.1 L17.9 22 L12 18.3 L6.1 22 L7.5 15.1 L2 10.1 L9.1 9.2 Z"
                fill={filled ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </svg>
    );
}
