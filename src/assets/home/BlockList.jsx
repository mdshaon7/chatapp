import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove, push, set } from "firebase/database";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const BlockList = () => {
  const db = getDatabase();
  const user = useSelector((state) => state.userinfo.value);
  const [BlockList, setBlockList] = useState([]);
let [friendRequests , setfriendRequests]=useState()
  useEffect(() => {
    const requestRef = ref(db, "blocklist/");
    onValue(requestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {

      const data = item.val();
        if(user.uid == item.val().blockbyid)
          arr.push({ ...data, id: item.key });
     
      });
      setBlockList(arr);
    });
  }, [db, user.uid]);
  let handleunblock = (item)=>{
    console.log(item)
      remove(ref(db, "blocklist/" +item.id  ))
  }

  // ✅ Confirm বোতাম — এখন কাজ করবে ঠিকভাবে
  const handleConfirm = (item) => {
    const friendRef = ref(db, "friends/");
    const newFriend = {
      senderid: item.senderid,
      sendername: item.sendername,
      senderemail:item.senderemail,
      receiverid: item.receiverid,
      receivername: item.receivername,
      receiveremail: item.receiveremail
    };

    const newFriendRef = push(friendRef);

    // আগে friends এ add করবো

  };



  return (
    <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 w-80 h-96 p-5 flex flex-col mt-5">
      <Toaster position="top-center" reverseOrder={false} />
      <h3 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
        Block List
      </h3>

      <div className="space-y-4 overflow-y-auto">
 {
          BlockList.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-blue-100 transition"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                  
                </div>
                <span className="text-gray-700 font-medium text-lg">
                  {item.blockuser}
                </span>
              </div>

              <div className="flex space-x-2">
                <button onClick={()=>handleunblock(item)} className="bg-gray-600 text-white px-2 py-1.5 rounded-[5px]">unblock</button>
    
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default  BlockList;

