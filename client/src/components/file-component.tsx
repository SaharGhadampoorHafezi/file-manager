import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getFiles } from "../hooks/upload-file";
import { BASE_URL } from "../constants/api";
import { FileImageOutlined } from "@ant-design/icons";

const File = ({ src }: { src: string }) => {
   const fullSrc = `${BASE_URL}/${src}`;

  return (
    <div>
      <a href={fullSrc} target="_blank" rel="noopener noreferrer">
        <img src={fullSrc} alt={src} style={{ width: 100, height: "auto" }} />
      </a>
      <FileImageOutlined />
    </div>
  );
};

const FileSection = () => {
  const { data } = useQuery({
    queryKey: ["files"],
    queryFn: getFiles,
  });
  const files = data?.data.files ?? [];
  console.log(files);
  return (
    <div>
      {files.map((file: string) => (
        <File key={file} src={file} />
      ))}
    </div>
  );
};

export default FileSection;
