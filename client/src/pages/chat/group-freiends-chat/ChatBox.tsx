import {useState,useContext} from 'react';
import { UseContext } from '../context/ProviderOfContext';
import ChatBottomNav from './ChatBottomNav';
import ChatNav from './ChatNav';
import InitialPage from './InitialPage';
import { BubbleBox } from '../users';

export default function ChatBox() {
    const lst: BubbleBox[] = [
        {
            category: 0,
            message: "February 20, 2018"
        },
        {
            category: 1,
            message: "Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info."
        },
        {
            category: 2,
            user: {
                userId:"ggxgh",
                name: "Sylverter Stallone",
                message: "Hi everyone! Glad you could join! I am making a new movie.",
                date: "12:45 pm"
            }
        },
        {
            category: 2,
            user: {
                userId:"ggxgh",
                name: "Tom Cruise",
                message: "Hi all! I have one question for the movie",
                date: "12:45 pm"
            }
        },
        {
            category: 2,
            user: {
                userId:"ggxgh",
                name: "Harrison Ford",
                message: "Again?",
                date: "12:45 pm"
            }
        },{
            category: 0,
            message:"12 jan 2019"
        },
        {
            category: 2,
            user: {
                userId:"ggxgh",
                name: "Russell Crowe",
                message: "Is Andrés coming for this one?",
                date: "12:45 pm"
            }
        },
        {
            category: 2,
            user: {
                userId:"ggxgh",
                name: "Sylverter Stallone",
                message: "He is. Just invited him to join.",
                date: "12:45 pm"
            }
        },
        {
            category: 3,
            user: {
                userId:"ggxgh",
                message: "Hi guys",
                date: "12:45 pm"
            }
        },
        {
            category: 3,
            user: {
                userId:"ggxgh",
                message: "Count me in",
                date: "12:45 pm"
            }
        },
        {
            category: 3,
            user: {
                userId:"ggxgh",
                image:"https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg",
                message: "Count me in",
                date: "12:45 pm"
            }
        },
        {
            category: 2,
            user: {
                userId:"ggxgh",
                name: "Tom Cruise",
                message: "Get Andrés on this movie ASAP!",
                date: "12:45 pm"
            }
        },
    ]
    const sendmsg=(e:BubbleBox)=>{
        setchat(prev=>{
            return [...prev,e]
        });
        return;
    }
    let key=0;
    const getnav = useContext(UseContext);
    const [chat,setchat] = useState<BubbleBox[]>(lst)
    if (getnav.data===null) {
        return <InitialPage/>
    }
    return (
        <div className="w-2/3 border flex flex-col overflow-auto relative">
            <ChatNav sendmsg={sendmsg}/>
            <div className="flex-1 overflow-auto" style={{"scrollbarWidth":"thin"}}>
                <div className="py-2 px-3">
                    {chat.map(e => {
                        key++
                        if (e.category === 0) {
                            key++;
                            return (
                                <div className="flex justify-center mb-2" key={key}>
                                    <div className="rounded bg-sky-100 shadow-md py-2 px-4">
                                        <p className="text-sm uppercase">
                                            {e.message}
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                        if (e.category ===1) {
                            key++
                            return (
                                <div className="flex justify-center mb-4" key={key}>
                                    <div className="rounded-3xl py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 ... text-white">
                                        <p className="text-xs">
                                            {e.message}
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                        if (e.category === 2) {
                            key++;
                            return (
                                <div className="flex mb-2" key={key}>
                                    <div className="rounded py-2 px-3 shadow-md" style={{ "backgroundColor": " #F2F2F2" }}>
                                        <p className="text-sm text-teal">
                                            {e.user?.name}
                                        </p>
                                        <p className="text-sm mt-1">
                                            {e.user?.message}
                                        </p>
                                        <p className="text-right text-xs text-grey-dark mt-1">
                                            {e.user?.date}
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                        return <div className="flex justify-end mb-2" key={key}>
                            <div className="rounded bg-sky-400 shadow-md shadow-gray-300 py-2 px-3 " style={{"maxHeight":"20%" ,"maxWidth":"40%"}}>
                                {e.user?.image&& <img src={e.user.image} className="border border-white" style={{"margin":"0px"}} alt="not Found"></img>}
                                <p className="text-sm text-white mt-1">
                                    {e.user?.message}
                                </p>
                                <p className="text-right text-xs text-white mt-1">
                                    {e.user?.date}
                                </p>
                            </div>
                        </div>

                    })}
                
                </div>
            </div>
            <ChatBottomNav sendmsg={sendmsg}/>
        </div>
    )
}
