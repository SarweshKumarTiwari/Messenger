import { Outlet } from 'react-router-dom';
export default function AuthPage() {
  return (
    <div style={{"backgroundImage":"url(./bg.png)","height":"100vh","width":"100vw","position":"fixed"}}>
    <Outlet />
    </div>
  )
}
