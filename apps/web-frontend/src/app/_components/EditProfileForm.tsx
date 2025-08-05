"use client";

import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import { User } from "@/_types/user";
import {
  Avatar,
  Button,
  capitalize,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa6";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import Input from "./Input";

export default function EditProfileForm({
  user,
  setIsEditing,
}: {
  user: User | null;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const [isSettingAvatar, setIsSettingAvatar] = useState(false);
  const [isDeletingAvatar, setIsDeletingAvatar] = useState(false);
  const [providers, setProviders] = useState<string[]>([]);

  const [image, setFiles] = useState<(File & { preview: string })[]>([]);
  const [rejected, setRejected] = useState<File[]>([]);

  const [providerSelector, setProviderSelector] = useState(
    user?.avatars.selected,
  );

  const handleProviderSelectorChange = async (event: SelectChangeEvent) => {
    const selectedProvider = event.target.value;
    setProviderSelector(selectedProvider as any);

    try {
      const res = await fetch(
        `${expressBackendBaseRESTOrigin}/users/me/avatar`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ provider: selectedProvider }),
          credentials: "include",
        },
      );

      const jsonResponse = await res.json();

      if (!res.ok) {
        console.error(
          jsonResponse.message || "Failed to update avatar provider",
        );
        toast.error(jsonResponse.message || "Failed to update avatar provider");
      }

      console.log("Avatar updated:", jsonResponse.data?.url);
      toast.success(
        jsonResponse.message || `Selected ${selectedProvider} avatar!`,
      );

      const apiUser = jsonResponse.data.user as User;
    } catch (error) {
      console.error("Avatar update error:", error);
      toast.error("API error: failed to update avatar provider");
    }
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  const shouldButtonGroupDivExist =
    (user?.avatar !== null && image.length === 0) ||
    (!!providers.length && image.length === 0);

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

  useEffect(() => {
    async function getProviders() {
      const res = await fetch(
        `${expressBackendBaseRESTOrigin}/users/me/providers`,
        { method: "GET", credentials: "include" },
      );

      const jsonResponse = await res.json();

      if (!res.ok) {
        console.error("Could not fetch the providers");
        return;
      }

      const apiProviders: [] = jsonResponse.data;

      if (apiProviders.length) {
        const updatedProviders = [...apiProviders];
        setProviders(updatedProviders);
      }
    }

    getProviders();
  }, [user]);

  async function handleAvatarSubmit(file: File) {
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    setIsSettingAvatar(true);

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
        toast.error(json.message || "Failed to upload avatar");
        return;
      }

      setProviderSelector("manual");
      removeSelection();
      handleClose();
      toast.success(json.message || "Avatar uploaded successfully!");
    } catch (error) {
      toast.error("Something went wrong while uploading avatar");
      console.error(error);
    } finally {
      setIsSettingAvatar(false);
    }
  }

  async function handleDeleteAvatar() {
    setIsDeletingAvatar(true);

    try {
      const res = await fetch(
        `${expressBackendBaseRESTOrigin}/users/me/avatar`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.message || "Failed to delete avatar");
        return;
      }

      toast.success(json.message || "Deleted avatar successfully");
      handleClose();
    } catch (error) {
      toast.error("Something went wrong while deleting avatar");
      console.error(error);
    } finally {
      setIsDeletingAvatar(false);
    }
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    // if no fields have been changed
    if (user?.name.trim() === name && user?.bio?.trim() === bio) {
      setIsEditing(false);
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
      setIsEditing(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const sizeInMB = (image[0]?.size ?? 0) / (1024 * 1024);

  // check for over 2MB
  const isLargeFile = sizeInMB > 2;

  return (
    <form
      className="flex w-full flex-col items-start gap-6"
      onSubmit={handleSubmit}
    >
      <div onClick={handleOpen} className="relative">
        <Avatar
          style={
            user?.avatar === null ? { background: "#222", color: "#222" } : {}
          }
          src={user?.avatar}
          sx={{ width: 170, height: 170 }}
        />
        <div className="absolute top-0 left-0 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-full bg-black/40">
          <FaImage className="text-5xl text-gray-100" />
          <p className="text-sm font-semibold text-gray-100">
            {user?.avatar !== null ? "Change avatar" : "Add avatar"}
          </p>
        </div>
      </div>

      {/* select avatar from different provider button */}
      {/* {!!providers.length && (
        <Popover placementY="bottom" placementX="end" noBox>
          <Popover.Trigger id="provider-select">
            <Button
              className="flex items-center gap-0.5"
              variant="outline"
              type="button"
            >
              <span>Avatar providers</span>
              <IoMdArrowDropdown className="text-xl" />
            </Button>
          </Popover.Trigger>
          <Popover.Content id="provider-select">
            <div className="flex flex-col divide-y divide-gray-300 rounded-lg border border-gray-300 bg-gray-100 dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-800">
              {providers.map((provider) => (
                <div key={provider}>Use {provider}'s pfp</div>
              ))}
            </div>
          </Popover.Content>
        </Popover>
      )} */}

      {/* select avatar from different provider button */}
      {!!providers.length && (
        <div className="flex items-center gap-4">
          <InputLabel
            style={{ font: "inherit" }}
            id="provider-select-label"
            className=""
          >
            <span className="text-base text-gray-900 dark:text-gray-100">
              Avatar provider:
            </span>
          </InputLabel>
          <Select
            labelId="provider-select-label"
            id="provider-select"
            value={providerSelector}
            label="Avatar provider"
            onChange={handleProviderSelectorChange}
            variant="standard"
            className="!fill-gray-900 !stroke-gray-900 !text-gray-900 dark:!fill-gray-100 dark:!stroke-gray-100 dark:!text-gray-100 [&>svg]:!fill-gray-900 [&>svg]:dark:!fill-gray-100"
          >
            {providers.map((item) => (
              <MenuItem key={item} value={item}>
                {capitalize(item)}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}

      <Modal open={modalOpen} onClose={handleClose}>
        <div
          className="fixed inset-0 z-[1300] flex items-center justify-center px-5"
          onClick={handleClose}
        >
          <div
            ref={modalRef}
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
                <div className="flex items-center gap-4">
                  {/* <MyButton
                    type="button"
                    variant="outline"
                    onClick={removeSelection}
                  >
                    Remove
                  </MyButton> */}
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={removeSelection}
                    color="secondary"
                  >
                    Remove
                  </Button>
                  {/* <MyButton
                    type="button"
                    onClick={() => handleAvatarSubmit(image[0])}
                    disabled={isSettingAvatar}
                  >
                    {!isSettingAvatar ? "Upload" : "Uploading..."}
                  </MyButton> */}
                  <Button
                    type="button"
                    onClick={() => handleAvatarSubmit(image[0])}
                    loading={isSettingAvatar}
                    loadingIndicator={"Uploading..."}
                    className="!shadow-none"
                    variant="contained"
                    startIcon={<MdCloudUpload />}
                  >
                    Upload
                  </Button>
                </div>
                {isLargeFile && (
                  <p className="text-sm text-orange-500 dark:text-orange-400">
                    This file is over 2MB and may upload slowly, especially on
                    slow connections.
                  </p>
                )}
              </div>
            )}

            {rejected.length > 0 && (
              <div className="mt-4 text-center text-sm font-medium text-red-700 select-none dark:text-red-500">
                Invalid file(s). Please use PNG, JPG, or JPEG under 10MB.
              </div>
            )}

            {shouldButtonGroupDivExist && (
              <div className="mt-6 flex justify-center gap-4">
                {/* avatar removing button */}
                {user?.avatars.manual && image.length === 0 && (
                  <Button
                    type="button"
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteAvatar}
                    loading={isDeletingAvatar}
                    loadingIndicator={"Deleting..."}
                    className="!normal-case"
                    startIcon={<MdDelete />}
                  >
                    Delete avatar
                  </Button>
                )}
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
      <div className="flex gap-3">
        <Button
          type="submit"
          loading={isSubmitting}
          className="!normal-case !shadow-none"
          loadingIndicator={"Saving..."}
          variant="contained"
          size="large"
        >
          Save changes
        </Button>
        <Button
          type="reset"
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(false);
          }}
          variant="outlined"
          color="secondary"
          disabled={isSubmitting}
          size="large"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
