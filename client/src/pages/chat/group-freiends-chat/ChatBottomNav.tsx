import { useContext, useRef } from 'react'
import { BubbleBox } from '../users'
import { UseContext } from '../context/ProviderOfContext';
import { authUser } from '../../../AuthUserContext';
import { useMutation } from 'react-query';
import DateNow from "../../../utils/Date"
import ChatRequests from '../Requests/ChatRequests';
interface callback {
    sendmsg: (e: BubbleBox) => void
}
export default function ChatBottomNav({ sendmsg }: callback) {
    const first = useRef<HTMLInputElement>(null!);
    const { data } = useContext(UseContext);
    const user = useContext(authUser);

    const { mutate } = useMutation({
        mutationFn: ChatRequests.sendChat,
    })
    const Send = () => {
        const userChat = {
            category: 0,
            id: data?._id,
            user: {
                userId: user?.user_data?.id,
                name: user?.user_data?.name,
                message: first.current.value,
            }
        }
        mutate(userChat, {
            onSuccess: () => {
                sendmsg({
                    category: 0,
                    id: data?._id,
                    user: {
                        userId: user?.user_data?.id,
                        name: user?.user_data?.name,
                        message: first.current.value,
                        date:{
                            date:DateNow.date(),
                            time:DateNow.time()
                        }
                    }
                })
            }
        });
    }
    return (
        <div className="px-4 py-2 bg-gray-50 flex items-center ">
            <div className="flex w-full items-center bg-gray-50  mx-4 border border-gray-200 rounded-3xl px-2 py-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path opacity=".45" fill="#263238" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg>
                </div>
                <input id="txt" className="ml-2 bg-gray-50 w-full outline-0" type="text" ref={first} />
            </div>
            <button onClick={() => { Send() }} className="p-1 rounded-full bg-sky-500 hover:bg-sky-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" viewBox="0 0 16 16">
                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                </svg>
            </button>
        </div>
    )
}
