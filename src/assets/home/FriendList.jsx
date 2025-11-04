import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FriendRequest from "./FriendRequest";

const FriendList = () => {
  const user = useSelector((state) => state.userinfo.value);
  const db = getDatabase();
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const friendRef = ref(db, "friends/");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        const data = item.val();
        if (data.senderid === user.uid || data.receiverid === user.uid) {
          arr.push(data);
        }
      });
      setFriendList(arr);
    });
  }, [db, user.uid]);

  return (
    <>
      <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 w-80 h-96 p-5 flex flex-col">
        <h3 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
          Friend List
        </h3>

        <div className="space-y-4 overflow-y-auto">
          {friendList.length > 0 ? (
            friendList.map((item, index) => {
              const friendName =
                user.uid === item.senderid
                  ? item.receivername
                  : item.sendername 
             
              return (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-blue-100 transition"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                      {friendName[0]?.toUpperCase()}
                    </div>
                    <div className="">
                      <span className="text-gray-700 font-medium text-lg">
                      {friendName}
                    </span> 
                    </div>
                  </div>
                  <button className="py-[8px] px-[15px] bg-blue-700 rounded-[7px] text-white">
                    Friend
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center mt-10">
              কোনো ফ্রেন্ড পাওয়া যায়নি 😢
            </p>
          )}
        </div>
      </div>

      <FriendRequest />
    </>
  );
};

export default FriendList;
