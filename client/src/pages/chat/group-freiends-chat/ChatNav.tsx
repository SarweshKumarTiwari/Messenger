import { useState, useContext,useRef} from 'react';
import { users } from '../users';
import { UseContext } from '../context/ProviderOfContext';
import { BubbleBox } from '../users';
import { getURLfromFile } from '../../../utils/uploadFile';
interface callback{
  sendmsg:(e:BubbleBox)=>void
}
export default function ChatNav(sendmsg:callback) {
  const getnav = useContext(UseContext);
  const data = getnav.data as users | null;
  const file = useRef<HTMLInputElement>(null!)
  const [option, setoption] = useState<boolean>(false);
  function log() {
    getURLfromFile(file.current.files![0],(e)=>{
      sendmsg.sendmsg({
        category:3,
        user:{
          image:e,
          date:"12:45 pm"
        }
      })
    });
  }
  return (
    <div className="py-2 px-3 relative bg-gray-200 border-l border-gray-300 flex flex-row justify-between items-center ">
      <div className="flex  max-md:items-start  items-center">
        <div className="flex items-center">
          <button className='md:hidden ' onClick={() => getnav.callback(null)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fill-rzule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
          </button>
          <div className='ml-1'>
            <img className="w-10 h-10 max-md:w-8 max-md:h-8 rounded-full" src={data?.img} alt='not_fnd' />
          </div>
        </div>
        <div className="ml-4 max-md:ml-0">
          <p className="text-grey-darkest">
            {data?.name}
          </p>
          <p className="text-grey-darker text-xs mt-1 max-md:mt-0">
            {data?.recent_msg}
          </p>
        </div>
      </div>

      <div className="flex">
        <div className='p-2 max-md:p-0 '>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".5" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
        </div>
        <div className="ml-6 p-2 max-md:p-0 max-md:ml-2">
          <label htmlFor="inputtag">
            <input type="file" style={{ "display": "none" }} id="inputtag" ref={file} onChange={log} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".5" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg>
          </label>
        </div>
        <div className={`ml-4 p-2 max-md:p-0 max-md:ml-2 ${option && "rounded-full bg-gray-300"}`} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" onClick={() => setoption(!option)}><path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
          {option && <div className="pt-3 absolute w-44 h-44 mt-3 shadow-md" style={{ "right": "17px", "backgroundColor": "#fff", "borderRadius": "5px" }}>
            <ul>
              <li className="px-3 py-3 gray-100 hover:bg-gray-200" onClick={() => console.log("clicked")}>Add Contact</li>
              <li className="px-3 py-3 gray-100 hover:bg-gray-200">Settings</li>
              <li className="px-3 py-3 gray-100 hover:bg-gray-200">logout</li>
            </ul>
          </div>}
        </div>
      </div>
    </div>
  )
}
