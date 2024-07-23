// (C) 2024, Himank Deka
import React, { useRef } from 'react';

export const baseStyle = `rounded-lg py-3 px-6 flex justify-center items-center font-sans text-xs font-bold uppercase border border-transparent hover:bg-transparent transition-all duration-300`;
export const style2 = baseStyle + ' bg-cyan-500 hover:border-cyan-500 text-white hover:text-cyan-500';

const Button = ({ action, name, btnStyle, typeName }) => {
    const spinner = useRef();
    const text = useRef();

    const addAnimation = () => {
        spinner.current.classList.add('animate-spin');
        spinner.current.style.display = 'block';
        text.current.style.display = 'none';
    }


    const removeAnimation = () => {
        console.log('Removed')
        spinner.current.classList.remove('animate-spin');
        spinner.current.style.display = 'none';
        text.current.style.display = 'block';
    }

    const handleClick = async () => {
        addAnimation()

        await action()

        removeAnimation()
    };

    const defaultStyle = baseStyle + ' bg-red-500 my-5 text-white hover:border-red-500 hover:text-red-500'

    return (
        <button
            className={btnStyle || defaultStyle}
            type={typeName || 'button'}
            onClick={handleClick}
        >
            <span ref={text}>{name}</span>
            <span className="material-symbols-outlined" ref={spinner} style={{ display: 'none' }}>
                progress_activity
            </span>
        </button>
    );
};

export default Button;
