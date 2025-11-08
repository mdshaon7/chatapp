import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector } from 'react-redux';
import { button, h2 } from 'framer-motion/client';

const UserList = () => {
    const [pendingId, setPendingId] = useState(null);

  const db = getDatabase();
  const currentUser = useSelector((state) => state.userinfo.value);
  const [userList, setUserList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  let [checkconfirmedfriend, setcheckconfirmedfriend] = useState([])
  const user = useSelector((state) => state.userinfo.value);
  let [requestid, setrequestid] = useState([])
  // let [pading, setpading] = useState(false)
  // 🔹 Load all users except current user
  useEffect(() => {
    if (!currentUser?.uid) return;

    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        // নিজের id বাদ দিচ্ছি
        if (item.key !== currentUser.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(arr);
    });
  }, [db, currentUser?.uid]);

  // 🔹 Load all friend requests
  // useEffect(() => {
  //   const requestRef = ref(db, "friendrequest/");
  //   onValue(requestRef, (snapshot) => {
  //     const arr = [];
  //     snapshot.forEach((item) => {
  //       arr.push(item.val());
  //     });
  //     setRequestList(arr);
  //   });
  // }, [db]);


  useEffect(() => {
    const userRef = ref(db, 'friends/');
    onValue(userRef, (snapshot) => {
      // const data = snapshot.val();
      let arr = []
      snapshot.forEach((item) => {
        arr.push(item.val().receiverid + item.val().senderid)
        setcheckconfirmedfriend(arr)
      })
    });
  }, [])
  useEffect(() => {
    const userRef = ref(db, 'friendrequest/');
    onValue(userRef, (snapshot) => {
      // const data = snapshot.val();
      let arr = []
      snapshot.forEach((item) => {
    // console.log(item.val())
        arr.push(item.val().senderid + item.val().receiverid)
      })
    setrequestid(arr)
    });
  }, [])


  // 🔹 Send Friend Request
  const handleFriendRequest = (item) => {
    // console.log(item);
    // console.log(item.id);    
    // setPendingId(item.id);
    // setpading(true)
      set(ref(db, "friendrequest/"+(currentUser.uid + item.id)), {
      senderid: currentUser.uid,
      sendername: currentUser.displayName,
      senderemail: currentUser.email,
      receiverid: item.id,
      receivername: item.name,
      receiveremail: item.email,
    }).then(() =>{
      
    })
  };

  // // 🔹 Check if request already sent
  // const isRequestSent = (item) => {
  //   return requestList.some(
  //     (req) =>
  //       req.senderid === currentUser.uid && req.receiverid === item.id
  //   );
  // };

  return (
    <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 w-80 h-96 p-5 flex flex-col">
      <h3 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
        User List
      </h3>

      <div className="space-y-4 overflow-y-auto">
        {userList.length === 0 && (
          <p className="text-gray-500 text-sm">No other users found</p>
        )}

        {userList.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                {item.name?.slice(0, 1)?.toUpperCase() || "U"}
              </div>
              <span className="text-gray-700 font-medium text-lg">
                {item.name || item.fullname || item.displayName || "Unknown User"}
              </span>
            </div>
            <div className="">
  
              {
               checkconfirmedfriend.includes(currentUser.uid + item.id) ||
                checkconfirmedfriend.includes(item.id + currentUser.uid)?
                <button
                  className="px-[25px] py-[6px] bg-[#00ff40] transition-all text-[black] text-[12px] font-[700] rounded-[6px]"
                >
                  Friend
                </button>
                :
                requestid.includes(currentUser.uid + item.id) ||
                requestid.includes(item.id + currentUser.uid)?
                <button
                  className="px-[12px] py-[6px] bg-[#d1cece] text-[#000000] text-[12px] font-[600] rounded-[6px]"
                  disabled
                >
                  requested
                </button> :
                <button
                  onClick={() => handleFriendRequest(item)}
                  className="px-[12px] py-[6px] bg-[#007bff] hover:bg-[#005ecb] transition-all text-white text-[12px] font-[600] rounded-[6px]"
                >
                  Add Friend
                </button>

              }

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;