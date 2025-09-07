"use client";

import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../hooks/upload-file";

export default function UploadFileForm() {
  const { mutate, isPending } = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      message.success("فایل با موفقیت آپلود شد ✅");
    },
    onError: (err: any) => {
      console.error("Upload error:", err);
      message.error("خطا در آپلود فایل ❌");
    },
  });

  const handleChange = (info: any) => {
    console.log("Upload info:", info);

    // Try both ways of getting the file
    const file = info.file?.originFileObj || info.fileList?.[0]?.originFileObj;

    if (file) {
      console.log("Uploading:", file.name);
      mutate(file.name);
    } else {
      console.warn("No file found in info:", info);
    }
  };

  return (
    <Upload beforeUpload={() => false} onChange={handleChange} maxCount={1}>
      <Button icon={<UploadOutlined />} loading={isPending}>
        {isPending ? "در حال آپلود..." : "انتخاب فایل"}
      </Button>
    </Upload>
  );
}
