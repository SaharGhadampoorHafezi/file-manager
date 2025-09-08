"use client";

import React, { useState } from "react";
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
    const formData = new FormData();

    formData.append("image", info.file);
    mutate(formData);
  };

  return (
    <Upload beforeUpload={() => false} onChange={handleChange} maxCount={1}>
      <Button icon={<UploadOutlined />} loading={isPending}>
        {isPending ? "در حال آپلود..." : "انتخاب فایل"}
      </Button>
    </Upload>
  );
}
