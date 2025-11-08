// ChatUIStatic.jsx
// Static React component that reproduces the provided chat UI image (two-pane layout)
// Usage:
// 1) Create a React app (CRA/Vite) and install Tailwind CSS (optional — classes use Tailwind).
// 2) Put this file as ChatUIStatic.jsx and import it into a page: <ChatUIStatic />
// 3) If you don't use Tailwind, replace classNames with your CSS.

import React, { use, useEffect, useState } from 'react';
import FriendList from './FriendList';
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { messageInfo } from '../../slices/messageSlice';
import moment from 'moment/moment';

const contacts = [
    { id: 1, name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', last: 'Hello!' },
    { id: 2, name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', last: 'See you' },
    { id: 3, name: 'Mike Johnson', avatar: '', last: 'Okay' },
    { id: 4, name: 'Emma Brown', avatar: '', last: 'Thanks!' },
];

const messages = [
    { id: 'm1', uid: 1, name: 'John Doe', text: 'Hello!', time: '10:12 AM', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 'm2', uid: 0, name: 'You', text: 'Hi John!', time: '10:13 AM' },
    { id: 'm3', uid: 1, name: 'John Doe', text: 'How are you?', time: '10:13 AM', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 'm4', uid: 0, name: 'You', text: "I'm good, thanks How about you?", time: '10:14 AM' },
];

export default function Message() {
    let [showbar, setShowbar] = useState(false)
    let dispatch = useDispatch()
    let db = getDatabase()
    let [friendList, setFriendList] = useState([])
    const user = useSelector((state) => state.userinfo.value);
    const select = useSelector((state) => state.selecteduser.value);
    let [storMsg, setStorMsg] = useState('')
    let [mesList, setMsgList] = useState() 
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
    let heandleUserSelector = (item) => {
        setShowbar(true)
        if (user.uid == item.senderid) {
            dispatch(messageInfo({ name: item.receivername, email: item.receiveremail, id: item.receiverid }))

        } else {
            dispatch(messageInfo({ name: item.sendername, email: item.senderemail, id: item.senderid }))
        }

    }
    let heanlesendMsg = () => {
        setStorMsg("")
        set(push(ref(db, "friendMsgList/")), {
            senderid: user.uid,
            sendername: user.displayName,
            senderemail: user.email,
            receiverid: select.id,
            receivername: select.name,
            receiveremail: select.email,
            msg: storMsg,
            time: moment().format("h:mm A")

        })
    }
    useEffect(() => {

        onValue(ref(db, "friendMsgList/"), (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (user.uid == item.val().senderid && select.id == item.val().receiverid || user.uid == item.val().receiverid && select.id == item.val().senderid) {
                    arr.push(item.val())
                }

            }); 
            setMsgList(arr)
        });
    }, [select])

    let heandlSelectMsg = (item) => {
        setStorMsg(item.target.value)
    }

let handleBlock=(item)=>{
if(user.uid== item.senderid){
     set (push(ref(db,"blocklist/")),{
 blockbyid: user.uid,
 blockby : user.displayName,
 blockuser: item.receivername,
 blockuserid:item.receiverid,
 

 }).then(() => {
    remove(ref(db, "friends/" ))
 })
}else{
      set (push(ref(db,"blocklist/")),{
 blockbyid: user.uid,
 blockby : user.displayName,
 blockuser: item.sendername,
 blockuserid:item.senderid,
 

 }).then(() => {
  remove(ref(db, "friends/" ))
 })
}

}
    return (
        <div className="min-h-screen bg-gray-100 flex  justify-center p-6">
            <div className="w-full max-w-6xl  bg-white rounded-2xl shadow-lg  grid grid-cols-3" style={{ height: '640px' }}>

                {/* Left column - contacts */}
                <div className="col-span-1 p-6 border-r">
                    <h1 className="text-3xl font-extrabold mb-6">Chat</h1>

                    <div className="mb-6">
                        <div className="relative">
                            <input className="w-full bg-gray-100 rounded-full py-3 px-4 placeholder-gray-500 focus:outline-none" placeholder="Search" />
                            <svg className="w-5 h-5 absolute right-4 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
                        </div>
                    </div>

                    <div className="space-y-3 overflow-y-scroll h-120">
                        {
                            friendList.map((item) => (
                                <div  className={`cursor-pointer ${item.senderid == select.id || item.receiverid == select.id ? "bg-[#cecdcd]" : "bg-gray-100"} border border-gray-200 overflow-y-scrollflex items-center justify-between p-3 rounded-lg`}>
                                    <div className="flex items-center gap-3">

                                        <div className="  w-12 h-12 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold"></div>

                                        <div >
                                            <div onClick={() => heandleUserSelector(item)} className="font-semibold ">{item.senderid === user.uid
                                                ? item.receivername
                                                : item.sendername}</div>
                                            <div className="text-sm text-gray-500"></div>
                                        </div>
                                    </div>
                                    <button onClick={()=>handleBlock(item)} className='bg-blue-600 text-white px-2 py-1  rounded-[5px] mt-0.5'>block</button>
                                    <div className="text-xs text-gray-400"> </div>
                                     
                                </div>
                            ))
                        }

                    </div>
                </div>

                {/* Right column - chat */}

                {
                    showbar ? <div className="  col-span-2 flex flex-col">
                        <div className="p-6 border-b flex items-center gap-4">
                            <h2 className="text-2xl font-bold">{select.name}</h2>
                        </div>

                        <div className="flex-1 overflow-y-scroll  bg-white  p-6 ">
                            <div className="max-w-3xl mx-auto  space-y-6 ">
                                {
                                    mesList.map((item) => (
                                        item.senderid == user.uid ?
                                            <div className="flex  gap-2 justify-end">
                                                <div className="w-80 bg-blue-600 rounded-br-2xl rounded-l-2xl p-2 text-[18px] font-medium text-white">
                                                    <p>{item.msg} </p>
                                                    <h4 className='text-[13px] mt-2 font-bold'>{item.time}</h4>
                                                </div>
                                                <img className='w-13 h-13 bg-blue-500 rounded-full' src="#" alt="" />
                                            </div>
                                            :
                                            <div className="flex gap-2">
                                                <img className='w-13 h-13 bg-gray-300 rounded-full' src="" alt="" />
                                                <div className="w-80 bg-gray-200/80 rounded-bl-2xl rounded-r-2xl p-2 text-[18px] font-medium text-gray-600">
                                                    <p>{item.msg} </p>
                                                    <h4 className='text-[13px] mt-2 font-bold'>{item.time}</h4>
                                                </div>
                                            </div>
                                    ))
                                }




                            </div>
                        </div>

                        <div className="p-6 border-t">
                            <div className="max-w-3xl mx-auto flex items-center gap-4">
                                <input onChange={heandlSelectMsg} className="flex-1 rounded-full border py-3 px-5 placeholder-gray-400 focus:outline-none" placeholder="Type a message..." />
                                <button onClick={heanlesendMsg} className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center  ">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </button>
                            </div>
                        </div>
                    </div> : ""
                }

            </div>
        </div>
    );
}
