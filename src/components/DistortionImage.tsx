import { useState, useRef } from 'react';

interface DistortionImageProps {
    src: string;
    alt: string;
    className?: string;
}

const DistortionImage = ({ src, alt, className = "" }: DistortionImageProps) => {
    const [filterVal, setFilterVal] = useState(0);
    const requestRef = useRef<number>(0);

    const handleMouseEnter = () => {
        let start = 0;
        const animate = (time: number) => {
            if (!start) start = time;
            const progress = (time - start) / 500; // Duration 500ms

            if (progress < 1) {
                // Peak at 0.5 then go back to 0
                const val = progress < 0.5 ? progress * 100 : (1 - progress) * 100;
                setFilterVal(val);
                requestRef.current = requestAnimationFrame(animate);
            } else {
                setFilterVal(0);
            }
        };
        requestRef.current = requestAnimationFrame(animate);
    };

    const filterId = `noise-${src.replace(/[^a-zA-Z0-9]/g, '')}`;

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onMouseEnter={handleMouseEnter}
        >
            <svg className="hidden">
                <defs>
                    <filter id={filterId}>
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.02 0.003"
                            numOctaves="1"
                            result="warp"
                        />
                        <feDisplacementMap
                            xChannelSelector="R"
                            yChannelSelector="G"
                            scale={filterVal}
                            in="SourceGraphic"
                            in2="warp"
                        />
                    </filter>
                </defs>
            </svg>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                style={{ filter: `url(#${filterId})` }}
            />
        </div>
    );
};

export default DistortionImage;
