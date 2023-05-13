import ChatBox from './group-freiends-chat/ChatBox'
import ProviderOfContext from "./context/ProviderOfContext"
import GroupNav from './group-list/GroupNav'
import SocketConfig from '../../SocketConfig'
export default function ChatPage() {
  return (
    <div>
      <div className="h-screen w-screen">
        <div className="flex   border border-gray rounded shadow-lg h-full">
          <SocketConfig>

            <ProviderOfContext>
              <GroupNav />
              <ChatBox />
            </ProviderOfContext>

          </SocketConfig>
        </div>
      </div>
    </div>
  )
}
