import React from 'react';

export default function AboutSection({
    title,
    content,
    className = ""
}) {
    return (
        <div className={`group space-y-2 ${className}`}>
            <div className="p-2 rounded-sm text-3xl w-min text-nowrap text-primary transition-all duration-300 ease-in-out">
                {title}
            </div>
            <div className="p-2 rounded-sm group-hover:text-primary-darker group-hover:bg-primary-dark transition-all duration-300 ease-in-out">{content}</div>
        </div>
    );
}
