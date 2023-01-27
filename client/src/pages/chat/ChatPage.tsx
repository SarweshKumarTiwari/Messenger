import ChatBox from './group-freiends-chat/ChatBox'
import GroupFriendList from './group-list/GroupFriendList'
import ProviderOfContext from "./context/ProviderOfContext"
import "./orient.css"
export default function ChatPage() {
  return (
    <div>
        <div className=" h-screen w-screen">
          <div className="flex border border-gray rounded shadow-lg h-full">
            <ProviderOfContext>
              <GroupFriendList/>
              <ChatBox />
            </ProviderOfContext>
          </div>
        </div>
    </div>
  )
}
