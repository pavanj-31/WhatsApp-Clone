// import { collection, getDocs } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { firestore } from "../../firebase.config";
// import { CircleFadingPlusIcon, Loader2Icon, MessageSquare, SearchIcon, UserRoundIcon } from "lucide-react";
// import Profile from "./Profile";
// import UserCard from "./UserCard";

// function ChatPanel() {
//     const [users, setUsers] = useState([]);
//     const [isLoading, setLoading] = useState(true);
//     const [showProfile, setShowProfile] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     useEffect(() => {
//         const getUsers = async () => {
//             const data = await getDocs(collection(firestore, 'users'));   //this will give all the users
//             const arrayOfUser = data.docs.map((docs) => { return { userData: docs.data(), id: docs.id } }); // arrayOfUser is keeping the data and id of every user by map function
//             console.log("18", arrayOfUser);
//             setUsers(arrayOfUser);
//             setLoading(false);
//         };
//         getUsers();
//     }, []);

//     let filterdUsers = users;
//     if (searchQuery) {
//         filterdUsers = users.filter((user) =>  // filtering chats based on search query                            
//             user.userData.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
//         );
//     }
//     const onBack = () => { setShowProfile(false) }
//     if (showProfile == true) {
//         return <Profile onBack={onBack} />
//     }
//     return (
//         <div className="bg-white w-[30vw] min-w-[350px]">
//             {/* top-bar */}
//             <div className="bg-background py-2 px-4 border-r  flex justify-between items-center gap-2">
//                 <button
//                     onClick={() => { setShowProfile(true) }}
//                 >
//                     <img
//                         src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
//                         alt="profile picture"
//                         className="w-10 h-10 rounded-full object-cover"
//                     />
//                 </button>
//                 <div className="flex items-end justify-center gap-6 mx-4">
//                     <CircleFadingPlusIcon className="w-6 h-6" />
//                     <MessageSquare className="w-6 h-6" />
//                     <UserRoundIcon className="w-6 h-6" />
//                 </div>
//             </div>
//             {/* chat List */}
//             {
//                 isLoading ? <div className="h-full w-full flex justify-center items-center"><Loader2Icon className="w-10 h-10 animate-spin" /> </div> :
//                     <div className="bg-white py-2 px-3">
//                         {/* Search Bar  */}
//                         <div className="bg-background flex items-center gap-4 px-3 py-2 rounded-lg">
//                             <SearchIcon className="w-4 h-4" />
//                             <input
//                                 className="bg-background focus-within:outline-none"
//                                 placeholder="Search"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                         </div>
//                         <div className="py-4 divide-y h-full max-h-[calc(100vh-152px)] overflow-y-scroll">
//                             {filterdUsers.map(userObject => <UserCard userObject={userObject} key={userObject.id} />)}
//                         </div>
//                     </div>
//             }
//         </div>
//     );
// }

// export default ChatPanel

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useMemo } from "react";
import { firestore } from "../../firebase.config";
import { CircleFadingPlusIcon, Loader2Icon, MessageSquare, SearchIcon, UserRoundIcon } from "lucide-react";
import Profile from "./Profile";
import UserCard from "./UserCard";

function ChatPanel() {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await getDocs(collection(firestore, "users"));
                const arrayOfUser = data.docs.map((doc) => ({ userData: doc.data(), id: doc.id }));
                setUsers(arrayOfUser);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        if (!searchQuery) return users;
        return users.filter(user =>
            user.userData.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, users]);

    const handleShowProfile = () => setShowProfile(true);
    const handleBack = () => setShowProfile(false);

    if (showProfile) return <Profile onBack={handleBack} />;

    return (
        <div className="bg-white w-[30vw] min-w-[350px]">
            {/* top-bar */}
            <div className="bg-background py-2 px-4 border-r flex justify-between items-center gap-2">
                <button onClick={handleShowProfile}>
                    <img
                        src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
                        alt="profile picture"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                </button>
                <div className="flex items-end justify-center gap-6 mx-4">
                    <CircleFadingPlusIcon className="w-6 h-6" />
                    <MessageSquare className="w-6 h-6" />
                    <UserRoundIcon className="w-6 h-6" />
                </div>
            </div>

            {/* chat List */}
            {isLoading ? (
                <div className="h-full w-full flex justify-center items-center">
                    <Loader2Icon className="w-10 h-10 animate-spin" />
                </div>
            ) : (
                <div className="bg-white py-2 px-3">
                    {/* Search Bar */}
                    <div className="bg-background flex items-center gap-4 px-3 py-2 rounded-lg">
                        <SearchIcon className="w-4 h-4" />
                        <input
                            type="text"
                            autoComplete="off"
                            className="bg-background focus-within:outline-none w-full"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value.trimStart())}
                        />
                    </div>

                    <div className="py-4 divide-y h-full max-h-[calc(100vh-152px)] overflow-y-auto">
                        {filteredUsers.map((user) => (
                            <UserCard userObject={user} key={user.id} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatPanel;