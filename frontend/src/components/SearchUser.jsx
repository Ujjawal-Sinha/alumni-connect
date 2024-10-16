// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import axios from "axios";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { useDispatch } from "react-redux";
// import { setSelectedPost } from "@/redux/postSlice";

// const SearchUser = ({ searchopen, setSearchopen }) => {
//   const [searchParams, setSearchParams] = useState({
//     username: "",
//     roll: "",
//     college: "",
//     branch: "",
//     batch: "",
//     company: "",
//   });
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const handleSearch = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:8000/api/v1/search/users", {
//         params: searchParams,
//       });
//       setSearchResults(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error searching users:", error);
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
//   };

//   return (
//     <Dialog open={searchopen} onOpenChange={setSearchopen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Search Users</DialogTitle>
//         </DialogHeader>
//         <div className="flex flex-col gap-3 mb-4">
//           <Input
//             placeholder="Search by username"
//             name="username"
//             value={searchParams.username}
//             onChange={handleInputChange}
//           />
//           <Input
//             placeholder="Search by roll"
//             name="roll"
//             value={searchParams.roll}
//             onChange={handleInputChange}
//           />
//           <Input
//             placeholder="Search by college"
//             name="college"
//             value={searchParams.college}
//             onChange={handleInputChange}
//           />
//           <Input
//             placeholder="Search by branch"
//             name="branch"
//             value={searchParams.branch}
//             onChange={handleInputChange}
//           />
//           <Input
//             placeholder="Search by batch"
//             name="batch"
//             value={searchParams.batch}
//             onChange={handleInputChange}
//           />
//           <Input
//             placeholder="Search by company"
//             name="company"
//             value={searchParams.company}
//             onChange={handleInputChange}
//           />
//           <Button onClick={handleSearch} disabled={loading}>
//             {loading ? "Searching..." : "Search"}
//           </Button>
//         </div>

//         <div>
//           {searchResults.length > 0 ? (
//             searchResults.map((user) => (
//               <div
//                 key={user._id}
//                 className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
//                 onClick={() => {
//                   setSearchopen(false);
//                   dispatch(setSelectedPost(null)); // Optional: Use as per your post logic
//                   // You can also navigate to the user's profile here
//                 }}
//               >
//                 <Avatar className="w-8 h-8">
//                   <AvatarImage src={user.profilePicture} alt={user.username} />
//                   <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <div className="flex flex-col">
//                   <span className="font-semibold">{user.username}</span>
//                   <span className="text-xs text-gray-600">{user.roll}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">
//               {loading ? "Searching..." : "No users found"}
//             </p>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default SearchUser;

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch } from "react-redux";
import { setSelectedPost } from "@/redux/postSlice";
import { Link } from "react-router-dom"; // Import Link

const SearchUser = ({ searchopen, setSearchopen }) => {
  const [searchParams, setSearchParams] = useState({
    username: "",
    roll: "",
    college: "",
    branch: "",
    batch: "",
    company: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/v1/search/users", {
        params: searchParams,
      });
      setSearchResults(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error searching users:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={searchopen} onOpenChange={setSearchopen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Users</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mb-4">
          <Input
            placeholder="Search by username"
            name="username"
            value={searchParams.username}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Search by roll"
            name="roll"
            value={searchParams.roll}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Search by college"
            name="college"
            value={searchParams.college}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Search by branch"
            name="branch"
            value={searchParams.branch}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Search by batch"
            name="batch"
            value={searchParams.batch}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Search by company"
            name="company"
            value={searchParams.company}
            onChange={handleInputChange}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        <div>
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <Link
                key={user._id}
                to={`/profile/${user._id}`} // Link to user's profile
              >
                <div
                  className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                  onClick={() => {
                    setSearchopen(false);
                    dispatch(setSelectedPost(null)); // Optional: Use as per your post logic
                  }}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={user.profilePicture}
                      alt={user.username}
                    />
                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user.username}</span>
                    <span className="text-xs text-gray-600">{user.roll}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">
              {loading ? "Searching..." : "No users found"}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUser;
