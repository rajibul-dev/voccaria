"use client";

import { User } from "@/_types/user";
import {
  useAvatarProviders,
  useDeleteAvatar,
  useUpdateAvatarProvider,
  useUpdateProfile,
  useUploadAvatar,
} from "@/app/_hooks/useAuth"; // Import all necessary hooks
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
  user, // This prop should be the current user data from useUser in the parent component
  setIsEditing,
}: {
  user: User | null;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  // Local state for file upload preview (not directly managed by TanStack Query)
  const [image, setFiles] = useState<(File & { preview: string })[]>([]);
  const [rejected, setRejected] = useState<File[]>([]);

  // Initialize TanStack Query hooks with clean destructuring
  const { updateProfile, isUpdating } = useUpdateProfile();
  const { providers, isLoading: isLoadingProviders } = useAvatarProviders();
  const { updateAvatarProvider, isUpdatingAvatar } = useUpdateAvatarProvider();
  const { uploadAvatar, isUploading } = useUploadAvatar();
  const { deleteAvatar, isDeleting } = useDeleteAvatar();

  // State for the avatar provider selector, initialized with user's current selected provider
  const [providerSelector, setProviderSelector] = useState(
    user?.avatars?.selected || "",
  );

  // Update providerSelector when user prop changes (e.g., after a successful avatar change)
  useEffect(() => {
    if (user?.avatars?.selected) {
      setProviderSelector(user.avatars.selected);
    }
  }, [user?.avatars?.selected]);

  // Handler for changing avatar provider
  const handleProviderSelectorChange = (event: SelectChangeEvent) => {
    const selectedProvider = event.target.value;
    setProviderSelector(selectedProvider as any); // Update local state immediately

    // Clean direct function call
    updateAvatarProvider({ provider: selectedProvider as string });
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  // Determine if avatar action buttons should be shown in the modal
  const shouldButtonGroupDivExist =
    (user?.avatar !== null && image.length === 0) ||
    (!!providers.length && image.length === 0);

  // Dropzone callbacks for handling file selection
  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent,
    ) => {
      if (acceptedFiles?.length) {
        setRejected([]); // Clear previous rejections
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        );
      }

      if (fileRejections?.length) {
        setRejected(fileRejections.map((rej) => rej.file));
      }
    },
    [],
  );

  // Function to clear selected image for upload
  const removeSelection = () => {
    setFiles([]);
    setRejected([]);
  };

  // Initialize react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"], // More generic image accept
    },
    maxSize: 1024 * 1024 * 10, // 10 MB
  });

  // Effect to revoke object URLs for image previews to prevent memory leaks
  useEffect(() => {
    return () => image.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [image]);

  // Handler for submitting a new avatar file
  async function handleAvatarSubmit(file: File) {
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    // Clean direct function call
    uploadAvatar(file, {
      onSuccess: () => {
        removeSelection(); // Clear local file selection
        handleClose(); // Close modal
      },
    });
  }

  // Handler for deleting the current avatar
  async function handleDeleteAvatar() {
    // Clean direct function call
    deleteAvatar(undefined, {
      onSuccess: () => {
        handleClose(); // Close modal
      },
    });
  }

  // Main handler for submitting profile changes (name and bio)
  async function handleProfileUpdate(e?: React.FormEvent) {
    if (e) e.preventDefault(); // Prevent default form submission if event exists
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    // If no fields have been changed, just exit editing mode
    if (user?.name?.trim() === name && user?.bio?.trim() === bio) {
      setIsEditing(false);
      return;
    }

    // Clean direct function call
    updateProfile(
      { name, bio },
      {
        onSuccess: () => {
          setIsEditing(false); // Close editing mode
        },
      },
    );
  }

  // Calculate file size for display/warning
  const sizeInMB = (image[0]?.size ?? 0) / (1024 * 1024);
  const isLargeFile = sizeInMB > 2;

  return (
    <form
      className="flex w-full flex-col items-start gap-6"
      onSubmit={handleProfileUpdate} // Use the new handler for profile updates
    >
      {/* Avatar display and modal trigger */}
      <div onClick={handleOpen} className="relative">
        <Avatar
          style={
            user?.avatar === null ? { background: "#222", color: "#222" } : {}
          }
          src={user?.avatar || undefined} // Pass undefined if null for default MUI behavior
          sx={{ width: 170, height: 170 }}
        />
        <div className="absolute top-0 left-0 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-full bg-black/40">
          <FaImage className="text-5xl text-gray-100" />
          <p className="text-sm font-semibold text-gray-100">
            {user?.avatar !== null ? "Change avatar" : "Add avatar"}
          </p>
        </div>
      </div>

      {/* Avatar provider selection dropdown */}
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
            disabled={isLoadingProviders || isUpdatingAvatar} // Disable while loading providers or updating
          >
            {providers.map((item) => (
              <MenuItem key={item} value={item}>
                {capitalize(item)}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}

      {/* Avatar update modal */}
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
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={removeSelection}
                    color="secondary"
                  >
                    Remove
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleAvatarSubmit(image[0])}
                    loading={isUploading} // Use hook's loading state
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
                {/* Avatar removing button */}
                {user?.avatars?.manual && image.length === 0 && (
                  <Button
                    type="button"
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteAvatar}
                    loading={isDeleting} // Use hook's loading state
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

      {/* Name and Bio input fields */}
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
      {/* Action buttons for saving/canceling profile changes */}
      <div className="flex gap-3">
        <Button
          type="submit"
          loading={isUpdating} // Use hook's loading state for profile update
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
          disabled={isUpdating} // Disable if profile update is pending
          size="large"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
