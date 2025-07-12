"use client";

import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import { User } from "@/_types/user";
import { Avatar, dividerClasses, Modal } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa6";
import Button from "./Button";
import Input from "./Input";
import clsx from "clsx";

export default function EditProfileForm({
  user,
  setIsEditing,
  setUser,
}: {
  user: User | null;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const [image, setFiles] = useState<(File & { preview: string })[]>([]);
  const [rejected, setRejected] = useState<File[]>([]);

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent,
    ) => {
      if (acceptedFiles?.length) {
        setRejected([]);
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ]);
      }

      if (fileRejections?.length) {
        setRejected((previousFiles) => [
          ...previousFiles,
          ...fileRejections.map((rej) => rej.file),
        ]);
      }
    },
    [],
  );

  const removeSelection = () => {
    setFiles([]);
    setRejected([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      image: [".png", ".jpg", "jpeg"],
    },
    maxSize: 1024 * 1024 * 10, // 10 MB
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => image.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [image]);

  async function handleAvatarSubmit(file: File) {
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch(
        `${expressBackendBaseRESTOrigin}/users/me/avatar`,
        {
          method: "POST",
          body: formData,
          credentials: "include", // include cookies/auth
        },
      );

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.message || "Failed to upload avatar.");
        return;
      }

      toast.success("Avatar uploaded successfully!");
      // Update user avatar state or refetch user data here
      setUser((prev) => (prev ? { ...prev, avatar: json.data.url } : prev));
      setIsEditing(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${expressBackendBaseRESTOrigin}/users/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio }),
        credentials: "include",
      });
      const jsonResponse = await res.json();
      if (!res.ok) {
        toast.error(jsonResponse.message || "Failed to update profile");
        return;
      }
      toast.success("Profile updated successfully");
      setUser(jsonResponse.data);
      setIsEditing(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="flex w-full flex-col items-start gap-6"
      onSubmit={handleSubmit}
    >
      <div onClick={handleOpen} className="relative">
        <Avatar src={user?.avatar} sx={{ width: 170, height: 170 }} />
        <div className="absolute top-0 left-0 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-full bg-black/40">
          <FaImage className="text-5xl text-gray-100" />
          <p className="text-sm font-semibold text-gray-100">Change Avatar</p>
        </div>
      </div>

      <Modal open={modalOpen} onClose={handleClose}>
        <div
          className="fixed inset-0 z-[1300] flex items-center justify-center px-5"
          onClick={handleClose}
        >
          <div
            className="animate-fade-in-up relative w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 ease-out dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white">
              Update Avatar
            </h2>

            {image.length === 0 ? (
              <div
                {...getRootProps()}
                className={clsx(
                  "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-8 py-20 text-center transition-colors duration-200 ease-in-out",
                  isDragActive
                    ? "border-pink-600 bg-pink-100 dark:border-pink-500 dark:bg-pink-950"
                    : "border-gray-300 bg-gray-50 hover:border-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-400 dark:hover:bg-gray-700",
                )}
              >
                <input {...getInputProps()} />
                <span
                  className={clsx(
                    "flex items-center justify-center rounded-full p-5 text-4xl transition-transform duration-200",
                    isDragActive
                      ? "bg-pink-600 text-white"
                      : "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
                  )}
                >
                  <FaImage className="pointer-events-none" />
                </span>
                <p
                  className={clsx(
                    "font-medium transition-colors duration-200 select-none",
                    isDragActive
                      ? "font-bold text-pink-700 dark:text-pink-400"
                      : "text-gray-600 dark:text-gray-400",
                  )}
                >
                  {isDragActive
                    ? "There you go! Drop it HERE!"
                    : "Drag & drop or click to select image"}
                </p>
                <span
                  className={clsx(
                    "text-xs transition-colors duration-200 select-none",
                    isDragActive
                      ? "font-medium text-pink-700 dark:text-pink-500"
                      : "text-gray-500 dark:text-gray-500",
                  )}
                >
                  PNG, JPG, JPEG — 10MB max
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5">
                <Avatar
                  src={image[0].preview}
                  sx={{
                    width: { xs: 275, sm: 340, md: 400 },
                    height: { xs: 275, sm: 340, md: 400 },
                  }}
                  className="border-4 border-gray-300 shadow-md transition-all duration-300 dark:border-gray-700"
                />
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={removeSelection}
                  >
                    Remove
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleAvatarSubmit(image[0])}
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}

            {rejected.length > 0 && (
              <div className="mt-4 text-center text-sm font-medium text-red-700 select-none dark:text-red-500">
                Invalid file(s). Please use PNG, JPG, or JPEG under 10MB.
              </div>
            )}
          </div>
        </div>
      </Modal>

      <div className="flex w-full max-w-100 flex-col gap-5">
        <Input
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <Input
          isTextArea
          label="Bio"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write a bit about yourself..."
          maxLength={1200}
        />
      </div>
      <div className="flex gap-5">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
        <Button
          type="reset"
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(false);
          }}
          variant="outline"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
