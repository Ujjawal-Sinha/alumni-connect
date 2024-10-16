import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";

const EditProfile = () => {
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePhoto: user?.profilePicture,
    bio: user?.bio,
    batch: user?.batch,
    company: user?.company,
    roll: user?.roll,
    branch: user?.branch,
    college: user?.college,
    gender: user?.gender,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilePhoto: file });
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const editProfileHandler = async () => {
    console.log(input);
    const formData = new FormData();
    formData.append("bio", input.bio);

    formData.append("gender", input.gender);
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }
    formData.append("batch", input.batch);
    formData.append("company", input.company);
    formData.append("roll", input.roll);
    formData.append("brach", input.branch);
    formData.append("college", input.college);
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/profile/edit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedUserData = {
          ...user,
          bio: res.data.user?.bio,
          batch: res.data.user?.batch,
          company: res.data.user?.company,
          roll: res.data.user?.roll,
          branch: res.data.user?.branch,
          college: res.data.user?.college,
          profilePicture: res.data.user?.profilePicture,
          gender: res.data.user.gender,
        };
        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.messasge);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex max-w-2xl mx-auto pl-10">
      <section className="flex flex-col gap-6 w-full my-8">
        <h1 className="font-bold text-xl">Edit Profile</h1>
        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="post_image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-sm">{user?.username}</h1>
              <span className="text-gray-600">
                {user?.bio || "Bio here..."}
              </span>
            </div>
          </div>
          <input
            ref={imageRef}
            onChange={fileChangeHandler}
            type="file"
            className="hidden"
          />
          <Button
            onClick={() => imageRef?.current.click()}
            className="bg-[#0095F6] h-8 hover:bg-[#318bc7]"
          >
            Change photo
          </Button>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Bio</h1>
          <Textarea
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            name="bio"
            className="focus-visible:ring-transparent"
          />
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Batch (e.g :- 2022 - 2026)</h1>
          <Textarea
            value={input.batch}
            onChange={(e) => setInput({ ...input, batch: e.target.value })}
            name="batch"
            className="focus-visible:ring-transparent"
          />
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Company</h1>
          <Textarea
            value={input.company}
            onChange={(e) => setInput({ ...input, company: e.target.value })}
            name="company"
            className="focus-visible:ring-transparent"
          />
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Roll no.</h1>
          <Textarea
            value={input.roll}
            onChange={(e) => setInput({ ...input, roll: e.target.value })}
            name="roll"
            className="focus-visible:ring-transparent"
          />
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Branch</h1>
          <Textarea
            value={input.branch}
            onChange={(e) => setInput({ ...input, branch: e.target.value })}
            name="branch"
            className="focus-visible:ring-transparent"
          />
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">College</h1>
          <Textarea
            value={input.college}
            onChange={(e) => setInput({ ...input, college: e.target.value })}
            name="college"
            className="focus-visible:ring-transparent"
          />
        </div>
        <div>
          <h1 className="font-bold mb-2">Gender</h1>
          <Select
            defaultValue={input.gender}
            onValueChange={selectChangeHandler}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          {loading ? (
            <Button className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={editProfileHandler}
              className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]"
            >
              Submit
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
