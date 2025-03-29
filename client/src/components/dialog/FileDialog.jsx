import { useId, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const FileDialog = ({ register, error, className, multiple }) => {
  const [filename, setFilename] = useState();
  const inputId = useId();
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <label
        for={inputId}
        className="h-full w-full cursor-pointer hover:bg-light-blue"
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-gray">
          <IoCloudUploadOutline fontSize={40} />
          {filename ? (
            <p>{filename}</p>
          ) : (
            <div>
              <p>
                <span className="font-medium">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>{" "}
            </div>
          )}
        </div>
        <input
          id={inputId}
          type="file"
          multiple={multiple}
          className="opacity-0"
          {...register}
          onChange={(e) => {
            setFilename(e.target.value);
          }}
        />
        <div className="text-xs text-red-500">{error}</div>
      </label>
    </div>
  );
};

export default FileDialog;
