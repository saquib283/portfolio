

interface GlitchTextProps {
    text: string;
    className?: string;
}

const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
    return (
        <div className={`relative group inline-block ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-[2px] transition-all duration-100 mix-blend-screen select-none">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[2px] transition-all duration-100 mix-blend-screen select-none">
                {text}
            </span>
        </div>
    );
};

export default GlitchText;
