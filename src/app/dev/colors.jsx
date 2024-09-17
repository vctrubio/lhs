import React from 'react';

const ThemeColor = () => {
    return <div className='theme-color box'></div>;
};

const ColorGreenDark = () => {
    return (
        <div className='color-container'>
            <div className='color-green-dark box'></div>
            <p>Green Dark</p>
        </div>
    );
};

const ColorGreenLight = () => {
    return (
        <div className='color-container'>
            <div className='color-green-light box'></div>
            <p>Green Light</p>
        </div>
    );
};

const ColorBlue = () => {
    return (
        <div className='color-container'>
            <div className='color-blue box'></div>
            <p>Blue</p>
        </div>
    );
};

const ColorBeighDarkish = () => {
    return (
        <div className='color-container'>
            <div className='color-beigh-darkish box'></div>
            <p>Beigh Darkish</p>
        </div>
    );
};

const ColorBeighLight = () => {
    return (
        <div className='color-container'>
            <div className='color-beigh-light box'></div>
            <p>Beigh Light</p>
        </div>
    );
};

const ColorBeigh = () => {
    return (
        <div className='color-container'>
            <div className='color-beigh box'></div>
            <p>Beigh</p>
        </div>
    );
};

const ColorDanger = () => {
    return (
        <div className='color-container'>
            <div className='color-danger box'></div>
            <p>Danger</p>
        </div>
    );
};

const ColorBackup = () => {
    return (
        <div className='color-container'>
            <div className='color-backup box'></div>
            <p>Backup</p>
        </div>
    );
};

const ColorInfo = () => {
    return (
        <div className='color-container'>
            <div className='color-info box'></div>
            <p>Info</p>
        </div>
    );
};

const ColorLove = () => {
    return (
        <div className='color-container'>
            <div className='color-love box'></div>
            <p>Love</p>
        </div>
    );
};

export const ColorPalette = () => {
    return (
        <div className="color-palette-container">
            <h2 className="color-palette-title">Color Palette</h2>
            <div className="flex gap-8">
                <ThemeColor />
                <ColorGreenDark />
                <ColorGreenLight />
                <ColorBlue />
                <ColorBeighDarkish />
                <ColorBeighLight />
                <ColorBeigh />
                <ColorDanger />
                <ColorBackup />
                <ColorInfo />
                <ColorLove />
            </div>
        </div>
    );
};

export {
    ThemeColor,
    ColorGreenDark,
    ColorGreenLight,
    ColorBlue,
    ColorBeighDarkish,
    ColorBeighLight,
    ColorBeigh,
    ColorDanger,
    ColorBackup,
    ColorInfo,
    ColorLove
};