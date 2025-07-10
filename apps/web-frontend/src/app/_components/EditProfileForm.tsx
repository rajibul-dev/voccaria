import { Avatar } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa6";
import Input from "./Input";
import Button from "./Button";
import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import { User } from "@/_types/user";

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
      <div className="relative">
        <Avatar src={user?.avatar} sx={{ width: 170, height: 170 }} />
        <div className="absolute top-0 left-0 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-full bg-black/40">
          <FaImage className="text-5xl text-gray-100" />
          <p className="text-sm font-semibold text-gray-100">Change Avatar</p>
        </div>
      </div>

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
