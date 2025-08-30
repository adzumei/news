import { type ChangeEvent, type FC, useRef, useState } from 'react';

interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
}

const FileInput: FC<Props> = ({ onChange, name, label }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState('');

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }

        onChange(e);
    };

    const activateInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div className="file-input">
            <input
                type="file"
                style={{ display: 'none' }}
                name={name}
                ref={inputRef}
                onChange={onFileChange}
            />
            <div className="file-input-row">
                <input
                    type="text"
                    readOnly
                    value={fileName}
                    onClick={activateInput}
                    placeholder={label}
                    className="file-input-text"
                />
                <button type="button" onClick={activateInput} className="file-input-btn">
                    Browse
                </button>
            </div>
        </div>
    );
};

export default FileInput;
